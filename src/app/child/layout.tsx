import Link from "next/link";
import type { ReactNode } from "react";

export default function ChildLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">HabikuBiz · Child</div>
            <div className="text-xs text-[#6B7280]">Mode anak</div>
          </div>
          <nav className="flex gap-4 text-sm text-[#4F46E5]">
            <Link href="/child/dashboard">Dashboard</Link>
            <Link href="/child/businesses">Usaha</Link>
            <Link href="/">Landing</Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      <footer className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-3 md:hidden">
        <div className="mx-auto flex max-w-6xl justify-around text-sm text-[#4F46E5]">
          <Link href="/child/dashboard">Beranda</Link>
          <Link href="/child/businesses">Usaha</Link>
          <span className="text-[#6B7280]">Profil</span>
        </div>
      </footer>
    </div>
  );
}
