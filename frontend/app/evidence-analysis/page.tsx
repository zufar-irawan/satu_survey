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
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" stroke="#006c4e" strokeWidth="1.5" />
      <path d="M6 8l1.5 1.5 3-3" stroke="#006c4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAlertTriangle() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.86 2.573L1.207 12.5A1.333 1.333 0 002.354 14.667h11.321a1.333 1.333 0 001.147-2.167L9.14 2.573a1.333 1.333 0 00-2.28 0z" stroke="#a16207" strokeWidth="1.5" />
      <path d="M8 6v2.667M8 11.333h.007" stroke="#a16207" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EvidenceAnalysisPage() {
  const claims = [
    { claim: "Indonesia's GDP growth reached 5.05% in 2024", confidence: 98, status: "VERIFIED", sources: 3 },
    { claim: "Unemployment rate declined to 4.91% in August 2024", confidence: 96, status: "VERIFIED", sources: 2 },
    { claim: "Poverty rate fell to 8.57% in March 2024", confidence: 87, status: "REVIEW", sources: 4 },
    { claim: "Inflation remained at 2.12% year-on-year in December 2024", confidence: 94, status: "VERIFIED", sources: 3 },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <header className="bg-[#fff8f5] border-b border-[#e0d8d5]">
        <div className="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <div className="font-[family-name:var(--font-newsreader)] font-bold text-[#1f1b1a] text-xl tracking-[-0.5px] leading-7">SatuSurvey</div>
              <div className="font-[family-name:var(--font-jetbrains-mono)] font-bold text-[#801313] text-[9px] tracking-[0.9px] uppercase leading-[9px]">AI EVIDENCE & FACT VERIFICATION</div>
            </div>
            <nav className="hidden md:flex items-center gap-6 flex-nowrap">
              <Link href="https://github.com/zufar-irawan/satu_survey" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Repository</Link>
              <Link href="/evidence-analysis" className="bg-[#801313] px-3 py-1.5 rounded-[2px] font-[family-name:var(--font-jetbrains-mono)] text-xs text-white font-bold leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">Analysis</Link>
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
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">EVIDENCE ANALYSIS</div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-4xl tracking-[-1px] leading-[40px]">Evidence Analysis Dashboard</h1>
            <p className="font-[family-name:var(--font-source-sans-3)] text-base text-[#635d5c] leading-[26px]">Claim-level verification, confidence scoring, and cross-reference mapping.</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-4">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c]">TOTAL CLAIMS</div>
              <div className="font-[family-name:var(--font-newsreader)] text-2xl text-[#1c1917] mt-1">42</div>
            </div>
            <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-4">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c]">VERIFIED</div>
              <div className="font-[family-name:var(--font-newsreader)] text-2xl text-[#006c4e] mt-1">38</div>
            </div>
            <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-4">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c]">NEEDS REVIEW</div>
              <div className="font-[family-name:var(--font-newsreader)] text-2xl text-[#a16207] mt-1">4</div>
            </div>
            <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-4">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c]">AVG CONFIDENCE</div>
              <div className="font-[family-name:var(--font-newsreader)] text-2xl text-[#1c1917] mt-1">94.2%</div>
            </div>
          </div>

          <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e7e0d3] flex items-center gap-2">
              <IconBarChart />
              <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-xl leading-6">Claim-Level Analysis</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e7e0d3]">
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c]">CLAIM</th>
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c]">CONFIDENCE</th>
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c]">STATUS</th>
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c]">SOURCES</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((item, idx) => (
                    <tr key={idx} className="border-b border-[#f3efe6] hover:bg-[#faf7f2]/50">
                      <td className="px-6 py-4 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">{item.claim}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-[#f3efe6] rounded-full overflow-hidden">
                            <div className="h-full bg-[#801313]" style={{ width: `${item.confidence}%` }}></div>
                          </div>
                          <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#1c1917]">{item.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-[2px] rounded-xl border text-[10px] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.5px] uppercase ${item.status === "VERIFIED" ? "bg-[rgba(0,108,78,0.08)] border-[#006c4e]/30 text-[#006c4e]" : "bg-[rgba(161,98,7,0.08)] border-[#a16207]/30 text-[#a16207]"}`}>
                          {item.status === "VERIFIED" ? <IconCheckCircle /> : <IconAlertTriangle />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#635d5c]">{item.sources} refs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
