"use client";

import Link from "next/link";

import { ContextShell } from "@/components/context-shell";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { getBusinessById, getBusinessesByChildId } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

const todayTasks = [
  { text: "Catat pemasukan hari ini", done: true },
  { text: "Cek stok produk", done: true },
  { text: "Baca komentar orang tua", done: false },
  { text: "Lihat ringkasan laba", done: false },
];

export default function ChildDashboardPage() {
  const { activeChildId, activeBusinessId } = useAppStore();
  
  const activeBusiness = getBusinessById(activeBusinessId ?? "") ?? {
    id: "unknown",
    name: "Usaha belum dipilih",
    type: "Simulasi",
    category: "Belum ada",
    cash: "Rp0",
    summary: "Pilih usaha aktif untuk melihat dashboard.",
    note: "",
    childId: activeChildId ?? "",
  };
  
  const otherBusinesses = getBusinessesByChildId(activeBusiness.childId).filter((business) => business.id !== activeBusiness.id);

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          eyebrow="Usaha aktif"
          title={activeBusiness.name}
          description={`Mode ${activeBusiness.type.toLowerCase()} · Belajar bisnis lewat langkah kecil yang mudah dipahami.`}
          action={<div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-[#4F46E5]">340 poin</div>}
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard label="Saldo kas" value={activeBusiness.cash} tone="bg-emerald-50 text-emerald-700" />
          <StatCard label="Poin" value="340 poin" tone="bg-indigo-50 text-indigo-700" />
          <StatCard label="Komentar" value="2 komentar baru" tone="bg-blue-50 text-blue-700" />
        </div>
      </PageCard>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <PageCard>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ringkasan kas minggu ini</h2>
            <span className="text-sm text-[#6B7280]">Mei 2026</span>
          </div>
          <div className="mt-6 flex h-56 items-end gap-3 rounded-2xl bg-slate-50 p-4">
            {[65, 92, 54, 120, 86, 145, 110].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-[#10B981]" style={{ height }} />
                <div className="h-2 w-5 rounded bg-slate-300" />
              </div>
            ))}
          </div>
        </PageCard>

        <div className="space-y-6">
          <ContextShell mode="child" />

          <PageCard>
            <h2 className="text-xl font-semibold">Misi hari ini</h2>
            <div className="mt-5 space-y-3">
              {todayTasks.map((task) => (
                <TaskRow key={task.text} text={task.text} done={task.done} />
              ))}
            </div>
          </PageCard>
        </div>
      </section>

      <PageCard>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Usaha lainnya</h2>
          <Link href="/child/businesses" className="text-sm font-semibold text-[#4F46E5]">Lihat semua</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {otherBusinesses.map((business) => (
            <div key={business.id} className="rounded-2xl bg-[#F9FAFB] p-5">
              <div className="font-semibold text-[#111827]">{business.name}</div>
              <div className="mt-2 text-sm text-[#6B7280]">Saldo kas {business.cash}</div>
            </div>
          ))}
        </div>
      </PageCard>
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

function TaskRow({ text, done }: { text: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
      <div className={`h-5 w-5 rounded-full ${done ? "bg-[#10B981]" : "border-2 border-slate-300 bg-white"}`} />
      <div className="text-sm font-medium text-[#111827]">{text}</div>
    </div>
  );
}
