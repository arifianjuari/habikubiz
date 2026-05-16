export const HabikuBizLandingPageWireframe = () => {
  const features = [{
    icon: 'UM',
    title: 'Kelola banyak usaha',
    text: 'Anak bisa punya usaha simulasi atau usaha nyata, lengkap dengan modal awal dan ringkasan kas.',
    tone: 'bg-indigo-50 border-indigo-100'
  }, {
    icon: 'HP',
    title: 'HPP mudah dipahami',
    text: 'Bahan baku, tenaga kerja, dan overhead dijelaskan dengan contoh sederhana untuk anak 10-15 tahun.',
    tone: 'bg-emerald-50 border-emerald-100'
  }, {
    icon: 'BK',
    title: 'Buku kas otomatis rapi',
    text: 'Setiap pemasukan dan pengeluaran langsung membentuk jurnal dan memperbarui laporan.',
    tone: 'bg-blue-50 border-blue-100'
  }, {
    icon: 'LV',
    title: 'Poin, badge, streak',
    text: 'Gamifikasi ringan menjaga motivasi tanpa mengubah aplikasi menjadi game penuh.',
    tone: 'bg-amber-50 border-amber-100'
  }];
  const steps = [['1', 'Orang tua daftar', 'Buat akun, tambah profil anak, dan set PIN aman.'], ['2', 'Anak buat usaha', 'Pilih simulasi atau nyata, lalu masukkan produk pertama.'], ['3', 'Catat dan belajar', 'Transaksi, HPP, aset, dan laporan berubah jadi pelajaran visual.']];
  const modules = ['Aset', 'Produk & HPP', 'Buku Kas', 'Jurnal', 'Laporan', 'Komentar Ortu'];
  return <div className="min-h-screen w-full bg-[#F9FAFB] font-sans text-[#111827]">
      <div className="mx-auto w-full max-w-[1440px] bg-white">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4F46E5] text-xl text-white">hb</div>
              <div>
                <div className="text-xl font-semibold">habiku-biz</div>
                <div className="text-xs font-normal text-[#6B7280]">Belajar bisnis sejak kecil</div>
              </div>
            </div>
            <nav className="hidden items-center gap-7 text-sm font-normal text-[#6B7280] md:flex">
              <a href="#fitur">Fitur</a>
              <a href="#alur">Alur</a>
              <a href="#parent">Orang Tua</a>
              <a href="#keamanan">Keamanan</a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="hidden min-h-11 rounded-full px-5 text-sm font-medium text-[#4F46E5] md:block">Masuk</button>
              <button className="min-h-11 rounded-full bg-[#4F46E5] px-5 text-sm font-medium text-white shadow-lg shadow-indigo-200">Coba Gratis</button>
            </div>
          </div>
        </header>

        <section className="grid gap-10 px-5 pb-12 pt-10 md:px-10 lg:grid-cols-[0.94fr_1.06fr] lg:px-16 lg:pb-20 lg:pt-16">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 ring-1 ring-amber-100">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Platform edukasi UMKM untuk anak 10-15 tahun
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-[#111827] md:text-6xl">
              Anak belajar bisnis, orang tua bisa ikut membimbing.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6B7280]">
              habiku-biz mengubah pencatatan kas, HPP, aset, jurnal, dan laporan keuangan menjadi pengalaman belajar yang ramah anak, visual, dan tetap benar secara akuntansi UMKM.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="min-h-12 rounded-full bg-[#4F46E5] px-7 text-base font-semibold text-white shadow-xl shadow-indigo-200">
                Mulai Buat Profil Anak
              </button>
              <button className="min-h-12 rounded-full border border-slate-300 bg-white px-7 text-base font-semibold text-[#111827]">
                Lihat Demo Dashboard
              </button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              <Metric value="2+" label="mode usaha" />
              <Metric value="10" label="level pengusaha" />
              <Metric value="13" label="badge belajar" />
            </div>
          </div>

          <div className="relative min-h-[620px]">
            <div className="absolute right-0 top-0 hidden h-80 w-80 rounded-full bg-emerald-100 blur-3xl lg:block" />
            <div className="relative rounded-[32px] border border-slate-200 bg-slate-50 p-4 shadow-2xl shadow-slate-200">
              <div className="rounded-[24px] bg-white p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#4F46E5]">Dashboard Anak</div>
                    <div className="text-xs font-normal text-[#6B7280]">Usaha aktif: Stiker Keren</div>
                  </div>
                  <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Streak 7 hari</div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <DashboardCard label="Saldo kas" value="Rp185.000" tone="bg-emerald-50 text-emerald-700" />
                  <DashboardCard label="Poin" value="340" tone="bg-indigo-50 text-indigo-700" />
                  <DashboardCard label="Komentar" value="2 baru" tone="bg-blue-50 text-blue-700" />
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-[1fr_0.8fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="font-semibold">Arus Kas Bulan Ini</div>
                      <div className="text-xs font-medium text-[#6B7280]">Mei 2026</div>
                    </div>
                    <div className="flex h-52 items-end gap-3 rounded-2xl bg-slate-50 p-4">
                      {[65, 92, 54, 120, 86, 145, 110].map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2">
                          <div className="w-full rounded-t-xl bg-[#10B981]" style={{
                        height
                      }} />
                          <div className="h-2 w-5 rounded bg-slate-300" />
                        </div>)}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="font-semibold">Misi Hari Ini</div>
                    <div className="mt-4 space-y-3">
                      <Task done text="Catat pemasukan" />
                      <Task done text="Cek stok produk" />
                      <Task text="Baca komentar Ayah" />
                      <Task text="Buka laporan laba rugi" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 left-4 w-[260px] rounded-[34px] border-[10px] border-[#111827] bg-white p-3 shadow-2xl md:left-8">
              <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-slate-300" />
              <div className="rounded-[22px] bg-[#F9FAFB] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="font-semibold">Buku Kas</div>
                  <div className="h-8 w-8 rounded-full bg-[#4F46E5]" />
                </div>
                <button className="mb-4 min-h-11 w-full rounded-2xl bg-[#10B981] text-sm font-semibold text-white">+ Catat Pemasukan</button>
                <div className="space-y-3">
                  <MobileRow title="Jual 5 stiker" amount="+ Rp25.000" good />
                  <MobileRow title="Beli kertas" amount="- Rp12.000" />
                  <MobileRow title="Modal awal" amount="+ Rp100.000" good />
                </div>
                <div className="mt-5 grid grid-cols-5 gap-2 text-center text-[10px] font-medium text-[#6B7280]">
                  {['Br', 'Ks', 'Pr', 'Lp', 'Pf'].map(item => <div key={item} className="rounded-xl bg-white py-2">{item}</div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="fitur" className="bg-[#F9FAFB] px-5 py-14 md:px-10 lg:px-16">
          <SectionHeader eyebrow="Fitur inti" title="Serius untuk UMKM, tetap ringan untuk anak." text="Setiap modul saling terhubung: aset, HPP, transaksi, jurnal, laporan, komentar orang tua, dan gamifikasi." />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map(feature => <article key={feature.title} className={`rounded-2xl border p-6 ${feature.tone}`}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-[#4F46E5] shadow-sm">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-[#6B7280]">{feature.text}</p>
              </article>)}
          </div>
        </section>

        <section id="alur" className="px-5 py-14 md:px-10 lg:px-16">
          <SectionHeader eyebrow="Alur pertama" title="Dari daftar sampai transaksi pertama." text="Landing page diarahkan untuk mengaktivasi orang tua: daftar, buat profil anak, lalu mulai child mode." />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {steps.map(([number, title, text]) => <article key={number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#4F46E5] text-lg font-semibold text-white">{number}</div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-[#6B7280]">{text}</p>
              </article>)}
          </div>
        </section>

        <section id="parent" className="grid gap-8 bg-indigo-50 px-5 py-14 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-16">
          <div>
            <div className="mb-4 text-sm font-semibold uppercase text-[#4F46E5]">Untuk orang tua</div>
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">Pantau proses belajar tanpa mengambil alih usaha anak.</h2>
            <p className="mt-5 text-lg leading-8 text-[#6B7280]">
              Orang tua bisa melihat aktivitas, laporan, dan komentar pada transaksi atau laporan tertentu. Anak tetap menjadi pelaku utama pembelajaran.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {modules.map(module => <span key={module} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#4F46E5] shadow-sm">{module}</span>)}
            </div>
          </div>
          <div className="rounded-[28px] bg-white p-5 shadow-xl shadow-indigo-100">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="font-semibold">Dashboard Orang Tua</div>
                <div className="text-sm font-normal text-[#6B7280]">Ringkasan semua anak</div>
              </div>
              <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">2 notif</div>
            </div>
            <div className="space-y-4">
              <ParentRow child="Naya" biz="2 usaha aktif" points="340 poin" />
              <ParentRow child="Raka" biz="1 usaha aktif" points="120 poin" />
            </div>
            <div className="mt-5 rounded-2xl bg-[#F9FAFB] p-4">
              <div className="mb-2 text-sm font-semibold">Komentar terakhir</div>
              <p className="text-sm leading-6 text-[#6B7280]">"Coba cek lagi biaya bahan baku stiker. Apakah lem sudah masuk HPP?"</p>
            </div>
          </div>
        </section>

        <section id="keamanan" className="px-5 py-14 md:px-10 lg:px-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
            <InfoBlock icon="PIN" title="Child mode dengan PIN" text="Anak adalah sub-profil di bawah akun orang tua, bukan akun email mandiri." />
            <InfoBlock icon="RLS" title="Privasi data anak" text="Tidak ada profil publik. Akses data dibatasi melalui model keamanan Supabase RLS." />
            <InfoBlock icon="MOB" title="Mobile-first" text="Tap target minimal 44px, bottom navigation mobile, dan siap untuk Capacitor." />
          </div>
        </section>

        <section className="px-5 pb-16 md:px-10 lg:px-16">
          <div className="rounded-[32px] bg-[#111827] p-8 text-white md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="mb-4 text-sm font-semibold uppercase text-emerald-300">Siap mulai?</div>
                <h2 className="text-3xl font-semibold md:text-5xl">Bantu anak belajar mengelola usaha pertama mereka.</h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Mulai dari profil anak, usaha pertama, sampai laporan keuangan yang bisa dipahami bersama.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <button className="min-h-12 rounded-full bg-white px-7 font-semibold text-[#111827]">Daftar Sebagai Orang Tua</button>
                <button className="min-h-12 rounded-full border border-white/30 px-7 font-semibold text-white">Pelajari Modul</button>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 px-5 py-8 md:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-4 text-sm font-normal text-[#6B7280] md:flex-row">
            <div>habiku-biz · Platform edukasi manajemen usaha UMKM untuk anak</div>
            <div className="flex gap-5">
              <span>Privasi Anak</span>
              <span>Ketentuan</span>
              <span>Bantuan</span>
            </div>
          </div>
        </footer>
      </div>
    </div>;
};
const Metric = ({
  value,
  label
}: {
  value: string;
  label: string;
}) => <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="text-2xl font-semibold text-[#4F46E5]">{value}</div>
    <div className="mt-1 text-xs font-medium uppercase text-[#6B7280]">{label}</div>
  </div>;
const DashboardCard = ({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone: string;
}) => <div className={`rounded-2xl p-4 ${tone}`}>
    <div className="text-xs font-semibold uppercase">{label}</div>
    <div className="mt-2 text-xl font-semibold">{value}</div>
  </div>;
const Task = ({
  text,
  done = false
}: {
  text: string;
  done?: boolean;
}) => <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
    <div className={`h-5 w-5 rounded-full ${done ? 'bg-[#10B981]' : 'border-2 border-slate-300 bg-white'}`} />
    <div className="text-sm font-medium text-[#111827]">{text}</div>
  </div>;
const MobileRow = ({
  title,
  amount,
  good = false
}: {
  title: string;
  amount: string;
  good?: boolean;
}) => <div className="flex items-center justify-between rounded-2xl bg-white p-3">
    <div className="text-xs font-medium text-[#111827]">{title}</div>
    <div className={`text-xs font-semibold ${good ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>{amount}</div>
  </div>;
const SectionHeader = ({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) => <div className="max-w-3xl">
    <div className="mb-3 text-sm font-semibold uppercase text-[#4F46E5]">{eyebrow}</div>
    <h2 className="text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
    <p className="mt-4 text-lg leading-8 text-[#6B7280]">{text}</p>
  </div>;
const ParentRow = ({
  child,
  biz,
  points
}: {
  child: string;
  biz: string;
  points: string;
}) => <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-800">NJ</div>
      <div>
        <div className="font-semibold">{child}</div>
        <div className="text-sm font-normal text-[#6B7280]">{biz}</div>
      </div>
    </div>
    <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{points}</div>
  </div>;
const InfoBlock = ({
  icon,
  title,
  text
}: {
  icon: string;
  title: string;
  text: string;
}) => <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xs font-semibold text-[#4F46E5]">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="mt-3 leading-7 text-[#6B7280]">{text}</p>
  </article>;