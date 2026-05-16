import type { ReactNode } from "react";

import { NavLink } from "@/components/nav-link";

export default function ChildLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <header className="border-b border-border-subtle bg-background px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">habiku-biz · Anak</div>
            <div className="text-xs text-muted-foreground">Mode anak</div>
          </div>
          <nav className="flex gap-4 text-sm font-medium text-primary">
            <NavLink href="/child/dashboard">Dashboard</NavLink>
            <NavLink href="/child/businesses">Usaha</NavLink>
            <NavLink href="/">Beranda</NavLink>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      <footer className="sticky bottom-0 border-t border-border-subtle bg-background px-6 py-3 md:hidden">
        <div className="mx-auto flex max-w-6xl justify-around text-sm font-medium text-primary">
          <NavLink href="/child/dashboard" className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 py-2">
            Beranda
          </NavLink>
          <NavLink href="/child/businesses" className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 py-2">
            Usaha
          </NavLink>
          <NavLink href="/child/profile" className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 py-2">
            Profil
          </NavLink>
        </div>
      </footer>
    </div>
  );
}
