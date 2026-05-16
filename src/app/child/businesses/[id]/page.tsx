import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { formatIdr } from "@/lib/format-currency";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface BusinessDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessDetailPage({ params }: BusinessDetailPageProps) {
  const { id } = await params;
  const business = await findBusinessOverviewById(id);
  if (!business) notFound();

  const typeLabel = business.type === "simulasi" ? "Simulasi" : "Nyata";

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
          description={`${business.category} · ${typeLabel} · ${business.description}`}
          action={
            <div className="rounded-full bg-secondary/15 px-4 py-2 text-sm font-semibold text-secondary">
              Saldo kas {formatIdr(business.estimatedCashRp)}
            </div>
          }
        />
      </PageCard>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href={`/child/businesses/${business.id}/products`}
          className="rounded-2xl border border-border-subtle bg-background p-5 shadow-sm transition hover:border-primary"
        >
          <h2 className="text-lg font-semibold text-foreground">Produk & HPP</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Kelola produk, harga jual, dan hitung HPP sederhana.</p>
        </Link>
        <Link
          href={`/child/businesses/${business.id}/cash`}
          className="rounded-2xl border border-border-subtle bg-background p-5 shadow-sm transition hover:border-primary"
        >
          <h2 className="text-lg font-semibold text-foreground">Buku Kas</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Catat pemasukan dan pengeluaran usaha setiap hari.</p>
        </Link>
        <Link
          href={`/child/businesses/${business.id}/reports`}
          className="rounded-2xl border border-border-subtle bg-background p-5 shadow-sm transition hover:border-primary"
        >
          <h2 className="text-lg font-semibold text-foreground">Laporan</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Lihat ringkasan usaha dan progres belajar bisnis anak.
          </p>
        </Link>
      </div>

      <PageCard>
        <h2 className="text-xl font-semibold text-foreground">Langkah berikutnya</h2>
        <div className="mt-5 flex flex-col gap-3">
          <StepRow text="Tambahkan produk pertama untuk usaha ini" />
          <StepRow text="Catat modal awal atau transaksi pertama" />
          <StepRow text="Lihat ringkasan usaha setelah data pertama masuk" />
        </div>
      </PageCard>
    </PageShell>
  );
}

function StepRow({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-surface p-4 text-sm font-medium text-foreground">{text}</div>
  );
}
