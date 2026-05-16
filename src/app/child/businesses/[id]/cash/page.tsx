"use client";

import { use } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { getBusinessById } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

const transactions = [
  { title: "Jual 5 stiker nama", category: "Pemasukan", amount: "+ Rp25.000", good: true },
  { title: "Beli kertas sticker", category: "Pengeluaran", amount: "- Rp12.000", good: false },
  { title: "Modal awal usaha", category: "Pemasukan", amount: "+ Rp100.000", good: true },
];

export default function BusinessCashPage({ params }: PageProps) {
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
          { label: "Buku Kas" },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Buku Kas"
          title={`Transaksi usaha · ${businessName}`}
          description="Ringkasan buku kas sementara untuk usaha aktif."
          action={
            <div className="flex gap-3">
              <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#10B981] px-5 text-sm font-semibold text-white">
                + Pemasukan
              </button>
              <button className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-[#111827]">
                + Pengeluaran
              </button>
            </div>
          }
        />
      </PageCard>

      <section className="grid gap-4 md:grid-cols-3">
        <CashStat label="Kas masuk" value="Rp125.000" tone="bg-emerald-50 text-emerald-700" />
        <CashStat label="Kas keluar" value="Rp12.000" tone="bg-red-50 text-red-700" />
        <CashStat label="Saldo" value="Rp113.000" tone="bg-indigo-50 text-indigo-700" />
      </section>

      <PageCard>
        <h2 className="text-xl font-semibold text-[#111827]">Riwayat transaksi</h2>
        <div className="mt-5 space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.title} className="flex items-center justify-between rounded-2xl bg-[#F9FAFB] p-4">
              <div>
                <div className="font-semibold text-[#111827]">{transaction.title}</div>
                <div className="mt-1 text-sm text-[#6B7280]">{transaction.category}</div>
              </div>
              <div className={`text-sm font-semibold ${transaction.good ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </PageCard>

      <PageCard>
        <h2 className="text-xl font-semibold text-[#111827]">Langkah berikutnya</h2>
        <div className="mt-5 space-y-3">
          <StepRow text="Tambah transaksi pemasukan pertama" />
          <StepRow text="Catat pengeluaran bahan atau modal" />
          <StepRow text="Hubungkan transaksi ke laporan usaha" />
        </div>
      </PageCard>
    </PageShell>
  );
}

function CashStat({ label, value, tone }: { label: string; value: string; tone: string }) {
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
