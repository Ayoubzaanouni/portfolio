import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Accept the variable names set by Vercel's Supabase integration too.
  // Only the project URL and the public anon key are exposed to the browser.
  const supabaseUrl =
    env.VITE_SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL ||
    env.SUPABASE_URL ||
    '';
  const supabaseAnonKey =
    env.VITE_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.SUPABASE_ANON_KEY ||
    '';

  return {
    base: '/',
    plugins: [svgr(), react()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_ANON_KEY':
        JSON.stringify(supabaseAnonKey),
    },
    server: {
      open: true,
      port: 3000,
    },
  };
});
