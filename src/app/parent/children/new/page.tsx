import { ChildCreateForm } from "@/app/parent/children/new/child-create-form";

export default function NewChildProfilePage() {
  return (
    <main className="rounded-3xl border border-border-subtle bg-background p-8 shadow-sm">
      <div className="max-w-2xl">
        <div className="text-sm font-semibold uppercase text-primary">Setup Profil Anak</div>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">Buat profil anak</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Buat profil anak agar mereka bisa masuk ke child mode dan mulai belajar mengelola usaha. Data tersimpan di akun
          Supabase Anda.
        </p>

        <ChildCreateForm />
      </div>
    </main>
  );
}
