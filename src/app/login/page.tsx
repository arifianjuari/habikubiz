import { LoginForm } from "./login-form";

function StepCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-background p-5">
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {number}
      </div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-10 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <LoginForm />

        <section className="rounded-3xl bg-primary-soft/60 p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase text-primary">Alur setelah login</div>
          <div className="mt-6 flex flex-col gap-4">
            <StepCard number="1" title="Buat profil anak" text="Tambah nama anak, avatar, dan PIN untuk child mode." />
            <StepCard number="2" title="Buat usaha pertama" text="Mulai dari usaha simulasi atau usaha nyata yang sederhana." />
            <StepCard number="3" title="Masuk ke dashboard" text="Anak mulai belajar mencatat usaha, orang tua memantau progress-nya." />
          </div>
        </section>
      </div>
    </main>
  );
}
