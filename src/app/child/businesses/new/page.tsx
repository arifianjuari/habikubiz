import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";

export default function NewBusinessPage() {
  return (
    <PageShell>
      <PageCard>
      <div className="max-w-2xl">
        <PageHeader title="Buat Usaha Baru" description="Mulai dari usaha sederhana dulu. Nanti detail lain bisa dilengkapi bertahap." />

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">Nama usaha</label>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]" placeholder="Contoh: Stiker Keren" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">Jenis usaha</label>
            <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]">
              <option>Simulasi</option>
              <option>Nyata</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">Kategori</label>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]" placeholder="Contoh: Kerajinan" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">Modal awal</label>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]" placeholder="Contoh: 100000" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">Deskripsi singkat</label>
            <textarea className="min-h-28 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]" placeholder="Ceritakan usaha ini secara singkat" />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="button" className="min-h-12 rounded-full bg-[#4F46E5] px-6 text-sm font-semibold text-white">
              Simpan Usaha
            </button>
            <button type="button" className="min-h-12 rounded-full border border-slate-300 px-6 text-sm font-semibold text-[#111827]">
              Batal
            </button>
          </div>
        </form>
      </div>
      </PageCard>
    </PageShell>
  );
}
