import Link from "next/link";
import type { ReactNode } from "react";

export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <div className="text-lg font-semibold">HabikuBiz · Parent</div>
            <div className="text-xs text-[#6B7280]">Mode orang tua</div>
          </div>
          <nav className="flex gap-4 text-sm text-[#4F46E5]">
            <Link href="/parent/dashboard">Dashboard</Link>
            <Link href="/">Landing</Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
