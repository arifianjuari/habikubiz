"use client";

import { use } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { getBusinessById } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BusinessReportsPage({ params }: PageProps) {
  const { id } = use(params);
  const { activeBusinessId } = useAppStore();
  const business = getBusinessById(id) ?? getBusinessById(activeBusinessId ?? "");
  const businessName = business?.name ?? "Usaha";

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/child/dashboard" },
          { label: "Usaha", href: "/child/businesses" },
          { label: businessName },
          { label: "Laporan" },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Laporan"
          title={`Ringkasan usaha · ${businessName}`}
          description="Ringkasan performa sementara dari usaha aktif."
          action={
            <button className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-[#111827]">
              Export PDF
            </button>
          }
        />
      </PageCard>

      <section className="grid gap-4 md:grid-cols-3">
        <ReportCard label="Pendapatan" value="Rp125.000" tone="bg-emerald-50 text-emerald-700" />
        <ReportCard label="Pengeluaran" value="Rp12.000" tone="bg-red-50 text-red-700" />
        <ReportCard label="Laba sementara" value="Rp113.000" tone="bg-indigo-50 text-indigo-700" />
      </section>

      <PageCard>
        <h2 className="text-xl font-semibold text-[#111827]">Performa sederhana</h2>
        <div className="mt-6 flex h-56 items-end gap-3 rounded-2xl bg-slate-50 p-4">
          {[65, 92, 54, 120, 86, 145, 110].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-xl bg-[#4F46E5]" style={{ height }} />
              <div className="h-2 w-5 rounded bg-slate-300" />
            </div>
          ))}
        </div>
      </PageCard>

      <PageCard>
        <h2 className="text-xl font-semibold text-[#111827]">Langkah berikutnya</h2>
        <div className="mt-5 space-y-3">
          <StepRow text="Lihat laba rugi sederhana dari transaksi yang sudah dicatat" />
          <StepRow text="Bandingkan pemasukan dan pengeluaran" />
          <StepRow text="Siapkan export laporan saat data sudah lebih lengkap" />
        </div>
      </PageCard>
    </PageShell>
  );
}

function ReportCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-2xl p-4 ${tone}`}>
      <div className="text-xs font-semibold uppercase">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

function StepRow({ text }: { text: string }) {
  return <div className="rounded-2xl bg-[#F9FAFB] p-4 text-sm font-medium text-[#111827]">{text}</div>;
}
