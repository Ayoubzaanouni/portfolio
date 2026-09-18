import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // AdminApp mounts its own <BrowserRouter basename="/admin">, so the
    // route-matching tests need a starting URL under that basename.
    environmentOptions: { jsdom: { url: 'http://localhost/admin/' } },
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
  },
});
