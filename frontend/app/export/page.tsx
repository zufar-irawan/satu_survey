import Link from "next/link";

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.333" cy="7.333" r="4.667" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.667 10.667L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1.5v10.5M5.25 8.25L9 12l3.75-3.75M3 13.5v.75a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.5s6-3 6-7.5V3.75L9 1.5 3 3.75v5.25c0 4.5 6 7.5 6 7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ExportPage() {
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
              <Link href="https://github.com/zufar-irawan/satu_survey" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Repository</Link>
              <Link href="/analysis" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Analysis</Link>
              <Link href="/dossier" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Active Dossier</Link>
              <Link href="/repository" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Analyzed Reports</Link>
              <Link href="/ingestion" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Ingest & Report</Link>
              <Link href="/profile" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Profile / Account Settings</Link>
            </nav>
          </div>
          <button className="bg-white/50 border border-[#d8c2be] rounded-xl size-8 flex items-center justify-center text-[#534341]">
            <IconSearch />
          </button>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[1000px] px-6 py-8 flex flex-col gap-6">
          <section className="flex flex-col gap-2">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">DOSSIER EXPORT</div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-4xl tracking-[-1px] leading-[40px]">Dossier Export & Archival Delivery</h1>
            <p className="font-[family-name:var(--font-source-sans-3)] text-base text-[#635d5c] leading-[26px]">Generate immutable evidence packages with cryptographic attestation.</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e7e0d3]">
                <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-xl leading-6">Export Format</h2>
                <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] leading-5 mt-0.5">Select the package format for delivery</p>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <label className="flex items-start gap-3 p-4 border-2 border-[#801313] bg-[#fff8f5] rounded-[4px] cursor-pointer">
                  <input type="radio" name="format" defaultChecked className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">Forensic Evidence Package (Full)</span>
                      <span className="bg-[#f3efe6] px-2 py-[1px] rounded-xl text-[10px] font-[family-name:var(--font-jetbrains-mono)] uppercase text-[#635d5c]">RECOMMENDED</span>
                    </div>
                    <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] mt-1">JSON-LD, CSV with bounding boxes, PDF brief, and SHA-256 manifest</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border border-[#e7e0d3] rounded-[4px] cursor-pointer hover:bg-[#faf7f2]">
                  <input type="radio" name="format" className="mt-1" />
                  <div className="flex-1">
                    <span className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">Linked Data Package (RDF/JSON-LD)</span>
                    <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] mt-1">W3C structured records with full citation graph</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border border-[#e7e0d3] rounded-[4px] cursor-pointer hover:bg-[#faf7f2]">
                  <input type="radio" name="format" className="mt-1" />
                  <div className="flex-1">
                    <span className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">Tabular Evidence (CSV)</span>
                    <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] mt-1">Flattened metrics with source coordinates</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border border-[#e7e0d3] rounded-[4px] cursor-pointer hover:bg-[#faf7f2]">
                  <input type="radio" name="format" className="mt-1" />
                  <div className="flex-1">
                    <span className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">Citation Widget (Embed)</span>
                    <p className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#635d5c] mt-1">Verifiable citation snippet for publishing</p>
                  </div>
                </label>
              </div>
            </section>

            <div className="flex flex-col gap-4">
              <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#e7e0d3] flex items-center gap-2">
                  <IconShield />
                  <h3 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-lg leading-6">Artifact Manifest</h3>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div>
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c]">DOSSIER</div>
                    <div className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#1c1917] mt-1">RPT-2024-088B / National Digital Economy Survey 2024</div>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.5px] uppercase text-[#635d5c]">SHA-256 DIGEST</div>
                    <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#1c1917] mt-1 break-all">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b78b855</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div class="p-2 bg-[#faf7f2] border border-[#e7e0d3] rounded-[4px]">
                      <div class="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">FILES</div>
                      <div class="font-[family-name:var(--font-newsreader)] text-lg text-[#1c1917]">4</div>
                    </div>
                    <div class="p-2 bg-[#faf7f2] border border-[#e7e0d3] rounded-[4px]">
                      <div class="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase text-[#635d5c]">SIZE</div>
                      <div class="font-[family-name:var(--font-newsreader)] text-lg text-[#1c1917]">12.4 MB</div>
                    </div>
                  </div>
                </div>
              </section>

              <button className="bg-[#801313] text-white px-4 py-3 rounded-[2px] flex items-center justify-center gap-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <IconDownload />
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold">GENERATE & DOWNLOAD PACKAGE</span>
              </button>
              <button className="border border-[#d8c2be] bg-white px-4 py-3 rounded-[2px] flex items-center justify-center gap-2">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#1c1917]">COPY CITATION HANDLE</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
