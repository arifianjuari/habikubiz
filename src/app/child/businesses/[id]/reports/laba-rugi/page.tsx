import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportLabaRugiPage({ params }: PageProps) {
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
          { label: "Laba rugi" },
        ]}
      />
      <PageCard>
        <PageHeader
          eyebrow="Laporan"
          title={`Laba Rugi · ${business.name}`}
          description="Pendapatan, HPP, laba kotor, beban, laba bersih — sesuai PRD F07-1 (stub)."
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
