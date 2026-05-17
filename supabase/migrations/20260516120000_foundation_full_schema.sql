-- Fase 0: skema domain penuh + RLS + profil orang tua.
-- ID `children` / `businesses` tetap TEXT (selaras migrasi awal & seed demo).

-- ─── Enum types ─────────────────────────────────────────────────────────────
create type public.parent_role as enum ('parent');
create type public.asset_category as enum ('tetap', 'lancar', 'perlengkapan');
create type public.depreciation_method as enum ('garis_lurus', 'none');
create type public.hpp_component_type as enum ('bahan_baku', 'tenaga_kerja', 'overhead');
create type public.transaction_flow as enum ('pemasukan', 'pengeluaran');
create type public.payment_method as enum ('tunai', 'transfer');
create type public.account_kind as enum ('aset', 'liabilitas', 'modal', 'pendapatan', 'beban');
create type public.parent_comment_ref_kind as enum ('transaction', 'laporan', 'aset', 'hpp', 'umum');
create type public.gamification_event_kind as enum ('poin_masuk', 'badge_unlock', 'streak_update', 'level_up');
create type public.notification_recipient_kind as enum ('parent', 'child');
create type public.notification_kind as enum ('komentar_baru', 'reminder_catat', 'badge_baru', 'level_up');

-- ─── Profil orang tua (1:1 auth.users) ───────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  email text,
  role public.parent_role not null default 'parent',
  avatar_url text,
  last_active_child_id text references public.children (id) on delete set null,
  last_active_business_id text references public.businesses (id) on delete set null,
  created_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles (email);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles for insert
  with check (auth.uid() = id);

-- Sinkron dari auth.users (registrasi baru)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      ''
    ),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Backfill profil untuk user yang sudah ada
insert into public.profiles (id, full_name, email)
select
  u.id,
  coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name', ''),
  u.email
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

-- ─── Perluasan children / businesses ─────────────────────────────────────────
alter table public.children
  add column if not exists pin_hash text,
  add column if not exists avatar_url text,
  add column if not exists total_points integer not null default 0,
  add column if not exists level integer not null default 1;

alter table public.businesses
  add column if not exists is_active boolean not null default true,
  add column if not exists logo_url text;

-- RLS: tambah WITH CHECK pada UPDATE (Supabase / Postgres RLS)
drop policy if exists "children_update_own" on public.children;
create policy "children_update_own" on public.children
  for update
  using (auth.uid() = parent_user_id)
  with check (auth.uid() = parent_user_id);

drop policy if exists "businesses_update_via_child" on public.businesses;
create policy "businesses_update_via_child" on public.businesses
  for update
  using (
    exists (
      select 1
      from public.children c
      where c.id = businesses.child_id and c.parent_user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.children c
      where c.id = businesses.child_id and c.parent_user_id = auth.uid()
    )
  );

-- ─── Chart of accounts & buku besar ──────────────────────────────────────────
create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  business_id text not null references public.businesses (id) on delete cascade,
  code text not null,
  name text not null,
  type public.account_kind not null,
  is_default boolean not null default true,
  created_at timestamptz not null default now(),
  unique (business_id, code)
);

create index accounts_business_id_idx on public.accounts (business_id);

-- ─── Aset, produk, HPP ─────────────────────────────────────────────────────
create table public.assets (
  id uuid primary key default gen_random_uuid(),
  business_id text not null references public.businesses (id) on delete cascade,
  name text not null,
  category public.asset_category not null,
  acquisition_date date not null,
  acquisition_cost numeric(15, 2) not null,
  useful_life_months integer,
  depreciation_method public.depreciation_method not null default 'none',
  current_value numeric(15, 2),
  notes text,
  photo_url text,
  created_at timestamptz not null default now()
);

create index assets_business_id_idx on public.assets (business_id);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  business_id text not null references public.businesses (id) on delete cascade,
  name text not null,
  unit text,
  selling_price numeric(15, 2),
  hpp numeric(15, 2) not null default 0,
  stock_qty numeric(10, 2) not null default 0,
  photo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index products_business_id_idx on public.products (business_id);

create table public.hpp_components (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  name text not null,
  component_type public.hpp_component_type not null,
  quantity numeric(10, 4) not null default 1,
  unit text,
  unit_cost numeric(15, 2) not null,
  total_cost numeric(15, 2) generated always as (round(quantity * unit_cost, 2)) stored,
  created_at timestamptz not null default now()
);

create index hpp_components_product_id_idx on public.hpp_components (product_id);

-- ─── Transaksi & jurnal ─────────────────────────────────────────────────────
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  business_id text not null references public.businesses (id) on delete cascade,
  date date not null,
  type public.transaction_flow not null,
  category text not null,
  description text not null,
  amount numeric(15, 2) not null,
  product_id uuid references public.products (id) on delete set null,
  qty_sold numeric(10, 2),
  payment_method public.payment_method not null default 'tunai',
  receipt_url text,
  created_at timestamptz not null default now(),
  constraint transactions_amount_positive check (amount > 0)
);

create index transactions_business_id_idx on public.transactions (business_id);
create index transactions_date_idx on public.transactions (date);

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  business_id text not null references public.businesses (id) on delete cascade,
  transaction_id uuid references public.transactions (id) on delete cascade,
  entry_date date not null,
  description text not null,
  created_at timestamptz not null default now()
);

create index journal_entries_business_id_idx on public.journal_entries (business_id);
create index journal_entries_transaction_id_idx on public.journal_entries (transaction_id);

create table public.journal_lines (
  id uuid primary key default gen_random_uuid(),
  journal_entry_id uuid not null references public.journal_entries (id) on delete cascade,
  account_code text not null,
  account_name text not null,
  debit numeric(15, 2) not null default 0,
  credit numeric(15, 2) not null default 0,
  constraint journal_lines_one_sided check (
    (debit > 0 and credit = 0)
    or (credit > 0 and debit = 0)
  )
);

create index journal_lines_journal_entry_id_idx on public.journal_lines (journal_entry_id);

create or replace function public.enforce_journal_entry_balanced()
returns trigger
language plpgsql
as $$
declare
  entry_id uuid;
  diff numeric;
begin
  entry_id := coalesce(new.journal_entry_id, old.journal_entry_id);
  select coalesce(sum(debit), 0) - coalesce(sum(credit), 0)
  into diff
  from public.journal_lines
  where journal_entry_id = entry_id;

  if exists (select 1 from public.journal_lines where journal_entry_id = entry_id)
     and abs(diff) > 0.0001 then
    raise exception 'Baris jurnal tidak seimbang untuk entry % (selisih %)', entry_id, diff;
  end if;
  return null;
end;
$$;

create constraint trigger journal_lines_balance_trigger
  after insert or update or delete on public.journal_lines
  deferrable initially deferred
  for each row
  execute function public.enforce_journal_entry_balanced();

-- ─── Komentar, gamifikasi, notifikasi ──────────────────────────────────────
create table public.parent_comments (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles (id) on delete cascade,
  child_id text not null references public.children (id) on delete cascade,
  business_id text not null references public.businesses (id) on delete cascade,
  ref_type public.parent_comment_ref_kind not null,
  ref_id uuid,
  comment text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index parent_comments_business_id_idx on public.parent_comments (business_id);

create table public.gamification_events (
  id uuid primary key default gen_random_uuid(),
  child_id text not null references public.children (id) on delete cascade,
  event_type public.gamification_event_kind not null,
  poin_delta integer not null default 0,
  badge_id text,
  streak_count integer,
  ref_id uuid,
  note text,
  created_at timestamptz not null default now()
);

create index gamification_events_child_id_idx on public.gamification_events (child_id);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id text not null,
  recipient_type public.notification_recipient_kind not null,
  type public.notification_kind not null,
  title text not null,
  body text not null,
  ref_id uuid,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index notifications_recipient_idx on public.notifications (recipient_type, recipient_id);

-- ─── RLS: helper kepemilikan usaha ──────────────────────────────────────────
create or replace function public.user_owns_business(b_id text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.businesses b
    join public.children c on c.id = b.child_id
    where b.id = b_id and c.parent_user_id = auth.uid()
  );
$$;

create or replace function public.user_owns_child(ch_id text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.children c
    where c.id = ch_id and c.parent_user_id = auth.uid()
  );
$$;

-- accounts
alter table public.accounts enable row level security;

create policy "accounts_select" on public.accounts for select using (public.user_owns_business(business_id));
create policy "accounts_insert" on public.accounts for insert with check (public.user_owns_business(business_id));
create policy "accounts_update" on public.accounts
  for update using (public.user_owns_business(business_id)) with check (public.user_owns_business(business_id));
create policy "accounts_delete" on public.accounts for delete using (public.user_owns_business(business_id));

-- assets
alter table public.assets enable row level security;

create policy "assets_select" on public.assets for select using (public.user_owns_business(business_id));
create policy "assets_insert" on public.assets for insert with check (public.user_owns_business(business_id));
create policy "assets_update" on public.assets
  for update using (public.user_owns_business(business_id)) with check (public.user_owns_business(business_id));
create policy "assets_delete" on public.assets for delete using (public.user_owns_business(business_id));

-- products
alter table public.products enable row level security;

create policy "products_select" on public.products for select using (public.user_owns_business(business_id));
create policy "products_insert" on public.products for insert with check (public.user_owns_business(business_id));
create policy "products_update" on public.products
  for update using (public.user_owns_business(business_id)) with check (public.user_owns_business(business_id));
create policy "products_delete" on public.products for delete using (public.user_owns_business(business_id));

-- hpp_components (lewat produk → usaha)
alter table public.hpp_components enable row level security;

create policy "hpp_select" on public.hpp_components for select using (
  exists (
    select 1 from public.products p
    where p.id = hpp_components.product_id and public.user_owns_business(p.business_id)
  )
);
create policy "hpp_insert" on public.hpp_components for insert with check (
  exists (
    select 1 from public.products p
    where p.id = hpp_components.product_id and public.user_owns_business(p.business_id)
  )
);
create policy "hpp_update" on public.hpp_components
  for update
  using (
    exists (
      select 1 from public.products p
      where p.id = hpp_components.product_id and public.user_owns_business(p.business_id)
    )
  )
  with check (
    exists (
      select 1 from public.products p
      where p.id = hpp_components.product_id and public.user_owns_business(p.business_id)
    )
  );
create policy "hpp_delete" on public.hpp_components for delete using (
  exists (
    select 1 from public.products p
    where p.id = hpp_components.product_id and public.user_owns_business(p.business_id)
  )
);

-- transactions
alter table public.transactions enable row level security;

create policy "tx_select" on public.transactions for select using (public.user_owns_business(business_id));
create policy "tx_insert" on public.transactions for insert with check (public.user_owns_business(business_id));
create policy "tx_update" on public.transactions
  for update using (public.user_owns_business(business_id)) with check (public.user_owns_business(business_id));
create policy "tx_delete" on public.transactions for delete using (public.user_owns_business(business_id));

-- journal_entries
alter table public.journal_entries enable row level security;

create policy "je_select" on public.journal_entries for select using (public.user_owns_business(business_id));
create policy "je_insert" on public.journal_entries for insert with check (public.user_owns_business(business_id));
create policy "je_update" on public.journal_entries
  for update using (public.user_owns_business(business_id)) with check (public.user_owns_business(business_id));
create policy "je_delete" on public.journal_entries for delete using (public.user_owns_business(business_id));

-- journal_lines
alter table public.journal_lines enable row level security;

create policy "jl_select" on public.journal_lines for select using (
  exists (
    select 1 from public.journal_entries e
    where e.id = journal_lines.journal_entry_id and public.user_owns_business(e.business_id)
  )
);
create policy "jl_insert" on public.journal_lines for insert with check (
  exists (
    select 1 from public.journal_entries e
    where e.id = journal_lines.journal_entry_id and public.user_owns_business(e.business_id)
  )
);
create policy "jl_update" on public.journal_lines
  for update
  using (
    exists (
      select 1 from public.journal_entries e
      where e.id = journal_lines.journal_entry_id and public.user_owns_business(e.business_id)
    )
  )
  with check (
    exists (
      select 1 from public.journal_entries e
      where e.id = journal_lines.journal_entry_id and public.user_owns_business(e.business_id)
    )
  );
create policy "jl_delete" on public.journal_lines for delete using (
  exists (
    select 1 from public.journal_entries e
    where e.id = journal_lines.journal_entry_id and public.user_owns_business(e.business_id)
  )
);

-- parent_comments (ortu: CRUD sendiri; anak tidak hapus — dicek aplikasi Fase 5)
alter table public.parent_comments enable row level security;

create policy "pc_select" on public.parent_comments for select using (
  parent_id = auth.uid()
  or public.user_owns_business(business_id)
);
create policy "pc_insert" on public.parent_comments for insert with check (
  parent_id = auth.uid()
  and public.user_owns_child(child_id)
  and public.user_owns_business(business_id)
);
create policy "pc_update" on public.parent_comments
  for update
  using (parent_id = auth.uid())
  with check (parent_id = auth.uid());
create policy "pc_delete" on public.parent_comments for delete using (parent_id = auth.uid());

-- gamification_events
alter table public.gamification_events enable row level security;

create policy "ge_select" on public.gamification_events for select using (public.user_owns_child(child_id));
create policy "ge_insert" on public.gamification_events for insert with check (public.user_owns_child(child_id));
create policy "ge_update" on public.gamification_events
  for update using (public.user_owns_child(child_id)) with check (public.user_owns_child(child_id));
create policy "ge_delete" on public.gamification_events for delete using (public.user_owns_child(child_id));

-- notifications
alter table public.notifications enable row level security;

create policy "notif_select" on public.notifications for select using (
  (recipient_type = 'parent' and recipient_id = auth.uid()::text)
  or (
    recipient_type = 'child'
    and public.user_owns_child(recipient_id)
  )
);
create policy "notif_insert" on public.notifications for insert with check (
  (recipient_type = 'parent' and recipient_id = auth.uid()::text)
  or (
    recipient_type = 'child'
    and public.user_owns_child(recipient_id)
  )
);
create policy "notif_update" on public.notifications
  for update
  using (
    (recipient_type = 'parent' and recipient_id = auth.uid()::text)
    or (
      recipient_type = 'child'
      and public.user_owns_child(recipient_id)
    )
  )
  with check (
    (recipient_type = 'parent' and recipient_id = auth.uid()::text)
    or (
      recipient_type = 'child'
      and public.user_owns_child(recipient_id)
    )
  );
create policy "notif_delete" on public.notifications for delete using (
  (recipient_type = 'parent' and recipient_id = auth.uid()::text)
  or (
    recipient_type = 'child'
    and public.user_owns_child(recipient_id)
  )
);
