"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import AuthGate, { LoadingScreen } from "@/components/auth-gate";
import { useAnalyses, useAnalysis } from "@/lib/hooks";

type ExportFormat = "json" | "csv";

function csvEscape(value: unknown) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function claimsToCsv(claims: { statement: string | null; verdict: string; confidence: number | null; page_number: number | null; explanation: string | null }[]) {
  const header = ["claim_id", "statement", "verdict", "confidence", "page_number", "explanation"];
  const lines = [header.join(",")];
  claims.forEach((claim, index) => {
    lines.push(
      [
        csvEscape(index + 1),
        csvEscape(claim.statement),
        csvEscape(claim.verdict),
        csvEscape(claim.confidence),
        csvEscape(claim.page_number),
        csvEscape(claim.explanation),
      ].join(",")
    );
  });
  return lines.join("\n");
}

function ExportContent() {
  const { analyses, loading: listLoading } = useAnalyses();
  const [selectedId, setSelectedId] = useState("");
  const [format, setFormat] = useState<ExportFormat>("json");
  const [digest, setDigest] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedId && analyses.length > 0) {
      setSelectedId(analyses[0].analysis_id);
    }
  }, [analyses, selectedId]);

  const { result, loading, error } = useAnalysis(selectedId || null);
  const selected = analyses.find((item) => item.analysis_id === selectedId);

  const payload = useMemo(() => {
    if (!result) return "";
    if (format === "json") return JSON.stringify(result, null, 2);
    return claimsToCsv(result.claims);
  }, [format, result]);

  useEffect(() => {
    let cancelled = false;
    async function computeDigest() {
      if (!payload || !window.crypto?.subtle) {
        setDigest("");
        return;
      }
      const bytes = new TextEncoder().encode(payload);
      const hash = await window.crypto.subtle.digest("SHA-256", bytes);
      const hex = Array.from(new Uint8Array(hash))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      if (!cancelled) setDigest(hex);
    }
    void computeDigest();
    return () => {
      cancelled = true;
    };
  }, [payload]);

  const download = () => {
    if (!result || !payload) return;
    const type = format === "json" ? "application/json" : "text/csv";
    const extension = format === "json" ? "json" : "csv";
    const blob = new Blob([payload], { type: `${type};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `satusurvey-${result.analysis_id}.${extension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("Berkas berhasil dibuat dan diunduh.");
  };

  const copyCitation = async () => {
    if (!result) return;
    const title = result.document.title || "Laporan Survei";
    const citation = `${title}. SatuSurvey analysis ${result.analysis_id}. Diakses ${new Date().toLocaleDateString("id-ID")}.`;
    try {
      await navigator.clipboard.writeText(citation);
      setStatus("Citation berhasil disalin.");
    } catch {
      setStatus(citation);
    }
  };

  return (
    <main className="flex-1 bg-[#faf7f2]">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-6 px-6 py-8">
        <section className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase leading-[16.5px] tracking-[0.55px] text-[#801313]">
              DOSSIER EXPORT
            </div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-4xl leading-[40px] tracking-[-1px] text-[#1c1917]">
              Export Hasil Analisis
            </h1>
            <p className="font-[family-name:var(--font-source-sans-3)] text-base leading-[26px] text-[#635d5c]">
              Unduh hasil analisis dalam format JSON lengkap atau CSV ringkas
              untuk kebutuhan audit.
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

        {error && (
          <div className="rounded-[4px] border border-[#fecaca] bg-[#fdf2f2] px-4 py-3 font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">
            {error}
          </div>
        )}

        {listLoading || (selectedId && loading) ? (
          <LoadingScreen message="Menyiapkan export..." />
        ) : !selectedId ? (
          <div className="rounded-[4px] border border-dashed border-[#e7e0d3] bg-white px-6 py-12 text-center">
            <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
              Belum ada hasil analisis yang bisa diekspor.
            </p>
            <Link
              href="/analyze"
              className="mt-3 inline-block rounded-[2px] bg-[#801313] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-white"
            >
              KE HALAMAN ANALISIS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="border-b border-[#e7e0d3] px-6 py-4">
                <h2 className="font-[family-name:var(--font-newsreader)] text-xl leading-6 text-[#1c1917]">
                  Export Format
                </h2>
                <p className="mt-0.5 font-[family-name:var(--font-source-sans-3)] text-sm leading-5 text-[#635d5c]">
                  Pilih format paket yang ingin diunduh
                </p>
              </div>
              <div className="flex flex-col gap-3 p-6">
                {[
                  {
                    value: "json" as const,
                    title: "Forensic Evidence Package (JSON)",
                    description:
                      "Payload lengkap: dokumen, ringkasan, klaim, evidence, visualisasi, dan QC.",
                  },
                  {
                    value: "csv" as const,
                    title: "Tabular Evidence (CSV)",
                    description:
                      "Satu baris per klaim dengan verdict, confidence, halaman, dan penjelasan.",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-[4px] border p-4 ${
                      format === option.value
                        ? "border-2 border-[#801313] bg-[#fff8f5]"
                        : "border-[#e7e0d3] hover:bg-[#faf7f2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      checked={format === option.value}
                      onChange={() => setFormat(option.value)}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">
                        {option.title}
                      </span>
                      <p className="mt-1 font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <div className="flex flex-col gap-4">
              <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 border-b border-[#e7e0d3] px-5 py-4">
                  <h3 className="font-[family-name:var(--font-newsreader)] text-lg leading-6 text-[#1c1917]">
                    Artifact Manifest
                  </h3>
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <div>
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] text-[#635d5c]">
                      DOSSIER
                    </div>
                    <div className="mt-1 break-words font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">
                      {result?.document.title || selected?.title}
                    </div>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] text-[#635d5c]">
                      SHA-256 DIGEST
                    </div>
                    <div className="mt-1 break-all font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#1c1917]">
                      {digest || "Menghitung..."}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-[4px] border border-[#e7e0d3] bg-[#faf7f2] p-2">
                      <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
                        CLAIMS
                      </div>
                      <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#1c1917]">
                        {result?.summary.total_claims ?? 0}
                      </div>
                    </div>
                    <div className="rounded-[4px] border border-[#e7e0d3] bg-[#faf7f2] p-2">
                      <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
                        FORMAT
                      </div>
                      <div className="font-[family-name:var(--font-newsreader)] text-lg uppercase text-[#1c1917]">
                        {format}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col gap-3">
                <button
                  onClick={download}
                  disabled={!result}
                  className="flex items-center justify-center gap-2 rounded-[2px] bg-[#801313] px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold text-white hover:bg-[#5e0f0f] disabled:opacity-50"
                >
                  GENERATE &amp; DOWNLOAD PACKAGE
                </button>
                <button
                  onClick={() => void copyCitation()}
                  disabled={!result}
                  className="flex items-center justify-center gap-2 rounded-[2px] border border-[#d8c2be] bg-white px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#1c1917] hover:bg-[#faf7f2] disabled:opacity-50"
                >
                  COPY CITATION HANDLE
                </button>
                {status && (
                  <p className="break-words font-[family-name:var(--font-source-sans-3)] text-xs text-[#006c4e]">
                    {status}
                  </p>
                )}
                {result && (
                  <Link
                    href={`/analyze?id=${encodeURIComponent(result.analysis_id)}`}
                    className="text-center font-[family-name:var(--font-source-sans-3)] text-xs text-[#801313] underline underline-offset-2"
                  >
                    Kembali ke hasil analisis
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ExportPage() {
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
        activePage="export"
      />
      <AuthGate>
        <ExportContent />
      </AuthGate>
    </div>
  );
}
