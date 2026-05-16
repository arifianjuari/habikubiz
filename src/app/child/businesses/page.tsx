"use client";

import Link from "next/link";

import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { getBusinessesByChildId } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

export default function ChildBusinessesPage() {
  const { activeChildId } = useAppStore();
  const businesses = getBusinessesByChildId(activeChildId ?? "");

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          title="Daftar Usaha Anak"
          description="Pilih usaha yang sedang berjalan atau buat usaha baru untuk memulai perjalanan bisnis anak."
          action={
            <Link href="/child/businesses/new" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#4F46E5] px-5 text-sm font-semibold text-white">
              + Buat Usaha Baru
            </Link>
          }
        />
      </PageCard>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {businesses.map((business) => (
          <article key={business.id} className="rounded-3xl border border-slate-200 bg-[#F9FAFB] p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#111827]">{business.name}</h2>
                <p className="mt-1 text-sm text-[#6B7280]">{business.category}</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#4F46E5]">{business.type}</span>
            </div>

            <div className="mt-5 rounded-2xl bg-white p-4">
              <div className="text-xs font-medium uppercase text-[#6B7280]">Saldo kas</div>
              <div className="mt-2 text-2xl font-semibold text-[#111827]">{business.cash}</div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#6B7280]">{business.note}</p>

            <div className="mt-5 flex gap-3">
              <Link href={`/child/businesses/${business.id}`} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#111827] px-5 text-sm font-semibold text-white">
                Buka
              </Link>
              <button className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-[#111827]">
                Ringkasan
              </button>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
