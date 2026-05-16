import type { ReactNode } from "react";

import { NavLink } from "@/components/nav-link";

export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <header className="border-b border-border-subtle bg-background px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <div className="text-lg font-semibold">habiku-biz · Ortu</div>
            <div className="text-xs text-muted-foreground">Mode orang tua</div>
          </div>
          <nav className="flex gap-4 text-sm font-medium text-primary">
            <NavLink href="/parent/dashboard">Dashboard</NavLink>
            <NavLink href="/">Beranda</NavLink>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
