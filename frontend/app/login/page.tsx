"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { useAuth } from "@/components/auth-provider";

function safeNextPath(value: string | null): string {
  if (!value) return "/analyze";
  if (!value.startsWith("/") || value.startsWith("//")) return "/analyze";
  return value;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, register, loading, isAuthenticated } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [nextPath, setNextPath] = useState("/analyze");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("next");
    setNextPath(safeNextPath(requested));
  }, []);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(nextPath);
    }
  }, [isAuthenticated, loading, nextPath, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "login") {
        await login(username.trim(), password);
      } else {
        await register(username.trim(), email.trim() || undefined, password);
        await login(username.trim(), password);
      }
      router.replace(nextPath);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Operasi gagal");
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
      }}
    >
      <Navbar showSearch={false} showProfile={false} activePage="profile" />
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-[440px]">
          <section className="overflow-hidden rounded-[4px] border border-[#e7e0d3] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2 border-b border-[#e7e0d3] px-6 py-4">
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
              <h2 className="font-[family-name:var(--font-newsreader)] text-xl leading-6 text-[#1c1917]">
                {mode === "login" ? "Masuk ke Akun" : "Daftar Akun Baru"}
              </h2>
            </div>
            <div className="flex flex-col gap-4 p-6">
              {error && (
                <div className="rounded-[2px] border border-[#fecaca] bg-[#fdf2f2] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-[11px] text-[#991b1b]">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.55px] text-[#635d5c]">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-[2px] border border-[#d8c2be] bg-white px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:border-[#801313] focus:outline-none"
                  />
                </div>
                {mode === "register" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.55px] text-[#635d5c]">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-[2px] border border-[#d8c2be] bg-white px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:border-[#801313] focus:outline-none"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.55px] text-[#635d5c]">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-[2px] border border-[#d8c2be] bg-white px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:border-[#801313] focus:outline-none"
                  />
                  {mode === "register" && (
                    <span className="font-[family-name:var(--font-source-sans-3)] text-[11px] text-[#a8a29e]">
                      Minimal 6 karakter.
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`rounded-[2px] bg-[#801313] px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold text-white ${
                    loading
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-[#5e0f0f]"
                  }`}
                >
                  {loading
                    ? "Memproses..."
                    : mode === "login"
                      ? "Masuk"
                      : "Daftar & Masuk"}
                </button>
              </form>
              <div className="flex items-center justify-between border-t border-[#e7e0d3] pt-2">
                <span className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c]">
                  {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "register" : "login");
                    setError(null);
                  }}
                  className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#801313] underline underline-offset-2"
                >
                  {mode === "login" ? "Daftar di sini" : "Masuk di sini"}
                </button>
              </div>
              <div className="mt-2 text-center">
                <Link
                  href="/"
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#635d5c] hover:text-[#1c1917]"
                >
                  ← Kembali ke Beranda
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
