import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessAssetsPage({ params }: PageProps) {
  const { id } = await params;
  const business = await findBusinessOverviewById(id);
  if (!business) notFound();

  const demoAssetId = "demo-asset-1";

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: appRoutes.child.dashboard },
          { label: "Usaha", href: appRoutes.child.businesses },
          { label: business.name, href: appRoutes.child.business(business.id) },
          { label: "Aset" },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Manajemen Aset"
          title={`Aset · ${business.name}`}
          description="Daftar aset, depresiasi garis lurus, dan rekap nilai buku (stub PRD Modul 3)."
          action={
            <Link
              href={appRoutes.child.assetDetail(business.id, demoAssetId)}
              className="inline-flex min-h-11 items-center rounded-full border border-border-subtle px-5 text-sm font-semibold text-foreground"
            >
              Buka contoh detail
            </Link>
          }
        />
      </PageCard>

      <PageCard>
        <p className="text-sm leading-7 text-muted-foreground">
          Halaman ini menjadi titik masuk CRUD aset, upload foto, dan jurnal perolehan. Data akan terhubung ke skema Supabase
          setelah migrasi penuh.
        </p>
      </PageCard>
    </PageShell>
  );
}
