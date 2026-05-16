## habiku-biz

Aplikasi web **habiku-biz** (Next.js App Router) untuk edukasi manajemen usaha UMKM bagi anak usia 10–15 tahun — lihat `docs/PRD_HabikuBiz_v1.0_Draft.md` untuk skop produk.

### Stack (kode saat ini)

- Next.js **16** (App Router) + React 19
- **shadcn/ui** (Base UI, preset Nova) + Lucide — `components.json`, `src/components/ui/`
- Tailwind CSS **v4** — token OKLCH di `src/app/globals.css`, helper `cn()` di `src/lib/utils.ts`
- **next-themes** + Sonner (toast) di root layout
- Supabase (**@supabase/ssr**): `src/lib/supabase/*`, `src/middleware.ts` (refresh sesi), migrasi di `supabase/migrations/`
- State UI: **Zustand** (`src/stores/`)

### Memulai

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

- Tanpa `.env.local`: login menampilkan **mode demo** (toast) dan dashboard memakai data contoh dari repositori.
- Dengan Supabase: salin `.env.example` → `.env.local`, jalankan migrasi (`supabase db push` / CLI), daftar user di Auth, lalu isi baris `children` / `businesses` (lihat `supabase/seed.sql.example`).

### Supabase lokal (opsional)

```bash
npx supabase start
npx supabase db reset   # terapkan migrations + seed jika ada
```

### Perintah

| Perintah        | Arti                               |
|----------------|------------------------------------|
| `npm run dev`   | Server pengembangan                |
| `npm run build` | Build produksi                     |
| `npm run lint`  | ESLint (+ a11y via eslint-config-next; `eslint-plugin-jsx-a11y` tersedia eksplisit) |
| `npm run test`  | Vitest (`src/**/*.test.ts`)        |

**Keamanan:** jangan pernah mengekspos `SUPABASE_SERVICE_ROLE_KEY` ke klien atau `NEXT_PUBLIC_*`. Kunci publishable/anon hanya untuk browser.
