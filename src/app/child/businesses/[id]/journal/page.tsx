import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessJournalPage({ params }: PageProps) {
  const { id } = await params;
  const business = await findBusinessOverviewById(id);
  if (!business) notFound();

  const demoAccount = "1-1-001";

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: appRoutes.child.dashboard },
          { label: "Usaha", href: appRoutes.child.businesses },
          { label: business.name, href: appRoutes.child.business(business.id) },
          { label: "Jurnal" },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Jurnal & Pembukuan"
          title={`Jurnal umum · ${business.name}`}
          description="Jurnal double-entry otomatis dari transaksi; halaman ini memuat kerangka navigasi ke buku besar & neraca saldo (PRD Modul 6)."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={appRoutes.child.journalLedger(business.id, demoAccount)}
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Buku besar (contoh akun)
          </Link>
          <Link
            href={appRoutes.child.journalTrialBalance(business.id)}
            className="inline-flex min-h-11 items-center rounded-full border border-border-subtle px-5 text-sm font-semibold text-foreground"
          >
            Neraca saldo
          </Link>
        </div>
      </PageCard>
    </PageShell>
  );
}
