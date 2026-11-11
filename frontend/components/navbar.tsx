"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

function IconSearch() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.333" cy="7.333" r="4.667" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M10.667 10.667L14 14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type NavbarProps = {
  showSearch?: boolean;
  showProfile?: boolean;
  showRepository?: boolean;
  activePage?: string;
};

const NAV_ITEMS = [
  { key: "analyze", label: "Ingest & Report", href: "/analyze" },
  { key: "analysis", label: "Analysis", href: "/analysis" },
  { key: "dossier", label: "Dossiers", href: "/dossier" },
] as const;

function normalizeActive(activePage: string) {
  if (activePage === "home") return "analyze";
  if (activePage === "evidence-analysis" || activePage === "export") {
    return "analysis";
  }
  return activePage;
}

export default function Navbar({
  showSearch = false,
  showProfile = false,
  showRepository = false,
  activePage = "analyze",
}: NavbarProps) {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const active = normalizeActive(activePage);

  const protectedHref = (href: string) =>
    isAuthenticated
      ? href
      : `/login?next=${encodeURIComponent(href)}`;

  const onLogout = () => {
    logout();
    router.replace("/login");
  };

  const linkClass = (key: string) =>
    `rounded-[2px] px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs leading-4 transition-colors ${
      active === key
        ? "bg-[#801313] font-bold text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
        : "text-[#534341] hover:bg-[#f3efe6] hover:text-[#1f1b1a]"
    }`;

  return (
    <header className="border-b border-[#e0d8d5] bg-[#fff8f5]">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-7">
          <Link href="/" className="flex shrink-0 flex-col">
            <span className="font-[family-name:var(--font-newsreader)] text-xl font-bold leading-7 tracking-[-0.5px] text-[#1f1b1a]">
              SatuSurvey
            </span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] font-bold uppercase leading-[9px] tracking-[0.9px] text-[#801313]">
              AI Evidence &amp; Fact Verification
            </span>
          </Link>
          <nav className="hidden items-center gap-1.5 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={protectedHref(item.href)}
                className={linkClass(item.key)}
              >
                {item.label}
              </Link>
            ))}
            {showRepository && (
              <Link
                href={protectedHref("/repository")}
                className={linkClass("repository")}
              >
                Repository
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {showSearch && (
            <Link
              href={protectedHref("/analysis")}
              className="flex size-8 items-center justify-center rounded-xl border border-[#d8c2be] bg-white/50 text-[#534341] hover:bg-white"
              aria-label="Cari analisis"
            >
              <IconSearch />
            </Link>
          )}

          {showProfile && (
            <div className="hidden items-center gap-3 md:flex">
              {loading ? (
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#a8a29e]">
                  MEMUAT...
                </span>
              ) : isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-[2px] px-1.5 py-1 hover:bg-[#f3efe6]"
                  >
                    <span className="flex size-6 items-center justify-center rounded-full bg-[#801313] text-[10px] font-bold uppercase text-white">
                      {user?.username?.slice(0, 2) || "US"}
                    </span>
                    <span className="max-w-[140px] truncate font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">
                      {user?.username}
                    </span>
                  </Link>
                  <button
                    onClick={onLogout}
                    className="rounded-[2px] border border-[#d8c2be] px-3 py-1 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#801313] hover:bg-[#f3efe6]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded-[2px] bg-[#801313] px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold leading-4 text-white hover:bg-[#5e0f0f]"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
