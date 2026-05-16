import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

const transactions = [
  { title: "Jual 5 stiker nama", category: "Pemasukan", amount: "+ Rp25.000", income: true },
  { title: "Beli kertas sticker", category: "Pengeluaran", amount: "- Rp12.000", income: false },
  { title: "Modal awal usaha", category: "Pemasukan", amount: "+ Rp100.000", income: true },
] as const;

export default async function BusinessCashPage({ params }: PageProps) {
  const { id } = await params;
  const business = await findBusinessOverviewById(id);
  if (!business) notFound();

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/child/dashboard" },
          { label: "Usaha", href: "/child/businesses" },
          { label: business.name, href: `/child/businesses/${business.id}` },
          { label: "Buku Kas" },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Buku Kas"
          title={`Transaksi usaha · ${business.name}`}
          description="Ringkasan buku kas sementara untuk usaha aktif."
          action={
            <div className="flex gap-3">
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-5 text-sm font-semibold text-secondary-foreground"
              >
                + Pemasukan
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-subtle px-5 text-sm font-semibold text-foreground"
              >
                + Pengeluaran
              </button>
            </div>
          }
        />
      </PageCard>

      <section className="grid gap-4 md:grid-cols-3">
        <CashStat label="Kas masuk" value="Rp125.000" tone="bg-secondary/15 text-secondary" />
        <CashStat label="Kas keluar" value="Rp12.000" tone="bg-danger/10 text-danger" />
        <CashStat label="Saldo" value="Rp113.000" tone="bg-primary-soft text-primary" />
      </section>

      <PageCard>
        <h2 className="text-xl font-semibold text-foreground">Riwayat transaksi</h2>
        <div className="mt-5 flex flex-col gap-3">
          {transactions.map((transaction) => (
            <div key={transaction.title} className="flex items-center justify-between rounded-2xl bg-surface p-4">
              <div>
                <div className="font-semibold text-foreground">{transaction.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{transaction.category}</div>
              </div>
              <div
                className={`text-sm font-semibold ${transaction.income ? "text-secondary" : "text-danger"}`}
              >
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </PageCard>

      <PageCard>
        <h2 className="text-xl font-semibold text-foreground">Langkah berikutnya</h2>
        <div className="mt-5 flex flex-col gap-3">
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
  return (
    <div className="rounded-2xl bg-surface p-4 text-sm font-medium text-foreground">{text}</div>
  );
}
