"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import AuthGate, { LoadingScreen } from "@/components/auth-gate";
import StatusBadge from "@/components/status-badge";
import { useAnalyses, useAnalysis } from "@/lib/hooks";

function Step({
  title,
  status,
  detail,
}: {
  title: string;
  status: "complete" | "failed" | "active" | "pending";
  detail: string;
}) {
  const icon =
    status === "complete" ? (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.75" stroke="#006c4e" strokeWidth="1.5" />
        <path
          d="M6.75 9l1.5 1.5 3.75-3.75"
          stroke="#006c4e"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : status === "failed" ? (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.75" stroke="#801313" strokeWidth="1.5" />
        <path
          d="M9 6v3M9 12h.0075"
          stroke="#801313"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.75" stroke="#a16207" strokeWidth="1.5" />
        <path
          d="M9 6v3M9 12h.0075"
          stroke="#a16207"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  const color =
    status === "complete"
      ? "text-[#006c4e]"
      : status === "failed"
        ? "text-[#801313]"
        : "text-[#a16207]";

  return (
    <div className="flex items-center gap-3 rounded-[4px] border border-[#e7e0d3] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      {icon}
      <div>
        <div className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">
          {title}
        </div>
        <div className={`font-[family-name:var(--font-source-sans-3)] text-sm ${color}`}>
          {detail}
        </div>
      </div>
    </div>
  );
}

function PipelineContent() {
  const { analyses, loading: listLoading } = useAnalyses();
  const [selectedId, setSelectedId] = useState("");

  const activeId = selectedId || analyses[0]?.analysis_id || "";

  const { result, loading, error } = useAnalysis(activeId || null);
  const selected = analyses.find((item) => item.analysis_id === activeId);

  const logs = useMemo(() => {
    if (!selected) return [];
    const entries = [
      `[STATUS] ${selected.status.toUpperCase()} — ${selected.title}`,
      `[CLAIMS] ${selected.summary.total_claims} klaim diekstrak`,
      `[VALID] ${selected.summary.valid} klaim didukung evidence`,
      `[REVIEW] ${selected.summary.questionable} questionable, ${selected.summary.insufficient_evidence} insufficient`,
      `[INVALID] ${selected.summary.invalid} klaim tidak cocok`,
    ];
    if (result) {
      entries.push(
        `[QC] status=${result.quality_control.status}, issues=${result.quality_control.issues.length}`
      );
    }
    return entries;
  }, [result, selected]);

  const qcIssues = result?.quality_control.issues || [];

  return (
    <main className="flex-1 bg-[#faf7f2]">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-6 py-8">
        <section className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase leading-[16.5px] tracking-[0.55px] text-[#801313]">
              PIPELINE EXECUTION
            </div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-4xl leading-[40px] tracking-[-1px] text-[#1c1917]">
              Pipeline Execution
            </h1>
            <p className="font-[family-name:var(--font-source-sans-3)] text-base leading-[26px] text-[#635d5c]">
              Status pemrosesan asinkron: laporan masuk ke antrean, lalu
              ekstraksi PDF, klaim, evidence, evaluasi, dan quality control
              dijalankan oleh worker secara bertahap.
            </p>
          </div>
          {analyses.length > 0 && (
            <select
              value={activeId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="max-w-[320px] rounded-[2px] border border-[#d8c2be] bg-white px-3 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:border-[#801313] focus:outline-none"
            >
              {analyses.map((item) => (
                <option key={item.analysis_id} value={item.analysis_id}>
                  {item.title}
                </option>
              ))}
            </select>
          )}
        </section>

        {error && (
          <div className="rounded-[4px] border border-[#fecaca] bg-[#fdf2f2] px-4 py-3 font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">
            {error}
          </div>
        )}

        {listLoading || (activeId && loading) ? (
          <LoadingScreen message="Memuat status pipeline..." />
        ) : !selected ? (
          <div className="rounded-[4px] border border-dashed border-[#e7e0d3] bg-white px-6 py-12 text-center">
            <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
              Belum ada eksekusi pipeline.
            </p>
            <Link
              href="/analyze"
              className="mt-3 inline-block rounded-[2px] bg-[#801313] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-white"
            >
              JALANKAN ANALISIS
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <StatusBadge status={selected.status} />
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">
                {selected.title}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Step
                title="PDF Extraction"
                status={selected.status === "failed" ? "failed" : "complete"}
                detail={selected.status === "failed" ? "Gagal" : "Selesai"}
              />
              <Step
                title="Claim & Evidence"
                status={
                  selected.status === "completed"
                    ? "complete"
                    : selected.status === "failed"
                      ? "failed"
                      : "active"
                }
                detail={
                  selected.status === "completed"
                    ? "Selesai"
                    : selected.status === "failed"
                      ? "Gagal"
                      : "Diproses"
                }
              />
              <Step
                title="Quality Control"
                status={
                  selected.status === "failed"
                    ? "failed"
                    : result?.quality_control.status === "passed"
                      ? "complete"
                      : "active"
                }
                detail={
                  result
                    ? `${result.quality_control.status} · ${qcIssues.length} issue`
                    : "Menunggu hasil"
                }
              />
            </div>

            <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between border-b border-[#e7e0d3] px-6 py-4">
                <h2 className="font-[family-name:var(--font-newsreader)] text-xl leading-6 text-[#1c1917]">
                  Execution Summary
                </h2>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#635d5c]">
                  {new Date(selected.created_at).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="bg-[#1c1917] p-6 font-[family-name:var(--font-jetbrains-mono)] text-xs">
                <div className="flex flex-col gap-1">
                  {logs.map((log, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="text-[#a8a29e]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[#e7e5e4]">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
              {qcIssues.length > 0 && (
                <div className="border-t border-[#e7e0d3] bg-[#fef2f2] p-4">
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#991b1b]">
                    QC Issues
                  </div>
                  <ul className="mt-1 list-disc pl-4 font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">
                    {qcIssues.map((issue, index) => (
                      <li key={index}>
                        {issue.type || "issue"}: {issue.message || "—"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <div className="flex justify-end">
              <Link
                href={`/analyze?id=${encodeURIComponent(selected.analysis_id)}`}
                className="rounded-[2px] bg-[#801313] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-white"
              >
                LIHAT HASIL LENGKAP
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function PipelinePage() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
      }}
    >
      <Navbar
        showSearch={true}
        showProfile={true}
        showRepository={true}
        activePage="pipeline"
      />
      <AuthGate>
        <PipelineContent />
      </AuthGate>
    </div>
  );
}
