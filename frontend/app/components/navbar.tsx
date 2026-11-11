"use client";

import Link from "next/link";

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.333" cy="7.333" r="4.667" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.667 10.667L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar({
  showSearch = false,
  showProfile = false,
  showRepository = false,
  activePage = "home",
}: {
  showSearch?: boolean;
  showProfile?: boolean;
  showRepository?: boolean;
  activePage?: string;
}) {
  return (
    <header className="bg-[#fff8f5] border-b border-[#e0d8d5]">
      <div className="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <div className="font-[family-name:var(--font-newsreader)] font-bold text-[#1f1b1a] text-xl tracking-[-0.5px] leading-7">SatuSurvey</div>
            <div className="font-[family-name:var(--font-jetbrains-mono)] font-bold text-[#801313] text-[9px] tracking-[0.9px] uppercase leading-[9px]">AI EVIDENCE & FACT VERIFICATION</div>
          </div>
          <nav className="hidden md:flex items-center gap-6 flex-nowrap">
            <Link href="/" className="bg-[#801313] px-3 py-1.5 rounded-[2px] font-[family-name:var(--font-jetbrains-mono)] text-xs text-white font-bold leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">Ingest & Report</Link>
            {showRepository && (
              <Link href="https://github.com/zufar-irawan/satu_survey" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Repository</Link>
            )}
            <Link href="/evidence-analysis" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Analysis</Link>
            <Link href="/dossier" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Active Dossier</Link>
            <Link href="/profile" className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#534341] hover:text-[#1f1b1a] leading-4">Profile / Account Settings</Link>
          </nav>
        </div>
        {showSearch && (
          <button className="bg-white/50 border border-[#d8c2be] rounded-xl size-8 flex items-center justify-center text-[#534341]">
            <IconSearch />
          </button>
        )}
        {showProfile && (
          <div className="hidden md:flex items-center gap-2">
            <Link href="/profile" className="relative bg-red-500 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <span className="text-white font-bold text-xs">FD</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}