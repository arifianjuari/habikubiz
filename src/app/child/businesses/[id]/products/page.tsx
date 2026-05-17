import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

const products = [
  { name: "Stiker Nama", price: "Rp8.000", hpp: "Rp3.500", stock: "24 pcs" },
  { name: "Stiker Laptop", price: "Rp12.000", hpp: "Rp5.000", stock: "15 pcs" },
  { name: "Paket 3 Stiker", price: "Rp20.000", hpp: "Rp9.500", stock: "8 paket" },
] as const;

export default async function BusinessProductsPage({ params }: PageProps) {
  const { id } = await params;
  const business = await findBusinessOverviewById(id);
  if (!business) notFound();

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: appRoutes.child.dashboard },
          { label: "Usaha", href: appRoutes.child.businesses },
          { label: business.name, href: appRoutes.child.business(business.id) },
          { label: "Produk & HPP" },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Produk & HPP"
          title={`Produk usaha · ${business.name}`}
          description="Daftar produk sementara untuk usaha aktif dan titik masuk menuju HPP sederhana."
          action={
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              + Tambah Produk
            </button>
          }
        />
      </PageCard>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.name} className="rounded-3xl border border-border-subtle bg-background p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">{product.name}</h2>
            <div className="mt-4 grid gap-3">
              <InfoRow label="Harga jual" value={product.price} />
              <InfoRow label="HPP" value={product.hpp} />
              <InfoRow label="Stok" value={product.stock} />
            </div>
          </article>
        ))}
      </section>

      <PageCard>
        <h2 className="text-xl font-semibold text-foreground">Langkah berikutnya</h2>
        <div className="mt-5 flex flex-col gap-3">
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
    <div className="rounded-2xl bg-surface p-4">
      <div className="text-xs font-semibold uppercase text-muted-foreground">{label}</div>
      <div className="mt-2 text-base font-semibold text-foreground">{value}</div>
    </div>
  );
}

function StepRow({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-surface p-4 text-sm font-medium text-foreground">{text}</div>
  );
}
