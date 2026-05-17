import Link from "next/link";

import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";
import { formatIdr } from "@/lib/format-currency";
import { listBusinessOverviews } from "@/server/repositories/business.repository";
import { listChildSummaries } from "@/server/repositories/child.repository";

export default async function ParentChildrenPage() {
  const children = await listChildSummaries();
  const businesses = await listBusinessOverviews();

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          eyebrow="Keluarga"
          title="Profil anak & usaha mereka"
          description="Orang tua mengelola sub-profil anak dan dapat membuka ringkasan monitor per usaha (read-only + komentar, PRD Modul 8)."
          action={
            <Link
              href={appRoutes.parent.childrenNew}
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              + Profil anak baru
            </Link>
          }
        />
      </PageCard>

      <div className="flex flex-col gap-6">
        {children.map((child) => {
          const childBiz = businesses.filter((b) => b.childId === child.id);
          return (
            <PageCard key={child.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-foreground">{child.name}</h2>
                    <Link
                      href={appRoutes.parent.childEdit(child.id)}
                      className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Edit / hapus
                    </Link>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Lahir {child.birthYear} · {childBiz.length} usaha
                  </p>
                </div>
                <span className="rounded-full bg-warning/15 px-3 py-1 text-sm font-semibold text-warning">
                  {child.initials}
                </span>
              </div>
              <ul className="mt-5 flex flex-col gap-3">
                {childBiz.length === 0 ? (
                  <li className="text-sm text-muted-foreground">Belum ada usaha untuk anak ini.</li>
                ) : (
                  childBiz.map((b) => (
                    <li key={b.id}>
                      <Link
                        href={appRoutes.parent.businessOverview(child.id, b.id)}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-surface px-4 py-3 text-sm transition hover:border-primary"
                      >
                        <span className="font-semibold text-foreground">{b.name}</span>
                        <span className="text-muted-foreground">Kas {formatIdr(b.estimatedCashRp)}</span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </PageCard>
          );
        })}
      </div>
    </PageShell>
  );
}
