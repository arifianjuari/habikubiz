# Product Requirements Document
## habiku-biz
### Platform Edukasi Manajemen Usaha UMKM untuk Anak Usia 10–15 Tahun

---

| Field | Detail |
|---|---|
| Versi | v1.1 — Selaras implementasi (Mei 2026) |
| Tanggal | Mei 2026 |
| Status | Siap Eksekusi |
| Builder | Fian (Solo Dev + AI Coding Assistant) |
| URL Target | TBD |
| Stack Utama (repo) | Next.js **16** · Supabase · Tailwind CSS **v4** · Zustand 5 · (shadcn/ui & Capacitor = rencana) |
| Bahasa Produk | Bahasa Indonesia |

> **Catatan:** PRD ini mencakup scope penuh (bukan MVP). Semua modul dibangun lengkap dalam satu siklus pengembangan. Desain wajib mobile-first sejak awal karena akan dikonversi ke mobile app via Capacitor.
>
> **Catatan v1.1:** Tabel stack di atas diselaraskan dengan basis kode (`package.json`). Bagian teks di bawah yang masih menyebut Next.js 14 / Tailwind 3 dianggap **target product** lama; migrasi istilah ke Next 16 + Tailwind v4 dilakukan bertahap saat mengedit bab terkait.

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Konteks & Batasan Proyek](#2-konteks--batasan-proyek)
3. [Arsitektur Sistem](#3-arsitektur-sistem)
4. [Skema Database](#4-skema-database)
5. [Fitur & Requirements](#5-fitur--requirements)
6. [Priority Matrix](#6-priority-matrix)
7. [User Flow](#7-user-flow)
8. [Spesifikasi Teknis & Business Logic](#8-spesifikasi-teknis--business-logic)
9. [Sistem Gamifikasi](#9-sistem-gamifikasi)
10. [Business Rules](#10-business-rules)
11. [Security & Access Model](#11-security--access-model)
12. [Sprint Plan / Roadmap](#12-sprint-plan--roadmap)
13. [Persyaratan Non-Fungsional](#13-persyaratan-non-fungsional)
14. [Success Metrics (KPIs)](#14-success-metrics-kpis)
15. [Risiko & Mitigasi](#15-risiko--mitigasi)
- [Lampiran A: Struktur Folder](#lampiran-a-struktur-folder)
- [Lampiran B: Skema Warna & Desain](#lampiran-b-skema-warna--desain)
- [Lampiran C: Prompt AI Coding Assistant](#lampiran-c-prompt-ai-coding-assistant)

---

## 1. Ringkasan Eksekutif

**habiku-biz** adalah platform edukasi manajemen usaha berbasis web yang dirancang khusus untuk anak usia 10–15 tahun. Aplikasi ini mengajarkan konsep dasar pengelolaan UMKM — mulai dari pencatatan aset, perhitungan unit cost/HPP, manajemen kas, hingga pembukuan standar dengan laporan Laba Rugi, Arus Kas, dan Neraca — namun disajikan dalam tampilan yang ramah, berwarna, dan tidak menakutkan bagi anak-anak.

Masalah yang dipecahkan: Literasi keuangan dan bisnis di kalangan anak-anak Indonesia sangat rendah. Tidak ada platform yang menjembatani antara **standar administrasi usaha UMKM yang serius** dengan **pengalaman visual yang menarik dan memotivasi anak**. Orang tua pun kesulitan memantau perkembangan pemahaman bisnis anak mereka secara terstruktur.

Solusi habiku-biz: Anak dapat membuat dan mengelola **lebih dari satu usaha** (baik fiktif/simulasi maupun usaha nyata yang mereka jalankan). Setiap usaha memiliki alur akuntansi lengkap yang terintegrasi: aset → HPP → transaksi → jurnal → laporan. Sistem gamifikasi ringan (poin, badge, streak) menjaga motivasi anak tanpa mengalihkan fokus dari proses pembelajaran yang sesungguhnya. Orang tua memiliki dashboard monitor tersendiri dan dapat memberikan komentar sebagai panduan.

| Komponen | Deskripsi | Pengguna Utama |
|---|---|---|
| **Dashboard Anak** | Tampilan usaha, progres, gamifikasi | Anak |
| **Manajemen Aset** | Catat, nilai, depresiasi aset usaha | Anak |
| **Kalkulator HPP** | Hitung unit cost & harga pokok produksi | Anak |
| **Buku Kas** | Catat pemasukan & pengeluaran harian | Anak |
| **Jurnal & Pembukuan** | Double-entry sederhana, buku besar | Anak |
| **Laporan Keuangan** | L/R, Arus Kas, Neraca, Rekap Aset | Anak + Orang Tua |
| **Dashboard Orang Tua** | Monitor semua usaha & progres anak | Orang Tua |
| **Komentar & Feedback** | Panduan orang tua ke anak | Orang Tua |
| **Gamifikasi** | Poin, badge, streak, level usaha | Anak |

🏆 **Differentiator utama:** Satu-satunya platform yang menggabungkan standar akuntansi UMKM yang benar (bukan sekadar catatan sederhana) dengan UX yang benar-benar didesain untuk anak — bukan adaptasi dari software akuntansi dewasa.

---

## 2. Konteks & Batasan Proyek

### 2.1 Constraints

| Constraint | Detail | Implikasi Desain |
|---|---|---|
| **Builder** | Solo developer + AI coding assistant (Claude Code / Cursor) | Kode harus sangat modular, setiap modul berdiri sendiri. Gunakan shadcn/ui untuk mempercepat komponen UI |
| **Target Device** | Mobile-first (smartphone anak & orang tua), juga bisa desktop | Semua layout wajib responsif di 360px–1440px. Gunakan bottom navigation untuk mobile, sidebar untuk desktop |
| **Capacitor** | Akan dikonversi ke mobile app di masa depan | Hindari fitur web-only (hover-only interactions). Gunakan touch-friendly tap targets (min 44×44px) |
| **Auth** | Supabase Auth (email + Google SSO) | Orang tua daftar lebih dulu, anak adalah sub-profil — bukan akun mandiri |
| **Koneksi** | Diasumsikan online (rumahan) | Tidak perlu offline mode di versi web. Capacitor phase bisa tambah basic caching |
| **Skala Awal** | Personal / keluarga, bukan enterprise | Supabase free/pro tier cukup. Tidak perlu multi-tenant enterprise |
| **Bahasa** | Bahasa Indonesia | Semua label UI, pesan error, notifikasi, dan laporan dalam Bahasa Indonesia |
| **Regulasi** | Data anak di bawah 18 tahun | Akun anak tidak memiliki email mandiri, tidak ada data publik yang terekspos |

### 2.2 Asumsi

- Orang tua memiliki smartphone dan familiar dengan aplikasi dasar (WhatsApp, dll.)
- Anak menggunakan perangkat yang sama dengan orang tua ATAU perangkat milik sendiri
- Anak usia 10–15 tahun mampu memahami instruksi teks sederhana dalam Bahasa Indonesia
- Koneksi internet tersedia di rumah (minimum 3G)
- Standar akuntansi yang digunakan: **akuntansi sederhana berbasis kas** (cash basis) dengan elemen dasar double-entry untuk pembukuan jurnal — cukup untuk level UMKM, tidak perlu PSAK penuh
- Satu orang tua dapat memantau lebih dari satu anak dalam satu akun

---

## 3. Arsitektur Sistem

### 3.1 Tech Stack

| Layer | Teknologi | Versi | Peran |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 14.x | Framework utama, SSR + RSC |
| **Styling** | Tailwind CSS | 3.x | Utility-first styling |
| **UI Components** | shadcn/ui | latest | Komponen dasar (form, dialog, table, tabs) |
| **State Management** | Zustand | 4.x | Global state: auth session, active usaha, gamifikasi |
| **Backend / DB** | Supabase (PostgreSQL) | latest | Database, Auth, Storage, Realtime |
| **Auth** | Supabase Auth | — | Email/password + Google OAuth |
| **File Storage** | Supabase Storage | — | Upload foto bukti, export laporan |
| **Push Notif** | Supabase + Web Push API | — | Notif ke orang tua & reminder ke anak |
| **PDF Export** | @react-pdf/renderer | 3.x | Generate laporan PDF di client |
| **Excel Export** | xlsx (SheetJS) | 0.18.x | Export laporan ke .xlsx |
| **Charts** | Recharts | 2.x | Grafik tren pemasukan/pengeluaran |
| **Mobile Wrapper** | Capacitor | 5.x | Konversi ke Android/iOS app (future) |
| **Animasi** | Framer Motion | 10.x | Animasi gamifikasi & transisi halaman |
| **Hosting** | Vercel | — | Deploy Next.js, edge functions |

### 3.2 Arsitektur High-Level

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT LAYER                       │
│   Next.js 14 App Router (RSC + Client Components)  │
│   Zustand Store │ shadcn/ui │ Tailwind CSS          │
│   Recharts │ Framer Motion │ react-pdf │ xlsx       │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS / WebSocket
┌──────────────────────▼──────────────────────────────┐
│                  SUPABASE LAYER                     │
│   Auth (Email + Google) │ PostgreSQL DB             │
│   Row Level Security (RLS) │ Storage Buckets        │
│   Realtime (komentar orang tua) │ Edge Functions    │
└─────────────────────────────────────────────────────┘
                       │ Future
┌──────────────────────▼──────────────────────────────┐
│               CAPACITOR WRAPPER                     │
│   Android APK │ iOS IPA │ Native Push Notification  │
└─────────────────────────────────────────────────────┘
```

---

## 4. Skema Database

### 4.1 Tabel: `profiles`
Akun utama (orang tua).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | Sama dengan `auth.users.id` |
| `full_name` | TEXT NOT NULL | Nama orang tua |
| `email` | TEXT UNIQUE | Email akun |
| `role` | ENUM('parent') | Selalu 'parent' di tabel ini |
| `avatar_url` | TEXT | Foto profil (opsional) |
| `created_at` | TIMESTAMPTZ | Waktu registrasi |

### 4.2 Tabel: `children`
Sub-profil anak di bawah akun orang tua.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `parent_id` | UUID FK → profiles.id | Orang tua pemilik profil |
| `name` | TEXT NOT NULL | Nama anak |
| `avatar_url` | TEXT | Foto/avatar anak |
| `birth_year` | INT | Tahun lahir (untuk validasi usia) |
| `pin` | TEXT | PIN 4 digit (hashed) untuk child mode |
| `total_points` | INT DEFAULT 0 | Akumulasi poin gamifikasi |
| `level` | INT DEFAULT 1 | Level pengusaha anak |
| `created_at` | TIMESTAMPTZ | |

### 4.3 Tabel: `businesses`
Setiap usaha yang dikelola anak. Satu anak bisa punya banyak usaha.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `child_id` | UUID FK → children.id | Pemilik usaha |
| `name` | TEXT NOT NULL | Nama usaha (misal: "Jualan Stiker Keren") |
| `type` | ENUM('simulasi','nyata') | Mode usaha |
| `category` | TEXT | Kategori usaha (kuliner, kerajinan, dll.) |
| `description` | TEXT | Deskripsi singkat usaha |
| `logo_url` | TEXT | Logo/gambar usaha |
| `modal_awal` | NUMERIC(15,2) DEFAULT 0 | Modal awal (untuk simulasi: virtual) |
| `is_active` | BOOL DEFAULT true | Usaha aktif/diarsipkan |
| `created_at` | TIMESTAMPTZ | |

### 4.4 Tabel: `assets`
Aset yang dimiliki tiap usaha.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `business_id` | UUID FK → businesses.id | |
| `name` | TEXT NOT NULL | Nama aset (misal: "Mixer Kue") |
| `category` | ENUM('tetap','lancar','perlengkapan') | Jenis aset |
| `acquisition_date` | DATE NOT NULL | Tanggal perolehan |
| `acquisition_cost` | NUMERIC(15,2) NOT NULL | Harga perolehan |
| `useful_life_months` | INT | Umur ekonomis (bulan), untuk depresiasi |
| `depreciation_method` | ENUM('garis_lurus','none') DEFAULT 'none' | Metode depresiasi |
| `current_value` | NUMERIC(15,2) | Nilai buku saat ini (computed) |
| `notes` | TEXT | Keterangan tambahan |
| `photo_url` | TEXT | Foto aset |
| `created_at` | TIMESTAMPTZ | |

### 4.5 Tabel: `products`
Produk/jasa yang dijual tiap usaha (untuk keperluan HPP).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `business_id` | UUID FK → businesses.id | |
| `name` | TEXT NOT NULL | Nama produk |
| `unit` | TEXT | Satuan (pcs, porsi, lusin, dll.) |
| `selling_price` | NUMERIC(15,2) | Harga jual per unit |
| `hpp` | NUMERIC(15,2) | HPP per unit (computed dari hpp_components) |
| `stock_qty` | NUMERIC(10,2) DEFAULT 0 | Stok saat ini |
| `photo_url` | TEXT | Foto produk |
| `is_active` | BOOL DEFAULT true | |
| `created_at` | TIMESTAMPTZ | |

### 4.6 Tabel: `hpp_components`
Komponen biaya untuk menghitung HPP per produk.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `product_id` | UUID FK → products.id | |
| `name` | TEXT NOT NULL | Nama bahan/komponen (misal: "Tepung 500gr") |
| `component_type` | ENUM('bahan_baku','tenaga_kerja','overhead') | Jenis biaya |
| `quantity` | NUMERIC(10,4) | Jumlah per unit produk |
| `unit` | TEXT | Satuan bahan |
| `unit_cost` | NUMERIC(15,2) NOT NULL | Harga satuan bahan |
| `total_cost` | NUMERIC(15,2) GENERATED | quantity × unit_cost |
| `created_at` | TIMESTAMPTZ | |

### 4.7 Tabel: `transactions`
Semua transaksi kas usaha (pemasukan & pengeluaran).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `business_id` | UUID FK → businesses.id | |
| `date` | DATE NOT NULL | Tanggal transaksi |
| `type` | ENUM('pemasukan','pengeluaran') | Jenis transaksi |
| `category` | TEXT NOT NULL | Kategori (penjualan, pembelian bahan, gaji, dll.) |
| `description` | TEXT NOT NULL | Deskripsi transaksi |
| `amount` | NUMERIC(15,2) NOT NULL | Jumlah (selalu positif) |
| `product_id` | UUID FK → products.id NULL | Jika terkait penjualan produk |
| `qty_sold` | NUMERIC(10,2) NULL | Qty terjual (untuk update stok) |
| `payment_method` | ENUM('tunai','transfer') DEFAULT 'tunai' | |
| `receipt_url` | TEXT | Foto nota/bukti |
| `created_at` | TIMESTAMPTZ | |

### 4.8 Tabel: `journal_entries`
Jurnal akuntansi double-entry (auto-generated dari transaksi).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `business_id` | UUID FK → businesses.id | |
| `transaction_id` | UUID FK → transactions.id NULL | Referensi transaksi sumber |
| `entry_date` | DATE NOT NULL | Tanggal jurnal |
| `description` | TEXT NOT NULL | Deskripsi jurnal |
| `created_at` | TIMESTAMPTZ | |

### 4.9 Tabel: `journal_lines`
Baris debit/kredit dari setiap jurnal.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `journal_entry_id` | UUID FK → journal_entries.id | |
| `account_code` | TEXT NOT NULL | Kode akun (lihat chart of accounts) |
| `account_name` | TEXT NOT NULL | Nama akun |
| `debit` | NUMERIC(15,2) DEFAULT 0 | |
| `credit` | NUMERIC(15,2) DEFAULT 0 | |

### 4.10 Tabel: `accounts` (Chart of Accounts per Business)
Daftar akun default yang dibuat otomatis saat usaha dibuat.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `business_id` | UUID FK → businesses.id | |
| `code` | TEXT NOT NULL | Kode akun (1-1-001, dll.) |
| `name` | TEXT NOT NULL | Nama akun |
| `type` | ENUM('aset','liabilitas','modal','pendapatan','beban') | |
| `is_default` | BOOL DEFAULT true | Akun bawaan sistem |

### 4.11 Tabel: `parent_comments`
Komentar orang tua pada transaksi/laporan tertentu.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `parent_id` | UUID FK → profiles.id | |
| `child_id` | UUID FK → children.id | |
| `business_id` | UUID FK → businesses.id | |
| `ref_type` | ENUM('transaction','laporan','aset','hpp','umum') | Konteks komentar |
| `ref_id` | UUID NULL | ID referensi objek (transaction_id, dll.) |
| `comment` | TEXT NOT NULL | Isi komentar |
| `is_read` | BOOL DEFAULT false | Sudah dibaca anak? |
| `created_at` | TIMESTAMPTZ | |

### 4.12 Tabel: `gamification_events`
Ledger semua kejadian gamifikasi (poin, badge, streak).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `child_id` | UUID FK → children.id | |
| `event_type` | ENUM('poin_masuk','badge_unlock','streak_update','level_up') | |
| `poin_delta` | INT DEFAULT 0 | Perubahan poin (+/-) |
| `badge_id` | TEXT NULL | ID badge yang di-unlock |
| `streak_count` | INT NULL | Streak count saat event |
| `ref_id` | UUID NULL | Referensi pemicu event (transaction_id, dll.) |
| `note` | TEXT | Deskripsi event |
| `created_at` | TIMESTAMPTZ | |

### 4.13 Tabel: `notifications`
Log notifikasi push dan reminder.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | |
| `recipient_id` | UUID | Bisa parent_id atau child_id |
| `recipient_type` | ENUM('parent','child') | |
| `type` | ENUM('komentar_baru','reminder_catat','badge_baru','level_up') | |
| `title` | TEXT NOT NULL | Judul notifikasi |
| `body` | TEXT NOT NULL | Isi notifikasi |
| `ref_id` | UUID NULL | Referensi objek terkait |
| `is_read` | BOOL DEFAULT false | |
| `created_at` | TIMESTAMPTZ | |

---

## 5. Fitur & Requirements

### Modul 0: Autentikasi & Manajemen Keluarga

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F00-1 | Registrasi orang tua | P0 | Orang tua daftar dengan email+password atau Google. Setelah verifikasi email, diarahkan ke onboarding. |
| F00-2 | Login orang tua | P0 | Login email/password dan Google OAuth. Session persist 30 hari. |
| F00-3 | Buat profil anak | P0 | Orang tua dapat membuat ≥1 profil anak dengan nama, avatar, tahun lahir, dan PIN 4 digit. |
| F00-4 | Edit / hapus profil anak | P0 | Orang tua dapat edit nama/avatar anak. Hapus profil membutuhkan konfirmasi dan menghapus semua data terkait. |
| F00-5 | Child mode (PIN lock) | P0 | Setelah anak dipilih, tampilan beralih ke mode anak. Keluar dari mode anak wajib input PIN orang tua. |
| F00-6 | Onboarding interaktif | P1 | Wizard 3 langkah: (1) buat profil anak, (2) buat usaha pertama, (3) tutorial singkat modul utama. |

---

### Modul 1: Dashboard & Navigasi

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F01-1 | Dashboard anak | P0 | Menampilkan daftar usaha aktif, ringkasan kas, poin gamifikasi, dan komentar belum dibaca. |
| F01-2 | Pilih usaha aktif | P0 | Anak dapat beralih antar usaha dari header/drawer. Semua modul otomatis filter ke usaha aktif. |
| F01-3 | Dashboard orang tua | P0 | Overview semua anak: usaha per anak, total transaksi, aktivitas terakhir, komentar yang dikirim. |
| F01-4 | Bottom navigation (mobile) | P0 | 5 tab: Beranda · Kas · Produk · Laporan · Profil. Aktif pada lebar <768px. |
| F01-5 | Sidebar navigation (desktop) | P0 | Sidebar kiri dengan semua menu + info usaha aktif. Aktif pada lebar ≥768px. |
| F01-6 | Notifikasi in-app | P0 | Badge merah di ikon notif jika ada komentar baru atau badge baru. Klik untuk lihat daftar notif. |

---

### Modul 2: Manajemen Usaha

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F02-1 | Buat usaha baru | P0 | Form: nama, jenis (simulasi/nyata), kategori, deskripsi, modal awal, logo. Setelah dibuat, Chart of Accounts dibuat otomatis. |
| F02-2 | Edit usaha | P0 | Semua field usaha bisa diedit kecuali modal awal (perlu jurnal penyesuaian). |
| F02-3 | Arsipkan usaha | P0 | Usaha diarsipkan (is_active=false), tidak muncul di daftar aktif tapi data tetap ada. |
| F02-4 | Kartu ringkasan usaha | P0 | Menampilkan: nama, jenis, total kas, total aset, HPP rata-rata, laba bersih bulan ini. |
| F02-5 | Mode simulasi — modal virtual | P1 | Jika mode simulasi, sistem menyediakan modal awal virtual yang bisa diatur orang tua. |

---

### Modul 3: Manajemen Aset

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F03-1 | Tambah aset | P0 | Form: nama, kategori, tanggal perolehan, harga perolehan, umur ekonomis, foto. Auto-generate jurnal perolehan aset. |
| F03-2 | Daftar aset | P0 | Tabel semua aset usaha: nama, kategori, nilai perolehan, nilai buku saat ini, status. |
| F03-3 | Detail aset | P0 | Halaman detail: info lengkap, riwayat depresiasi, foto, jurnal terkait. |
| F03-4 | Hitung depresiasi otomatis | P0 | Sistem menghitung depresiasi garis lurus bulanan. Nilai buku terupdate otomatis. Formula: (Harga Perolehan / Umur Ekonomis dalam bulan). |
| F03-5 | Edit & hapus aset | P0 | Edit data aset. Hapus hanya jika belum digunakan dalam HPP. Konfirmasi wajib. |
| F03-6 | Rekap aset (neraca) | P0 | Ringkasan total aset tetap, aset lancar, perlengkapan, dan total nilai buku. |
| F03-7 | Upload foto aset | P1 | Upload foto via kamera atau galeri. Disimpan di Supabase Storage. |

---

### Modul 4: Produk & Perhitungan HPP

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F04-1 | Tambah produk | P0 | Form: nama, satuan, harga jual. HPP dihitung dari komponen. |
| F04-2 | Tambah komponen HPP | P0 | Per produk: tambah bahan baku, tenaga kerja, overhead. Setiap komponen: nama, qty, satuan, harga satuan. |
| F04-3 | Kalkulasi HPP otomatis | P0 | Sistem menjumlah total_cost semua komponen → HPP per unit. Margin laba dihitung otomatis: (Harga Jual - HPP) / Harga Jual × 100%. |
| F04-4 | Visualisasi komposisi biaya | P0 | Pie chart: porsi bahan baku vs TK vs overhead. Label persentase tiap komponen. |
| F04-5 | Daftar produk | P0 | Kartu produk: nama, HPP, harga jual, margin, stok saat ini. |
| F04-6 | Edit HPP & produk | P0 | Semua field produk dan komponen HPP bisa diedit. Perubahan HPP otomatis recalculate margin. |
| F04-7 | Manajemen stok | P0 | Stok berkurang otomatis saat transaksi penjualan dicatat (via qty_sold). Stok bisa diisi ulang via transaksi "pembelian bahan". |
| F04-8 | Alert stok minimum | P1 | Jika stok produk ≤ threshold, tampil badge merah di kartu produk. Threshold bisa diset per produk. |

---

### Modul 5: Buku Kas (Transaksi)

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F05-1 | Catat pemasukan | P0 | Form: tanggal, kategori, deskripsi, jumlah, produk terkait (opsional), metode bayar, foto nota. Auto-generate jurnal. |
| F05-2 | Catat pengeluaran | P0 | Form: tanggal, kategori, deskripsi, jumlah, metode bayar, foto nota. Auto-generate jurnal. |
| F05-3 | Daftar transaksi | P0 | List chronological dengan filter: bulan, jenis (masuk/keluar), kategori. Setiap item menampilkan tanggal, deskripsi, jumlah, dan jenis. |
| F05-4 | Edit transaksi | P0 | Semua field bisa diedit. Edit otomatis update jurnal terkait. |
| F05-5 | Hapus transaksi | P0 | Hapus dengan konfirmasi. Jurnal terkait ikut dihapus. |
| F05-6 | Ringkasan kas | P0 | Widget di dashboard: total kas masuk, kas keluar, saldo kas bulan ini. |
| F05-7 | Upload foto nota | P1 | Upload foto struk/nota. Disimpan di Supabase Storage, bisa dilihat di detail transaksi. |
| F05-8 | Kategori custom | P1 | Selain kategori default, anak bisa tambah kategori sendiri per usaha. |

---

### Modul 6: Jurnal & Pembukuan

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F06-1 | Jurnal umum (auto) | P0 | Setiap transaksi otomatis membuat jurnal double-entry yang sesuai. Anak tidak perlu input manual. |
| F06-2 | Tampilan jurnal umum | P0 | Tabel jurnal: tanggal, deskripsi, akun debit, akun kredit, jumlah. Filter per bulan. |
| F06-3 | Buku besar per akun | P0 | Pilih akun → tampil semua mutasi debit/kredit + saldo berjalan. |
| F06-4 | Neraca saldo | P0 | Tabel neraca saldo: semua akun + total debit + total kredit. Tampilkan status "Balance" / "Tidak Balance". |
| F06-5 | Edukasi jurnal | P1 | Tooltip/popup yang menjelaskan "Kenapa jurnal ini dibuat?" dalam bahasa ramah anak. |
| F06-6 | Chart of Accounts default | P0 | Saat usaha dibuat, sistem otomatis membuat COA standar: Kas, Piutang, Persediaan, Aset Tetap, Modal, Pendapatan, Beban. |

---

### Modul 7: Laporan Keuangan

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F07-1 | Laporan Laba Rugi | P0 | Menampilkan: Pendapatan, HPP, Laba Kotor, Beban Operasional, Laba Bersih. Filter per bulan/kuartal/tahun. |
| F07-2 | Laporan Arus Kas | P0 | Tiga bagian: Aktivitas Operasi, Investasi, Pendanaan. Total kas masuk, kas keluar, saldo akhir. |
| F07-3 | Neraca (Balance Sheet) | P0 | Dua sisi: Aset (Lancar + Tetap) vs Liabilitas + Modal. Harus balance. |
| F07-4 | Rekap Aset | P0 | Tabel semua aset: nama, harga perolehan, akumulasi depresiasi, nilai buku. Total per kategori. |
| F07-5 | Grafik tren | P0 | Line chart: pemasukan vs pengeluaran per bulan (12 bulan terakhir). Bar chart: komposisi beban. |
| F07-6 | Export PDF | P0 | Setiap laporan bisa di-export ke PDF dengan header usaha, tanggal cetak, dan tanda tangan opsional. |
| F07-7 | Export Excel | P0 | Setiap laporan bisa di-export ke .xlsx. Format tabel yang bersih dan siap dicetak. |
| F07-8 | Ringkasan KPI usaha | P1 | Widget: Gross Margin %, Net Profit Margin %, Rasio Kas, Perputaran Stok. Dengan penjelasan anak-friendly. |

---

### Modul 8: Monitor Orang Tua

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F08-1 | Dashboard orang tua | P0 | Ringkasan semua anak: foto, nama, jumlah usaha aktif, total transaksi bulan ini, poin gamifikasi. |
| F08-2 | Lihat semua usaha anak | P0 | Orang tua bisa masuk ke halaman usaha manapun milik anak mereka (read-only + komentar). |
| F08-3 | Lihat laporan anak | P0 | Semua laporan keuangan anak bisa dilihat orang tua. Tidak bisa diedit. |
| F08-4 | Beri komentar | P0 | Orang tua bisa memberi komentar pada: transaksi tertentu, laporan, HPP, aset, atau komentar umum per usaha. |
| F08-5 | Riwayat komentar | P0 | Orang tua bisa lihat semua komentar yang sudah dikirim + status sudah dibaca anak atau belum. |
| F08-6 | Notifikasi aktivitas anak | P0 | Push notif ke orang tua jika anak: tambah transaksi baru, unlock badge baru, naik level. |
| F08-7 | Atur reminder anak | P1 | Orang tua bisa set jadwal reminder harian untuk anak: "Jangan lupa catat transaksi hari ini!" |

---

### Modul 9: Gamifikasi

| ID | Fitur | Prioritas | Acceptance Criteria |
|---|---|---|---|
| F09-1 | Sistem poin | P0 | Anak mendapat poin setiap: catat transaksi (+5), lengkapi HPP produk (+10), tambah aset (+8), buka laporan (+3). |
| F09-2 | Badge / achievement | P0 | Badge unlock saat anak mencapai milestone (lihat daftar badge di Section 9). |
| F09-3 | Streak harian | P0 | Streak bertambah jika anak melakukan minimal 1 aksi pencatatan per hari. Streak reset jika 1 hari terlewat. |
| F09-4 | Level pengusaha | P0 | Level naik berdasarkan total poin. 10 level total (lihat Section 9). Animasi level up. |
| F09-5 | Halaman profil gamifikasi | P0 | Menampilkan: level saat ini, total poin, badge yang dimiliki, badge yang belum dimiliki (greyed), streak saat ini. |
| F09-6 | Animasi reward | P1 | Efek confetti/animasi saat unlock badge atau naik level. Menggunakan Framer Motion. |

---

## 6. Priority Matrix

| Fitur | Modul | Prioritas | Status |
|---|---|---|---|
| Registrasi & Login Orang Tua | Auth | P0 | Wajib |
| Manajemen Profil Anak + PIN | Auth | P0 | Wajib |
| Child Mode Lock | Auth | P0 | Wajib |
| Dashboard Anak | Navigasi | P0 | Wajib |
| Dashboard Orang Tua | Navigasi | P0 | Wajib |
| Buat & Kelola Usaha | Usaha | P0 | Wajib |
| Chart of Accounts Otomatis | Pembukuan | P0 | Wajib |
| Manajemen Aset + Depresiasi | Aset | P0 | Wajib |
| Produk & Kalkulasi HPP | HPP | P0 | Wajib |
| Catat Transaksi (Kas) | Buku Kas | P0 | Wajib |
| Auto-generate Jurnal | Pembukuan | P0 | Wajib |
| Tampilan Jurnal & Buku Besar | Pembukuan | P0 | Wajib |
| Neraca Saldo | Pembukuan | P0 | Wajib |
| Laporan Laba Rugi | Laporan | P0 | Wajib |
| Laporan Arus Kas | Laporan | P0 | Wajib |
| Neraca (Balance Sheet) | Laporan | P0 | Wajib |
| Rekap Aset | Laporan | P0 | Wajib |
| Grafik Tren | Laporan | P0 | Wajib |
| Export PDF | Laporan | P0 | Wajib |
| Export Excel | Laporan | P0 | Wajib |
| Komentar Orang Tua | Monitor | P0 | Wajib |
| Notifikasi Push | Monitor | P0 | Wajib |
| Sistem Poin | Gamifikasi | P0 | Wajib |
| Badge & Achievement | Gamifikasi | P0 | Wajib |
| Streak Harian | Gamifikasi | P0 | Wajib |
| Level Pengusaha | Gamifikasi | P0 | Wajib |
| Onboarding Wizard | Auth | P1 | Fase 2 |
| Mode Simulasi Modal Virtual | Usaha | P1 | Fase 2 |
| Upload Foto Aset & Nota | Aset/Kas | P1 | Fase 2 |
| Alert Stok Minimum | Produk | P1 | Fase 2 |
| Kategori Transaksi Custom | Kas | P1 | Fase 2 |
| Edukasi Jurnal (Tooltip) | Pembukuan | P1 | Fase 2 |
| KPI Widget | Laporan | P1 | Fase 2 |
| Atur Reminder Anak | Monitor | P1 | Fase 2 |
| Animasi Reward | Gamifikasi | P1 | Fase 2 |

---

## 7. User Flow

### 7.1 Flow Orang Tua — Setup Pertama

```
Registrasi → Verifikasi Email → Buat Profil Anak (nama + PIN)
→ [Opsional] Onboarding Wizard → Dashboard Orang Tua
```

### 7.2 Flow Anak — Buat Usaha & Mulai Catat

```
Pilih Profil Anak (PIN) → Dashboard Anak → Tombol "Buat Usaha Baru"
→ Isi Form Usaha → Pilih Usaha Aktif → Tambah Aset (opsional)
→ Tambah Produk & HPP → Catat Transaksi Pertama → Lihat Laporan
```

### 7.3 Flow Transaksi Penjualan (Alur Terintegrasi)

```
Anak catat pemasukan (pilih produk, qty)
  → Sistem update stok produk
  → Sistem auto-generate jurnal: Kas (D) / Pendapatan Penjualan (K)
  → Sistem tambah poin gamifikasi (+5)
  → Notifikasi push ke orang tua
  → Laporan L/R & Arus Kas terupdate
```

### 7.4 Flow Komentar Orang Tua

```
Orang tua lihat laporan/transaksi anak
  → Klik "Beri Komentar" → Isi teks komentar → Kirim
  → Notifikasi masuk ke anak (badge di icon notif)
  → Anak buka notif → Baca komentar → Lakukan koreksi jika perlu
```

### 7.5 Flow Generate Laporan & Export

```
Pilih jenis laporan → Pilih periode (bulan/kuartal/tahun)
  → Sistem kalkulasi dari journal_entries
  → Tampilkan laporan di layar (grafik + tabel)
  → Klik "Export PDF" atau "Export Excel"
  → File diunduh ke perangkat
```

---

## 8. Spesifikasi Teknis & Business Logic

### 8.1 Auto-Generate Jurnal

Setiap kali transaksi dibuat, sistem otomatis membuat `journal_entry` + 2 `journal_lines`. Mapping:

| Jenis Transaksi | Kategori | Debit | Kredit |
|---|---|---|---|
| Pemasukan | Penjualan produk | Kas | Pendapatan Penjualan |
| Pemasukan | Lainnya | Kas | Pendapatan Lain-lain |
| Pengeluaran | Pembelian bahan | Persediaan/Beban Bahan | Kas |
| Pengeluaran | Gaji/upah | Beban Tenaga Kerja | Kas |
| Pengeluaran | Overhead/operasional | Beban Operasional | Kas |
| Pengeluaran | Pembelian aset | Aset Tetap | Kas |
| Modal awal | — | Kas | Modal Pemilik |

> ⚠️ Jurnal auto-generate tidak dapat dihapus secara manual. Hapus transaksi induk = hapus jurnal terkait secara cascade.

### 8.2 Kalkulasi HPP

```
HPP per unit = Σ (qty_komponen × unit_cost_komponen)
             = Total Bahan Baku + Total TK + Total Overhead

Margin Laba = (Harga Jual - HPP) / Harga Jual × 100%
BEP (unit) = Total Beban Tetap / (Harga Jual - HPP per unit)
```

### 8.3 Depresiasi Aset (Metode Garis Lurus)

```
Depresiasi per bulan = Harga Perolehan / Umur Ekonomis (bulan)
Nilai Buku = Harga Perolehan - (Depresiasi per Bulan × Bulan Berjalan)
Nilai Buku minimum = 0 (tidak bisa negatif)
```

Depresiasi dihitung secara realtime saat halaman aset dibuka (tidak ada cron job).

### 8.4 Laporan Laba Rugi

```
Pendapatan Penjualan
(-) HPP Penjualan         = Σ (qty_terjual × HPP per unit)
= LABA KOTOR
(-) Beban Operasional     = Σ transaksi pengeluaran kategori operasional
(-) Beban Depresiasi      = Σ depresiasi aset periode berjalan
= LABA BERSIH
```

### 8.5 Laporan Arus Kas

```
Aktivitas Operasi:
  + Penerimaan dari pelanggan
  - Pembayaran ke pemasok
  - Pembayaran beban operasional
  = Kas bersih dari operasi

Aktivitas Investasi:
  - Pembelian aset tetap
  + Penjualan aset (jika ada)
  = Kas bersih dari investasi

Aktivitas Pendanaan:
  + Modal disetor
  = Kas bersih dari pendanaan

SALDO KAS AKHIR = Kas Awal + Total Kas Bersih
```

### 8.6 State Machine Komentar Orang Tua

```
[DRAFT] → Orang tua tulis → [TERKIRIM] → Anak buka → [DIBACA]
                                              ↓
                                    Anak koreksi data (opsional)
```

### 8.7 Real-time Updates

Gunakan **Supabase Realtime** untuk:
- Komentar baru dari orang tua (muncul otomatis di notif anak)
- Badge baru yang di-unlock (orang tua langsung lihat)

---

## 9. Sistem Gamifikasi

### 9.1 Tabel Poin per Aksi

| Aksi | Poin |
|---|---|
| Catat transaksi (pemasukan/pengeluaran) | +5 |
| Lengkapi HPP produk (minimal 1 komponen) | +10 |
| Tambah aset baru | +8 |
| Buka/lihat laporan keuangan | +3 |
| Streak harian (per hari berturut-turut) | +5 × hari ke-N (max +25) |
| Buat usaha baru | +15 |
| Export laporan (PDF/Excel) | +5 |
| Baca komentar orang tua | +2 |

### 9.2 Level Pengusaha

| Level | Nama | Poin Min | Poin Maks |
|---|---|---|---|
| 1 | 🌱 Pebisnis Baru | 0 | 99 |
| 2 | 🛒 Pedagang Cilik | 100 | 299 |
| 3 | 📦 Pengusaha Pemula | 300 | 599 |
| 4 | 💡 Wirausaha Muda | 600 | 999 |
| 5 | 📊 Analis Keuangan | 1.000 | 1.499 |
| 6 | 🏪 Pemilik Toko | 1.500 | 2.199 |
| 7 | 💼 Manajer Bisnis | 2.200 | 3.099 |
| 8 | 🏭 Pengusaha Handal | 3.100 | 4.299 |
| 9 | 🚀 Bos UMKM | 4.300 | 5.999 |
| 10 | 👑 Raja Pengusaha | 6.000 | ∞ |

### 9.3 Daftar Badge

| Badge ID | Nama | Trigger |
|---|---|---|
| `first_biz` | Usaha Pertama! | Buat usaha pertama |
| `first_transaction` | Transaksi Perdana | Catat transaksi pertama |
| `hpp_master` | Ahli HPP | Lengkapi HPP untuk 3 produk |
| `asset_collector` | Kolektor Aset | Tambah 5 aset dalam 1 usaha |
| `streak_3` | On Fire! | Streak 3 hari berturut-turut |
| `streak_7` | Konsisten! | Streak 7 hari berturut-turut |
| `streak_30` | Legenda! | Streak 30 hari berturut-turut |
| `first_report` | Laporan Pertama | Buka laporan keuangan pertama kali |
| `first_export` | Pebisnis Serius | Export laporan ke PDF/Excel |
| `multi_biz` | Multi Usaha | Punya 2+ usaha aktif |
| `profit_maker` | Untung Terus! | Laba bersih positif 3 bulan berturut |
| `level_5` | Analis Muda | Capai Level 5 |
| `level_10` | Legenda UMKM | Capai Level 10 |

### 9.4 Streak Rules

- Streak bertambah jika ada **minimal 1 aksi pencatatan** dalam 1 hari kalender (00:00–23:59 WIB)
- Streak reset jika tidak ada aksi pencatatan selama 1 hari penuh
- Hari libur/weekend **tidak** dikecualikan — konsistensi adalah bagian dari pelajaran
- Orang tua **tidak dapat** memulihkan streak (beda dengan Habiku habit app — di sini konsekuensi alami adalah bagian dari edukasi bisnis)

---

## 10. Business Rules

1. **Satu usaha = satu set pembukuan terpisah**
   Aset, transaksi, jurnal, dan laporan tidak pernah tercampur antar usaha. Tidak ada konsolidasi antar usaha di versi ini.

2. **Jurnal wajib balance**
   Setiap `journal_entry` harus memiliki `Σ debit = Σ kredit`. Jika kalkulasi otomatis menghasilkan jurnal tidak balance, sistem wajib throw error dan batalkan transaksi.

3. **Transaksi tidak bisa backdated lebih dari 1 tahun**
   Untuk mencegah manipulasi laporan. Tanggal transaksi minimal = (hari ini - 365 hari).

4. **HPP tidak bisa negatif**
   Validasi di frontend dan database: setiap komponen HPP wajib > 0. HPP total produk wajib ≥ 0.

5. **Stok tidak bisa negatif**
   Jika transaksi penjualan menyebabkan `stock_qty < 0`, sistem menampilkan warning dan meminta konfirmasi anak. Anak bisa tetap lanjut (over-selling) dengan konfirmasi eksplisit — ini adalah pelajaran tentang manajemen stok.

6. **Modal awal hanya bisa diubah via jurnal penyesuaian**
   Field `modal_awal` di tabel `businesses` tidak dapat diedit langsung. Perubahan modal dilakukan via transaksi "Penyesuaian Modal" yang membuat jurnal Kas / Modal.

7. **Komentar orang tua tidak bisa dihapus oleh anak**
   Anak hanya bisa menandai komentar sebagai "dibaca". Orang tua bisa menghapus komentar mereka sendiri selama belum dibaca anak.

8. **Depresiasi dihitung per bulan penuh**
   Aset yang dibeli di tanggal berapa pun dalam satu bulan, dihitung depresiasi satu bulan penuh untuk bulan tersebut.

9. **Export laporan hanya bisa untuk periode yang sudah memiliki data**
   Tidak bisa export laporan untuk bulan yang belum ada transaksinya — sistem menampilkan pesan informatif.

10. **Multi-usaha per anak tidak dibatasi**
    Satu anak bisa punya berapa pun usaha. Namun sistem merekomendasikan maksimal 5 usaha aktif bersamaan (soft warning, tidak diblokir).

---

## 11. Security & Access Model

### 11.1 Row Level Security (RLS) Supabase

| Tabel | Akses Parent | Akses Anak (Child Mode) | Akses Publik |
|---|---|---|---|
| `profiles` | SELECT/UPDATE own | — | — |
| `children` | SELECT/INSERT/UPDATE/DELETE own children | SELECT own profile | — |
| `businesses` | SELECT all own children's businesses | SELECT/INSERT/UPDATE own businesses | — |
| `transactions` | SELECT all own children's | SELECT/INSERT/UPDATE/DELETE own | — |
| `journal_entries` | SELECT | SELECT | — |
| `assets` | SELECT all own children's | SELECT/INSERT/UPDATE/DELETE own | — |
| `parent_comments` | SELECT/INSERT/UPDATE/DELETE own | SELECT (own child) | — |
| `gamification_events` | SELECT | SELECT | — |

> ⚠️ Semua kebijakan RLS diimplementasikan di level Supabase, bukan hanya di aplikasi. Defense in depth.

### 11.2 Child Mode

- Saat anak dipilih, Zustand store menyimpan `activeChildId` + flag `isChildMode: true`
- Route `/parent/*` di-redirect ke `/dashboard` jika `isChildMode: true`
- Tombol "Keluar dari Mode Anak" memunculkan dialog input PIN orang tua
- PIN orang tua divalidasi via Supabase Edge Function (tidak pernah dikirim ke client)
- PIN anak (untuk masuk child mode) juga divalidasi server-side

### 11.3 Proteksi Data Anak

- Tidak ada email atau identitas publik untuk profil anak
- Foto aset dan nota disimpan di bucket **private** Supabase Storage
- URL foto menggunakan signed URL (kedaluwarsa 1 jam)
- Tidak ada fitur sharing publik (laporan tidak bisa di-share via link publik)

### 11.4 Aksi Sensitif Orang Tua (Perlu Konfirmasi)

- Hapus profil anak → konfirmasi teks "HAPUS [nama anak]"
- Reset PIN anak → konfirmasi password akun orang tua
- Hapus usaha → konfirmasi modal + peringatan data permanen

---

## 12. Sprint Plan / Roadmap

### Fase 1 — Fondasi (Estimasi: 2–3 minggu)

| No | Task | Output |
|---|---|---|
| 1.1 | Setup project Next.js 14 + Supabase + Tailwind + shadcn/ui | Project berjalan di localhost |
| 1.2 | Konfigurasi Supabase: semua tabel + RLS policies | DB siap, migration file |
| 1.3 | Auth flow: registrasi, login, Google OAuth | Orang tua bisa login |
| 1.4 | Manajemen profil anak (CRUD + PIN) | Buat/edit/hapus profil anak |
| 1.5 | Child mode (switch profile + PIN lock) | Mode anak aktif dan terkunci |
| 1.6 | Layout responsif: bottom nav (mobile) + sidebar (desktop) | Skeleton UI berjalan |
| 1.7 | Zustand store: auth, activeChild, activeBusiness | State global siap |

### Fase 2 — Inti Bisnis (Estimasi: 3–4 minggu)

| No | Task | Output |
|---|---|---|
| 2.1 | Manajemen usaha: buat, edit, arsipkan | CRUD usaha + COA otomatis |
| 2.2 | Manajemen aset: CRUD + depresiasi garis lurus | Modul aset selesai |
| 2.3 | Produk & komponen HPP: CRUD + kalkulasi otomatis | HPP dan margin dihitung |
| 2.4 | Manajemen stok: update otomatis saat transaksi | Stok realtime |
| 2.5 | Buku kas: catat pemasukan & pengeluaran | Transaksi tersimpan |
| 2.6 | Auto-generate jurnal double-entry | Jurnal otomatis terbuat |
| 2.7 | Tampilan jurnal umum & buku besar | Halaman jurnal/buku besar |

### Fase 3 — Laporan & Monitor (Estimasi: 2–3 minggu)

| No | Task | Output |
|---|---|---|
| 3.1 | Neraca saldo | Tabel neraca saldo |
| 3.2 | Laporan Laba Rugi | L/R dengan filter periode |
| 3.3 | Laporan Arus Kas | Arus kas 3 aktivitas |
| 3.4 | Neraca (Balance Sheet) | Balance sheet |
| 3.5 | Rekap aset | Rekap nilai buku aset |
| 3.6 | Grafik tren Recharts | Chart pemasukan vs pengeluaran |
| 3.7 | Export PDF (@react-pdf) | Download laporan PDF |
| 3.8 | Export Excel (SheetJS) | Download laporan .xlsx |
| 3.9 | Dashboard orang tua + komentar | Monitor + komentar selesai |

### Fase 4 — Gamifikasi & Polish (Estimasi: 1–2 minggu)

| No | Task | Output |
|---|---|---|
| 4.1 | Sistem poin: event tracking + update otomatis | Poin bertambah saat aksi |
| 4.2 | Badge unlock logic + halaman profil gamifikasi | Badge tampil dengan status |
| 4.3 | Streak harian | Counter streak |
| 4.4 | Level system + animasi level up | Progress level visual |
| 4.5 | Push notifikasi (Web Push API) | Notif ke ortu & anak |
| 4.6 | Supabase Realtime: komentar + badge | Update real-time |
| 4.7 | QA menyeluruh: mobile, edge cases, RLS | Bug-free untuk launch |

### Fase 5 — P1 Features & Capacitor (Estimasi: 2–3 minggu)

| No | Task | Output |
|---|---|---|
| 5.1 | Onboarding wizard | Wizard 3 langkah |
| 5.2 | Upload foto (aset, nota) via kamera/galeri | Foto tersimpan di Storage |
| 5.3 | Alert stok minimum | Badge merah di produk |
| 5.4 | Kategori transaksi custom | User-defined categories |
| 5.5 | Edukasi jurnal (tooltip kontekstual) | Penjelasan ramah anak |
| 5.6 | KPI widget laporan | Gross margin, net margin, dll. |
| 5.7 | Animasi reward Framer Motion | Confetti & animasi badge |
| 5.8 | Konfigurasi Capacitor | Build Android APK |
| 5.9 | Testing Capacitor: kamera, notif native, touch | App berjalan di Android |

---

## 13. Persyaratan Non-Fungsional

| Kategori | Metric | Target | Cara Ukur |
|---|---|---|---|
| **Performa** | First Contentful Paint (FCP) | ≤ 2 detik | Lighthouse |
| **Performa** | Largest Contentful Paint (LCP) | ≤ 3 detik | Lighthouse |
| **Performa** | Kalkulasi laporan (render) | ≤ 1 detik untuk 1 tahun data | Browser DevTools |
| **Availability** | Uptime | ≥ 99% | Vercel + UptimeRobot |
| **Mobile** | Breakpoint support | 360px – 1440px | Chrome DevTools |
| **Mobile** | Touch targets | Minimum 44×44px | Manual review |
| **Capacitor** | Tidak ada hover-only interactions | 0 fitur hover-only | Audit checklist |
| **Keamanan** | RLS enforcement | Semua tabel punya RLS aktif | Supabase dashboard |
| **Keamanan** | PIN tidak disimpan plaintext | Selalu di-hash | Code review |
| **Aksesibilitas** | Contrast ratio teks | WCAG AA (4.5:1) | Lighthouse |
| **Aksesibilitas** | Keyboard navigasi | Semua form accessible | Manual review |
| **PDF Export** | Ukuran file | ≤ 2MB per laporan | Manual test |
| **Data** | Konsistensi jurnal | Debit = Kredit selalu | Database constraint |

---

## 14. Success Metrics (KPIs)

| Metric | Definisi | Target (3 bulan post-launch) |
|---|---|---|
| **Aktivasi** | % orang tua yang membuat profil anak setelah registrasi | ≥ 90% |
| **Usaha Dibuat** | Rata-rata jumlah usaha per anak aktif | ≥ 1.5 usaha/anak |
| **Transaksi per Minggu** | Rata-rata transaksi dicatat per usaha aktif per minggu | ≥ 5 transaksi/minggu |
| **HPP Completion Rate** | % produk yang memiliki HPP lengkap (≥1 komponen) | ≥ 70% |
| **Laporan Dibuka** | % usaha aktif yang laporannya dibuka ≥1x per bulan | ≥ 60% |
| **Export Rate** | % usaha yang pernah export laporan ke PDF/Excel | ≥ 30% |
| **D30 Retention** | % anak yang masih aktif mencatat di hari ke-30 | ≥ 40% |
| **Streak ≥7 Hari** | % anak yang pernah capai streak ≥7 hari | ≥ 25% |
| **Komentar Ortu** | % orang tua yang pernah kirim ≥1 komentar | ≥ 50% |
| **Badge Unlock Rate** | Rata-rata badge yang di-unlock per anak | ≥ 3 badge |

---

## 15. Risiko & Mitigasi

| Risiko | Dampak | Kemungkinan | Mitigasi |
|---|---|---|---|
| Konsep akuntansi terlalu abstrak untuk anak 10–12 tahun | Tinggi | Sedang | Label semua istilah dengan penjelasan anak-friendly (tooltip). Tampilkan contoh nyata di setiap form. |
| Jurnal double-entry auto-generate salah mapping | Tinggi | Sedang | Unit test per kategori transaksi. Tampilkan jurnal yang dibuat di halaman konfirmasi transaksi. |
| Laporan tidak balance (debit ≠ kredit) | Tinggi | Rendah | Database constraint + validasi di level Supabase Edge Function sebelum commit. |
| Anak lupa PIN → terkunci dari child mode | Sedang | Sedang | Orang tua bisa reset PIN anak dari dashboard parent (setelah re-auth password). |
| Push notifikasi tidak didukung semua browser | Sedang | Tinggi | Fallback ke in-app notification badge. Notifikasi email sebagai opsional. |
| Capacitor: fitur kamera tidak bekerja di semua Android | Sedang | Sedang | Uji di minimum 3 device berbeda. Fallback upload dari galeri selalu tersedia. |
| Performa PDF export lambat untuk data 1 tahun | Rendah | Sedang | Batasi PDF per periode 3 bulan. Untuk 1 tahun, generate server-side via Edge Function. |
| Anak memasukkan data tidak realistis (beli aset Rp 1 miliar) | Rendah | Tinggi | Validasi range jumlah transaksi (max Rp 100 juta per transaksi, soft warning). |
| Data anak bocor (privacy concern) | Sangat Tinggi | Rendah | RLS ketat di semua tabel + signed URL untuk storage + tidak ada data publik. |
| Solo dev burnout / scope terlalu lebar | Tinggi | Tinggi | Ikuti fase roadmap secara disiplin. P1 features hanya setelah P0 stabil. Gunakan AI coding assistant secara maksimal. |

---

## Lampiran A: Struktur Folder

```
habiku-biz/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (parent)/
│   │   ├── dashboard/
│   │   ├── children/
│   │   └── comments/
│   ├── (child)/
│   │   ├── dashboard/
│   │   ├── businesses/
│   │   │   └── [businessId]/
│   │   │       ├── assets/
│   │   │       ├── products/
│   │   │       ├── transactions/
│   │   │       ├── journal/
│   │   │       └── reports/
│   │   └── profile/
│   └── api/
│       ├── journals/         ← auto-generate jurnal
│       ├── gamification/     ← event poin & badge
│       └── notifications/    ← push notif handler
├── components/
│   ├── ui/                   ← shadcn/ui base components
│   ├── layout/               ← Navbar, Sidebar, BottomNav
│   ├── business/             ← BusinessCard, BusinessForm
│   ├── assets/               ← AssetTable, AssetForm
│   ├── products/             ← ProductCard, HPPCalculator
│   ├── transactions/         ← TransactionForm, TransactionList
│   ├── journal/              ← JournalTable, LedgerView
│   ├── reports/              ← ProfitLoss, CashFlow, BalanceSheet
│   ├── gamification/         ← PointsBadge, LevelCard, BadgeGrid
│   └── charts/               ← TrendChart, CompositionPie
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── journal-engine.ts     ← logika auto-generate jurnal
│   ├── report-engine.ts      ← kalkulasi semua laporan
│   ├── hpp-calculator.ts     ← kalkulasi HPP
│   ├── gamification.ts       ← logika poin & badge
│   └── pdf-generator.ts      ← generate PDF laporan
├── stores/
│   ├── auth.store.ts
│   ├── business.store.ts
│   └── gamification.store.ts
├── types/
│   └── database.types.ts     ← generated dari Supabase
├── supabase/
│   └── migrations/           ← SQL migration files
└── capacitor.config.ts
```

---

## Lampiran B: Skema Warna & Desain

### Palet Warna (Anak-Friendly)

| Token | Hex | Penggunaan |
|---|---|---|
| `primary` | `#4F46E5` (Indigo) | CTA buttons, active state |
| `secondary` | `#10B981` (Emerald) | Pemasukan, profit, positive |
| `danger` | `#EF4444` (Red) | Pengeluaran, loss, alert |
| `warning` | `#F59E0B` (Amber) | Streak, achievement, stok rendah |
| `info` | `#3B82F6` (Blue) | Info, badge, level |
| `surface` | `#F9FAFB` | Background kartu |
| `text-primary` | `#111827` | Teks utama |
| `text-muted` | `#6B7280` | Label, deskripsi |

### Prinsip Desain

- **Rounded corners** konsisten: `rounded-2xl` untuk kartu, `rounded-full` untuk badge
- **Ilustrasi**: gunakan emoji besar sebagai icon placeholder di fase awal (cepat, anak-friendly)
- **Typography**: Inter untuk UI, ukuran minimum 14px di mobile
- **Spacing**: gunakan 4px grid (Tailwind default)
- **Empty states**: selalu ada ilustrasi + teks motivasi saat data kosong

---

## Lampiran C: Prompt AI Coding Assistant

Gunakan prompt berikut sebagai pembuka di sesi baru Claude Code / Cursor:

```
Saya membangun habiku-biz — platform edukasi manajemen usaha UMKM untuk anak 10-15 tahun.
Stack: Next.js 14 (App Router), Supabase, Tailwind CSS, shadcn/ui, Zustand, Framer Motion.

Konteks penting:
- Mobile-first, akan diconvert ke Capacitor
- Ada 2 role: Orang Tua (monitor) dan Anak (operator)
- Anak adalah sub-profil di bawah akun orang tua (bukan akun mandiri)
- Setiap usaha punya: aset, produk+HPP, transaksi kas, jurnal auto-generate, laporan keuangan
- Jurnal double-entry di-generate otomatis dari setiap transaksi (lihat journal-engine.ts)
- Semua laporan di-kalkulasi dari journal_entries (bukan dari transaksi langsung)
- RLS Supabase aktif di semua tabel
- Gamifikasi: poin per aksi, badge, streak, level

Untuk session ini, saya ingin mengerjakan: [SEBUTKAN MODUL/FITUR]
Referensi schema database ada di PRD_HabikuBiz_v1.0_Draft.md Section 4.
```

---

*PRD ini dibuat berdasarkan sesi discovery bersama Fian, Mei 2026.*
*Versi berikutnya (v1.1) akan mencakup feedback setelah Fase 1 selesai.*
