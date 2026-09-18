import { afterEach, describe, expect, it, vi } from 'vitest';

// content.js reads `supabase`/`isSupabaseConfigured` from '../lib/supabase'
// at module load time, so each scenario needs its own fresh module graph.
const loadContentApi = async (supabaseMock) => {
  vi.resetModules();
  vi.doMock('../lib/supabase', () => supabaseMock);
  return import('./content');
};

afterEach(() => {
  vi.doUnmock('../lib/supabase');
  vi.resetModules();
});

describe('content API fallback behavior', () => {
  it('falls back to static data when Supabase is not configured', async () => {
    const { getProfile, getProjects } = await loadContentApi({
      isSupabaseConfigured: false,
      supabase: null,
    });

    const profile = await getProfile();
    const projects = await getProjects();

    expect(profile).toBeTruthy();
    expect(profile.linkedin_url).toBeTruthy();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('falls back to static data when a configured Supabase query fails', async () => {
    const supabase = {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: new Error('network down') }),
          }),
          order: () => ({
            order: async () => ({ data: null, error: new Error('network down') }),
          }),
        }),
      }),
    };

    const { getProfile, getProjects } = await loadContentApi({
      isSupabaseConfigured: true,
      supabase,
    });

    const profile = await getProfile();
    const projects = await getProjects();

    // Falls back rather than throwing / returning null.
    expect(profile).toBeTruthy();
    expect(profile.linkedin_url).toBeTruthy();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('returns real data (not fallback) when a configured query succeeds', async () => {
    const realProfile = { id: 1, linkedin_url: 'https://real.example/li' };
    const supabase = {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: realProfile, error: null }),
          }),
        }),
      }),
    };

    const { getProfile } = await loadContentApi({
      isSupabaseConfigured: true,
      supabase,
    });

    await expect(getProfile()).resolves.toEqual(realProfile);
  });

  it('getProject finds a project by string-coerced id from the fallback list', async () => {
    const { getProject, getProjects } = await loadContentApi({
      isSupabaseConfigured: false,
      supabase: null,
    });

    const [first] = await getProjects();
    await expect(getProject(String(first.id))).resolves.toEqual(first);
    await expect(getProject('does-not-exist')).resolves.toBeNull();
  });

  it('admin write helpers refuse to run when Supabase is not configured', async () => {
    const { saveProfile, listRows } = await loadContentApi({
      isSupabaseConfigured: false,
      supabase: null,
    });

    await expect(saveProfile({})).rejects.toThrow(/not configured/i);
    await expect(listRows('projects')).rejects.toThrow(/not configured/i);
  });
});
