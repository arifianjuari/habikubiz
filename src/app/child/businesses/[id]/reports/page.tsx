import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessReportsPage({ params }: PageProps) {
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
          { label: "Laporan" },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Laporan"
          title={`Ringkasan usaha · ${business.name}`}
          description="Ringkasan performa sementara dari usaha aktif."
          action={
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-subtle px-5 text-sm font-semibold text-foreground"
            >
              Export PDF
            </button>
          }
        />
      </PageCard>

      <section className="grid gap-4 md:grid-cols-3">
        <ReportCard label="Pendapatan" value="Rp125.000" tone="bg-secondary/15 text-secondary" />
        <ReportCard label="Pengeluaran" value="Rp12.000" tone="bg-danger/10 text-danger" />
        <ReportCard label="Laba sementara" value="Rp113.000" tone="bg-primary-soft text-primary" />
      </section>

      <PageCard>
        <h2 className="text-xl font-semibold text-foreground">Jenis laporan (PRD Modul 7)</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href={appRoutes.child.reportsLabaRugi(business.id)}
            className="rounded-2xl border border-border-subtle bg-surface p-4 text-sm font-semibold text-primary hover:border-primary"
          >
            Laba Rugi
          </Link>
          <Link
            href={appRoutes.child.reportsArusKas(business.id)}
            className="rounded-2xl border border-border-subtle bg-surface p-4 text-sm font-semibold text-primary hover:border-primary"
          >
            Arus Kas
          </Link>
          <Link
            href={appRoutes.child.reportsNeraca(business.id)}
            className="rounded-2xl border border-border-subtle bg-surface p-4 text-sm font-semibold text-primary hover:border-primary"
          >
            Neraca
          </Link>
          <Link
            href={appRoutes.child.reportsRekapAset(business.id)}
            className="rounded-2xl border border-border-subtle bg-surface p-4 text-sm font-semibold text-primary hover:border-primary"
          >
            Rekap Aset
          </Link>
        </div>
      </PageCard>

      <PageCard>
        <h2 className="text-xl font-semibold text-foreground">Performa sederhana</h2>
        <div className="mt-6 flex h-56 items-end gap-3 rounded-2xl bg-surface p-4">
          {[65, 92, 54, 120, 86, 145, 110].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-xl bg-primary" style={{ height }} />
              <div className="h-2 w-5 rounded bg-border-subtle" />
            </div>
          ))}
        </div>
      </PageCard>

      <PageCard>
        <h2 className="text-xl font-semibold text-foreground">Langkah berikutnya</h2>
        <div className="mt-5 flex flex-col gap-3">
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
  return (
    <div className="rounded-2xl bg-surface p-4 text-sm font-medium text-foreground">{text}</div>
  );
}
