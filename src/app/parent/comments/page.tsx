import Link from "next/link";

import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { appRoutes } from "@/lib/app-routes";

const DEMO_THREAD = [
  {
    id: "c1",
    child: "Naya",
    business: "Stiker Keren",
    excerpt: "Coba cek lagi biaya bahan baku stiker. Apakah lem sudah masuk HPP?",
    readByChild: false,
    at: "2 jam lalu",
  },
  {
    id: "c2",
    child: "Raka",
    business: "Snack Kelas",
    excerpt: "Bagus, pertahankan pencatatan harian. Besok kita lihat laba rugi bareng.",
    readByChild: true,
    at: "Kemarin",
  },
] as const;

export default function ParentCommentsPage() {
  return (
    <PageShell>
      <PageCard>
        <PageHeader
          eyebrow="Monitor"
          title="Komentar & arahan"
          description="Riwayat komentar ke anak pada transaksi, laporan, HPP, atau aset (stub PRD F08-4 — F08-5). Filter anak/usaha akan terhubung ke Supabase."
          action={
            <Link
              href={appRoutes.parent.dashboard}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Kembali ke dashboard
            </Link>
          }
        />
      </PageCard>

      <PageCard>
        <ul className="flex flex-col gap-4">
          {DEMO_THREAD.map((row) => (
            <li key={row.id} className="rounded-2xl border border-border-subtle bg-background p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>
                  {row.child} · {row.business}
                </span>
                <span>{row.at}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground">{row.excerpt}</p>
              <div className="mt-3 text-xs font-medium text-muted-foreground">
                Status anak: {row.readByChild ? "Sudah dibaca" : "Belum dibaca"}
              </div>
            </li>
          ))}
        </ul>
      </PageCard>
    </PageShell>
  );
}
