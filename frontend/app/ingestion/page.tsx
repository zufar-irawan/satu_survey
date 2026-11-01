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
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 1.5H4.5A1.5 1.5 0 003 3v12A1.5 1.5 0 004.5 16.5h9A1.5 1.5 0 0015 15V6L10.5 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 1.5v4.5H15M7.5 9h3M7.5 11.25h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUpload() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.75 11.25v2.25a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5v-2.25M12.75 6L9 2.25 5.25 6M9 2.25v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.333 4L6 11.333 2.667 8" stroke="#006c4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IngestionPage() {
  const steps = [
    { num: 1, title: "File Intake & Fingerprint", desc: "Root: 4e9a82f0...3c89b", status: "done" },
    { num: 2, title: "Provenance Metadata Tagging", desc: "Bibliographic & Geospatial", status: "done" },
    { num: 3, title: "Pre-Flight Validation Scan", desc: "MIME & Contract Checks", status: "inprogress" },
    { num: 4, title: "Agent Pipeline Dispatch", desc: "Normalization & QC", status: "pending" },
  ];

  const checks = [
    { title: "PDF Structure Validity", desc: "Vector-native text layer intact. Rasterized OCR fallback not required.", status: "pass" },
    { title: "Page Count & Size Limits", desc: "64 of 250 allocated pages utilized. Memory allocation 18.4 MB of 50 MB.", status: "pass" },
    { title: "Bibliographic Schema Check", desc: "Validating 8 required bibliographic tokens against ISO-19115 schema.", status: "warn" },
    { title: "File Integrity (SHA-256)", desc: "SHA-256 matches staging signature. No tampering detected.", status: "pass" },
    { title: "Provenance Contract", desc: "Awaiting user confirmation to dispatch worker containers.", status: "pending" },
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
              <Link href="/evidence-analysis" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Analysis</Link>
              <Link href="/dossier" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Active Dossier</Link>
              <Link href="/ingestion" className="bg-[#801313] px-3 py-1.5 rounded-[2px] font-[family-name:var(--font-jetbrains-mono)] text-xs text-white font-bold leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">Ingest & Report</Link>
              <Link href="/profile" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Profile / Account Settings</Link>
            </nav>
          </div>
          <button className="bg-white/50 border border-[#d8c2be] rounded-xl size-8 flex items-center justify-center text-[#534341]">
            <IconSearch />
          </button>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-6 py-8 flex flex-col gap-6">
          <section className="flex flex-col gap-2">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">DOCKET: SS-2024-ING-08842</div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-4xl tracking-[-1px] leading-[40px]">Document Ingestion & Provenance Audit</h1>
            <p className="font-[family-name:var(--font-source-sans-3)] text-base text-[#635d5c] leading-[26px]">Structured intake with cryptographic fingerprinting and zero-guesswork provenance tagging.</p>
          </section>

          <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step) => (
                <div key={step.num} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`size-6 rounded-full flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-xs ${step.status === "done" ? "bg-[#006c4e] text-white" : step.status === "inprogress" ? "bg-[#801313] text-white" : "bg-[#f3efe6] text-[#635d5c]"}`}>
                        {step.status === "done" ? <IconCheck /> : step.num}
                      </div>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">STEP {step.num}</span>
                    </div>
                    <span className={`px-2 py-[1px] rounded-xl text-[10px] font-[family-name:var(--font-jetbrains-mono)] uppercase ${step.status === "done" ? "bg-[rgba(0,108,78,0.08)] text-[#006c4e]" : step.status === "inprogress" ? "bg-[rgba(128,19,19,0.08)] text-[#801313]" : "bg-[#f3efe6] text-[#635d5c]"}`}>
                      {step.status === "done" ? "COMPLETE" : step.status === "inprogress" ? "IN PROGRESS" : "PENDING"}
                    </span>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">{step.title}</div>
                    <div className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">{step.desc}</div>
                  </div>
                  <div className="h-1 bg-[#f3efe6] rounded-full overflow-hidden">
                    <div className={`h-full ${step.status === "done" ? "w-full bg-[#006c4e]" : step.status === "inprogress" ? "w-2/3 bg-[#801313]" : "w-0"}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div className="flex flex-col gap-6">
              <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#e7e0d3] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconFileText />
                    <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-xl leading-6">Staged Dossier Artifact</h2>
                  </div>
                  <span className="bg-[#f3efe6] border border-[#e7e0d3] px-2 py-[2px] rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c] leading-[15px]">FINGERPRINTED</span>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-4 border border-[#e7e0d3] rounded-[4px]">
                    <div className="size-12 bg-[#f3efe6] border border-[#e7e0d3] rounded-[4px] flex items-center justify-center">
                      <IconFileText />
                    </div>
                    <div className="flex-1">
                      <div className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">2024_National_Macroeconomic_Survey.pdf</div>
                      <div className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">8.4 MB • 64 pages • application/pdf • SHA-256: 4e9a...3c89b</div>
                    </div>
                    <button className="border border-[#d8c2be] px-3 py-1.5 rounded-[2px] font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917]">Replace</button>
                  </div>
                  <div className="border-2 border-dashed border-[#d8c2be] rounded-[4px] p-8 flex flex-col items-center gap-3 text-center">
                    <div className="size-10 bg-[#f3efe6] rounded-full flex items-center justify-center">
                      <IconUpload />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-source-sans-3)] text-[#1c1917]">Drop files to upload or <span className="text-[#801313]">browse</span></div>
                      <div className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">PDF up to 250 pages, 50 MB</div>
                    </div>
                    <div className="flex items-center gap-2 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">
                      <span>HASH:</span>
                      <span>e3b0c44298fc1c149afbf4c8996fb924...</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#e7e0d3]">
                  <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-xl leading-6">Provenance & Bibliographic Metadata</h2>
                  <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5 mt-0.5">Rigorous tagging with zero-guesswork policy</p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c]">Source Title</label>
                    <input type="text" defaultValue="2024 National Macroeconomic & Labor Survey (Sakernas Wave II)" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:outline-none focus:border-[#801313]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c]">Issuing Authority</label>
                    <input type="text" defaultValue="Badan Pusat Statistik (BPS) Republik Indonesia" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:outline-none focus:border-[#801313]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c]">Publication Date</label>
                    <input type="text" defaultValue="11/15/2024" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:outline-none focus:border-[#801313]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c]">Temporal Scope</label>
                    <input type="text" defaultValue="Q1 2023 – Q3 2024 (Annualized Comparative)" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:outline-none focus:border-[#801313]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#635d5c]">Geospatial Coverage</label>
                    <input type="text" defaultValue="Indonesia (34 Provinces, 514 Regencies/Municipalities)" className="bg-white border border-[#d8c2be] rounded-[2px] px-4 py-2 font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] focus:outline-none focus:border-[#801313]" />
                  </div>
                </div>
              </section>
            </div>

            <div className="flex flex-col gap-6">
              <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#e7e0d3] flex items-center justify-between">
                  <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-xl leading-6">Real-time Validation Scan</h2>
                  <span className="bg-[rgba(128,19,19,0.08)] border border-[#801313]/30 px-2 py-[2px] rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#801313] leading-[15px]">SCANNING</span>
                </div>
                <div className="p-6 flex flex-col items-center gap-4">
                  <div className="relative size-24">
                    <svg className="size-24 -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3efe6" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#801313" strokeWidth="3" strokeDasharray="78, 100" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-[family-name:var(--font-newsreader)] text-xl text-[#1c1917]">78%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">Pre-Flight Validation in Progress</div>
                    <div className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c]">4 of 5 checks passed, 1 pending confirmation</div>
                  </div>
                </div>
                <div className="border-t border-[#e7e0d3] divide-y divide-[#f3efe6]">
                  {checks.map((check, idx) => (
                    <div key={idx} className="p-4 flex items-start gap-3">
                      <div className={`mt-0.5 size-5 rounded-full flex items-center justify-center ${check.status === "pass" ? "bg-[rgba(0,108,78,0.1)]" : check.status === "warn" ? "bg-[rgba(161,98,7,0.1)]" : "bg-[#f3efe6]"}`}>
                        {check.status === "pass" && <IconCheck />}
                        {check.status === "warn" && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 4v2M6 8h.01" stroke="#a16207" strokeWidth="1.2" strokeLinecap="round" /></svg>}
                        {check.status === "pending" && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="4" fill="#a8a29e" /></svg>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917] text-sm">{check.title}</span>
                          <span className={`text-[10px] font-[family-name:var(--font-jetbrains-mono)] uppercase ${check.status === "pass" ? "text-[#006c4e]" : check.status === "warn" ? "text-[#a16207]" : "text-[#a8a29e]"}`}>
                            {check.status === "pass" ? "PASS" : check.status === "warn" ? "WARN" : "PENDING"}
                          </span>
                        </div>
                        <p className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c] leading-4 mt-0.5">{check.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex flex-col gap-2">
                <button className="bg-[#801313] text-white px-4 py-3 rounded-[2px] flex items-center justify-center gap-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold">DISPATCH TO AGENT PIPELINE</span>
                </button>
                <button className="border border-[#d8c2be] bg-white px-4 py-3 rounded-[2px] flex items-center justify-center gap-2">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#1c1917]">SAVE PROVENANCE DRAFT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
