import Link from "next/link";

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.333" cy="7.333" r="4.667" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.667 10.667L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 15V7.5M7.5 15V3M12 15V10.5M16.5 15V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6.75" stroke="#006c4e" strokeWidth="1.5" />
      <path d="M6.75 9l1.5 1.5 3.75-3.75" stroke="#006c4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAlertTriangle() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.727 3.127L1.359 14.25A1.5 1.5 0 002.632 16.5h12.736a1.5 1.5 0 001.273-2.25L10.273 3.127a1.5 1.5 0 00-2.546 0z" stroke="#a16207" strokeWidth="1.5" />
      <path d="M9 6.75v3M9 12.75h.008" stroke="#a16207" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconXCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6.75" stroke="#801313" strokeWidth="1.5" />
      <path d="M11.25 6.75l-4.5 4.5M6.75 6.75l4.5 4.5" stroke="#801313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AnalysisPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <header className="bg-[#fff8f5] border-b border-[#e0d8d5]">
        <div className="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <div className="font-[family-name:var(--font-newsreader)] font-bold text-[#1f1b1a] text-xl tracking-[-0.5px] leading-7">SatuSurvey</div>
              <div className="font-[family-name:var(--font-jetbrains-mono)] font-bold text-[#801313] text-[9px] tracking-[0.9px] uppercase leading-[9px]">AI EVIDENCE & FACT VERIFICATION</div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="https://github.com/zufar-irawan/satu_survey" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Repository</Link>
              <Link href="/analysis" className="bg-[#801313] px-3 py-1.5 rounded-[2px] font-[family-name:var(--font-jetbrains-mono)] text-xs text-white font-bold leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">Analysis</Link>
              <Link href="/dossier" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Active Dossier</Link>
              <Link href="/" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Ingest & Report</Link>
              <Link href="/profile" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Profile / Account Settings</Link>
            </nav>
          </div>
          <button className="bg-white/50 border border-[#d8c2be] rounded-xl size-8 flex items-center justify-center text-[#534341]">
            <IconSearch />
          </button>
        </div>
      </header>

      <main className="flex-1 bg-[#faf7f2]">
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
              <IconCheckCircle />
            </div>
            <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-5 flex items-center justify-between">
              <div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">NEEDS REVIEW</div>
                <div className="font-[family-name:var(--font-newsreader)] text-3xl text-[#1c1917] leading-9 mt-1">1</div>
              </div>
              <IconAlertTriangle />
            </div>
            <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-5 flex items-center justify-between">
              <div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">FLAGGED</div>
                <div className="font-[family-name:var(--font-newsreader)] text-3xl text-[#1c1917] leading-9 mt-1">1</div>
              </div>
              <IconXCircle />
            </div>
          </div>

          <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e7e0d3] flex items-center gap-2">
              <IconBarChart />
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
