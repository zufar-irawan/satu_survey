"use client";

import { useState } from "react";
import type {
  AnalyzeResponse,
  ClaimMetric,
  ClaimViz,
  EvidenceItem,
  QCIssue,
} from "@/lib/api";

const VERDICT_META: Record<
  string,
  { label: string; className: string; bar: string }
> = {
  valid: {
    label: "VALID",
    className: "border-[#006c4e]/30 bg-[rgba(0,108,78,0.08)] text-[#006c4e]",
    bar: "bg-[#006c4e]",
  },
  questionable: {
    label: "QUESTIONABLE",
    className: "border-[#a16207]/30 bg-[rgba(161,98,7,0.08)] text-[#a16207]",
    bar: "bg-[#a16207]",
  },
  invalid: {
    label: "INVALID",
    className: "border-[#801313]/30 bg-[rgba(128,19,19,0.08)] text-[#801313]",
    bar: "bg-[#801313]",
  },
  insufficient_evidence: {
    label: "INSUFFICIENT",
    className: "border-[#635d5c]/30 bg-[rgba(99,93,92,0.08)] text-[#635d5c]",
    bar: "bg-[#635d5c]",
  },
};

function verdictMeta(verdict: string) {
  return VERDICT_META[verdict] || VERDICT_META.insufficient_evidence;
}

function formatConfidence(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return `${(Number(value) * 100).toFixed(1)}%`;
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : value.toLocaleString();
  }
  return String(value);
}

function asText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function SummaryCard({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div className="rounded-[4px] border border-[#e7e0d3] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] text-[#635d5c]">
        {label}
      </div>
      <div
        className={`mt-1 font-[family-name:var(--font-newsreader)] text-2xl leading-8 text-[#1c1917] ${
          className || ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function MetricTable({ metrics }: { metrics: Record<string, ClaimMetric> }) {
  const entries = Object.entries(metrics || {}).filter(
    ([, metric]) => metric && typeof metric === "object"
  );
  if (!entries.length) return null;

  return (
    <div className="overflow-x-auto rounded-[4px] border border-[#e7e0d3]">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-[#e7e0d3] bg-[#faf7f2]">
            <th className="px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] text-[#635d5c]">
              Metrik
            </th>
            <th className="px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] text-[#635d5c]">
              Nilai
            </th>
            <th className="px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] text-[#635d5c]">
              Periode
            </th>
            <th className="px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] text-[#635d5c]">
              Halaman
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([id, metric]) => (
            <tr key={id} className="border-b border-[#f3efe6] last:border-0">
              <td className="px-3 py-2 font-[family-name:var(--font-source-sans-3)] text-[#1c1917]">
                {metric.metric || "—"}
              </td>
              <td className="px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[#1c1917]">
                {formatValue(metric.value)}
                {metric.unit ? ` ${metric.unit}` : ""}
              </td>
              <td className="px-3 py-2 text-[#635d5c]">
                {metric.period || "—"}
              </td>
              <td className="px-3 py-2 text-[#635d5c]">
                {metric.page_number ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EvidenceList({ evidence }: { evidence: EvidenceItem[] }) {
  if (!evidence?.length) {
    return (
      <p className="font-[family-name:var(--font-source-sans-3)] text-xs italic text-[#a8a29e]">
        Tidak ada evidence yang tertaut ke klaim ini.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {evidence.map((item, index) => (
        <li
          key={item.id || `${index}`}
          className="rounded-[4px] border border-[#e7e0d3] bg-[#faf7f2] p-3"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-xl border border-[#e7e0d3] bg-white px-2 py-[1px] font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
              {item.metric || "evidence"}
            </span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold text-[#1c1917]">
              {formatValue(item.value)}
              {item.unit ? ` ${item.unit}` : ""}
            </span>
            {item.period && (
              <span className="font-[family-name:var(--font-source-sans-3)] text-[11px] text-[#635d5c]">
                • {item.period}
              </span>
            )}
            {item.page_number != null && (
              <span className="font-[family-name:var(--font-source-sans-3)] text-[11px] text-[#635d5c]">
                • hal. {item.page_number}
              </span>
            )}
          </div>
          {item.raw_excerpt && (
            <blockquote className="mt-2 border-l-2 border-[#d8c2be] pl-2 font-[family-name:var(--font-source-sans-3)] text-xs leading-5 text-[#635d5c]">
              “{item.raw_excerpt}”
            </blockquote>
          )}
        </li>
      ))}
    </ul>
  );
}

function ClaimCard({ claim, index }: { claim: ClaimViz; index: number }) {
  const meta = verdictMeta(claim.verdict);
  return (
    <article className="rounded-[4px] border border-[#e7e0d3] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f3efe6] font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-[#801313]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="font-[family-name:var(--font-newsreader)] text-base leading-5 text-[#1c1917]">
              {claim.statement || "Klaim tanpa pernyataan"}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#635d5c]">
              {claim.page_number != null && <span>HAL. {claim.page_number}</span>}
              <span>•</span>
              <span>KEYAKINAN {formatConfidence(claim.confidence)}</span>
              <span>•</span>
              <span>{claim.evidence?.length || 0} EVIDENCE</span>
            </div>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-xl border px-2 py-[2px] font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] ${meta.className}`}
        >
          {meta.label}
        </span>
      </div>

      {claim.explanation && (
        <p className="mt-3 border-l-2 border-[#e7e0d3] pl-3 font-[family-name:var(--font-source-sans-3)] text-sm leading-6 text-[#534341]">
          {claim.explanation}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3">
        <MetricTable metrics={claim.metrics || {}} />
        <EvidenceList evidence={Array.isArray(claim.evidence) ? claim.evidence : []} />
        {claim.limitations?.length > 0 && (
          <div className="rounded-[4px] border border-[#fde68a] bg-[#fffbeb] p-3">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] text-[#a16207]">
              Keterbatasan
            </div>
            <ul className="mt-1 list-disc pl-4 font-[family-name:var(--font-source-sans-3)] text-xs leading-5 text-[#854d0e]">
              {claim.limitations.map((item, i) => (
                <li key={i}>{asText(item)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

function QCSection({ result }: { result: AnalyzeResponse }) {
  const qc = result.quality_control;
  const issues: QCIssue[] = Array.isArray(qc?.issues) ? qc.issues : [];
  const passed = qc?.status === "passed" && issues.length === 0;
  return (
    <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between border-b border-[#e7e0d3] px-5 py-3">
        <h2 className="font-[family-name:var(--font-newsreader)] text-lg leading-6 text-[#1c1917]">
          Quality Control
        </h2>
        <span
          className={`rounded-xl border px-2 py-[2px] font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase ${
            passed
              ? "border-[#006c4e]/30 bg-[rgba(0,108,78,0.08)] text-[#006c4e]"
              : "border-[#a16207]/30 bg-[rgba(161,98,7,0.08)] text-[#a16207]"
          }`}
        >
          {qc?.status || "unknown"}
        </span>
      </div>
      <div className="p-5">
        {issues.length === 0 ? (
          <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#006c4e]">
            Tidak ada masalah QC yang terdeteksi pada hasil ini.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {issues.map((issue, index) => (
              <li
                key={index}
                className="rounded-[4px] border border-[#e7e0d3] bg-[#faf7f2] p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-xl border border-[#e7e0d3] bg-white px-2 py-[1px] font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
                    {issue.type || "issue"}
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#a16207]">
                    {issue.severity || "warning"}
                  </span>
                </div>
                <p className="mt-1 font-[family-name:var(--font-source-sans-3)] text-xs text-[#534341]">
                  {issue.message || asText(issue)}
                </p>
              </li>
            ))}
          </ul>
        )}
        {qc?.corrections?.length > 0 && (
          <div className="mt-4">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#635d5c]">
              Koreksi otomatis
            </div>
            <ul className="mt-1 list-disc pl-4 font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c]">
              {qc.corrections.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default function AnalysisResultView({
  result,
}: {
  result: AnalyzeResponse;
}) {
  const [exporting, setExporting] = useState(false);
  const summary = result.summary;
  const claims = Array.isArray(result.claims) ? result.claims : [];
  const distribution = [
    { key: "valid", label: "Valid", value: summary.valid },
    { key: "questionable", label: "Questionable", value: summary.questionable },
    { key: "invalid", label: "Invalid", value: summary.invalid },
    {
      key: "insufficient_evidence",
      label: "Insufficient",
      value: summary.insufficient_evidence,
    },
  ];
  const maxCount = Math.max(1, ...distribution.map((item) => item.value));

  const downloadJson = async () => {
    setExporting(true);
    try {
      const blob = new Blob([JSON.stringify(result, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `satusurvey-${result.analysis_id}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="h-1 bg-[#801313]" />
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.55px] text-[#801313]">
              Hasil Analisis
            </div>
            <h1 className="mt-1 break-words font-[family-name:var(--font-newsreader)] text-2xl leading-8 text-[#1c1917]">
              {result.document?.title || "Dokumen tanpa judul"}
            </h1>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c]">
              <span>
                ID:{" "}
                <span className="font-[family-name:var(--font-jetbrains-mono)]">
                  {result.analysis_id}
                </span>
              </span>
              {result.document?.publisher && (
                <span>Penerbit: {result.document.publisher}</span>
              )}
              {result.document?.publication_date && (
                <span>Tanggal: {result.document.publication_date}</span>
              )}
            </div>
          </div>
          <button
            onClick={downloadJson}
            disabled={exporting}
            className="shrink-0 rounded-[2px] border border-[#d8c2be] bg-white px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-[#1c1917] hover:bg-[#faf7f2] disabled:opacity-50"
          >
            {exporting ? "MENYIAPKAN..." : "UNDUH JSON"}
          </button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <SummaryCard label="Total Klaim" value={summary.total_claims} />
        <SummaryCard
          label="Valid"
          value={summary.valid}
          className="!text-[#006c4e]"
        />
        <SummaryCard
          label="Questionable"
          value={summary.questionable}
          className="!text-[#a16207]"
        />
        <SummaryCard
          label="Invalid"
          value={summary.invalid}
          className="!text-[#801313]"
        />
        <SummaryCard
          label="Insufficient"
          value={summary.insufficient_evidence}
          className="!text-[#635d5c]"
        />
      </div>

      <section className="rounded-[4px] border border-[#e7e0d3] bg-white p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-newsreader)] text-lg leading-6 text-[#1c1917]">
            Distribusi Verdict
          </h2>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#635d5c]">
            {summary.total_claims} klaim
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {distribution.map((item) => {
            const meta = verdictMeta(item.key);
            return (
              <div key={item.key} className="flex items-center gap-3">
                <span className="w-28 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#635d5c]">
                  {item.label}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f3efe6]">
                  <div
                    className={`h-full rounded-full ${meta.bar}`}
                    style={{ width: `${(item.value / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#1c1917]">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-newsreader)] text-xl leading-6 text-[#1c1917]">
            Klaim &amp; Evidence
          </h2>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#635d5c]">
            {claims.length} klaim
          </span>
        </div>
        {claims.length === 0 ? (
          <div className="rounded-[4px] border border-dashed border-[#e7e0d3] bg-white p-8 text-center">
            <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
              Tidak ada klaim yang dapat diekstrak dari dokumen ini. Coba PDF
              dengan teks digital yang lebih lengkap.
            </p>
          </div>
        ) : (
          claims.map((claim, index) => (
            <ClaimCard key={claim.claim_id || index} claim={claim} index={index} />
          ))
        )}
      </section>

      <QCSection result={result} />
    </div>
  );
}
