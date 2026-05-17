import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportNeracaPage({ params }: PageProps) {
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
          { label: "Laporan", href: appRoutes.child.reports(business.id) },
          { label: "Neraca" },
        ]}
      />
      <PageCard>
        <PageHeader
          eyebrow="Laporan"
          title={`Neraca · ${business.name}`}
          description="Balance sheet aset vs liabilitas + modal (PRD F07-3, stub)."
          action={
            <Link href={appRoutes.child.reports(business.id)} className="text-sm font-semibold text-primary hover:underline">
              Indeks laporan
            </Link>
          }
        />
      </PageCard>
    </PageShell>
  );
}
