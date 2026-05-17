"use client";

import Link from "next/link";

import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { formatIdr } from "@/lib/format-currency";
import type { BusinessOverview } from "@/types/domain";
import { useAppStore } from "@/stores/app-store";

export function ChildBusinessesClient({ businesses }: { businesses: readonly BusinessOverview[] }) {
  const activeChildId = useAppStore((s) => s.activeChildId);
  const setActiveBusinessId = useAppStore((s) => s.setActiveBusinessId);
  const filtered = businesses.filter((b) => !activeChildId || b.childId === activeChildId);

  const typeLabel = (t: BusinessOverview["type"]) => (t === "simulasi" ? "Simulasi" : "Nyata");

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          title="Daftar Usaha Anak"
          description="Pilih usaha yang sedang berjalan atau buat usaha baru untuk memulai perjalanan bisnis anak."
          action={
            <Link
              href="/child/businesses/new"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              + Buat Usaha Baru
            </Link>
          }
        />
      </PageCard>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((business) => (
          <article key={business.id} className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{business.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{business.category}</p>
              </div>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                {typeLabel(business.type)}
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-background p-4">
              <div className="text-xs font-medium uppercase text-muted-foreground">Saldo kas</div>
              <div className="mt-2 text-2xl font-semibold text-foreground">{formatIdr(business.estimatedCashRp)}</div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">{business.tagline}</p>

            <div className="mt-5 flex gap-3">
              <Link
                href={`/child/businesses/${business.id}`}
                onClick={() => setActiveBusinessId(business.id)}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background"
              >
                Buka
              </Link>
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-subtle px-5 text-sm font-semibold text-foreground"
              >
                Ringkasan
              </button>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
