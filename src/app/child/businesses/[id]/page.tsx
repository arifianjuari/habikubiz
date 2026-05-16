"use client";

import Link from "next/link";
import { use } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { getBusinessById } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

interface BusinessDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BusinessDetailPage({ params }: BusinessDetailPageProps) {
  const { id } = use(params);
  const { activeChildId, activeBusinessId } = useAppStore();
  
  const business = getBusinessById(id) ?? getBusinessById(activeBusinessId ?? "") ?? {
    id: "unknown",
    name: "Usaha Baru",
    type: "Simulasi",
    category: "Belum ditentukan",
    cash: "Rp0",
    summary: "Halaman ini nanti akan menjadi pusat semua aktivitas usaha anak.",
    note: "",
    childId: activeChildId ?? "",
  };

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/child/dashboard" },
          { label: "Usaha", href: "/child/businesses" },
          { label: business.name },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Detail Usaha"
          title={business.name}
          description={`${business.category} · ${business.type} · ${business.summary}`}
          action={<div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Saldo kas {business.cash}</div>}
        />
      </PageCard>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href={`/child/businesses/${business.id}/products`}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#4F46E5]"
        >
          <h2 className="text-lg font-semibold text-[#111827]">Produk & HPP</h2>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">Kelola produk, harga jual, dan hitung HPP sederhana.</p>
        </Link>
        <Link
          href={`/child/businesses/${business.id}/cash`}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#4F46E5]"
        >
          <h2 className="text-lg font-semibold text-[#111827]">Buku Kas</h2>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">Catat pemasukan dan pengeluaran usaha setiap hari.</p>
        </Link>
        <Link
          href={`/child/businesses/${business.id}/reports`}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#4F46E5]"
        >
          <h2 className="text-lg font-semibold text-[#111827]">Laporan</h2>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">Lihat ringkasan usaha dan progres belajar bisnis anak.</p>
        </Link>
      </div>

      <PageCard>
        <h2 className="text-xl font-semibold text-[#111827]">Langkah berikutnya</h2>
        <div className="mt-5 space-y-3">
          <StepRow text="Tambahkan produk pertama untuk usaha ini" />
          <StepRow text="Catat modal awal atau transaksi pertama" />
          <StepRow text="Lihat ringkasan usaha setelah data pertama masuk" />
        </div>
      </PageCard>
    </PageShell>
  );
}

function StepRow({ text }: { text: string }) {
  return <div className="rounded-2xl bg-[#F9FAFB] p-4 text-sm font-medium text-[#111827]">{text}</div>;
}
