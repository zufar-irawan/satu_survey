"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import AuthGate, { LoadingScreen } from "@/components/auth-gate";
import StatusBadge from "@/components/status-badge";
import { useAnalyses } from "@/lib/hooks";

function AnalysisContent() {
  const { analyses, loading, error, refresh } = useAnalyses();

  const totals = analyses.reduce(
    (acc, item) => ({
      claims: acc.claims + item.summary.total_claims,
      valid: acc.valid + item.summary.valid,
      questionable: acc.questionable + item.summary.questionable,
      invalid: acc.invalid + item.summary.invalid,
      insufficient:
        acc.insufficient + item.summary.insufficient_evidence,
    }),
    { claims: 0, valid: 0, questionable: 0, invalid: 0, insufficient: 0 }
  );

  return (
    <main className="flex-1 bg-[#faf7f2] px-6 py-8">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-2 sm:px-6">
        <section className="flex flex-col gap-2">
          <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase leading-[16.5px] tracking-[0.55px] text-[#801313]">
            ANALYSIS OVERVIEW
          </div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-[family-name:var(--font-newsreader)] text-4xl leading-[40px] tracking-[-1px] text-[#1c1917]">
                Analysis Overview
              </h1>
              <p className="mt-1 font-[family-name:var(--font-source-sans-3)] text-base leading-[26px] text-[#635d5c]">
                Ringkasan seluruh laporan yang sudah dianalisis oleh akun ini.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => void refresh()}
                className="rounded-[2px] border border-[#d8c2be] bg-white px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#1c1917] hover:bg-[#faf7f2]"
              >
                MUAT ULANG
              </button>
              <Link
                href="/analyze"
                className="rounded-[2px] bg-[#801313] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-white hover:bg-[#5e0f0f]"
              >
                ANALISIS BARU
              </Link>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "TOTAL KLAIM", value: totals.claims, color: "text-[#1c1917]" },
            { label: "VALID", value: totals.valid, color: "text-[#006c4e]" },
            { label: "QUESTIONABLE", value: totals.questionable, color: "text-[#a16207]" },
            { label: "INVALID", value: totals.invalid, color: "text-[#801313]" },
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

        {error && (
          <div className="rounded-[4px] border border-[#fecaca] bg-[#fdf2f2] px-4 py-3 font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">
            {error}
          </div>
        )}

        <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between border-b border-[#e7e0d3] px-6 py-3">
            <h2 className="font-[family-name:var(--font-newsreader)] text-lg leading-6 text-[#1c1917]">
              Riwayat Analisis
            </h2>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#635d5c]">
              {analyses.length} laporan
            </span>
          </div>

          {loading ? (
            <LoadingScreen message="Memuat analisis..." />
          ) : analyses.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
                Belum ada laporan yang dianalisis.
              </p>
              <Link
                href="/analyze"
                className="rounded-[2px] bg-[#801313] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-white"
              >
                UNGGAH PDF PERTAMA
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#e7e0d3] bg-[#faf7f2]">
                    {[
                      "Laporan",
                      "Status",
                      "Klaim",
                      "Valid",
                      "Questionable",
                      "Invalid",
                      "Tanggal",
                      "",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-4 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] text-[#635d5c]"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {analyses.map((item) => (
                    <tr
                      key={item.analysis_id}
                      className="border-b border-[#f3efe6] hover:bg-[#faf7f2]/60"
                    >
                      <td className="max-w-[320px] px-4 py-3">
                        <div className="truncate font-[family-name:var(--font-source-sans-3)] text-sm font-semibold text-[#1c1917]">
                          {item.title}
                        </div>
                        <div className="truncate font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#a8a29e]">
                          {item.analysis_id}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#1c1917]">
                        {item.summary.total_claims}
                      </td>
                      <td className="px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#006c4e]">
                        {item.summary.valid}
                      </td>
                      <td className="px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#a16207]">
                        {item.summary.questionable}
                      </td>
                      <td className="px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#801313]">
                        {item.summary.invalid}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#635d5c]">
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/analyze?id=${encodeURIComponent(item.analysis_id)}`}
                          className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#801313] underline underline-offset-2"
                        >
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function AnalysisPage() {
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
        <AnalysisContent />
      </AuthGate>
    </div>
  );
}
