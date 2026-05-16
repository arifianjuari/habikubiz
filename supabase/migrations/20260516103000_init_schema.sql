-- Skema awal HabikuBiz (children + businesses). RLS berbasis auth.uid().
-- ID bertipe text agar kompatibel dengan seed demo / migrasi bertahap.

create table public.children (
  id text primary key,
  parent_user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  birth_year integer not null,
  initials text not null,
  created_at timestamptz not null default now(),
  constraint children_birth_year_chk check (birth_year >= 1990 and birth_year <= 2099)
);

create table public.businesses (
  id text primary key,
  child_id text not null references public.children (id) on delete cascade,
  name text not null,
  type text not null,
  category text not null,
  description text not null,
  initial_capital bigint not null default 0,
  estimated_cash_rp bigint not null default 0,
  tagline text not null default '',
  constraint businesses_type_chk check (type in ('simulasi', 'nyata'))
);

alter table public.children enable row level security;
alter table public.businesses enable row level security;

create policy "children_select_own" on public.children for select using (auth.uid() = parent_user_id);

create policy "children_insert_own" on public.children for insert with check (auth.uid() = parent_user_id);

create policy "children_update_own" on public.children for update using (auth.uid() = parent_user_id);

create policy "children_delete_own" on public.children for delete using (auth.uid() = parent_user_id);

create policy "businesses_select_via_child" on public.businesses for select using (
  exists (
    select 1
    from public.children c
    where c.id = businesses.child_id and c.parent_user_id = auth.uid()
  )
);

create policy "businesses_insert_via_child" on public.businesses for insert with check (
  exists (
    select 1
    from public.children c
    where c.id = businesses.child_id and c.parent_user_id = auth.uid()
  )
);

create policy "businesses_update_via_child" on public.businesses for update using (
  exists (
    select 1
    from public.children c
    where c.id = businesses.child_id and c.parent_user_id = auth.uid()
  )
);

create policy "businesses_delete_via_child" on public.businesses for delete using (
  exists (
    select 1
    from public.children c
    where c.id = businesses.child_id and c.parent_user_id = auth.uid()
  )
);
