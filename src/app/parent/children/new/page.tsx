export default function NewChildProfilePage() {
  return (
    <main className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="max-w-2xl">
        <div className="text-sm font-semibold uppercase text-[#4F46E5]">Setup Profil Anak</div>
        <h1 className="mt-2 text-3xl font-semibold text-[#111827]">Buat profil anak pertama</h1>
        <p className="mt-3 text-sm leading-7 text-[#6B7280]">
          Buat profil anak terlebih dahulu agar mereka bisa masuk ke child mode dan mulai belajar mengelola usaha.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">Nama anak</label>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]" placeholder="Contoh: Naya" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">Tahun lahir</label>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]" placeholder="Contoh: 2014" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">Avatar / inisial</label>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]" placeholder="Contoh: NJ" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">PIN child mode</label>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]" placeholder="4 digit PIN" />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="button" className="min-h-12 rounded-full bg-[#4F46E5] px-6 text-sm font-semibold text-white">
              Simpan Profil Anak
            </button>
            <a
              href="/parent/dashboard"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 text-sm font-semibold text-[#111827]"
            >
              Kembali
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
