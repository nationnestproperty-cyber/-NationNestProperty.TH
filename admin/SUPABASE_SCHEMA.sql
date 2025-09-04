-- Table
create table if not exists public.listings (
  id bigint generated always as identity primary key,
  title text not null,
  price numeric,
  area numeric,
  beds int,
  baths int,
  type text,
  province text,
  location text,
  lat numeric,
  lng numeric,
  cover text,
  images jsonb,
  description text,
  created_at timestamp with time zone default now()
);
-- RLS
alter table public.listings enable row level security;
create policy "Allow anon read" on public.listings for select using (true);
create policy "Allow anon insert" on public.listings for insert with check (true);
create policy "Allow anon update own" on public.listings for update using (true);
create policy "Allow anon delete" on public.listings for delete using (true);
-- Storage bucket
-- Create bucket 'properties' (via dashboard) and set public

-- Profiles table for roles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('agent','reviewer','admin')) default 'agent'
);
alter table public.profiles enable row level security;
create policy "Public read profiles" on public.profiles for select using (true);

-- Add status column to listings
do $$ begin
  alter table public.listings add column if not exists status text default 'pending';
exception when duplicate_column then null; end $$;

-- Policies (example; adjust for production)
drop policy if exists "Allow anon insert" on public.listings;
drop policy if exists "Allow anon update own" on public.listings;
drop policy if exists "Allow anon delete" on public.listings;
create policy "Read all approved" on public.listings for select using (true);
create policy "Insert any (demo)" on public.listings for insert with check (true);
create policy "Update any (demo)" on public.listings for update using (true);
create policy "Delete any (demo)" on public.listings for delete using (true);
-- NOTE: สำหรับ production แนะนำปรับเป็นใช้ auth.uid() + check role จาก profiles
