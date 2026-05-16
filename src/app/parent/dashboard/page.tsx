"use client";

import Link from "next/link";

import { ContextShell } from "@/components/context-shell";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { children, getBusinessesByChildId } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

const recentComments = [
  "Coba cek lagi biaya bahan baku stiker. Apakah lem sudah masuk HPP?",
  "Bagus, pemasukan sudah dicatat rapi. Sekarang cek stok produk.",
];

export default function ParentDashboardPage() {
  const { activeChildId } = useAppStore();
  
  const childrenSummary = children.map((child) => {
    const childBusinesses = getBusinessesByChildId(child.id);
    return {
      ...child,
      businesses: childBusinesses.length,
      activeBusinessNames: childBusinesses.map((business) => business.name).join(", "),
    };
  });

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          eyebrow="Dashboard Orang Tua"
          title="Pantau perkembangan usaha anak"
          description="Pantau progres belajar bisnis anak, lihat usaha yang aktif, dan beri arahan saat diperlukan."
          action={<div className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">3 notifikasi aktif</div>}
        />
        <div className="mt-6">
          <Link href="/parent/children/new" className="inline-flex min-h-11 items-center rounded-full bg-[#4F46E5] px-5 text-sm font-semibold text-white">
            + Buat Profil Anak
          </Link>
        </div>
      </PageCard>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total anak aktif" value={`${children.length}`} tone="bg-indigo-50 text-indigo-700" />
        <StatCard label="Usaha aktif" value={`${childrenSummary.reduce((acc, child) => acc + child.businesses, 0)} usaha`} tone="bg-emerald-50 text-emerald-700" />
        <StatCard label="Aktivitas bulan ini" value="17 transaksi" tone="bg-blue-50 text-blue-700" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <ContextShell mode="parent" />

          <PageCard>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Ringkasan per anak</h2>
              <span className="text-sm text-[#6B7280]">Update terbaru</span>
            </div>

            <div className="mt-6 space-y-4">
              {childrenSummary.map((child) => (
                <article key={child.id} className={`rounded-2xl border p-5 transition-colors ${activeChildId === child.id ? 'border-[#4F46E5] bg-indigo-50/30' : 'border-slate-200'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#111827]">{child.name}</h3>
                      <p className="mt-1 text-sm text-[#6B7280]">{child.businesses} usaha aktif · {child.activeBusinessNames || "Belum ada usaha"}</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">{child.initials}</span>
                  </div>
                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-[#6B7280]">Progress dan aktivitas anak akan dipantau dari sini.</div>
                </article>
              ))}
            </div>
          </PageCard>
        </div>

        <PageCard>
          <h2 className="text-xl font-semibold">Komentar terbaru</h2>
          <div className="mt-5 space-y-4">
            {recentComments.map((comment) => (
              <div key={comment} className="rounded-2xl bg-[#F9FAFB] p-4 text-sm leading-6 text-[#6B7280]">
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
    <div className={`rounded-2xl p-4 ${tone}`}>
      <div className="text-xs font-semibold uppercase">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}
