"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AnalysisResultView from "@/components/analysis-result";
import { ApiError, api, type AnalyzeResponse } from "@/lib/api";

function PublicHeader() {
  return (
    <header className="border-b border-[#e7e0d3] bg-white">
      <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-between gap-2 px-6 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-[family-name:var(--font-newsreader)] text-lg font-semibold text-[#1c1917]"
          >
            SatuSurvey
          </Link>
          <span className="rounded-xl border border-[#e7e0d3] bg-[#f3efe6] px-2 py-[2px] font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] text-[#635d5c]">
            Public Report
          </span>
        </div>
        <Link
          href="/"
          className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.5px] text-[#801313] hover:text-[#5e0f0f]"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </header>
  );
}

function ShareLoading({ message = "Memuat laporan..." }: { message?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e7e0d3] border-t-[#801313]" />
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">
          {message}
        </span>
      </div>
    </div>
  );
}

function InvalidLink() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-10">
      <div className="rounded-[4px] border border-[#e7e0d3] bg-white p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <h1 className="font-[family-name:var(--font-newsreader)] text-xl leading-7 text-[#1c1917]">
          Tautan tidak valid
        </h1>
        <p className="mt-2 font-[family-name:var(--font-source-sans-3)] text-sm leading-5 text-[#635d5c]">
          Tautan berbagi tidak ditemukan atau sudah dicabut oleh pemiliknya.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-[2px] bg-[#801313] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase text-white hover:bg-[#5e0f0f]"
        >
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}

function SharedAnalysisContent({ token }: { token: string }) {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await api.getSharedAnalysis(token);
        if (!cancelled) setResult(data);
      } catch (err) {
        if (cancelled) return;
        setResult(null);
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        } else {
          setError(
            err instanceof Error ? err.message : "Gagal memuat laporan"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) return <ShareLoading />;

  if (notFound) return <InvalidLink />;

  if (error || !result) {
    return (
      <div className="mx-auto max-w-[640px] px-6 py-10">
        <div className="rounded-[4px] border border-[#fecaca] bg-[#fdf2f2] p-6">
          <h1 className="font-[family-name:var(--font-newsreader)] text-xl leading-7 text-[#991b1b]">
            Gagal memuat laporan
          </h1>
          <p className="mt-2 font-[family-name:var(--font-source-sans-3)] text-sm leading-5 text-[#991b1b]">
            {error || "Laporan tidak tersedia."}
          </p>
          <Link
            href="/"
            className="mt-4 inline-block font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#801313] underline"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[960px] px-6 py-8">
      <AnalysisResultView result={result} />
    </div>
  );
}

function SharedAnalysisRoute() {
  const params = useParams<{ token: string }>();
  const token = params?.token;

  if (!token) return <InvalidLink />;

  return <SharedAnalysisContent key={token} token={token} />;
}

export default function SharedAnalysisPage() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
      }}
    >
      <PublicHeader />
      <main className="flex-1 bg-[#faf7f2]">
        <Suspense fallback={<ShareLoading />}>
          <SharedAnalysisRoute />
        </Suspense>
      </main>
    </div>
  );
}