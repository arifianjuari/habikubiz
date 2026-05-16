import Link from "next/link";

import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";

export default function ChildProfilePage() {
  return (
    <PageShell>
      <PageCard>
        <PageHeader
          eyebrow="Profil"
          title="Profil anak (segera)"
          description="Halaman ini akan berisi pengaturan profil, avatar, dan PIN child mode setelah terhubung ke Supabase."
        />
        <p className="mt-4 text-sm text-muted-foreground">
          Untuk sementara gunakan opsi &quot;Profil anak aktif&quot; di dashboard untuk mengganti konteks belajar.
        </p>
        <div className="mt-6">
          <Link href="/child/dashboard" className="text-sm font-semibold text-primary hover:underline">
            Kembali ke dashboard
          </Link>
        </div>
      </PageCard>
    </PageShell>
  );
}
