"use client";

import { use } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { getBusinessById } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

const products = [
  { name: "Stiker Nama", price: "Rp8.000", hpp: "Rp3.500", stock: "24 pcs" },
  { name: "Stiker Laptop", price: "Rp12.000", hpp: "Rp5.000", stock: "15 pcs" },
  { name: "Paket 3 Stiker", price: "Rp20.000", hpp: "Rp9.500", stock: "8 paket" },
];

export default function BusinessProductsPage({ params }: PageProps) {
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
          { label: "Produk & HPP" },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Produk & HPP"
          title={`Produk usaha · ${businessName}`}
          description="Daftar produk sementara untuk usaha aktif dan titik masuk menuju HPP sederhana."
          action={
            <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#4F46E5] px-5 text-sm font-semibold text-white">
              + Tambah Produk
            </button>
          }
        />
      </PageCard>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-[#111827]">{product.name}</h2>
            <div className="mt-4 grid gap-3">
              <InfoRow label="Harga jual" value={product.price} />
              <InfoRow label="HPP" value={product.hpp} />
              <InfoRow label="Stok" value={product.stock} />
            </div>
          </article>
        ))}
      </section>

      <PageCard>
        <h2 className="text-xl font-semibold text-[#111827]">Langkah berikutnya</h2>
        <div className="mt-5 space-y-3">
          <StepRow text="Tambahkan produk pertama atau edit produk yang sudah ada" />
          <StepRow text="Lengkapi HPP sederhana untuk tiap produk" />
          <StepRow text="Hubungkan produk ke transaksi penjualan" />
        </div>
      </PageCard>
    </PageShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#F9FAFB] p-4">
      <div className="text-xs font-semibold uppercase text-[#6B7280]">{label}</div>
      <div className="mt-2 text-base font-semibold text-[#111827]">{value}</div>
    </div>
  );
}

function StepRow({ text }: { text: string }) {
  return <div className="rounded-2xl bg-[#F9FAFB] p-4 text-sm font-medium text-[#111827]">{text}</div>;
}
