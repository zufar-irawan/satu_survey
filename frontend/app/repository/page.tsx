"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import AuthGate, { LoadingScreen } from "@/components/auth-gate";
import StatusBadge from "@/components/status-badge";
import { useAnalyses } from "@/lib/hooks";

function RepositoryContent() {
  const { analyses, loading, error, refresh } = useAnalyses();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return analyses;
    return analyses.filter((item) =>
      `${item.title} ${item.filename || ""} ${item.analysis_id}`
        .toLowerCase()
        .includes(value)
    );
  }, [analyses, query]);

  const stats = useMemo(() => {
    const completed = analyses.filter((item) => item.status === "completed");
    const totalClaims = analyses.reduce(
      (sum, item) => sum + item.summary.total_claims,
      0
    );
    const valid = analyses.reduce((sum, item) => sum + item.summary.valid, 0);
    return {
      completed: completed.length,
      processing: analyses.filter((item) => item.status === "processing").length,
      failed: analyses.filter((item) => item.status === "failed").length,
      totalClaims,
      valid,
      confidence: totalClaims ? (valid / totalClaims) * 100 : 0,
    };
  }, [analyses]);

  return (
    <main className="flex-1 bg-[#faf7f2]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-8">
        <section className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase leading-[16.5px] tracking-[0.55px] text-[#801313]">
              ANALYZED REPORTS
            </div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-4xl leading-[40px] tracking-[-1px] text-[#1c1917]">
              Analyzed Reports Repository
            </h1>
            <p className="max-w-[720px] font-[family-name:var(--font-source-sans-3)] text-base leading-[26px] text-[#635d5c]">
              Arsip laporan yang dapat dibuka kembali, lengkap dengan status,
              jumlah klaim, dan tingkat dukungan evidence.
            </p>
          </div>
          <Link
            href="/analyze"
            className="flex items-center gap-2 rounded-[2px] bg-[#801313] px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold text-white hover:bg-[#5e0f0f]"
          >
            INGEST NEW REPORT
          </Link>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-4">
            <section className="flex flex-wrap items-center gap-3 rounded-[4px] border border-[#e7e0d3] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-[2px] border border-[#d8c2be] px-3 py-1.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.333" cy="7.333" r="4.667" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M10.667 10.667L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari judul, file, atau ID..."
                  className="flex-1 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none"
                />
              </div>
              <button
                onClick={() => void refresh()}
                className="rounded-[2px] border border-[#d8c2be] px-3 py-1.5 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] hover:bg-[#faf7f2]"
              >
                Muat ulang
              </button>
            </section>

            {error && (
              <div className="rounded-[4px] border border-[#fecaca] bg-[#fdf2f2] px-4 py-3 font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">
                {error}
              </div>
            )}

            {loading ? (
              <LoadingScreen message="Memuat repository..." />
            ) : filtered.length === 0 ? (
              <div className="rounded-[4px] border border-dashed border-[#e7e0d3] bg-white px-6 py-12 text-center">
                <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
                  {analyses.length
                    ? "Tidak ada laporan yang cocok."
                    : "Repository masih kosong."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((item) => {
                  const claims = item.summary.total_claims || 0;
                  const support = claims
                    ? (item.summary.valid / claims) * 100
                    : 0;
                  return (
                    <article
                      key={item.analysis_id}
                      className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                    >
                      <div className="flex flex-col gap-4 p-5">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-xl border border-[#e7e0d3] bg-[#f3efe6] px-2 py-[2px] font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] text-[#635d5c]">
                              {item.analysis_id.slice(0, 8)}
                            </span>
                            <StatusBadge status={item.status} />
                            <span className="rounded-xl border border-[#e7e0d3] bg-[#f3efe6] px-2 py-[2px] font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] text-[#635d5c]">
                              {claims} klaim
                            </span>
                          </div>
                          <Link
                            href={`/analyze?id=${encodeURIComponent(item.analysis_id)}`}
                            className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#801313] underline underline-offset-2"
                          >
                            Buka
                          </Link>
                        </div>

                        <div>
                          <h2 className="font-[family-name:var(--font-newsreader)] text-xl leading-6 text-[#1c1917]">
                            {item.title}
                          </h2>
                          <div className="mt-1 flex flex-wrap items-center gap-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
                            <span>{item.filename || "Tanpa nama file"}</span>
                            <span>•</span>
                            <span>
                              {new Date(item.created_at).toLocaleString("id-ID")}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-[4px] border border-[#e7e0d3] bg-[#faf7f2] p-3">
                          <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
                            Dukungan evidence (valid / total klaim)
                          </span>
                          <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#1c1917]">
                            {support.toFixed(1)}%
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-[4px] border border-[#e7e0d3] p-2">
                            <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#006c4e]">
                              {item.summary.valid}
                            </div>
                            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
                              Valid
                            </div>
                          </div>
                          <div className="rounded-[4px] border border-[#e7e0d3] p-2">
                            <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#a16207]">
                              {item.summary.questionable}
                            </div>
                            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
                              Review
                            </div>
                          </div>
                          <div className="rounded-[4px] border border-[#e7e0d3] p-2">
                            <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#801313]">
                              {item.summary.invalid}
                            </div>
                            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
                              Invalid
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="border-b border-[#e7e0d3] px-5 py-4">
                <h3 className="font-[family-name:var(--font-newsreader)] text-lg leading-6 text-[#1c1917]">
                  Repository Overview
                </h3>
                <p className="mt-0.5 font-[family-name:var(--font-source-sans-3)] text-sm leading-5 text-[#635d5c]">
                  Distribusi status pemrosesan
                </p>
              </div>
              <div className="flex flex-col gap-3 p-5">
                {[
                  { label: "Completed", value: stats.completed, color: "text-[#006c4e]" },
                  { label: "Processing", value: stats.processing, color: "text-[#a16207]" },
                  { label: "Failed", value: stats.failed, color: "text-[#801313]" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">
                      {item.label}
                    </span>
                    <span className={`font-[family-name:var(--font-jetbrains-mono)] text-sm ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="border-b border-[#e7e0d3] px-5 py-4">
                <h3 className="font-[family-name:var(--font-newsreader)] text-lg leading-6 text-[#1c1917]">
                  Crosscheck Confidence
                </h3>
                <p className="mt-0.5 font-[family-name:var(--font-source-sans-3)] text-sm leading-5 text-[#635d5c]">
                  Agregat klaim valid dari seluruh laporan
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 p-5">
                <div className="relative size-32">
                  <svg className="size-32 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f3efe6"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#801313"
                      strokeWidth="3"
                      strokeDasharray={`${stats.confidence}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-[family-name:var(--font-newsreader)] text-2xl text-[#1c1917]">
                      {stats.confidence.toFixed(0)}%
                    </span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#635d5c]">
                      CONFIDENCE
                    </span>
                  </div>
                </div>
                <div className="grid w-full grid-cols-3 gap-2 text-center">
                  <div className="rounded-[4px] border border-[#e7e0d3] p-2">
                    <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#1c1917]">
                      {stats.totalClaims}
                    </div>
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
                      Claims
                    </div>
                  </div>
                  <div className="rounded-[4px] border border-[#e7e0d3] p-2">
                    <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#1c1917]">
                      {analyses.length}
                    </div>
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
                      Reports
                    </div>
                  </div>
                  <div className="rounded-[4px] border border-[#e7e0d3] p-2">
                    <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#006c4e]">
                      {stats.valid}
                    </div>
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">
                      Valid
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function RepositoryPage() {
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
        activePage="repository"
      />
      <AuthGate>
        <RepositoryContent />
      </AuthGate>
    </div>
  );
}
