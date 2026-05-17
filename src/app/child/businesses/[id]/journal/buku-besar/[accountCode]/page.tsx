import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string; accountCode: string }>;
}

export default async function BusinessLedgerPage({ params }: PageProps) {
  const { id, accountCode } = await params;
  const business = await findBusinessOverviewById(id);
  if (!business) notFound();
  const code = decodeURIComponent(accountCode);

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: appRoutes.child.dashboard },
          { label: "Usaha", href: appRoutes.child.businesses },
          { label: business.name, href: appRoutes.child.business(business.id) },
          { label: "Jurnal", href: appRoutes.child.journal(business.id) },
          { label: `Buku besar ${code}` },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Buku Besar"
          title={`Akun ${code}`}
          description="Mutasi debit/kredit dan saldo berjalan akan diisi dari `journal_lines` per akun (PRD F06-3)."
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
