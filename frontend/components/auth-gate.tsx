"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

export function LoadingScreen({ message = "Memuat..." }: { message?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e7e0d3] border-t-[#801313]" />
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#635d5c]">
          {message}
        </span>
      </div>
    </div>
  );
}

export default function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      const search =
        typeof window !== "undefined" ? window.location.search : "";
      const target = pathname ? `${pathname}${search}` : "/analyze";
      router.replace(`/login?next=${encodeURIComponent(target)}`);
    }
  }, [loading, pathname, router, user]);

  if (loading) return <LoadingScreen message="Memeriksa sesi..." />;
  if (!user) return <LoadingScreen message="Mengalihkan ke halaman masuk..." />;
  return <>{children}</>;
}
