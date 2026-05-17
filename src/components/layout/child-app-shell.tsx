"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Building2, Home, LayoutGrid, Package, User, Wallet } from "lucide-react";
import type { ReactNode } from "react";

import { appRoutes } from "@/lib/app-routes";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

import { NotificationBell } from "@/components/layout/notification-bell";

function isCashSection(pathname: string): boolean {
  return /^\/child\/businesses\/[^/]+\/cash/.test(pathname);
}

function isProductsSection(pathname: string): boolean {
  return /^\/child\/businesses\/[^/]+\/products/.test(pathname);
}

function isReportsSection(pathname: string): boolean {
  return /^\/child\/businesses\/[^/]+\/reports/.test(pathname);
}

function isAssetsSection(pathname: string): boolean {
  return /^\/child\/businesses\/[^/]+\/assets/.test(pathname);
}

function isJournalSection(pathname: string): boolean {
  return /^\/child\/businesses\/[^/]+\/journal/.test(pathname);
}

function BusinessPickerBanner({ businessId }: { businessId: string | null }) {
  if (businessId) return null;
  return (
    <div className="mb-4 rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-foreground">
      <span className="font-semibold">Belum ada usaha aktif.</span>{" "}
      <Link href={appRoutes.child.businesses} className="font-semibold text-primary underline underline-offset-2">
        Pilih atau buat usaha
      </Link>{" "}
      supaya tab Kas, Produk, dan Laporan terhubung.
    </div>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-[11px] font-medium md:flex-row md:justify-start md:gap-3 md:px-3 md:py-2 md:text-sm",
        active ? "bg-primary-soft text-primary md:font-semibold" : "text-muted-foreground hover:bg-surface hover:text-foreground",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-5 shrink-0 md:size-[1.125rem]" aria-hidden />
      <span className="leading-none">{label}</span>
    </Link>
  );
}

export function ChildAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const activeBusinessId = useAppStore((s) => s.activeBusinessId);
  const setMode = useAppStore((s) => s.setMode);
  const businessBase = activeBusinessId ?? "";

  const hrefCash = businessBase ? appRoutes.child.cash(businessBase) : appRoutes.child.businesses;
  const hrefProducts = businessBase ? appRoutes.child.products(businessBase) : appRoutes.child.businesses;
  const hrefReports = businessBase ? appRoutes.child.reports(businessBase) : appRoutes.child.businesses;
  const hrefAssets = businessBase ? appRoutes.child.assets(businessBase) : appRoutes.child.businesses;
  const hrefJournal = businessBase ? appRoutes.child.journal(businessBase) : appRoutes.child.businesses;

  const dashActive = pathname === appRoutes.child.dashboard;
  const profileActive = pathname === appRoutes.child.profile || pathname.startsWith(`${appRoutes.child.profile}/`);

  const onBusinessPath =
    pathname === appRoutes.child.businesses || pathname.startsWith(`${appRoutes.child.businesses}/`);
  const businessesActive =
    onBusinessPath &&
    !isCashSection(pathname) &&
    !isProductsSection(pathname) &&
    !isReportsSection(pathname) &&
    !isAssetsSection(pathname) &&
    !isJournalSection(pathname) &&
    !profileActive;

  const cashActive = isCashSection(pathname);
  const productsActive = isProductsSection(pathname);
  const reportsActive = isReportsSection(pathname);
  const assetsActive = isAssetsSection(pathname);
  const journalActive = isJournalSection(pathname);

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border-subtle bg-background md:flex">
          <div className="flex h-16 items-center border-b border-border-subtle px-5">
            <div className="text-sm font-semibold leading-tight">
              habiku-biz
              <span className="block text-xs font-normal text-muted-foreground">Mode anak</span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Menu samping anak">
            <div className="px-2 pb-2 text-xs font-semibold uppercase text-muted-foreground">Utama</div>
            <NavItem href={appRoutes.child.dashboard} label="Beranda" icon={Home} active={dashActive} />
            <NavItem href={appRoutes.child.businesses} label="Usaha" icon={LayoutGrid} active={businessesActive} />
            <div className="mt-4 px-2 pb-2 text-xs font-semibold uppercase text-muted-foreground">Usaha aktif</div>
            <NavItem href={hrefCash} label="Kas" icon={Wallet} active={cashActive} />
            <NavItem href={hrefProducts} label="Produk" icon={Package} active={productsActive} />
            <NavItem href={hrefAssets} label="Aset" icon={Building2} active={assetsActive} />
            <NavItem href={hrefJournal} label="Jurnal" icon={BookOpen} active={journalActive} />
            <NavItem href={hrefReports} label="Laporan" icon={BarChart3} active={reportsActive} />
            <div className="mt-auto border-t border-border-subtle pt-3">
              <NavItem href={appRoutes.child.profile} label="Profil" icon={User} active={profileActive} />
            </div>
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col pb-20 md:pb-0">
          <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/95 px-4 py-3 backdrop-blur md:px-8">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
              <div className="min-w-0 md:hidden">
                <div className="truncate text-sm font-semibold">habiku-biz · Anak</div>
                <div className="truncate text-xs text-muted-foreground">
                  {businessBase ? `Usaha aktif: ${businessBase}` : "Pilih usaha di tab Usaha"}
                </div>
              </div>
              <div className="hidden min-w-0 md:block">
                <div className="text-xs font-semibold uppercase text-muted-foreground">Mode anak</div>
                <div className="truncate text-sm font-medium text-foreground">
                  {businessBase ? `Fokus usaha · ${businessBase}` : "Belum ada usaha aktif"}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={appRoutes.child.businesses}
                  className="hidden min-h-11 items-center rounded-full border border-border-subtle px-4 text-sm font-medium text-foreground shadow-sm sm:inline-flex"
                >
                  Usaha
                </Link>
                <NotificationBell />
                <Link
                  href="/parent/dashboard"
                  onClick={() => setMode("parent")}
                  className="hidden min-h-11 items-center rounded-full border border-border-subtle px-3 text-sm font-medium text-foreground shadow-sm sm:inline-flex"
                >
                  Mode ortu
                </Link>
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-primary hover:underline"
                >
                  Marketing
                </Link>
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">
            <BusinessPickerBanner businessId={activeBusinessId} />
            {children}
          </div>
        </div>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-subtle bg-background/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur md:hidden"
        aria-label="Navigasi utama anak"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
          <NavItem href={appRoutes.child.dashboard} label="Beranda" icon={Home} active={dashActive} />
          <NavItem href={hrefCash} label="Kas" icon={Wallet} active={cashActive} />
          <NavItem href={hrefProducts} label="Produk" icon={Package} active={productsActive} />
          <NavItem href={hrefReports} label="Laporan" icon={BarChart3} active={reportsActive} />
          <NavItem href={appRoutes.child.profile} label="Profil" icon={User} active={profileActive} />
        </div>
      </nav>
    </div>
  );
}
