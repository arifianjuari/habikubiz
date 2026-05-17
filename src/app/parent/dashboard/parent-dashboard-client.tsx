"use client";

import Link from "next/link";

import { ContextShell } from "@/components/context-shell";
import { appRoutes } from "@/lib/app-routes";
import { cn } from "@/lib/utils";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import type { ParentDashboardChildRow } from "@/types/dashboard";
import type { ChildSummary } from "@/types/domain";
import type { BusinessPickerRow } from "@/components/active-business-switcher";
import { useAppStore } from "@/stores/app-store";

export function ParentDashboardClient({
  initialRows,
  recentComments,
  childSummaries,
  businessPickerRows,
}: {
  initialRows: ParentDashboardChildRow[];
  recentComments: readonly string[];
  childSummaries: readonly ChildSummary[];
  businessPickerRows: readonly BusinessPickerRow[];
}) {
  const activeChildId = useAppStore((s) => s.activeChildId);

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          eyebrow="Dashboard Orang Tua"
          title="Pantau perkembangan usaha anak"
          description="Pantau progres belajar bisnis anak, lihat usaha yang aktif, dan beri arahan saat diperlukan."
          action={<div className="rounded-full bg-danger/10 px-4 py-2 text-sm font-semibold text-danger">3 notifikasi aktif</div>}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={appRoutes.parent.children}
            className="inline-flex min-h-11 items-center rounded-full border border-border-subtle bg-background px-5 text-sm font-semibold text-foreground shadow-sm"
          >
            Keluarga & anak
          </Link>
          <Link
            href={appRoutes.parent.childrenNew}
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            + Buat Profil Anak
          </Link>
        </div>
      </PageCard>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total anak aktif" value={`${initialRows.length}`} tone="bg-primary-soft text-primary" />
        <StatCard
          label="Usaha aktif"
          value={`${initialRows.reduce((acc, c) => acc + c.businessCount, 0)} usaha`}
          tone="bg-secondary/15 text-secondary"
        />
        <StatCard label="Aktivitas bulan ini" value="17 transaksi" tone="bg-info/15 text-info" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-6">
          <ContextShell mode="parent" childSummaries={childSummaries} businesses={businessPickerRows} />

          <PageCard>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Ringkasan per anak</h2>
              <span className="text-sm text-muted-foreground">Update terbaru</span>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {initialRows.map((child) => (
                <article
                  key={child.id}
                  className={cn(
                    "rounded-2xl border p-5 transition-colors",
                    activeChildId === child.id ? "border-primary bg-primary-soft/40" : "border-border-subtle",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{child.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {child.businessCount} usaha aktif · {child.activeBusinessNames || "Belum ada usaha"}
                      </p>
                    </div>
                    <span className="rounded-full bg-warning/15 px-3 py-1 text-sm font-semibold text-warning">
                      {child.initials}
                    </span>
                  </div>
                  <div className="mt-4 rounded-2xl bg-background p-4 text-sm text-muted-foreground">
                    Progress dan aktivitas anak akan dipantau dari sini.
                  </div>
                </article>
              ))}
            </div>
          </PageCard>
        </div>

        <PageCard>
          <h2 className="text-xl font-semibold text-foreground">Komentar terbaru</h2>
          <div className="mt-5 flex flex-col gap-4">
            {recentComments.map((comment) => (
              <div key={comment} className="rounded-2xl bg-surface p-4 text-sm leading-6 text-muted-foreground">
                {comment}
              </div>
            ))}
          </div>
        </PageCard>
      </section>
    </PageShell>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={cn("rounded-2xl p-4", tone)}>
      <div className="text-xs font-semibold uppercase">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}
