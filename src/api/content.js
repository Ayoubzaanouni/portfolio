import { isSupabaseConfigured, supabase } from '../lib/supabase';
import fallbackExperiences from '../data/experiences';
import fallbackProfile from '../data/profile';
import fallbackProjects from '../data/projects';
import fallbackSkills from '../data/skills';

// Static data used when Supabase is not configured or unreachable
// (for example while a free project is paused).
const fallback = {
  profile: fallbackProfile,
  projects: fallbackProjects.map((p, i) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image_url: p.image?.src ?? null,
    site_url: p.links?.site || null,
    repo_url: p.links?.repo || null,
    technologies: p.technologies,
    sort_order: i,
  })),
  experiences: fallbackExperiences.map((e, i) => ({
    id: String(e.id),
    company_logo_url: e.companyLogo,
    job_title: e.jobTitle,
    company: e.company,
    location: e.location,
    dates: e.dates,
    description: e.description,
    skills: e.skills,
    sort_order: i,
  })),
  skills: fallbackSkills,
};

const cache = new Map();

const cached = (key, load) => {
  if (!cache.has(key)) {
    cache.set(
      key,
      load().catch((error) => {
        cache.delete(key);
        throw error;
      }),
    );
  }
  return cache.get(key);
};

export const invalidateContent = () => cache.clear();

const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

const readOrFallback = (key, query) =>
  cached(key, async () => {
    if (!isSupabaseConfigured) return fallback[key];
    try {
      return unwrap(await query());
    } catch (error) {
      console.warn(`Could not load ${key} from Supabase`, error);
      return fallback[key];
    }
  });

const ordered = (table) =>
  supabase
    .from(table)
    .select('*')
    .order('sort_order')
    .order('created_at');

// ---------------------------------------------------------------------------
// Public reads
// ---------------------------------------------------------------------------
export const getProfile = () =>
  readOrFallback('profile', () =>
    supabase.from('profile').select('*').eq('id', 1).single(),
  );

export const getProjects = () =>
  readOrFallback('projects', () => ordered('projects'));

export const getProject = async (id) =>
  (await getProjects()).find((p) => String(p.id) === id) ?? null;

export const getExperiences = () =>
  readOrFallback('experiences', () => ordered('experiences'));

export const getSkills = () =>
  readOrFallback('skills', () => ordered('skills'));

// ---------------------------------------------------------------------------
// Admin writes (require a logged-in admin; enforced by RLS)
// ---------------------------------------------------------------------------
const requireClient = () => {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    );
  }
  return supabase;
};

export const listRows = async (table) => {
  requireClient();
  return unwrap(await ordered(table));
};

export const saveRow = async (table, row) => {
  const client = requireClient();
  const { id, ...values } = row;
  const query = id
    ? client.from(table).update(values).eq('id', id)
    : client.from(table).insert(values);
  const data = unwrap(await query.select().single());
  invalidateContent();
  return data;
};

export const deleteRow = async (table, id) => {
  unwrap(await requireClient().from(table).delete().eq('id', id));
  invalidateContent();
};

// Persists the order of `rows` as their sort_order (only rows that moved).
export const saveOrder = async (table, rows) => {
  const client = requireClient();
  const changed = rows
    .map((row, index) => ({ row, index }))
    .filter(({ row, index }) => row.sort_order !== index);
  const results = await Promise.all(
    changed.map(({ row, index }) =>
      client
        .from(table)
        .update({ sort_order: index })
        .eq('id', row.id),
    ),
  );
  results.forEach(unwrap);
  invalidateContent();
};

export const getProfileRow = async () =>
  unwrap(
    await requireClient()
      .from('profile')
      .select('*')
      .eq('id', 1)
      .maybeSingle(),
  );

export const saveProfile = async (values) => {
  const data = unwrap(
    await requireClient()
      .from('profile')
      .upsert({ ...values, id: 1, updated_at: new Date().toISOString() })
      .select()
      .single(),
  );
  invalidateContent();
  return data;
};

const safeName = (name) =>
  name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');

export const uploadFile = async (bucket, file, path) => {
  const storage = requireClient().storage.from(bucket);
  const filePath = path ?? `${Date.now()}-${safeName(file.name)}`;
  unwrap(
    await storage.upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    }),
  );
  return storage.getPublicUrl(filePath).data.publicUrl;
};
