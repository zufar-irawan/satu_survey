"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import AuthGate, { LoadingScreen } from "@/components/auth-gate";
import AnalysisResultView from "@/components/analysis-result";
import { api } from "@/lib/api";
import { useAnalyses, useAnalysis } from "@/lib/hooks";

const MAX_MB = 20;

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "completed"
      ? "border-[#006c4e]/30 bg-[rgba(0,108,78,0.08)] text-[#006c4e]"
      : status === "failed"
        ? "border-[#801313]/30 bg-[rgba(128,19,19,0.08)] text-[#801313]"
        : "border-[#a16207]/30 bg-[rgba(161,98,7,0.08)] text-[#a16207]";
  return (
    <span
      className={`inline-flex rounded-xl border px-2 py-[2px] font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] ${style}`}
    >
      {status}
    </span>
  );
}

function RecentAnalyses() {
  const { analyses, loading } = useAnalyses();
  if (loading) {
    return (
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#a8a29e]">
        MEMUAT RIWAYAT...
      </p>
    );
  }
  if (!analyses.length) return null;
  return (
    <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="border-b border-[#e7e0d3] px-5 py-3">
        <h2 className="font-[family-name:var(--font-newsreader)] text-lg leading-6 text-[#1c1917]">
          Analisis Terakhir
        </h2>
      </div>
      <ul className="divide-y divide-[#f3efe6]">
        {analyses.slice(0, 5).map((item) => (
          <li key={item.analysis_id}>
            <Link
              href={`/analyze?id=${encodeURIComponent(item.analysis_id)}`}
              className="flex flex-col gap-2 px-5 py-3 hover:bg-[#faf7f2] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="truncate font-[family-name:var(--font-source-sans-3)] text-sm font-semibold text-[#1c1917]">
                  {item.title}
                </div>
                <div className="mt-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#635d5c]">
                  {new Date(item.created_at).toLocaleString("id-ID")} ·{" "}
                  {item.summary.total_claims} klaim
                </div>
              </div>
              <StatusBadge status={item.status} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function UploadPanel() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleSelected = async (selected: File | null) => {
    setError(null);
    if (!selected) return;
    if (
      selected.type !== "application/pdf" &&
      !selected.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Hanya file PDF yang diperbolehkan.");
      return;
    }
    if (selected.size > MAX_MB * 1024 * 1024) {
      setError(`Ukuran file melebihi batas ${MAX_MB} MB.`);
      return;
    }
    setFile(selected);
    setUploading(true);
    try {
      const result = await api.analyzePdf(selected);
      router.replace(`/analyze?id=${encodeURIComponent(result.analysis_id)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analisis gagal");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col items-center gap-1.5 text-center">
        <div className="flex items-center gap-1.5 rounded-xl border border-[#801313] bg-[rgba(255,218,214,0.2)] px-2.5 py-[3px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5" cy="5" r="3.333" stroke="#801313" strokeWidth="1" />
            <circle cx="5" cy="5" r="0.833" stroke="#801313" strokeWidth="1" />
            <path
              d="M5 1.667V2.5M5 7.5v.833M1.667 5H2.5M7.5 5h.833"
              stroke="#801313"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold uppercase leading-[16.5px] tracking-[0.55px] text-[#801313]">
            PDF REPORT INGESTION
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-newsreader)] text-[30px] font-semibold leading-9 tracking-[-0.75px] text-[#1c1917]">
          Analisis Laporan Survei
        </h1>
        <p className="max-w-[600px] font-[family-name:var(--font-source-sans-3)] text-sm leading-[21px] text-[#635d5c]">
          Unggah laporan survei berformat PDF. Sistem akan mengekstrak klaim,
          mencocokkannya dengan evidence di dalam dokumen, lalu menampilkan
          verdict beserta kutipan sumbernya.
        </p>
      </section>

      <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between border-b border-[#e7e0d3] px-[17px] py-2.5">
          <h2 className="font-[family-name:var(--font-newsreader)] text-sm font-semibold leading-5 text-[#1c1917]">
            PDF Document Dropper
          </h2>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] leading-[16.5px] text-[#635d5c]">
            PDF • Maks {MAX_MB} MB
          </span>
        </div>
        <div className="flex flex-col gap-3.5 p-[17px]">
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              void handleSelected(event.dataTransfer.files?.[0] ?? null);
            }}
            className={`flex flex-col items-center gap-1.5 rounded-[4px] border border-dashed p-[21px] text-center transition-colors ${
              dragging
                ? "border-[#801313] bg-[rgba(255,218,214,0.25)]"
                : "border-[#e7e0d3] bg-[#f3efe6]"
            }`}
          >
            <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-[rgba(255,218,214,0.3)]">
              <svg
                width="16.67"
                height="16.67"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2.5v10M5 7.5l5-5 5 5M3.333 12.5v2.917A1.667 1.667 0 005 17.083h10a1.667 1.667 0 001.667-1.666V12.5"
                  stroke="#801313"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-newsreader)] text-sm font-semibold leading-5 text-[#1c1917]">
              Tarik &amp; letakkan PDF laporan survei di sini
            </h3>
            <p className="max-w-[440px] font-[family-name:var(--font-source-sans-3)] text-xs leading-4 text-[#635d5c]">
              Mendukung laporan statistik nasional, buletin sensus, dan publikasi
              survei sosial-ekonomi dengan teks digital.
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(event) => void handleSelected(event.target.files?.[0] ?? null)}
              disabled={uploading}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className={`mt-2 flex items-center gap-1.5 rounded-[4px] border border-[#801313] bg-white px-4 py-[7px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#faf7f2] ${
                uploading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <svg
                width="12.54"
                height="9.33"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.667 9.333h6.666M8 2v7.333M2 4.667h.007M14 4.667h.007"
                  stroke="#801313"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold leading-4 text-[#801313]">
                {uploading ? "Menganalisis..." : "Pilih File PDF"}
              </span>
            </button>
            {file && (
              <div className="mt-2 flex items-center gap-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] leading-[16.5px] text-[#635d5c]">
                <span className="max-w-[280px] truncate font-semibold text-[#1c1917]">
                  {file.name}
                </span>
                <span>•</span>
                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            )}
            {uploading && (
              <div className="mt-3 flex flex-col items-center gap-2">
                <div className="h-1.5 w-48 overflow-hidden rounded-full bg-[#e7e0d3]">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-[#801313]" />
                </div>
                <p className="font-[family-name:var(--font-source-sans-3)] text-[11px] text-[#635d5c]">
                  Ekstraksi PDF → klaim → evidence → QC. Proses ini bisa memakan
                  waktu hingga beberapa menit.
                </p>
              </div>
            )}
            {error && (
              <div className="mt-2 rounded-[4px] border border-[#fecaca] bg-[#fdf2f2] px-3 py-2 font-[family-name:var(--font-source-sans-3)] text-xs text-[#991b1b]">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      <RecentAnalyses />
    </div>
  );
}

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("id");
  const { result, loading, error, refresh } = useAnalysis(analysisId);
  const title = useMemo(
    () => (analysisId ? "Hasil Analisis" : "Analisis Baru"),
    [analysisId]
  );

  return (
    <main className="flex-1 bg-[#faf7f2] px-6 py-6">
      <div className="mx-auto flex max-w-[960px] flex-col gap-4 px-2 py-2 sm:px-6">
        {analysisId && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.55px] text-[#635d5c]">
              {title}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => void refresh()}
                className="rounded-[2px] border border-[#d8c2be] bg-white px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#1c1917] hover:bg-[#faf7f2]"
              >
                MUAT ULANG
              </button>
              <Link
                href="/analyze"
                className="rounded-[2px] bg-[#801313] px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-white hover:bg-[#5e0f0f]"
              >
                ANALISIS BARU
              </Link>
            </div>
          </div>
        )}

        {!analysisId && <UploadPanel />}

        {analysisId && loading && <LoadingScreen message="Memuat hasil analisis..." />}

        {analysisId && !loading && error && (
          <div className="rounded-[4px] border border-[#fecaca] bg-[#fdf2f2] p-5">
            <h2 className="font-[family-name:var(--font-newsreader)] text-lg text-[#991b1b]">
              Gagal memuat analisis
            </h2>
            <p className="mt-1 font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">
              {error}
            </p>
            <Link
              href="/analyze"
              className="mt-3 inline-block font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#801313] underline"
            >
              Kembali ke upload
            </Link>
          </div>
        )}

        {analysisId && !loading && !error && result && (
          <AnalysisResultView result={result} />
        )}
      </div>
    </main>
  );
}

export default function AnalyzePage() {
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
        activePage="analyze"
      />
      <AuthGate>
        <Suspense fallback={<LoadingScreen message="Memuat halaman analisis..." />}>
          <AnalyzeContent />
        </Suspense>
      </AuthGate>
    </div>
  );
}
