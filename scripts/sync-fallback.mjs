#!/usr/bin/env node
// Regenerates src/data/{profile,projects,experiences,skills}.js from the
// live Supabase content, so the static fallback used when Supabase is
// unreachable (see src/api/content.js) doesn't silently drift from what's
// actually published. Run after editing content in /admin:
//
//   npm run sync-fallback
//
// Reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from .env.local (falls
// back to the real environment). Only touches the four generated files;
// nothing else in the repo.

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const loadDotEnvLocal = () => {
  const file = path.join(root, '.env.local');
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = line.match(/^\s*([\w.]+)\s*=\s*(.*)?\s*$/);
    if (!match || match[1].startsWith('#')) continue;
    const [, key, value = ''] = match;
    if (!(key in process.env)) process.env[key] = value.trim();
  }
};
loadDotEnvLocal();

const url = process.env.PUBLIC_SUPABASE_URL;
const anonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error(
    'Missing PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY (checked .env.local and the environment).',
  );
  process.exit(1);
}

const supabase = createClient(url, anonKey);

const ordered = (table) =>
  supabase.from(table).select('*').order('sort_order').order('created_at');

const fetchTable = async (table) => {
  const { data, error } = await ordered(table);
  if (error) throw error;
  return data;
};

const banner = (table) =>
  `// Static fallback, used when Supabase is unreachable (see src/api/content.js).\n` +
  `// Shape matches the \`${table}\` table row exactly. Regenerate with\n` +
  `// \`npm run sync-fallback\` after editing content in /admin.\n`;

const writeDataFile = (name, table, varName, rows) => {
  const file = path.join(root, 'src', 'data', `${name}.js`);
  const body = `${banner(table)}const ${varName} = ${JSON.stringify(rows, null, 2)};\n\nexport default ${varName};\n`;
  writeFileSync(file, body);
  console.log(`wrote src/data/${name}.js (${Array.isArray(rows) ? rows.length : 1} row(s))`);
};

const [profile, projects, experiences, skills] = await Promise.all([
  supabase.from('profile').select('*').eq('id', 1).single().then(({ data, error }) => {
    if (error) throw error;
    return data;
  }),
  fetchTable('projects'),
  fetchTable('experiences'),
  fetchTable('skills'),
]);

writeDataFile('profile', 'profile', 'profile', profile);
writeDataFile('projects', 'projects', 'data', projects);
writeDataFile('experiences', 'experiences', 'experiences', experiences);
writeDataFile('skills', 'skills', 'skills', skills);
