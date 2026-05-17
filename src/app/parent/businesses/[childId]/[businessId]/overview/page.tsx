import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { formatIdr } from "@/lib/format-currency";
import { findBusinessOverviewById } from "@/server/repositories/business.repository";
import { findChildSummaryById } from "@/server/repositories/child.repository";

interface PageProps {
  params: Promise<{ childId: string; businessId: string }>;
}

export default async function ParentBusinessOverviewPage({ params }: PageProps) {
  const { childId, businessId } = await params;
  const child = await findChildSummaryById(childId);
  const business = await findBusinessOverviewById(businessId);
  if (!child || !business || business.childId !== child.id) notFound();

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: appRoutes.parent.dashboard },
          { label: "Anak", href: appRoutes.parent.children },
          { label: child.name },
          { label: business.name },
        ]}
      />

      <PageCard>
        <PageHeader
          eyebrow="Monitor orang tua"
          title={`${business.name}`}
          description={`Usaha milik ${child.name}. Tampilan read-only; sunting data tetap di mode anak.`}
          action={
            <div className="rounded-full bg-secondary/15 px-4 py-2 text-sm font-semibold text-secondary">
              Kas {formatIdr(business.estimatedCashRp)}
            </div>
          }
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={appRoutes.child.reports(business.id)}
            className="inline-flex min-h-11 items-center rounded-full border border-border-subtle px-5 text-sm font-semibold text-foreground"
          >
            Lihat laporan (mode anak)
          </Link>
          <Link
            href={appRoutes.parent.comments}
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Beri komentar
          </Link>
        </div>
      </PageCard>

      <PageCard>
        <p className="text-sm leading-7 text-muted-foreground">
          Halaman ini akan menampilkan ringkasan aktivitas, milestone gamifikasi, dan tautan ke objek spesifik saat backend siap.
        </p>
      </PageCard>
    </PageShell>
  );
}
