import Link from "next/link";

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.333" cy="7.333" r="4.667" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.667 10.667L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconFileText() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 1.5H4.5A1.5 1.5 0 003 3v12A1.5 1.5 0 004.5 16.5h9A1.5 1.5 0 0015 15V6L10.5 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 1.5v4.5H15M6.75 9h4.5M6.75 11.25h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.333v7.334M4.667 6L8 9.333 11.333 6M2.667 11.333v1.334A1.333 1.333 0 004 14h8a1.333 1.333 0 001.333-1.333v-1.334" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="5.25" stroke="#006c4e" strokeWidth="1.2" />
      <path d="M5.25 7l1.167 1.167 2.916-2.917" stroke="#006c4e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAlertTriangle() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.01 2.43L1.058 10.5A1.167 1.167 0 002.068 12.25h9.864a1.167 1.167 0 001.01-1.75L7.99 2.43a1.167 1.167 0 00-1.98 0z" stroke="#a16207" strokeWidth="1.2" />
      <path d="M7 5.25v2.333M7 9.917h.006" stroke="#a16207" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 12.833s4.667-2.333 4.667-5.833V2.917L7 1.167 2.333 2.917v4.083C2.333 10.5 7 12.833 7 12.833z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RepositoryPage() {
  const reports = [
    {
      id: "RPT-2024-088B",
      title: "National Digital Economy Survey 2024",
      publisher: "Kementerian Komunikasi dan Informatika",
      period: "Jan 2024 - Dec 2024",
      status: "VERIFIED",
      facts: "128",
      provenance: "98%",
      note: "All required disclosure fields present; crosscheck complete across primary tables.",
    },
    {
      id: "RPT-2025-012A",
      title: "Renewable Energy Transition Forecast Q3",
      publisher: "Kementerian ESDM",
      period: "Jul 2025 - Sep 2025",
      status: "IN-REVIEW",
      facts: "84",
      provenance: "91%",
      note: "Methodology section references sampling frame v2.1; marginal confidence for regional aggregates.",
    },
    {
      id: "RPT-2024-064C",
      title: "Micro-Enterprise Financial Inclusion Survey",
      publisher: "OJK - Financial Services Authority",
      period: "Apr 2024 - Oct 2024",
      status: "FLAGGED",
      facts: "156",
      provenance: "76%",
      note: "Unresolved provenance gap on response rate derivation; requires manual audit before archival.",
    },
    {
      id: "RPT-2023-142D",
      title: "Healthcare Supply Chain Logistics Audit",
      publisher: "Kemenkes RI",
      period: "Jan 2023 - Dec 2023",
      status: "VERIFIED",
      facts: "212",
      provenance: "99%",
      note: "Complete chain-of-custody; all DOIs resolved and immutable snapshots present.",
    },
  ];

  const statusStyle = (s: string) => {
    if (s === "VERIFIED") return "bg-[rgba(0,108,78,0.08)] border-[#006c4e]/30 text-[#006c4e]";
    if (s === "IN-REVIEW") return "bg-[rgba(161,98,7,0.08)] border-[#a16207]/30 text-[#a16207]";
    return "bg-[rgba(128,19,19,0.08)] border-[#801313]/30 text-[#801313]";
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <header className="bg-[#fff8f5] border-b border-[#e0d8d5] relative z-50">
        <div className="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8 min-w-0">
            <Link href="/" className="flex flex-col shrink-0">
              <div className="font-[family-name:var(--font-newsreader)] font-bold text-[#1f1b1a] text-xl tracking-[-0.5px] leading-7">SatuSurvey</div>
              <div className="font-[family-name:var(--font-jetbrains-mono)] font-bold text-[#801313] text-[9px] tracking-[0.9px] uppercase leading-[9px]">AI EVIDENCE & FACT VERIFICATION</div>
            </Link>
            <nav className="hidden md:flex items-center gap-6 flex-nowrap min-w-0">
              <Link href="https://github.com/zufar-irawan/satu_survey" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4 whitespace-nowrap pointer-events-auto">Repository</Link>
              <Link href="/evidence-analysis" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4 whitespace-nowrap pointer-events-auto">Analysis</Link>
              <Link href="/dossier" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4 whitespace-nowrap pointer-events-auto">Active Dossier</Link>
              <Link href="/" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4 whitespace-nowrap pointer-events-auto">Ingest & Report</Link>
              <Link href="/profile" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4 whitespace-nowrap pointer-events-auto">Profile / Account Settings</Link>
            </nav>
          </div>
          <button className="bg-white/50 border border-[#d8c2be] rounded-xl size-8 flex items-center justify-center text-[#534341]">
            <IconSearch />
          </button>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-6 py-8 flex flex-col gap-6">
          <section className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">ANALYZED REPORTS</div>
              <h1 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-4xl tracking-[-1px] leading-[40px]">Analyzed Reports Repository</h1>
              <p className="max-w-[720px] font-[family-name:var(--font-source-sans-3)] text-base text-[#635d5c] leading-[26px]">
                Curated archive of verified, reviewed, and flagged dossiers with provenance completeness and evidence traceability.
              </p>
            </div>
            <button className="bg-[#801313] text-white px-4 py-2.5 rounded-[2px] flex items-center gap-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <IconFileText />
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold">INGEST NEW REPORT</span>
            </button>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
            <div className="flex flex-col gap-4">
              <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 border border-[#d8c2be] rounded-[2px] px-3 py-1.5 flex-1 min-w-[200px]">
                  <IconSearch />
                  <input type="text" placeholder="Search by report title, ID, or publisher..." className="flex-1 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none" />
                </div>
                <button className="border border-[#d8c2be] rounded-[2px] px-3 py-1.5 flex items-center gap-2 hover:bg-[#faf7f2]">
                  <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">Publisher</span>
                  <IconChevronDown />
                </button>
                <button className="border border-[#d8c2be] rounded-[2px] px-3 py-1.5 flex items-center gap-2 hover:bg-[#faf7f2]">
                  <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">Reporting Period</span>
                  <IconChevronDown />
                </button>
                <button className="border border-[#d8c2be] rounded-[2px] px-3 py-1.5 flex items-center gap-2 hover:bg-[#faf7f2]">
                  <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">Status</span>
                  <IconChevronDown />
                </button>
                <button className="border border-[#d8c2be] rounded-[2px] px-3 py-1.5 flex items-center gap-2 hover:bg-[#faf7f2]">
                  <IconFilter />
                  <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">Filters</span>
                </button>
              </section>

              <div className="flex flex-col gap-3">
                {reports.map((report) => (
                  <article key={report.id} className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="p-5 flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-[#f3efe6] border border-[#e7e0d3] px-2 py-[2px] rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c] leading-[15px]">{report.id}</span>
                          <span className={`inline-flex items-center gap-1.5 px-2 py-[2px] rounded-xl border text-[10px] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.5px] uppercase leading-[15px] ${statusStyle(report.status)}`}>
                            {report.status === "VERIFIED" && <IconCheckCircle />}
                            {report.status === "IN-REVIEW" && <IconAlertTriangle />}
                            {report.status === "FLAGGED" && <IconShield />}
                            {report.status}
                          </span>
                          <span className="bg-[#f3efe6] border border-[#e7e0d3] px-2 py-[2px] rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c] leading-[15px]">Facts: {report.facts}</span>
                        </div>
                        <button className="flex items-center gap-1.5 text-[#635d5c] hover:text-[#1c1917]">
                          <IconDownload />
                          <span className="font-[family-name:var(--font-source-sans-3)] text-sm">Export</span>
                        </button>
                      </div>
                      <div>
                        <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-xl leading-6 mb-1">{report.title}</h2>
                        <div className="flex items-center gap-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">
                          <span>{report.publisher}</span>
                          <span>•</span>
                          <span>{report.period}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#faf7f2] border border-[#e7e0d3] rounded-[4px]">
                        <div className="flex items-center gap-2">
                          <IconShield />
                          <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">Provenance Completeness</span>
                        </div>
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#1c1917]">{report.provenance}</span>
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-white border border-[#e7e0d3] rounded-[4px]">
                        <IconAlertTriangle />
                        <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5">{report.note}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#e7e0d3]">
                  <h3 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-lg leading-6">Repository Overview</h3>
                  <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5 mt-0.5">Verification status distribution</p>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">Verified</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#006c4e]">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">In Review</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#a16207]">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">Flagged</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#801313]">1</span>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#e7e0d3]">
                  <h3 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-lg leading-6">Crosscheck Confidence</h3>
                  <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5 mt-0.5">Aggregate verification score</p>
                </div>
                <div className="p-5 flex flex-col items-center gap-4">
                  <div className="relative size-32">
                    <svg className="size-32 -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3efe6" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#801313" strokeWidth="3" strokeDasharray="91, 100" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-[family-name:var(--font-newsreader)] text-2xl text-[#1c1917]">91%</span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase text-[#635d5c]">CONFIDENCE</span>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 border border-[#e7e0d3] rounded-[4px]">
                      <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#1c1917]">580</div>
                      <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">Facts</div>
                    </div>
                    <div className="p-2 border border-[#e7e0d3] rounded-[4px]">
                      <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#1c1917]">4</div>
                      <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">Reports</div>
                    </div>
                    <div className="p-2 border border-[#e7e0d3] rounded-[4px]">
                      <div className="font-[family-name:var(--font-newsreader)] text-lg text-[#006c4e]">3</div>
                      <div className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">Pass</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
