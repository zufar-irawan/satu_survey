import Link from "next/link";
import Navbar from "../components/navbar";

export default function AnalysisPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Navbar showSearch={true} showProfile={true} showRepository={true} activePage="analysis" />
      <main className="flex-1 bg-[#faf7f2] px-6 py-8">
        <div className="mx-auto max-w-[1100px] px-6 py-8 flex flex-col gap-6">
          <section className="flex flex-col gap-2">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">FORENSIC ANALYSIS</div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-4xl tracking-[-1px] leading-[40px]">Analysis Overview</h1>
            <p className="font-[family-name:var(--font-source-sans-3)] text-base text-[#635d5c] leading-[26px]">Rule engine results, disclosure checks, and evidence grounding across processed dossiers.</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-5 flex items-center justify-between">
              <div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">VERIFIED</div>
                <div className="font-[family-name:var(--font-newsreader)] text-3xl text-[#1c1917] leading-9 mt-1">2</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="6.75" stroke="#006c4e" strokeWidth="1.5" />
                <path d="M6.75 9l1.5 1.5 3.75-3.75" stroke="#006c4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-5 flex items-center justify-between">
              <div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">NEEDS REVIEW</div>
                <div className="font-[family-name:var(--font-newsreader)] text-3xl text-[#1c1917] leading-9 mt-1">1</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.727 3.127L1.359 14.25A1.5 1.5 0 002.632 16.5h12.736a1.5 1.5 0 001.273-2.25L10.273 3.127a1.5 1.5 0 00-2.546 0z" stroke="#a16207" strokeWidth="1.5" />
                <path d="M9 6.75v3M9 12.75h.008" stroke="#a16207" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-5 flex items-center justify-between">
              <div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">FLAGGED</div>
                <div className="font-[family-name:var(--font-newsreader)] text-3xl text-[#1c1917] leading-9 mt-1">1</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="6.75" stroke="#801313" strokeWidth="1.5" />
                <path d="M11.25 6.75l-4.5 4.5M6.75 6.75l4.5 4.5" stroke="#801313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e7e0d3] flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 15V7.5M7.5 15V3M12 15V10.5M16.5 15V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-xl leading-6">Rule Engine Summary</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#e7e0d3] rounded-[4px] p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">R1 — Margin of Error</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#006c4e]">PASS</span>
                </div>
                <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5">Claim consistent with SRS calculation assumptions.</p>
              </div>
              <div className="border border-[#e7e0d3] rounded-[4px] p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">R2 — Disclosure Checklist</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#a16207]">WARN</span>
                </div>
                <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5">5–7 of 9 disclosure items found in document.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}