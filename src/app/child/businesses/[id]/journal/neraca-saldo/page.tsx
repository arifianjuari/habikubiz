import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessTrialBalancePage({ params }: PageProps) {
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
          { label: "Jurnal", href: appRoutes.child.journal(business.id) },
          { label: "Neraca saldo" },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Neraca Saldo"
          title={`Cek balance · ${business.name}`}
          description="Tabel neraca saldo dan status Balance / Tidak Balance mengikuti PRD F06-4."
          action={
            <Link href={appRoutes.child.journal(business.id)} className="text-sm font-semibold text-primary hover:underline">
              Kembali ke jurnal
            </Link>
          }
        />
      </PageCard>
    </PageShell>
  );
}
