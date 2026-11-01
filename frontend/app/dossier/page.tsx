import Link from "next/link";

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.333" cy="7.333" r="4.667" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.667 10.667L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg width="14" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1.5H4A1.5 1.5 0 002.5 3v12A1.5 1.5 0 004 16.5h8a1.5 1.5 0 001.5-1.5V6L10 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 1.5v4.5h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFilter() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.667 2H1.333l5.334 6.307V12.667L9.333 14V8.307L14.667 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1.75v7M3.5 5.25l3.5 3.5 3.5-3.5M2.333 10.5v.583a1.167 1.167 0 001.167 1.167h7a1.167 1.167 0 001.167-1.167V10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.167 7s2.333-4.083 5.833-4.083S12.833 7 12.833 7s-2.333 4.083-5.833 4.083S1.167 7 1.167 7z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="1.75" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function DossierPage() {
  const items = [
    { id: "DOS-2026-08-01", title: "Q3 Macroeconomic Census Report 2024", org: "Badan Pusat Statistik", status: "VERIFIED", date: "2026-08-01", pages: 48, records: 12 },
    { id: "DOS-2026-07-24", title: "Public Service Satisfaction Survey 2025", org: "Litbang Kompas", status: "REVIEW", date: "2026-07-24", pages: 36, records: 8 },
    { id: "DOS-2026-07-12", title: "Poverty & Welfare Indicators Q2 2025", org: "Badan Pusat Statistik", status: "VERIFIED", date: "2026-07-12", pages: 42, records: 15 },
    { id: "DOS-2026-06-28", title: "Demographic Transition Survey 2024", org: "ICPSR Data Archive", status: "FLAGGED", date: "2026-06-28", pages: 64, records: 19 },
  ];

  const statusStyle = (s: string) => {
    if (s === "VERIFIED") return "bg-[rgba(0,108,78,0.08)] border-[#006c4e]/30 text-[#006c4e]";
    if (s === "REVIEW") return "bg-[rgba(161,98,7,0.08)] border-[#a16207]/30 text-[#a16207]";
    return "bg-[rgba(128,19,19,0.08)] border-[#801313]/30 text-[#801313]";
  };

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
              <Link href="/evidence-analysis" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Analysis</Link>
              <Link href="/dossier" className="bg-[#801313] px-3 py-1.5 rounded-[2px] font-[family-name:var(--font-jetbrains-mono)] text-xs text-white font-bold leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">Active Dossier</Link>
              <Link href="/repository" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Analyzed Reports</Link>
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
        <div className="mx-auto max-w-[1152px] px-6 py-8 flex flex-col gap-6">
          <section className="flex flex-col gap-2">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">DOSSIER ARCHIVE</div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-4xl tracking-[-1px] leading-[40px]">Active Dossiers</h1>
            <p className="font-[family-name:var(--font-source-sans-3)] text-base text-[#635d5c] leading-[26px]">Forensic audit trail of uploaded reports with verification status and evidence traceability.</p>
          </section>

          <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-6 py-3 border-b border-[#e7e0d3] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#635d5c]">
                <IconFile />
                <span className="font-[family-name:var(--font-source-sans-3)] text-sm">4 dossiers</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="border border-[#d8c2be] rounded-[2px] px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#faf7f2]">
                  <IconFilter />
                  <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">Filter</span>
                </button>
                <button className="border border-[#d8c2be] rounded-[2px] px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#faf7f2]">
                  <IconDownload />
                  <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">Export</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e7e0d3]">
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">DOSSIER ID</th>
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">REPORT</th>
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">ORGANIZATION</th>
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">STATUS</th>
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">DATE</th>
                    <th className="text-left px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">PAGES / RECORDS</th>
                    <th className="text-right px-6 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-[#f3efe6] hover:bg-[#faf7f2]/50">
                      <td className="px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#801313] leading-5">{item.id}</td>
                      <td className="px-6 py-4 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] leading-5">{item.title}</td>
                      <td className="px-6 py-4 font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5">{item.org}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-[2px] rounded-xl border text-[11px] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.5px] uppercase leading-[16.5px] ${statusStyle(item.status)}`}>{item.status}</span>
                      </td>
                      <td className="px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#635d5c] leading-5">{item.date}</td>
                      <td className="px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#635d5c] leading-5">{item.pages} / {item.records}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center gap-1.5 text-[#635d5c] hover:text-[#1c1917]">
                          <IconEye />
                          <span className="font-[family-name:var(--font-source-sans-3)] text-sm">View</span>
                        </button>
                      </td>
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
