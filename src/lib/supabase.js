import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Safe to share between server (Astro frontmatter, per-request) and client
// (islands): it only ever holds the public anon key, and writes are gated
// server-side by RLS + is_admin(), not by keeping this key secret.
export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, { auth: { persistSession: typeof window !== 'undefined' } })
  : null;
