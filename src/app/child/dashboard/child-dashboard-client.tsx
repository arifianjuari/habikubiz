"use client";

import Link from "next/link";

import type { BusinessPickerRow } from "@/components/active-business-switcher";
import { ContextShell } from "@/components/context-shell";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { formatIdr } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import type { BusinessOverview, ChildSummary } from "@/types/domain";
import { useAppStore } from "@/stores/app-store";

const todayTasks = [
  { text: "Catat pemasukan hari ini", done: true },
  { text: "Cek stok produk", done: true },
  { text: "Baca komentar orang tua", done: false },
  { text: "Lihat ringkasan laba", done: false },
] as const;

export function ChildDashboardClient({
  businesses,
  childSummaries,
  businessPickerRows,
}: {
  businesses: readonly BusinessOverview[];
  childSummaries: readonly ChildSummary[];
  businessPickerRows: readonly BusinessPickerRow[];
}) {
  const activeChildId = useAppStore((s) => s.activeChildId);
  const activeBusinessId = useAppStore((s) => s.activeBusinessId);

  const activeBusiness =
    businesses.find((b) => b.id === activeBusinessId && b.childId === activeChildId) ??
    businesses.find((b) => b.childId === activeChildId) ??
    ({
      id: "unknown",
      childId: activeChildId ?? "",
      name: "Usaha belum dipilih",
      type: "simulasi" as const,
      category: "Belum ada",
      description: "Pilih usaha aktif untuk melihat dashboard.",
      initialCapital: 0,
      estimatedCashRp: 0,
      tagline: "",
    } satisfies BusinessOverview);

  const otherBusinesses = businesses.filter(
    (b) => b.childId === activeBusiness.childId && b.id !== activeBusiness.id,
  );

  const typeLabel = activeBusiness.type === "simulasi" ? "simulasi" : "nyata";

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          eyebrow="Usaha aktif"
          title={activeBusiness.name}
          description={`Mode ${typeLabel} · Belajar bisnis lewat langkah kecil yang mudah dipahami.`}
          action={<div className="rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">340 poin</div>}
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard
            label="Saldo kas"
            value={formatIdr(activeBusiness.estimatedCashRp)}
            tone="bg-secondary/15 text-secondary"
          />
          <StatCard label="Poin" value="340 poin" tone="bg-primary-soft text-primary" />
          <StatCard label="Komentar" value="2 komentar baru" tone="bg-info/15 text-info" />
        </div>
      </PageCard>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <PageCard>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Ringkasan kas minggu ini</h2>
            <span className="text-sm text-muted-foreground">Mei 2026</span>
          </div>
          <div className="mt-6 flex h-56 items-end gap-3 rounded-2xl bg-surface p-4">
            {[65, 92, 54, 120, 86, 145, 110].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-secondary" style={{ height }} />
                <div className="h-2 w-5 rounded bg-border-subtle" />
              </div>
            ))}
          </div>
        </PageCard>

        <div className="flex flex-col gap-6">
          <ContextShell mode="child" childSummaries={childSummaries} businesses={businessPickerRows} />

          <PageCard>
            <h2 className="text-xl font-semibold text-foreground">Misi hari ini</h2>
            <div className="mt-5 flex flex-col gap-3">
              {todayTasks.map((task) => (
                <TaskRow key={task.text} text={task.text} done={task.done} />
              ))}
            </div>
          </PageCard>
        </div>
      </section>

      <PageCard>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Usaha lainnya</h2>
          <Link href="/child/businesses" className="text-sm font-semibold text-primary">
            Lihat semua
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {otherBusinesses.map((business) => (
            <div key={business.id} className="rounded-2xl bg-surface p-5">
              <div className="font-semibold text-foreground">{business.name}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Saldo kas {formatIdr(business.estimatedCashRp)}
              </div>
            </div>
          ))}
        </div>
      </PageCard>
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

function TaskRow({ text, done }: { text: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface p-3">
      <div
        className={cn(
          "size-5 rounded-full",
          done ? "bg-secondary" : "border-2 border-border-subtle bg-background",
        )}
      />
      <div className="text-sm font-medium text-foreground">{text}</div>
    </div>
  );
}
