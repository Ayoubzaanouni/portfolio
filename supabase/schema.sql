-- Portfolio schema for Supabase.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Then run seed.sql, and finally add your admin email (see bottom of this file).

-- ---------------------------------------------------------------------------
-- Admins
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  email text primary key
);

alter table public.admins enable row level security;
-- No policies: the table is only readable through is_admin() below.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

-- ---------------------------------------------------------------------------
-- Content tables
-- ---------------------------------------------------------------------------
create table if not exists public.profile (
  id int primary key default 1 check (id = 1),
  intro_paragraphs text[] not null default '{}',
  about_paragraphs text[] not null default '{}',
  hobbies text[] not null default '{}',
  linkedin_url text,
  github_url text,
  avatar_url text,
  resume_url text,
  resume_filename text,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image_url text,
  site_url text,
  repo_url text,
  technologies text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company_logo_url text,
  job_title text not null,
  company text not null,
  location text,
  dates text,
  description text not null default '',
  skills text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon_key text,
  category text not null default 'skill' check (category in ('skill', 'tool')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security: everyone can read, only admins can write
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array['profile', 'projects', 'experiences', 'skills'] loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists "Public read" on public.%I', t);
    execute format('create policy "Public read" on public.%I for select using (true)', t);

    execute format('drop policy if exists "Admin insert" on public.%I', t);
    execute format('create policy "Admin insert" on public.%I for insert to authenticated with check (public.is_admin())', t);

    execute format('drop policy if exists "Admin update" on public.%I', t);
    execute format('create policy "Admin update" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);

    execute format('drop policy if exists "Admin delete" on public.%I', t);
    execute format('create policy "Admin delete" on public.%I for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Storage buckets (public read, admin write)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('images', 'images', true), ('documents', 'documents', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Portfolio public read" on storage.objects;
create policy "Portfolio public read" on storage.objects
  for select using (bucket_id in ('images', 'documents'));

drop policy if exists "Portfolio admin insert" on storage.objects;
create policy "Portfolio admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('images', 'documents') and public.is_admin());

drop policy if exists "Portfolio admin update" on storage.objects;
create policy "Portfolio admin update" on storage.objects
  for update to authenticated
  using (bucket_id in ('images', 'documents') and public.is_admin());

drop policy if exists "Portfolio admin delete" on storage.objects;
create policy "Portfolio admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id in ('images', 'documents') and public.is_admin());

-- ---------------------------------------------------------------------------
-- Make yourself admin (replace with the email of the user you created in
-- Authentication -> Users), then run this line:
-- insert into public.admins (email) values ('you@example.com');
-- ---------------------------------------------------------------------------
