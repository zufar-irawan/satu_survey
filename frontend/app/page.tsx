import Link from "next/link";

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.333" cy="7.333" r="4.667" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.667 10.667L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconBookOpen() {
  return (
    <svg width="13.33" height="13.33" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3.333h3.333A2.667 2.667 0 018 6v8.667a2 2 0 00-2-2H2V3.333zM14 3.333h-3.333A2.667 2.667 0 008 6v8.667a2 2 0 012-2h4V3.333z" stroke="#801313" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.333 1.667h5v5M8.333 1.667L1.667 8.333" stroke="#1c1917" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUpload() {
  return (
    <svg width="16.67" height="16.67" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2.5v10M5 7.5l5-5 5 5M3.333 12.5v2.917A1.667 1.667 0 005 17.083h10a1.667 1.667 0 001.667-1.666V12.5" stroke="#801313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg width="10.67" height="13.33" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.333 1.333H3A1.333 1.333 0 001.667 2.667v10.666A1.333 1.333 0 003 14.667h6a1.333 1.333 0 001.333-1.334V5.333L7.333 1.333z" stroke="#801313" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.333 1.333v4h4" stroke="#801313" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.333 2.917L3.75 7.5 1.667 5.417" stroke="#006c4e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="5.42" height="5.42" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.667 1.667h2.666v2.666M4.333 1.667L1.667 4.333" stroke="#1c1917" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="3.333" stroke="#801313" strokeWidth="1" />
      <circle cx="5" cy="5" r="0.833" stroke="#801313" strokeWidth="1" />
      <path d="M5 1.667V2.5M5 7.5v.833M1.667 5H2.5M7.5 5h.833" stroke="#801313" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="4.333" width="6" height="4.667" rx="0.667" stroke="#006c4e" strokeWidth="1" />
      <path d="M2.333 4.333V2.667a1.667 1.667 0 013.334 0v1.666" stroke="#006c4e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
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
              <Link href="/repository" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Repository</Link>
              <Link href="/evidence-analysis" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Analysis</Link>
              <Link href="/dossier" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Active Dossier</Link>
              <Link href="/repository" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Analyzed Reports</Link>
              <Link href="/" className="bg-[#801313] px-3 py-1.5 rounded-[2px] font-[family-name:var(--font-jetbrains-mono)] text-xs text-white font-bold leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">Ingest & Report</Link>
              <Link href="/profile" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Profile / Account Settings</Link>
            </nav>
          </div>
          <button className="bg-white/50 border border-[#d8c2be] rounded-xl size-8 flex items-center justify-center text-[#534341]">
            <IconSearch />
          </button>
        </div>
      </header>

      <main className="flex-1 bg-[#faf7f2]">
        <div className="mx-auto max-w-[896px] px-6 py-6 flex flex-col gap-5">
          <section className="flex flex-col items-center gap-1.5 text-center">
            <div className="bg-[rgba(255,218,214,0.2)] border border-[#801313] rounded-xl px-2.5 py-[3px] flex items-center gap-1.5">
              <IconTarget />
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">PDF REPORT INGESTION</span>
            </div>
            <h1 className="font-[family-name:var(--font-newsreader)] font-semibold text-[#1c1917] text-[30px] tracking-[-0.75px] leading-9">Upload Statistical Report</h1>
            <p className="max-w-[576px] font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-[21px]">
              Upload census publications, macroeconomic releases, or audit survey PDFs to initiate automated
              <br />
              evidence extraction, table parsing, and mathematical verification.
            </p>
          </section>

          <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="border-b border-[#e7e0d3] px-[17px] py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <IconBookOpen />
                <h2 className="font-[family-name:var(--font-newsreader)] font-semibold text-[#1c1917] text-sm leading-5">How to acquire official survey reports</h2>
              </div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c] leading-[15px]">3 SIMPLE STEPS</span>
            </div>
            <div className="p-[17px] grid grid-cols-1 md:grid-cols-3 gap-3">
              <article className="relative bg-[#f3efe6] border border-[rgba(231,224,211,0.6)] rounded-[4px] p-[13px] overflow-hidden">
                <div className="absolute right-[-10px] top-[20px] opacity-10 rotate-6">
                  <svg width="176" height="176" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="44" y="52" width="88" height="108" rx="6" stroke="#801313" strokeWidth="4" />
                    <path d="M68 76h40M68 92h40M68 108h24" stroke="#801313" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="relative flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#801313] text-white text-[10px] font-[family-name:var(--font-jetbrains-mono)] font-bold px-1.5 py-[2px] rounded-xl leading-[15px]">STEP 01</span>
                    <IconArrow />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-newsreader)] font-semibold text-[#1c1917] text-xs leading-4">Open Repository Website</h3>
                    <p className="font-[family-name:var(--font-source-sans-3)] text-[11px] text-[#635d5c] leading-[15.13px] mt-0.5">
                      Visit official public repositories offering empirical publications:
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      "Badan Pusat Statistik (BPS)",
                      "ICPSR Data Archive",
                      "Litbang Kompas",
                      "World Values Survey (WVS)",
                    ].map((item) => (
                      <a key={item} href="#" className="bg-white border border-[#e7e0d3] rounded-[2px] px-2 py-[5px] flex items-center justify-between hover:bg-[#faf7f2]">
                        <span className="font-[family-name:var(--font-source-sans-3)] font-semibold text-[11px] text-[#1c1917] leading-[16.5px]">{item}</span>
                        <IconArrow />
                      </a>
                    ))}
                  </div>
                </div>
              </article>

              <article className="relative bg-[#f3efe6] border border-[rgba(231,224,211,0.6)] rounded-[4px] p-[13px] overflow-hidden">
                <div className="absolute right-[-10px] top-[20px] opacity-10 -rotate-3">
                  <svg width="176" height="176" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="88" cy="88" r="40" stroke="#801313" strokeWidth="4" />
                    <path d="M88 68v20l12 12" stroke="#801313" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="relative flex flex-col gap-2 h-full">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#801313] text-white text-[10px] font-[family-name:var(--font-jetbrains-mono)] font-bold px-1.5 py-[2px] rounded-xl leading-[15px]">STEP 02</span>
                    <IconArrow />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-newsreader)] font-semibold text-[#1c1917] text-xs leading-4">Search for the Reports</h3>
                    <p className="font-[family-name:var(--font-source-sans-3)] text-[11px] text-[#635d5c] leading-[15.13px] mt-0.5">
                      Locate the specific survey edition, macroeconomic release, or census publication needed.
                    </p>
                  </div>
                  <div className="mt-auto bg-white border border-[#e7e0d3] rounded-[2px] p-2 flex gap-1.5">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.583 8.333a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM8.75 8.75L6.875 6.875" stroke="#635d5c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="font-[family-name:var(--font-source-sans-3)] text-[11px] text-[#635d5c] leading-[16.5px]">
                      Download unabridged full PDF with tabular statistical matrices for optimal verification.
                    </p>
                  </div>
                </div>
              </article>

              <article className="relative bg-[#f3efe6] border border-[rgba(231,224,211,0.6)] rounded-[4px] p-[13px] overflow-hidden">
                <div className="absolute right-[-10px] top-[20px] opacity-10 rotate-3">
                  <svg width="176" height="176" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="44" y="52" width="88" height="68" rx="6" stroke="#801313" strokeWidth="4" />
                    <path d="M72 100l16 16 16-16M88 116V84" stroke="#801313" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="relative flex flex-col gap-2 h-full">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#801313] text-white text-[10px] font-[family-name:var(--font-jetbrains-mono)] font-bold px-1.5 py-[2px] rounded-xl leading-[15px]">STEP 03</span>
                    <IconArrow />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-newsreader)] font-semibold text-[#1c1917] text-xs leading-4">Download & Upload Here</h3>
                    <p className="font-[family-name:var(--font-source-sans-3)] text-[11px] text-[#635d5c] leading-[15.13px] mt-0.5">
                      Save the official publication locally, then drop it into the upload target below.
                    </p>
                  </div>
                  <div className="mt-auto bg-white border border-[#e7e0d3] rounded-[2px] p-2 flex gap-1.5 items-center">
                    <IconLock />
                    <p className="font-[family-name:var(--font-source-sans-3)] font-medium text-[11px] text-[#006c4e] leading-[16.5px]">
                      Files parsed with cryptographic SHA-256 integrity verification.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="border-b border-[#e7e0d3] px-[17px] py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <IconFile />
                <h2 className="font-[family-name:var(--font-newsreader)] font-semibold text-[#1c1917] text-sm leading-5">PDF Document Dropper</h2>
              </div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#635d5c] leading-[16.5px]">Vector PDF • Max 50 MB</span>
            </div>
            <div className="p-[17px] flex flex-col gap-3.5">
              <div className="bg-[#f3efe6] border border-[#e7e0d3] border-dashed rounded-[4px] p-[21px] flex flex-col items-center gap-1.5 text-center">
                <div className="bg-[rgba(255,218,214,0.3)] rounded-xl size-10 flex items-center justify-center mb-1">
                  <IconUpload />
                </div>
                <h3 className="font-[family-name:var(--font-newsreader)] font-semibold text-[#1c1917] text-sm leading-5">Drag & drop your survey report PDF here</h3>
                <p className="font-[family-name:var(--font-source-sans-3)] text-xs text-[#635d5c] leading-4">Supports national statistics reports, census bulletins, and socio-economic survey data</p>
                <button className="mt-2 bg-white border border-[#801313] rounded-[4px] px-4 py-[7px] flex items-center gap-1.5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <svg width="12.54" height="9.33" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.667 9.333h6.666M8 2v7.333M2 4.667h.007M14 4.667h.007" stroke="#801313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold text-[#801313] leading-4">Browse Files</span>
                </button>
                <div className="mt-2 flex items-center gap-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#635d5c] leading-[16.5px]">
                  <span>Format: <span className="font-semibold text-[#1c1917]">PDF</span></span>
                  <span>•</span>
                  <span>File Limit: <span className="font-semibold text-[#1c1917]">Up to 50 MB</span></span>
                </div>
              </div>

              <div className="bg-[#f3efe6] border border-[#e7e0d3] rounded-[4px] p-[13px] flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold tracking-[0.55px] uppercase text-[#635d5c] leading-[16.5px]">STAGED FILE READY FOR VERIFICATION</span>
                  <div className="flex items-center gap-1">
                    <IconCheck />
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium text-[#006c4e] leading-[16.5px]">Checksum Validated</span>
                  </div>
                </div>
                <div className="bg-white border border-[#e7e0d3] rounded-[4px] p-[13px] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#fff8f5] border border-[#801313] rounded-[2px] w-8 h-10 flex flex-col items-center justify-center">
                      <IconFile />
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[8px] font-bold text-[#801313] leading-[8px]">PDF</span>
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-source-sans-3)] font-semibold text-[#1c1917] text-xs leading-4">Q3_Macroeconomic_Census_Report_2024.pdf</div>
                      <div className="flex items-center gap-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#635d5c] leading-[16.5px] mt-0.5">
                        <span>14.2 MB</span>
                        <span>•</span>
                        <span>48 Pages</span>
                        <span>•</span>
                        <span>Badan Pusat Statistik</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
