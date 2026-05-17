"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, MessageSquareText, Users } from "lucide-react";
import type { ReactNode } from "react";

import { appRoutes } from "@/lib/app-routes";
import { cn } from "@/lib/utils";

import { NotificationBell } from "@/components/layout/notification-bell";
import { useAppStore } from "@/stores/app-store";

function SidebarNavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof LayoutGrid;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-surface hover:text-foreground",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}

export function ParentAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const setMode = useAppStore((s) => s.setMode);

  const dashActive = pathname === appRoutes.parent.dashboard || pathname.startsWith(`${appRoutes.parent.dashboard}/`);
  const childrenActive =
    pathname === appRoutes.parent.children ||
    pathname.startsWith(`${appRoutes.parent.children}/`) ||
    pathname.startsWith("/parent/businesses/");
  const commentsActive = pathname === appRoutes.parent.comments || pathname.startsWith(`${appRoutes.parent.comments}/`);

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border-subtle bg-background md:flex">
          <div className="flex h-16 items-center border-b border-border-subtle px-5">
            <div className="text-sm font-semibold leading-tight">
              habiku-biz
              <span className="block text-xs font-normal text-muted-foreground">Mode orang tua</span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Menu samping orang tua">
            <SidebarNavItem href={appRoutes.parent.dashboard} label="Dashboard" icon={LayoutGrid} active={dashActive} />
            <SidebarNavItem href={appRoutes.parent.children} label="Keluarga & anak" icon={Users} active={childrenActive} />
            <SidebarNavItem
              href={appRoutes.parent.comments}
              label="Komentar"
              icon={MessageSquareText}
              active={commentsActive}
            />
          </nav>
          <div className="border-t border-border-subtle p-4">
            <Link
              href="/"
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Ke beranda marketing
            </Link>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/95 px-4 py-3 backdrop-blur md:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <div className="text-sm font-semibold md:hidden">habiku-biz · Ortu</div>
                <div className="hidden text-xs font-semibold uppercase text-muted-foreground md:block">Mode orang tua</div>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <nav className="flex flex-1 flex-wrap gap-2 md:hidden" aria-label="Navigasi orang tua (mobile)">
                  <Link
                    href={appRoutes.parent.dashboard}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border px-3 text-xs font-semibold",
                      dashActive ? "border-primary bg-primary-soft text-primary" : "border-border-subtle bg-background",
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={appRoutes.parent.children}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border px-3 text-xs font-semibold",
                      childrenActive ? "border-primary bg-primary-soft text-primary" : "border-border-subtle bg-background",
                    )}
                  >
                    Anak
                  </Link>
                  <Link
                    href={appRoutes.parent.comments}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border px-3 text-xs font-semibold",
                      commentsActive ? "border-primary bg-primary-soft text-primary" : "border-border-subtle bg-background",
                    )}
                  >
                    Komentar
                  </Link>
                </nav>
                <div className="ml-auto flex items-center gap-2 md:ml-0">
                  <NotificationBell />
                  <Link
                    href="/child/dashboard"
                    onClick={() => setMode("child")}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Ke mode anak
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
