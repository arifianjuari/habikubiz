import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string; assetId: string }>;
}

export default async function BusinessAssetDetailPage({ params }: PageProps) {
  const { id, assetId } = await params;
  const business = await findBusinessOverviewById(id);
  if (!business) notFound();

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: appRoutes.child.dashboard },
          { label: "Usaha", href: appRoutes.child.businesses },
          { label: business.name, href: appRoutes.child.business(business.id) },
          { label: "Aset", href: appRoutes.child.assets(business.id) },
          { label: `Aset ${assetId}` },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Detail Aset"
          title="Contoh aset (stub)"
          description={`Usaha: ${business.name}. Tampilan riwayat depresiasi dan jurnal terkait akan dibangun melanjutkan PRD F03-3.`}
          action={
            <Link
              href={appRoutes.child.assets(business.id)}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Kembali ke daftar
            </Link>
          }
        />
      </PageCard>
    </PageShell>
  );
}
