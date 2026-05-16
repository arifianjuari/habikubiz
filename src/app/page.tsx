import { SociabuzzSupportWidget } from "@/components/sociabuzz-support-widget";
import { cn } from "@/lib/utils";

export default function Home() {
  const features = [
    {
      icon: "UM",
      title: "Kelola banyak usaha",
      text: "Anak bisa punya usaha simulasi atau usaha nyata, lengkap dengan modal awal dan ringkasan kas.",
      tone: "border-primary/15 bg-primary-soft",
    },
    {
      icon: "HP",
      title: "HPP mudah dipahami",
      text: "Bahan baku, tenaga kerja, dan overhead dijelaskan dengan contoh sederhana untuk anak 10-15 tahun.",
      tone: "border-secondary/20 bg-secondary/10",
    },
    {
      icon: "BK",
      title: "Buku kas otomatis rapi",
      text: "Setiap pemasukan dan pengeluaran langsung membentuk jurnal dan memperbarui laporan.",
      tone: "border-info/20 bg-info/10",
    },
    {
      icon: "LV",
      title: "Poin, badge, streak",
      text: "Gamifikasi ringan menjaga motivasi tanpa mengubah aplikasi menjadi game penuh.",
      tone: "border-warning/25 bg-warning/10",
    },
  ];

  const steps = [
    ["1", "Orang tua daftar", "Buat akun, tambah profil anak, dan set PIN aman."],
    ["2", "Anak buat usaha", "Pilih simulasi atau nyata, lalu masukkan produk pertama."],
    ["3", "Catat dan belajar", "Transaksi, HPP, aset, dan laporan berubah jadi pelajaran visual."],
  ] as const;

  const modules = ["Aset", "Produk & HPP", "Buku Kas", "Jurnal", "Laporan", "Komentar Ortu"];

  return (
    <div className="min-h-screen w-full bg-surface font-sans text-foreground">
      <SociabuzzSupportWidget />
      <a
        href="https://sociabuzz.com/habiku"
        target="_blank"
        rel="noreferrer"
        aria-label="Beri dukungan melalui Sociabuzz"
        className="fixed bottom-6 right-6 z-[9999999] inline-flex min-h-[47px] max-w-[220px] items-center justify-center rounded-full border border-[#76CC11] bg-[#76CC11] px-4 py-3 text-center text-sm font-extrabold leading-[140%] text-white shadow-xl shadow-black/20"
      >
        Beri dukungan
      </a>
      <div className="mx-auto w-full max-w-[1440px] bg-background">
        <header className="sticky top-0 border-b border-border-subtle bg-background/95 px-5 py-4 backdrop-blur md:px-10 lg:px-16">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-xl text-primary-foreground">hb</div>
              <div>
                <div className="text-xl font-semibold">habiku-biz</div>
                <div className="text-xs font-normal text-muted-foreground">Belajar bisnis sejak kecil</div>
              </div>
            </div>
            <nav className="hidden items-center gap-7 text-sm font-normal text-muted-foreground md:flex">
              <a href="#fitur">Fitur</a>
              <a href="#alur">Alur</a>
              <a href="#parent">Orang Tua</a>
              <a href="#keamanan">Keamanan</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="/login" className="hidden min-h-11 rounded-full px-5 text-sm font-medium text-primary md:flex md:items-center">Masuk Ortu</a>
              <a href="/login" className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25">
                Mulai Sekarang
              </a>
            </div>
          </div>
        </header>

        <section className="grid gap-10 px-5 pb-12 pt-10 md:px-10 lg:grid-cols-[0.94fr_1.06fr] lg:px-16 lg:pb-20 lg:pt-16">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-warning/10 px-4 py-2 text-sm font-medium text-warning ring-1 ring-warning/25">
              <span className="size-2 rounded-full bg-warning" />
              Platform edukasi UMKM untuk anak 10-15 tahun
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-foreground md:text-6xl">
              Anak belajar bisnis, orang tua bisa ikut membimbing.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              habiku-biz mengubah pencatatan kas, HPP, aset, jurnal, dan laporan keuangan menjadi pengalaman belajar yang ramah anak, visual, dan tetap benar secara akuntansi UMKM.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/login" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25">
                Mulai Buat Profil Anak
              </a>
              <a href="#alur" className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-subtle bg-background px-7 text-base font-semibold text-foreground">
                Lihat Alur App
              </a>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
              <Metric value="2+" label="mode usaha" />
              <Metric value="10" label="level pengusaha" />
              <Metric value="13" label="badge belajar" />
            </div>
          </div>

          <div className="relative min-h-[620px]">
            <div className="absolute right-0 top-0 hidden size-80 rounded-full bg-secondary/20 blur-3xl lg:block" />
            <div className="relative rounded-[32px] border border-border-subtle bg-surface p-4 shadow-2xl shadow-border-subtle/40">
              <div className="rounded-[24px] bg-background p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-primary">Dashboard Anak</div>
                    <div className="text-xs font-normal text-muted-foreground">Usaha aktif: Stiker Keren</div>
                  </div>
                  <div className="rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-warning">Streak 7 hari</div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <DashboardCard label="Saldo kas" value="Rp185.000" tone="bg-secondary/10 text-secondary" />
                  <DashboardCard label="Poin" value="340" tone="bg-primary-soft text-primary" />
                  <DashboardCard label="Komentar" value="2 baru" tone="bg-info/10 text-info" />
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-[1fr_0.8fr]">
                  <div className="rounded-2xl border border-border-subtle bg-background p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="font-semibold">Arus Kas Bulan Ini</div>
                      <div className="text-xs font-medium text-muted-foreground">Mei 2026</div>
                    </div>
                    <div className="flex h-52 items-end gap-3 rounded-2xl bg-surface p-4">
                      {[65, 92, 54, 120, 86, 145, 110].map((height, index) => (
                        <div key={index} className="flex flex-1 flex-col items-center gap-2">
                          <div className="w-full rounded-t-xl bg-secondary" style={{ height }} />
                          <div className="h-2 w-5 rounded bg-border-subtle" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border-subtle bg-background p-4">
                    <div className="font-semibold">Misi Hari Ini</div>
                    <div className="mt-4 flex flex-col gap-3">
                      <Task done text="Catat pemasukan" />
                      <Task done text="Cek stok produk" />
                      <Task text="Baca komentar Ayah" />
                      <Task text="Buka laporan laba rugi" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 left-4 w-[260px] rounded-[34px] border-[10px] border-foreground bg-background p-3 shadow-2xl md:left-8">
              <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-border-subtle" />
              <div className="rounded-[22px] bg-surface p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="font-semibold text-foreground">Buku Kas</div>
                  <div className="size-8 rounded-full bg-primary" />
                </div>
                <button type="button" className="mb-4 min-h-11 w-full rounded-2xl bg-secondary text-sm font-semibold text-secondary-foreground">+ Catat Pemasukan</button>
                <div className="flex flex-col gap-3">
                  <MobileRow title="Jual 5 stiker" amount="+ Rp25.000" good />
                  <MobileRow title="Beli kertas" amount="- Rp12.000" />
                  <MobileRow title="Modal awal" amount="+ Rp100.000" good />
                </div>
                <div className="mt-5 grid grid-cols-5 gap-2 text-center text-[10px] font-medium text-muted-foreground">
                  {["Br", "Ks", "Pr", "Lp", "Pf"].map((item) => (
                    <div key={item} className="rounded-xl bg-background py-2">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="fitur" className="bg-surface px-5 py-14 md:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Fitur inti"
            title="Serius untuk UMKM, tetap ringan untuk anak."
            text="Setiap modul saling terhubung: aset, HPP, transaksi, jurnal, laporan, komentar orang tua, dan gamifikasi."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article key={feature.title} className={cn("rounded-2xl border p-6", feature.tone)}>
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-background text-sm font-semibold text-primary shadow-sm">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="alur" className="px-5 py-14 md:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Alur pertama"
            title="Dari daftar sampai transaksi pertama."
            text="Landing page diarahkan untuk mengaktivasi orang tua: daftar, buat profil anak, lalu mulai child mode."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {steps.map(([number, title, text]) => (
              <article key={number} className="rounded-2xl border border-border-subtle bg-background p-6 shadow-sm">
                <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">{number}</div>
                <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="parent" className="grid gap-8 bg-primary-soft/50 px-5 py-14 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-16">
          <div>
            <div className="mb-4 text-sm font-semibold uppercase text-primary">Untuk orang tua</div>
            <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">Pantau proses belajar tanpa mengambil alih usaha anak.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Orang tua bisa melihat aktivitas, laporan, dan komentar pada transaksi atau laporan tertentu. Anak tetap menjadi pelaku utama pembelajaran.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {modules.map((module) => (
                <span key={module} className="rounded-full bg-background px-4 py-2 text-sm font-medium text-primary shadow-sm">{module}</span>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-background p-5 shadow-xl shadow-primary/10">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">Dashboard Orang Tua</div>
                <div className="text-sm font-normal text-muted-foreground">Ringkasan semua anak</div>
              </div>
              <div className="rounded-full bg-danger/15 px-3 py-1 text-xs font-semibold text-danger">2 notif</div>
            </div>
            <div className="flex flex-col gap-4">
              <ParentRow child="Naya" biz="2 usaha aktif" points="340 poin" initials="NY" />
              <ParentRow child="Raka" biz="1 usaha aktif" points="120 poin" initials="RK" />
            </div>
            <div className="mt-5 rounded-2xl bg-surface p-4">
              <div className="mb-2 text-sm font-semibold text-foreground">Komentar terakhir</div>
              <p className="text-sm leading-6 text-muted-foreground">
                &ldquo;Coba cek lagi biaya bahan baku stiker. Apakah lem sudah masuk HPP?&rdquo;
              </p>
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
          <div className="rounded-[32px] bg-foreground p-8 text-background md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="mb-4 text-sm font-semibold uppercase text-secondary/90">Siap mulai?</div>
                <h2 className="text-3xl font-semibold text-background md:text-5xl">Bantu anak belajar mengelola usaha pertama mereka.</h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-background/75">Mulai dari profil anak, usaha pertama, sampai laporan keuangan yang bisa dipahami bersama.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a href="/login" className="inline-flex min-h-12 items-center justify-center rounded-full bg-background px-7 font-semibold text-foreground">Daftar Sebagai Orang Tua</a>
                <a href="#fitur" className="inline-flex min-h-12 items-center justify-center rounded-full border border-background/30 px-7 font-semibold text-background">Pelajari Modul</a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-border-subtle px-5 py-8 md:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-4 text-sm font-normal text-muted-foreground md:flex-row">
            <div>habiku-biz · Platform edukasi manajemen usaha UMKM untuk anak</div>
            <div className="flex gap-5">
              <span>Privasi Anak</span>
              <span>Ketentuan</span>
              <span>Bantuan</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-background p-4 shadow-sm">
      <div className="text-2xl font-semibold text-primary">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase text-muted-foreground">{label}</div>
    </div>
  );
}

function DashboardCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={cn("rounded-2xl p-4", tone)}>
      <div className="text-xs font-semibold uppercase">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

function Task({ text, done = false }: { text: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface p-3">
      <div
        className={cn(
          "size-5 rounded-full",
          done ? "bg-secondary" : "border-2 border-border-subtle bg-background",
        )}
      />
      <div className="text-sm font-medium text-foreground">{text}</div>
    </div>
  );
}

function MobileRow({ title, amount, good = false }: { title: string; amount: string; good?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-background p-3">
      <div className="text-xs font-medium text-foreground">{title}</div>
      <div className={`text-xs font-semibold ${good ? "text-secondary" : "text-danger"}`}>{amount}</div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-3 text-sm font-semibold uppercase text-primary">{eyebrow}</div>
      <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">{text}</p>
    </div>
  );
}

function ParentRow({ child, biz, points, initials }: { child: string; biz: string; points: string; initials: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border-subtle p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-warning/15 text-sm font-semibold text-warning">{initials}</div>
        <div>
          <div className="font-semibold text-foreground">{child}</div>
          <div className="text-sm font-normal text-muted-foreground">{biz}</div>
        </div>
      </div>
      <div className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">{points}</div>
    </div>
  );
}

function InfoBlock({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-border-subtle bg-background p-6 shadow-sm">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-surface text-xs font-semibold text-primary">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
    </article>
  );
}
