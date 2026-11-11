"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import AuthGate, { LoadingScreen } from "@/components/auth-gate";
import StatusBadge from "@/components/status-badge";
import { useAnalyses } from "@/lib/hooks";

function DossierContent() {
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

  return (
    <main className="flex-1 bg-[#faf7f2] px-6 py-8">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-6 px-2 sm:px-6">
        <section className="flex flex-col gap-2">
          <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase leading-[16.5px] tracking-[0.55px] text-[#801313]">
            DOSSIER ARCHIVE
          </div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-[family-name:var(--font-newsreader)] text-4xl leading-[40px] tracking-[-1px] text-[#1c1917]">
                Active Dossiers
              </h1>
              <p className="mt-1 font-[family-name:var(--font-source-sans-3)] text-base leading-[26px] text-[#635d5c]">
                Arsip laporan yang sudah diunggah beserta status pemrosesan dan
                jumlah klaim yang dievaluasi.
              </p>
            </div>
            <Link
              href="/analyze"
              className="rounded-[2px] bg-[#801313] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-white hover:bg-[#5e0f0f]"
            >
              UNGGAH DOSSIER BARU
            </Link>
          </div>
        </section>

        <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7e0d3] px-6 py-3">
            <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
              {filtered.length} dossier
            </span>
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari judul, file, atau ID..."
                className="w-[240px] rounded-[2px] border border-[#d8c2be] px-3 py-1.5 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:border-[#801313] focus:outline-none"
              />
              <button
                onClick={() => void refresh()}
                className="rounded-[2px] border border-[#d8c2be] px-3 py-1.5 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] hover:bg-[#faf7f2]"
              >
                Muat ulang
              </button>
            </div>
          </div>

          {error && (
            <div className="border-b border-[#fecaca] bg-[#fdf2f2] px-6 py-3 font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">
              {error}
            </div>
          )}

          {loading ? (
            <LoadingScreen message="Memuat dossier..." />
          ) : filtered.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
                {analyses.length === 0
                  ? "Belum ada dossier. Unggah laporan PDF untuk membuat dossier pertama."
                  : "Tidak ada dossier yang cocok dengan pencarian."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e7e0d3]">
                    {[
                      "DOSSIER ID",
                      "REPORT",
                      "FILE",
                      "STATUS",
                      "DATE",
                      "CLAIMS / VALID",
                      "ACTIONS",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-6 py-2.5 text-left font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase leading-[16.5px] tracking-[0.55px] text-[#635d5c]"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr
                      key={item.analysis_id}
                      className="border-b border-[#f3efe6] hover:bg-[#faf7f2]/50"
                    >
                      <td className="px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#801313]">
                        {item.analysis_id.slice(0, 13)}…
                      </td>
                      <td className="max-w-[260px] px-6 py-4 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">
                        <span className="line-clamp-2">{item.title}</span>
                      </td>
                      <td className="max-w-[180px] truncate px-6 py-4 font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c]">
                        {item.filename || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">
                        {item.summary.total_claims} /{" "}
                        <span className="text-[#006c4e]">{item.summary.valid}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/analyze?id=${encodeURIComponent(item.analysis_id)}`}
                          className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#801313] underline underline-offset-2"
                        >
                          View
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

export default function DossierPage() {
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
        activePage="dossier"
      />
      <AuthGate>
        <DossierContent />
      </AuthGate>
    </div>
  );
}
