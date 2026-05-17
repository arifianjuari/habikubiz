# Fase Pengembangan — HabikuBiz

Roadmap eksekusi yang membreakdown [`PRD_HabikuBiz_v1.0_Draft.md`](./PRD_HabikuBiz_v1.0_Draft.md) menjadi fase iteratif yang **ship-able** (bisa rilis sebagian) dan selaras dengan best-practice di [`.agents/skills/`](../.agents/skills/) — terutama:

- **Vercel React** — server-first di RSC, parallel fetching, kurangi waterfall, hindari barrel import, SWR untuk klien, `React.cache()` untuk dedup per request.
- **Supabase** — RLS di semua tabel `public`, jangan pakai `user_metadata` untuk otorisasi, gunakan `getUser()` (bukan `getSession()`) di server.
- **shadcn/ui** — komponen dulu (Form/Field/Dialog/Sheet/Sonner), `cn()` untuk class kondisional, semantic token (`bg-primary`, `text-muted-foreground`).
- **Tailwind v4** — token OKLCH di `@theme` (sudah ada di [`globals.css`](../src/app/globals.css)), `gap-*` bukan `space-y-*`.
- **TypeScript advanced types** — discriminated union untuk hasil jurnal/laporan, `Pick`/`Omit`/`Record` untuk DTO, hindari `any`.
- **Accessibility (a11y)** — semantic HTML, label terikat input, `aria-invalid`, fokus keyboard, target sentuh ≥ 44×44px (juga PRD §13).
- **Web design guidelines** — review UI tiap akhir fase.

Konvensi versi & milestone selaras roadmap PRD (§12). Setiap fase = 1 milestone repo, dengan **definition of done** dan **risiko** sendiri.

---

## Status saat ini (snapshot)

- Stack: Next.js 16 (App Router), React 19, Tailwind v4, Supabase SSR, Zustand 5 — lihat [`package.json`](../package.json).
- Auth dasar + middleware sesi: [`src/middleware.ts`](../src/middleware.ts), [`src/lib/supabase/*`](../src/lib/supabase/).
- Migrasi awal: hanya `children` + `businesses` ([`supabase/migrations/20260516103000_init_schema.sql`](../supabase/migrations/20260516103000_init_schema.sql)).
- **Shell UI lengkap** (anak: bottom nav 5 tab + sidebar; ortu: sidebar; lonceng notifikasi dummy; stub aset/jurnal/laporan/monitor) — lihat [`src/components/layout/`](../src/components/layout/), [`src/lib/app-routes.ts`](../src/lib/app-routes.ts).
- Engine jurnal awal + tes: [`src/lib/journal-engine.ts`](../src/lib/journal-engine.ts).
- Lihat juga [`NEXT_STEPS_FOUNDATION.md`](./NEXT_STEPS_FOUNDATION.md).

**Belum ada:** skema penuh, RLS lengkap, CRUD nyata, gamifikasi, notifikasi nyata, PDF/Excel, PIN child mode, Capacitor.

---

## Ringkasan fase

| Fase | Nama | Target durasi | Output utama | Status |
|---|---|---|---|---|
| 0 | Foundation (Auth + Skema + Shell) | 1–2 minggu | Auth ortu, profil anak + PIN, skema penuh, RLS, shell siap | **shell selesai** · DB belum |
| 1 | Modul Usaha + COA | 1 minggu | CRUD usaha, Chart of Accounts auto, switcher konteks nyata | belum |
| 2 | Aset + HPP | 1–2 minggu | CRUD aset, depresiasi garis lurus, produk + komponen HPP | belum |
| 3 | Buku Kas + Auto-Jurnal | 1–2 minggu | Transaksi, jurnal double-entry, buku besar, neraca saldo | belum |
| 4 | Laporan Keuangan + Export | 2 minggu | L/R, Arus Kas, Neraca, Rekap Aset, grafik, PDF/Excel | belum |
| 5 | Monitor Orang Tua + Komentar | 1 minggu | Read-only ortu, komentar berbagai konteks, realtime | belum |
| 6 | Gamifikasi + Notifikasi | 1 minggu | Poin, badge, streak, level, push notif | belum |
| 7 | P1 polish + Capacitor | 2 minggu | Onboarding wizard, upload foto, kategori custom, build Android | belum |

> Fase **bisa overlap**. Misalnya Fase 4 (laporan) bisa mulai paralel saat Fase 3 (jurnal) mendekati selesai karena DTO sudah jelas.

---

## Fase 0 — Foundation (Auth + Skema + Shell)

**Tujuan:** semua fitur berikutnya berdiri di atas auth + RLS yang benar, skema penuh, dan shell yang sudah ada.

### Scope

1. **Auth & profil keluarga** (PRD F00-1 … F00-5)
   - Verifikasi email + Google OAuth — sudah ada modal login [`src/app/login/login-form.tsx`](../src/app/login/login-form.tsx); tinggal pastikan flow lengkap.
   - CRUD profil anak: form di [`src/app/parent/children/new/page.tsx`](../src/app/parent/children/new/page.tsx) sudah ada → buat juga edit/hapus.
   - **PIN child mode** (server-side validation via Edge Function, hash bcrypt). PIN reset perlu re-auth password (PRD §11.4).
   - Ganti **toggle "Mode ortu/anak" di shell** ([`child-app-shell.tsx`](../src/components/layout/child-app-shell.tsx), [`parent-app-shell.tsx`](../src/components/layout/parent-app-shell.tsx)) jadi flow PIN nyata.
2. **Skema database penuh** (PRD §4)
   - Migrasi baru lewat `supabase migration new <name>` — jangan invent filename (skill Supabase).
   - Tambah: `profiles`, `assets`, `products`, `hpp_components`, `transactions`, `journal_entries`, `journal_lines`, `accounts`, `parent_comments`, `gamification_events`, `notifications`.
   - **Konversi** `children.id` & `businesses.id` dari `text` → `uuid` (saat ini text untuk seed demo) — atau pertahankan text untuk migrasi bertahap; putuskan eksplisit sebelum DB nyata diisi.
3. **RLS di semua tabel** (skill Supabase + PRD §11.1)
   - Parent: SELECT/INSERT/UPDATE/DELETE pada `children` & turunannya **via** `parent_user_id`.
   - Child mode di-enforce di klien + edge function PIN (RLS-nya tetap "milik orang tua").
   - Hindari memakai `user_metadata` untuk otorisasi; pakai `app_metadata` atau join via `children`.
   - **UPDATE perlu SELECT policy juga** (skill Supabase).
4. **Hydrate state dari server**
   - Ganti seed di [`src/stores/app-store.ts`](../src/stores/app-store.ts) dengan inisialisasi dari server (last-used child/business per user, persist di Postgres atau cookie). Saat ini sudah `persist` ke localStorage — versikan dan minim field (rule Vercel `client-localstorage-schema`).
5. **Repositori nyata**
   - Buang fallback mock di [`src/server/repositories/*`](../src/server/repositories/) saat tabel siap; pertahankan `React.cache()` per fungsi (skill Vercel `server-cache-react`).

### Definition of done

- [ ] Orang tua bisa: daftar, verifikasi email, login, set PIN anak, ganti mode dengan PIN.
- [ ] Semua tabel `public.*` punya RLS aktif; tes manual ortu A tidak bisa baca data ortu B.
- [ ] `npm run build` hijau, `npm test` hijau, `supabase db advisors` 0 issue serius.
- [ ] Dashboard ortu & anak memakai data Supabase (bukan mock) untuk profil & usaha.

### Risiko

- RLS salah → kebocoran data anak. **Mitigasi:** test policy dengan dua user, lewatkan `EXPLAIN` di SQL editor.
- PIN bocor → simpan **hash**, jangan pernah kirim plaintext ke klien.

---

## Fase 1 — Modul Usaha + Chart of Accounts

**Tujuan:** dasar untuk semua modul akuntansi: setiap usaha punya COA sendiri.

### Scope

- CRUD usaha (PRD F02-1 … F02-5) lewat **shadcn/ui Form + Field + Dialog**.
- Buat trigger / RPC SQL untuk **auto-generate COA default** saat `INSERT` ke `businesses` (Kas, Piutang, Persediaan, Aset Tetap, Modal, Pendapatan Penjualan, Beban TK, Beban Operasional, dll.).
- Sambung **active business switcher** ([`src/components/active-business-switcher.tsx`](../src/components/active-business-switcher.tsx)) ke data nyata.
- Arsipkan usaha (`is_active = false`) — tampilkan filter di [`/child/businesses`](../src/app/child/businesses/page.tsx).
- Mode simulasi virtual modal (P1) — bisa di akhir.

### DoD

- Anak bisa buat usaha → COA tabel `accounts` terisi otomatis.
- Tab Kas/Produk/Laporan di shell otomatis pointing ke usaha aktif yang baru dibuat.

---

## Fase 2 — Aset & Produk/HPP

**Tujuan:** data master yang menjadi sumber HPP dan jurnal pembelian aset.

### Scope

- **Aset** (PRD §F03): CRUD, depresiasi garis lurus dihitung **on-read** (sesuai PRD §8.3: tidak ada cron). Helper `computeBookValue(asset, now)` di `src/lib/asset-engine.ts` + tes Vitest.
- Form aset: `FieldGroup` + `Field`, validasi qty/harga > 0; foto opsional (P1 di Fase 7).
- **Produk** (PRD §F04): CRUD, satuan, harga jual, stok awal.
- **Komponen HPP**: bahan baku / TK / overhead, total = qty × unit_cost (kolom generated di DB), HPP per produk = SUM.
- **Visualisasi komposisi biaya** — pakai SVG sederhana dulu; **Recharts** ditambahkan saat Fase 4 (lazy import dengan `next/dynamic`, rule Vercel `bundle-dynamic-imports`).
- Update halaman stub [`/child/businesses/[id]/assets`](../src/app/child/businesses/[id]/assets/page.tsx) dan [`/products`](../src/app/child/businesses/[id]/products/page.tsx) jadi nyata.

### DoD

- Anak bisa input 1 aset + 1 produk lengkap dengan 3 komponen HPP; margin terhitung benar.
- Tes unit asset-engine & hpp-engine lulus untuk kasus: aset lewat umur ekonomis, stok 0, qty desimal.

---

## Fase 3 — Buku Kas + Auto-Jurnal Double-Entry

**Tujuan:** transaksi nyata + jurnal yang **selalu balance**.

### Scope

- Transaksi (PRD §F05) — form pakai `FieldSet`, kategori sebagai `Select`/`Combobox`, tanggal default = hari ini, validasi `amount > 0`, batas backdated 1 tahun (PRD §10.3).
- **Stok berkurang otomatis** saat pemasukan dengan `product_id` + `qty_sold`. Negatif stok = soft warning (PRD §10.5).
- **Auto-jurnal** sambungkan [`src/lib/journal-engine.ts`](../src/lib/journal-engine.ts) ke INSERT transaksi.
  - Mapping PRD §8.1 → discriminated union `JournalDraft` (skill TS advanced types) supaya kompiler memaksa setiap kategori dipetakan.
  - DB constraint atau check function: `SUM(debit) = SUM(credit)` per `journal_entry_id`.
- Jurnal umum + **buku besar per akun** + **neraca saldo** — isi rute stub di [`/journal`](../src/app/child/businesses/[id]/journal/page.tsx).
- Penghapusan transaksi → cascade hapus jurnal terkait (FK `ON DELETE CASCADE`).

### DoD

- Setiap transaksi membentuk `journal_entries` + ≥2 `journal_lines` balance.
- Neraca saldo "Balance" di skenario seed.
- Tes journal-engine lulus untuk semua kategori PRD §8.1.

### Performa & arsitektur

- Listing transaksi: server component dengan **filter via URL searchParams**, paginasi (≤50 baris/halaman), `Suspense` boundary terpisah (rule Vercel `async-suspense-boundaries`).
- Form pakai **Server Action + revalidatePath**; cek auth di dalam action (rule Vercel `server-auth-actions`).

---

## Fase 4 — Laporan Keuangan + Export

**Tujuan:** L/R, Arus Kas, Neraca, Rekap Aset, dihitung **dari jurnal** (bukan transaksi langsung) — PRD §8.4 – §8.5.

### Scope

- `src/lib/report-engine.ts` — fungsi pure per laporan; input = list `journal_lines` periode + COA + aset; output = struktur tiped.
- Halaman sub-laporan sudah ada stub-nya ([`laba-rugi`](../src/app/child/businesses/[id]/reports/laba-rugi/page.tsx), [`arus-kas`](../src/app/child/businesses/[id]/reports/arus-kas/page.tsx), [`neraca`](../src/app/child/businesses/[id]/reports/neraca/page.tsx), [`rekap-aset`](../src/app/child/businesses/[id]/reports/rekap-aset/page.tsx)) — tinggal isi.
- **Grafik** dengan Recharts → wrap `next/dynamic({ ssr: false })`. Hoist warna ke token Tailwind.
- **Export PDF** (`@react-pdf/renderer`) & **Excel** (`xlsx`) — keduanya dynamic import dipanggil di event klik (rule Vercel `bundle-conditional`).
- Batas periode: PDF ≤ 3 bulan; > 3 bulan generate via Edge Function (PRD §15 mitigasi performa).

### DoD

- Untuk dataset seed: L/R, Arus Kas, Neraca **balance** dan angka konsisten antar laporan.
- Tes unit report-engine ≥ 80% cover.
- Lighthouse perf ≥ 90 di halaman laporan medium-data.

---

## Fase 5 — Monitor Orang Tua + Komentar

### Scope

- Halaman [`/parent/businesses/[childId]/[businessId]/overview`](../src/app/parent/businesses/[childId]/[businessId]/overview/page.tsx) jadi nyata: ringkasan + tautan ke laporan anak (read-only).
- **Komentar** (PRD §F08-4): inline pada transaksi/laporan/HPP/aset/umum — pakai `Sheet` shadcn untuk panel komentar di mobile, `Popover` di desktop.
- Halaman [`/parent/comments`](../src/app/parent/comments/page.tsx) → data nyata, filter anak/usaha.
- **Supabase Realtime** untuk komentar baru — hook tipis `useRealtimeComments(businessId)` (rule Vercel `client-event-listeners` untuk dedup channel global).
- Status `is_read` toggled saat anak buka.

### DoD

- Ortu kirim komentar → muncul real-time di tab anak (≤2 dtk).
- Anak tidak bisa menghapus komentar (PRD §10.7); RLS memastikan.

---

## Fase 6 — Gamifikasi + Notifikasi In-app

### Scope

- **Event poin** di server action: setiap aksi (catat transaksi +5, lengkapi HPP +10, dst.) menulis `gamification_events` + update `children.total_points` lewat trigger atau Edge Function.
- **Badge unlock** — function SQL `recompute_badges(child_id)` dijalankan setelah event poin; idempotent (cek sudah unlock).
- **Streak harian** — kolom `last_action_date` + `streak_count`; helper `tickStreak()` dipanggil di server action transaksi.
- **Level** dari `total_points` (PRD §9.2) — turun ke UI sebagai derived state (jangan simpan ulang).
- **Notifikasi nyata** — tabel `notifications` + Realtime untuk lonceng ([`notification-bell.tsx`](../src/components/layout/notification-bell.tsx)). Ganti `DEMO_NOTIFICATIONS` dengan SWR/realtime feed.
- Animasi reward (Framer Motion) — **defer** ke Fase 7 jika belum perlu.

### DoD

- Anak input transaksi → poin bertambah, streak tercatat, jika 3 hari berturut → badge `streak_3`.
- Lonceng menampilkan badge count dari DB; klik notifikasi → mark read.

---

## Fase 7 — P1 Polish + Capacitor

### Scope (PRD §12 Fase 5)

- **Onboarding wizard** 3 langkah (PRD F00-6).
- **Upload foto** aset & nota — Supabase Storage **bucket private**, signed URL 1 jam.
- **Alert stok minimum**, **kategori transaksi custom**, **edukasi jurnal (tooltip ramah anak)**.
- **KPI widget** (gross margin, net margin, rasio kas, perputaran stok).
- **Animasi reward** Framer Motion.
- **Capacitor**: konfigurasi, build APK, uji kamera & notif native di ≥ 3 device Android.
- **Audit Web Interface Guidelines** (skill `web-design-guidelines`) sebelum rilis publik.

### DoD

- Lighthouse mobile perf ≥ 90, a11y ≥ 95 di 3 halaman utama (Dashboard anak, Buku Kas, Laporan).
- APK Android berjalan, kamera berfungsi, notifikasi push native sampai.
- 0 lint error `npm run lint` (termasuk fix [`sociabuzz-support-widget.tsx`](../src/components/sociabuzz-support-widget.tsx) yang saat ini gagal aturan `set-state-in-effect`).

---

## Praktik teknis sepanjang seluruh fase

### React / Next.js (skill `vercel-react-best-practices`)

- **Server components by default**, klien hanya untuk interaktif.
- Data fetching: paralel dengan `Promise.all` / `better-all`, hindari waterfall di RSC.
- `React.cache()` untuk dedup query per request (sudah dipakai di repositori).
- `next/dynamic` untuk komponen berat: chart, PDF, Excel, editor.
- Hindari barrel import — Next.js `optimizePackageImports` sudah bantu, tapi tetap audit `lucide-react`, `recharts`, dll.
- Bottom nav & sidebar **tidak** boleh hover-only (PRD §2.1 — Capacitor).
- `startTransition` untuk filter/search yang lambat.

### Supabase (skill `supabase`)

- Setiap migrasi via `supabase migration new`.
- RLS di semua tabel `public`, jangan andalkan filter klien.
- `getUser()` (bukan `getSession()`) untuk otorisasi server.
- Server Action: validasi input dengan Zod **lalu** cek auth **lalu** mutate (rule Vercel `server-auth-actions`).
- Storage: bucket private + signed URL untuk foto aset/nota.
- Jalankan `supabase db advisors` sebelum commit migrasi.

### TypeScript (skill `typescript-advanced-types`)

- Domain types di [`src/types/`](../src/types/), satu file per bounded context.
- Discriminated union untuk: `JournalDraft`, `TransactionInput`, `ReportResult`, `NotificationItem`.
- Hindari `any`; pakai `unknown` + type guard.
- Generate types Supabase (`supabase gen types typescript`) ke `src/types/database.types.ts` saat tabel siap.

### UI (skill `shadcn` + `tailwind-design-system`)

- Form **selalu** `FieldGroup` + `Field` + `FieldLabel` + `FieldDescription`.
- `data-invalid` pada `Field`, `aria-invalid` pada control.
- Warna **selalu** semantic token (`bg-primary`, `text-muted-foreground`).
- `cn()` untuk class kondisional (sudah dipakai).
- Empty state pakai `Empty`, callout pakai `Alert`, toast pakai `sonner` (sudah dipasang di [`layout.tsx`](../src/app/layout.tsx)).
- Icon: `data-icon="inline-start"` di dalam `Button`.

### A11y (skill `accessibility-a11y`)

- Semua interactive ≥ 44×44px (sudah pola di shell — `min-h-11`).
- Heading hierarchy tanpa skip; landmark `<main>`, `<nav>`, `<header>`, `<aside>`.
- Notifikasi pakai `role="status"` / `aria-live="polite"`.
- Fokus ring tidak boleh dihapus — gunakan `focus-visible:ring-*`.
- Cek kontras token OKLCH ≥ WCAG AA pada light & dark.

---

## Quality gates per merge (semua fase)

1. `npm run lint` → 0 error.
2. `npm test` (Vitest) → lulus, coverage engine (journal/report/asset) ≥ 80%.
3. `npm run build` → lulus.
4. Jika migrasi: `supabase db advisors` → 0 issue serius.
5. Review manual: 1 halaman desktop (≥ 1280px) + 1 mobile (360px) per fitur baru.
6. Untuk halaman publik: Lighthouse perf ≥ 85, a11y ≥ 95.

---

## Referensi dokumen

- PRD lengkap: [`PRD_HabikuBiz_v1.0_Draft.md`](./PRD_HabikuBiz_v1.0_Draft.md)
- Foundation snapshot: [`NEXT_STEPS_FOUNDATION.md`](./NEXT_STEPS_FOUNDATION.md)
- Rencana shell (sudah selesai): `.cursor/plans/shell_ui_habikubiz_prd_*.plan.md`
- Skill agent: [`.agents/skills/`](../.agents/skills/)
