-- Preserve the existing CV as the English version.
-- Safe to run again; existing localized uploads are retained.
alter table public.profile
  add column if not exists resume_en_url text,
  add column if not exists resume_en_filename text,
  add column if not exists resume_fr_url text,
  add column if not exists resume_fr_filename text;

update public.profile
set resume_en_url = coalesce(resume_en_url, resume_url),
    resume_en_filename = coalesce(resume_en_filename, resume_filename);
