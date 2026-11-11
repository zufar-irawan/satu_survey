"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import AuthGate, { LoadingScreen } from "@/components/auth-gate";
import { useAnalyses, useAnalysis } from "@/lib/hooks";

function verdictStyle(verdict: string) {
  if (verdict === "valid") {
    return "border-[#006c4e]/30 bg-[rgba(0,108,78,0.08)] text-[#006c4e]";
  }
  if (verdict === "invalid") {
    return "border-[#801313]/30 bg-[rgba(128,19,19,0.08)] text-[#801313]";
  }
  if (verdict === "questionable") {
    return "border-[#a16207]/30 bg-[rgba(161,98,7,0.08)] text-[#a16207]";
  }
  return "border-[#635d5c]/30 bg-[rgba(99,93,92,0.08)] text-[#635d5c]";
}

function EvidenceContent() {
  const { analyses, loading: listLoading, error: listError } = useAnalyses();
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (!selectedId && analyses.length > 0) {
      setSelectedId(analyses[0].analysis_id);
    }
  }, [analyses, selectedId]);

  const {
    result,
    loading: detailLoading,
    error: detailError,
  } = useAnalysis(selectedId || null);

  const claims = result?.claims || [];
  const avgConfidence = useMemo(() => {
    const values = claims
      .map((claim) => claim.confidence)
      .filter((value): value is number => typeof value === "number");
    if (!values.length) return null;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }, [claims]);

  const evidenceCount = claims.reduce(
    (total, claim) =>
      total + (Array.isArray(claim.evidence) ? claim.evidence.length : 0),
    0
  );

  return (
    <main className="flex-1 bg-[#faf7f2]">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-6 py-8">
        <section className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase leading-[16.5px] tracking-[0.55px] text-[#801313]">
              EVIDENCE ANALYSIS
            </div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-4xl leading-[40px] tracking-[-1px] text-[#1c1917]">
              Evidence Analysis Dashboard
            </h1>
            <p className="font-[family-name:var(--font-source-sans-3)] text-base leading-[26px] text-[#635d5c]">
              Verifikasi per klaim, skor keyakinan, dan pemetaan kutipan sumber.
            </p>
          </div>
          {analyses.length > 0 && (
            <select
              value={selectedId}
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

        {(listError || detailError) && (
          <div className="rounded-[4px] border border-[#fecaca] bg-[#fdf2f2] px-4 py-3 font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">
            {listError || detailError}
          </div>
        )}

        {listLoading || (selectedId && detailLoading) ? (
          <LoadingScreen message="Memuat evidence..." />
        ) : !selectedId ? (
          <div className="rounded-[4px] border border-dashed border-[#e7e0d3] bg-white px-6 py-12 text-center">
            <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
              Belum ada analisis. Unggah PDF terlebih dahulu.
            </p>
            <Link
              href="/analyze"
              className="mt-3 inline-block rounded-[2px] bg-[#801313] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-white"
            >
              KE HALAMAN ANALISIS
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "TOTAL CLAIMS", value: claims.length, color: "text-[#1c1917]" },
                {
                  label: "VERIFIED",
                  value: result?.summary.valid ?? 0,
                  color: "text-[#006c4e]",
                },
                {
                  label: "NEEDS REVIEW",
                  value:
                    (result?.summary.questionable ?? 0) +
                    (result?.summary.insufficient_evidence ?? 0),
                  color: "text-[#a16207]",
                },
                {
                  label: "AVG CONFIDENCE",
                  value:
                    avgConfidence === null
                      ? "—"
                      : `${(avgConfidence * 100).toFixed(1)}%`,
                  color: "text-[#1c1917]",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[4px] border border-[#e7e0d3] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                >
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] text-[#635d5c]">
                    {item.label}
                  </div>
                  <div
                    className={`mt-1 font-[family-name:var(--font-newsreader)] text-2xl ${item.color}`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e7e0d3] px-6 py-4">
                <h2 className="font-[family-name:var(--font-newsreader)] text-xl leading-6 text-[#1c1917]">
                  Claim-Level Analysis
                </h2>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#635d5c]">
                  {evidenceCount} evidence tertaut
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e7e0d3] bg-[#faf7f2]">
                      {["CLAIM", "CONFIDENCE", "VERDICT", "EVIDENCE", "PAGE"].map(
                        (head) => (
                          <th
                            key={head}
                            className="px-6 py-2.5 text-left font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.55px] text-[#635d5c]"
                          >
                            {head}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((claim) => (
                      <tr
                        key={claim.claim_id}
                        className="border-b border-[#f3efe6] hover:bg-[#faf7f2]/50"
                      >
                        <td className="max-w-[480px] px-6 py-4 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">
                          {claim.statement || "—"}
                        </td>
                        <td className="px-6 py-4">
                          {claim.confidence === null ? (
                            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#a8a29e]">
                              —
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#f3efe6]">
                                <div
                                  className="h-full bg-[#801313]"
                                  style={{
                                    width: `${Math.max(0, Math.min(100, claim.confidence * 100))}%`,
                                  }}
                                />
                              </div>
                              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#1c1917]">
                                {(claim.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-xl border px-2 py-[2px] font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] ${verdictStyle(claim.verdict)}`}
                          >
                            {claim.verdict}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">
                          {Array.isArray(claim.evidence)
                            ? claim.evidence.length
                            : 0}{" "}
                          refs
                        </td>
                        <td className="px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">
                          {claim.page_number ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {result && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e7e0d3] px-6 py-3">
                  <span className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c]">
                    {result.document.title || result.analysis_id}
                  </span>
                  <Link
                    href={`/analyze?id=${encodeURIComponent(result.analysis_id)}`}
                    className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-[#801313] underline underline-offset-2"
                  >
                    LIHAT DETAIL LENGKAP
                  </Link>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default function EvidenceAnalysisPage() {
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
        activePage="analysis"
      />
      <AuthGate>
        <EvidenceContent />
      </AuthGate>
    </div>
  );
}
