import Link from "next/link";
import Navbar from "../components/navbar";

export default function PipelinePage() {
  const logs = [
    { time: "14:23:18", level: "INFO", msg: "Worker container spawned: ingestion-extract-04" },
    { time: "14:23:19", level: "INFO", msg: "PDF text extraction started (64 pages)" },
    { time: "14:23:24", level: "INFO", msg: "OCR bypass: vector text detected, using native layer" },
    { time: "14:23:28", level: "INFO", msg: "Table structure recognition complete (12 tables)" },
    { time: "14:23:31", level: "WARN", msg: "Column alignment ambiguity detected at page 42, table 3" },
    { time: "14:23:35", level: "ERROR", msg: "QC validation failed: missing sampling frame reference in section 3.2" },
    { time: "14:23:36", level: "INFO", msg: "Retrying with fallback parser on affected sections" },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 247, 242) 0%, rgb(250, 247, 242) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Navbar showSearch={true} showProfile={true} showRepository={true} activePage="pipeline" />
      <main className="flex-1 bg-[#faf7f2]">
        <div className="mx-auto max-w-[1100px] px-6 py-8 flex flex-col gap-6">
          <section className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.55px] uppercase text-[#801313] leading-[16.5px]">PIPELINE EXECUTION</div>
              <h1 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-4xl tracking-[-1px] leading-[40px]">Live Synchronous Pipeline</h1>
              <p className="font-[family-name:var(--font-source-sans-3)] text-base text-[#635d5c] leading-[26px]">Real-time monitoring with QC checkpoints and failure remediation.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(128,19,19,0.08)] border border-[#801313]/30 rounded-[2px]">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="6.75" stroke="#801313" strokeWidth="1.5" />
                <path d="M9 6v3M9 12h.0075" stroke="#801313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#801313]">QC FAILURE DETECTED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-4 flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="6.75" stroke="#006c4e" strokeWidth="1.5" />
                  <path d="M6.75 9l1.5 1.5 3.75-3.75" stroke="#006c4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">Extraction</div>
                  <div className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#006c4e]">Complete</div>
                </div>
              </div>
              <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-4 flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="6.75" stroke="#006c4e" strokeWidth="1.5" />
                  <path d="M6.75 9l1.5 1.5 3.75-3.75" stroke="#006c4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">Normalization</div>
                  <div className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#006c4e]">Complete</div>
                </div>
              </div>
              <div className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-4 flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="6.75" stroke="#801313" strokeWidth="1.5" />
                  <path d="M9 6v3M9 12h.0075" stroke="#801313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-[family-name:var(--font-source-sans-3)] font-medium text-[#1c1917]">Quality Control</div>
                  <div className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#801313]">Failed - Action Required</div>
                </div>
              </div>
            </div>

            <section className="bg-white border border-[#e7e0d3] rounded-[4px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e7e0d3] flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-newsreader)] text-[#1c1917] text-xl leading-6">Execution Log</h2>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">LIVE</span>
              </div>
              <div className="p-6 bg-[#1c1917] font-[family-name:var(--font-jetbrains-mono)] text-xs">
                <div className="flex flex-col gap-1">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-[#a8a29e]">{log.time}</span>
                      <span className={log.level === "ERROR" ? "text-[#fca5a5]" : log.level === "WARN" ? "text-[#fbbf24]" : "text-[#86efac]"}>[{log.level}]</span>
                      <span className="text-[#e7e5e4]">{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-[#e7e0d3] flex items-center justify-between bg-[#fef2f2]">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="6.75" stroke="#801313" strokeWidth="1.5" />
                    <path d="M9 6v3M9 12h.0075" stroke="#801313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">QC Failure: Sampling frame reference missing. Manual review required.</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="border border-[#fecaca] px-3 py-1.5 rounded-[2px] font-[family-name:var(--font-source-sans-3)] text-sm text-[#991b1b]">Retry</button>
                  <button className="bg-[#801313] text-white px-3 py-1.5 rounded-[2px] font-[family-name:var(--font-source-sans-3)] text-sm">Manual Review</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}