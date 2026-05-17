import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportArusKasPage({ params }: PageProps) {
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
          { label: "Arus kas" },
        ]}
      />
      <PageCard>
        <PageHeader
          eyebrow="Laporan"
          title={`Arus Kas · ${business.name}`}
          description="Operasi, investasi, pendanaan — sesuai PRD F07-2 (stub)."
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
