# Next Steps Foundation

## Auth/Data/UI foundation

- **UI**: **shadcn/ui** (Base UI + preset Nova). CLI `components.json`, komponen di `src/components/ui/`. Utility kelas `cn()` di [`src/lib/utils.ts`](../src/lib/utils.ts). Dokumen komponen: `npx shadcn@latest docs <nama>`.
- **Tailwind v4**: token OKLCH & tema gelap siap di [`src/app/globals.css`](../src/app/globals.css); `ThemeProvider` + **Sonner** (`Toaster`) di [`src/app/layout.tsx`](../src/app/layout.tsx).
- **Supabase**: klien [`src/lib/supabase/client.ts`](../src/lib/supabase/client.ts) & [`server.ts`](../src/lib/supabase/server.ts); **`middleware`** [`src/middleware.ts`](../src/middleware.ts) memanggil `updateSession`; OAuth/password login di [`src/app/login/login-form.tsx`](../src/app/login/login-form.tsx); callback [`src/app/auth/callback/route.ts`](../src/app/auth/callback/route.ts).
- **Auth server**: [`src/lib/supabase/auth.ts`](../src/lib/supabase/auth.ts) — **`getUser()`** per mintaan (cache React), bukan `getSession()` untuk otorisasi.
- Skema SQL awal: [`supabase/migrations/`](../supabase/migrations/). Contoh seed (manual): [`supabase/seed.sql.example`](../supabase/seed.sql.example).
- `.env.local` dari [`.env.example`](../.env.example).

Domain types: [`src/types/domain.ts`](../src/types/domain.ts), [`src/types/dashboard.ts`](../src/types/dashboard.ts).

App state: [`src/stores/app-store.ts`](../src/stores/app-store.ts) (mode, active child, active business).

Data layer: [`src/server/repositories/*`](../src/server/repositories/) — query Supabase bila env + sesi ada; selain itu fallback **demo** (mock arrays).

Motor jurnal + tes: [`src/lib/journal-engine.ts`](../src/lib/journal-engine.ts), `npm run test`.

Performance: fungsi repositori utama dibungkus **`React.cache()`**; dashboard ortu/anak memakai **`Suspense`** + [`loading.tsx`](../src/app/parent/dashboard/loading.tsx).

## Tujuan

Pondasi agar auth, data, dan UI konsisten dengan skill `.agents` tanpa mengacak halaman yang sudah ada.
