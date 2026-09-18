import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  prefetch: true,
  vite: {
    plugins: [svgr()],
  },
  env: {
    schema: {
      PUBLIC_SUPABASE_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_SUPABASE_ANON_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_RECAPTCHA_SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      RECAPTCHA_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      EMAILJS_SERVICE_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      EMAILJS_TEMPLATE_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      EMAILJS_PRIVATE_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
