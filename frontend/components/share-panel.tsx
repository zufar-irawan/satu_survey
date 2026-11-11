"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";

export default function SharePanel({ analysisId }: { analysisId: string }) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchLink = useCallback(async () => {
    try {
      const response = await api.shareAnalysis(analysisId);
      const url = `${window.location.origin}/share/${response.share_token}`;
      setShareUrl(url);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal membuat tautan berbagi"
      );
      setShareUrl(null);
    } finally {
      setLoading(false);
    }
  }, [analysisId]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await api.shareAnalysis(analysisId);
        if (cancelled) return;
        const url = `${window.location.origin}/share/${response.share_token}`;
        setShareUrl(url);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Gagal membuat tautan berbagi"
        );
        setShareUrl(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [analysisId]);

  const createLink = () => {
    setLoading(true);
    setError(null);
    setNotice(null);
    setCopied(false);
    void fetchLink();
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    setNotice(null);
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API tidak tersedia");
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
      inputRef.current?.focus();
      inputRef.current?.select();
      setNotice(
        "Penyalinan otomatis gagal. URL sudah dipilih, salin secara manual."
      );
    }
  };

  const handleRevoke = async () => {
    setRevoking(true);
    setError(null);
    setNotice(null);
    setCopied(false);
    try {
      await api.unshareAnalysis(analysisId);
      setShareUrl(null);
      setNotice("Tautan berbagi telah dicabut.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mencabut tautan");
    } finally {
      setRevoking(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between border-b border-[#e7e0d3] px-4 py-2.5">
        <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.55px] text-[#801313]">
          Tautan Berbagi
        </h2>
        {shareUrl && (
          <button
            type="button"
            onClick={() => void handleRevoke()}
            disabled={revoking}
            className="rounded-[2px] border border-[#d8c2be] bg-white px-2.5 py-1 font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] text-[#801313] hover:bg-[#faf7f2] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {revoking ? "Mencabut..." : "Cabut tautan"}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5 p-4">
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#e7e0d3] border-t-[#801313]" />
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#635d5c]">
              MEMBUAT TAUTAN...
            </span>
          </div>
        ) : shareUrl ? (
          <>
            <p className="font-[family-name:var(--font-source-sans-3)] text-xs leading-4 text-[#635d5c]">
              Siapa pun dengan tautan ini dapat melihat hasil analisis tanpa
              masuk. Tautan hanya menampilkan hasil, bukan informasi akun atau
              berkas.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                ref={inputRef}
                readOnly
                value={shareUrl}
                onFocus={(event) => event.currentTarget.select()}
                className="min-w-0 flex-1 rounded-[2px] border border-[#d8c2be] bg-[#faf7f2] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#1c1917] focus:border-[#801313] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => void handleCopy()}
                className="rounded-[2px] bg-[#801313] px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-[0.4px] text-white hover:bg-[#5e0f0f]"
              >
                {copied ? "Tersalin" : "Salin URL"}
              </button>
            </div>
          </>
        ) : (
          !error && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c]">
                Tautan berbagi tidak aktif.
              </span>
              <button
                type="button"
                onClick={() => void createLink()}
                className="rounded-[2px] border border-[#d8c2be] bg-white px-2.5 py-1 font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] text-[#801313] hover:bg-[#faf7f2]"
              >
                Buat tautan baru
              </button>
            </div>
          )
        )}

        {notice && (
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] leading-4 text-[#635d5c]">
            {notice}
          </p>
        )}
        {error && (
          <p className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#991b1b]">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}