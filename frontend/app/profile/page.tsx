import Link from "next/link";
import Navbar from "../components/navbar";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Navbar showSearch={true} showProfile={true} showRepository={true} activePage="profile" />
      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-10 py-10 flex flex-col gap-6">
          <div className="flex items-center gap-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c] leading-4">
            <Link href="/" className="hover:text-[#1c1917]">Home</Link>
            <IconChevronRight />
            <span>Account</span>
            <IconChevronRight />
            <span className="text-[#1c1917]">Researcher Profile & Governance</span>
          </div>

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
                    <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-[28px] leading-7">Dr. Aris Thorne</h2>
                    <span className="bg-[rgba(255,218,214,0.2)] border border-[#801313] px-2 py-[2px] rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#801313] leading-[15px]">VERIFIED RESEARCHER</span>
                    <span className="bg-[#f3efe6] border border-[#e7e0d3] px-2 py-[2px] rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c] leading-[15px]">GOVERNANCE NODE</span>
                  </div>
                  <div className="font-[family-name:var(--font-source-sans-3)] text-lg text-[#635d5c] leading-6">Lead Forensic Statistician — National Statistics & Policy Observatory</div>
                  <div className="flex items-center gap-1.5 text-[#635d5c]">
                    <svg width="12.5" height="12.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.25 5.833c0 4.084-5.25 7-5.25 7s-5.25-2.916-5.25-7a5.25 5.25 0 0110.5 0z" stroke="#635d5c" strokeWidth="1.2" />
                      <circle cx="7" cy="5.833" r="1.75" stroke="#635d5c" strokeWidth="1.2" />
                    </svg>
                    <span className="font-[family-name:var(--font-source-sans-3)] text-sm leading-5">Jakarta Research District • Primary Lab: Census Microdata & Econometrics Unit</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-[384px] bg-[#faf7f2] border border-[#e7e0d3] rounded-[4px] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-[0.6px] uppercase text-[#635d5c] leading-[18px]">FORENSIC AUDIT INTEGRITY</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c] leading-[18px]">9/10</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`h-2 flex-1 rounded-sm ${i < 9 ? "bg-[#801313]" : "bg-[#d8c2be]"}`}></div>
                  ))}
                </div>
                <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5">Scored across 340 double-blind peer audits in 2024–2025.</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-[#e7e0d3] rounded-[4px] p-2">
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c] leading-[15px]">REPORTS ANALYZED</div>
                    <div className="font-[family-name:var(--font-newsreader)] text-[28px] text-[#1c1917] leading-[28px] mt-1">128</div>
                  </div>
                  <div className="bg-white border border-[#e7e0d3] rounded-[4px] p-2">
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c] leading-[15px]">EVIDENCE RECORDS</div>
                    <div className="font-[family-name:var(--font-newsreader)] text-[28px] text-[#1c1917] leading-[28px] mt-1">4,921</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#e7e0d3]">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#635d5c] leading-[16.5px]">KEY ROTATION DUE</span>
                  <span className="bg-[#f3efe6] border border-[#e7e0d3] px-2 py-[2px] rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#635d5c] leading-[16.5px]">Q4 2025</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-[690px_1fr] gap-6">
            <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e7e0d3] flex items-center justify-between">
                <div>
                  <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-xl leading-6">Profile Identity Form Block</h2>
                  <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5 mt-0.5">Core researcher credentials for dossier attribution</p>
                </div>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">SECTION 01 / 05</span>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">LEGAL FULL NAME</label>
                    <input type="text" defaultValue="Dr. Aris Thorne" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] leading-6 focus:outline-none focus:border-[#801313]" />
                    <span className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c] leading-4">Appears on analytical sign-offs</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">INSTITUTIONAL EMAIL</label>
                    <input type="email" defaultValue="aris.thorne@observatory.org" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] leading-6 focus:outline-none focus:border-[#801313]" />
                    <span className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c] leading-4">Used for cryptographic alerts</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">ORGANIZATION / PUBLISHER AFFILIATE</label>
                    <input type="text" defaultValue="National Statistics & Policy Observatory" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] leading-6 focus:outline-none focus:border-[#801313]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">DEPARTMENT / LAB NODE</label>
                    <input type="text" defaultValue="Census Microdata & Econometrics Unit" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] leading-6 focus:outline-none focus:border-[#801313]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">RESEARCH DOMAINS & FOCUS AREAS</label>
                  <input type="text" defaultValue="Macroeconomics, Census Stratification, Demographic Sampling, Survey Bias Detection" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] leading-6 focus:outline-none focus:border-[#801313]" />
                  <span className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c] leading-4">Comma-separated taxonomy tags for automated peer allocation</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">FORENSIC RESEARCH BIOGRAPHY</label>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#635d5c] leading-[16.5px]">0 / 500 CHARS</span>
                  </div>
                  <textarea defaultValue="Specialized in forensic replication of government census summaries and secondary microdata verification. Enforces strict provenance traceability using SHA-256 raw chunk matching and multi-round statistical divergence checks prior to publication release." className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] leading-6 h-28 focus:outline-none focus:border-[#801313] resize-none" />
                  <span className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c] leading-4">This declaration is prepended to all publicly published audit dossiers signed under your cryptographic key.</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}