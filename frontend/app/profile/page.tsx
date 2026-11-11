"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useAuth } from "@/components/auth-provider";

type ProfileUser = {
  id: string;
  username: string;
  email: string | null;
  password: string;
};

export default function ProfilePage() {
  const { isAuthenticated, loading, logout } = useAuth();
  const [me, setMe] = useState<ProfileUser | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/users/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("satusurvey_token")}` },
        });
        if (!res.ok) throw new Error("Failed to load profile");
        const json: ProfileUser = await res.json();
        if (mounted) setMe(json);
      } catch (e: unknown) {
        if (mounted) setFetchError(e instanceof Error ? e.message : "Failed to load profile");
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
        <Navbar showSearch={true} showProfile={true} activePage="profile" />
        <main className="flex-1">
          <div className="mx-auto max-w-[1280px] px-10 py-10 flex flex-col gap-6">
            <section className="flex flex-col gap-3 items-center justify-center min-h-[60vh]">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">AUTHENTICATION REQUIRED</div>
              <h1 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-4xl tracking-[-1px] leading-[40px]">Please log in</h1>
              <p className="font-[family-name:var(--font-source-sans-3)] text-base text-[#635d5c] leading-[26px]">You need an account to access your researcher profile.</p>
              <Link href="/profile" className="mt-4 bg-[#801313] text-white px-4 py-2.5 rounded-[2px] font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold">Go to Login</Link>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Navbar showSearch={true} showProfile={true} activePage="profile" />
      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-10 py-10 flex flex-col gap-6">
          <div className="flex items-center gap-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c] leading-4">
            <Link href="/" className="hover:text-[#1c1917]">Home</Link>
            <span className="text-[#635d5c]">/</span>
            <span className="text-[#1c1917]">Account</span>
          </div>

          {loading && (
            <section className="flex items-center justify-center min-h-[60vh]">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">Loading profile...</div>
            </section>
          )}

          {!loading && me && (
            <>
              <section className="flex flex-col gap-3">
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">GOVERNANCE / IDENTITY</div>
                <h1 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-5xl tracking-[-1.2px] leading-[48px]">Researcher Profile & Governance</h1>
                <p className="max-w-[768px] font-[family-name:var(--font-source-sans-3)] text-base text-[#635d5c] leading-[26px]">
                  Cryptographically signed identity for audit provenance. Manage disclosure posture, extraction defaults, and institutional affiliations used to annotate every analytical dossier.
                </p>
              </section>

              <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="h-1 bg-[#801313]"></div>
                <div className="p-6 flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 flex gap-4">
                    <div className="relative">
                      <div className="size-28 rounded-full bg-[#f3efe6] border border-[#e7e0d3] flex items-center justify-center">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="28" cy="24" r="10" stroke="#801313" strokeWidth="2" />
                          <path d="M12 48c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#801313" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <button className="absolute bottom-0 right-0 size-7 bg-[#801313] rounded-full flex items-center justify-center shadow-[0px_4px_6px_rgba(0,0,0,0.1)]">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.333 2.5H2.667A1.333 1.333 0 001.333 3.833v9.334A1.333 1.333 0 002.667 14.5h9.333a1.333 1.333 0 001.334-1.333V8.5M12.387 1.447a1.414 1.414 0 012 2l-7.333 7.334L4 11.167l.387-3.054 7.333-7.333z" stroke="#635d5c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-[28px] leading-7">{me.username}</h2>
                        <span className="bg-[rgba(255,218,214,0.2)] border border-[#801313] px-2 py-[2px] rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#801313] leading-[15px]">VERIFIED RESEARCHER</span>
                      </div>
                      <div className="font-[family-name:var(--font-source-sans-3)] text-lg text-[#635d5c] leading-6">Lead Forensic Statistician — National Statistics & Policy Observatory</div>
                      <div className="flex items-center gap-1.5 text-[#635d5c]">
                        <svg width="12.5" height="12.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.25 5.833c0 4.084-5.25 7-5.25 7s-5.25-2.916-5.25-7a5.25 5.25 0 0110.5 0z" stroke="#635d5c" strokeWidth="1.2" />
                          <circle cx="7" cy="5.833" r="1.75" stroke="#635d5c" strokeWidth="1.2" />
                        </svg>
                        <span className="font-[family-name:var(--font-source-sans-3)] text-sm leading-5">{me.email || "No email on file"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[384px] bg-[#faf7f2] border border-[#e7e0d3] rounded-[4px] p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-[0.6px] uppercase text-[#635d5c] leading-[18px]">USER ID</span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c] leading-[18px]">{me.id}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#e7e0d3]">
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#635d5c] leading-[16.5px]">SESSION</span>
                      <button onClick={logout} className="bg-[#f3efe6] border border-[#e7e0d3] px-2 py-[2px] rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#801313] leading-[16.5px]">Sign out</button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {!loading && fetchError && (
            <section className="flex items-center justify-center min-h-[60vh]">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#801313]">{fetchError}</div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
