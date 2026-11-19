-- Schéma appliqué au projet Supabase « optique-vision-2000 » (migration init_optique_vision_2000)

create table public.staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  label text not null default '',
  added_at timestamptz not null default now()
);
alter table public.staff enable row level security;
create policy "staff: voir sa propre ligne" on public.staff for select to authenticated using (user_id = (select auth.uid()));

create schema if not exists private;
create or replace function private.is_staff() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.staff s where s.user_id = (select auth.uid()));
$$;
revoke all on function private.is_staff() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_staff() to authenticated;

create table public.shops (
  id text primary key,
  name text not null check (char_length(name) <= 120),
  address text not null default '',
  phone text not null default '',
  pos int not null default 0
);
create table public.settings (
  id int primary key default 1 check (id = 1),
  whatsapp text not null default '',
  email text not null default '',
  hours text not null default ''
);
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 160),
  brand text not null default '',
  cat text not null default 'Montures',
  price int not null default 0 check (price >= 0),
  descr text not null default '',
  photos jsonb not null default '[]'::jsonb,
  stock jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  name text not null check (char_length(name) <= 120),
  phone text check (char_length(phone) <= 40),
  mode text check (char_length(mode) <= 60),
  place text check (char_length(place) <= 200),
  shop text references public.shops(id),
  summary text check (char_length(summary) <= 2000),
  total int not null default 0 check (total >= 0),
  status text not null default 'Nouvelle',
  updated date,
  created_at timestamptz not null default now()
);
create table public.appts (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time text check (char_length(time) <= 10),
  name text not null check (char_length(name) <= 120),
  phone text check (char_length(phone) <= 40),
  service text check (char_length(service) <= 120),
  shop text references public.shops(id),
  status text not null default 'En attente',
  note text check (char_length(note) <= 1000),
  updated date,
  created_at timestamptz not null default now()
);
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text, city text,
  shop text references public.shops(id),
  ods text, ogs text, odc text, ogc text, oda text, oga text, addi text, ep text,
  note text,
  updated date,
  created_at timestamptz not null default now()
);
create table public.sales (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  shop text references public.shops(id),
  client text,
  pay text,
  items jsonb not null default '[]'::jsonb,
  total int not null default 0,
  created_at timestamptz not null default now()
);
create table public.repairs (
  id uuid primary key default gen_random_uuid(),
  date date,
  name text not null,
  phone text, item text, problem text,
  shop text references public.shops(id),
  price int not null default 0,
  status text not null default 'Reçu',
  updated date,
  created_at timestamptz not null default now()
);
create index on public.orders (shop);
create index on public.appts (shop);
create index on public.appts (date);
create index on public.clients (shop);
create index on public.sales (shop);
create index on public.sales (date);
create index on public.repairs (shop);

alter table public.shops enable row level security;
alter table public.settings enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.appts enable row level security;
alter table public.clients enable row level security;
alter table public.sales enable row level security;
alter table public.repairs enable row level security;

create policy "public: lire les magasins" on public.shops for select to anon, authenticated using (true);
create policy "public: lire les réglages" on public.settings for select to anon, authenticated using (true);
create policy "public: lire les articles visibles" on public.products for select to anon, authenticated using (active);
create policy "public: déposer une commande" on public.orders for insert to anon, authenticated with check (status = 'Nouvelle' and updated is null);
create policy "public: demander un rendez-vous" on public.appts for insert to anon, authenticated with check (status = 'En attente' and updated is null);
create policy "staff: magasins" on public.shops for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff: réglages" on public.settings for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff: articles" on public.products for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff: commandes" on public.orders for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff: rendez-vous" on public.appts for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff: clients" on public.clients for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff: ventes" on public.sales for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff: réparations" on public.repairs for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));

revoke all on public.staff, public.shops, public.settings, public.products, public.orders, public.appts, public.clients, public.sales, public.repairs from anon, authenticated;
grant select on public.shops, public.settings, public.products to anon;
grant insert on public.orders, public.appts to anon;
grant select on public.staff to authenticated;
grant select, insert, update, delete on public.shops, public.settings, public.products, public.orders, public.appts, public.clients, public.sales, public.repairs to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('produits', 'produits', true, 3145728, array['image/jpeg','image/png','image/webp']);
create policy "staff: ajouter des photos" on storage.objects for insert to authenticated with check (bucket_id = 'produits' and (select private.is_staff()));
create policy "staff: retirer des photos" on storage.objects for delete to authenticated using (bucket_id = 'produits' and (select private.is_staff()));

alter publication supabase_realtime add table public.products, public.orders, public.appts, public.clients, public.sales, public.repairs, public.shops, public.settings;
