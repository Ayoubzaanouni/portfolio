-- Optional French translations. Existing columns remain the English source.
alter table public.profile
  add column if not exists intro_paragraphs_fr text[],
  add column if not exists about_paragraphs_fr text[],
  add column if not exists hobbies_fr text[];

alter table public.projects
  add column if not exists title_fr text,
  add column if not exists description_fr text;

alter table public.experiences
  add column if not exists job_title_fr text,
  add column if not exists location_fr text,
  add column if not exists dates_fr text,
  add column if not exists description_fr text,
  add column if not exists skills_fr text[];

alter table public.skills
  add column if not exists name_fr text;
