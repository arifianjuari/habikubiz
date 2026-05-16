import { PageCard, PageHeader } from "@/components/ui-shell/page-shell";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] px-6 py-10 text-[#111827]">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <PageCard>
          <PageHeader eyebrow="Login Orang Tua" title="Masuk untuk mulai mendampingi usaha anak" description="Masuk sebagai orang tua untuk mulai membuat profil anak, menyiapkan usaha pertama, dan mendampingi proses belajarnya." />

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="nama@email.com"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button type="button" className="min-h-12 rounded-full bg-[#4F46E5] px-6 text-sm font-semibold text-white">
                Masuk
              </button>
              <button type="button" className="min-h-12 rounded-full border border-slate-300 px-6 text-sm font-semibold text-[#111827]">
                Masuk dengan Google
              </button>
            </div>
          </form>
        </PageCard>

        <section className="rounded-3xl bg-indigo-50 p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase text-[#4F46E5]">Alur setelah login</div>
          <div className="mt-6 space-y-4">
            <StepCard number="1" title="Buat profil anak" text="Tambah nama anak, avatar, dan PIN untuk child mode." />
            <StepCard number="2" title="Buat usaha pertama" text="Mulai dari usaha simulasi atau usaha nyata yang sederhana." />
            <StepCard number="3" title="Masuk ke dashboard" text="Anak mulai belajar mencatat usaha, orang tua memantau progress-nya." />
          </div>
        </section>
      </div>
    </main>
  );
}

function StepCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#4F46E5] text-sm font-semibold text-white">{number}</div>
      <h2 className="text-lg font-semibold text-[#111827]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
    </div>
  );
}
