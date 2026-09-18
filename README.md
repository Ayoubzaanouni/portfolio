# Personal Portfolio

Welcome to my personal portfolio! This project showcases my work, skills, and experience as a software engineer. Built with **Astro** (server-rendered, with React islands for interactive parts) and styled with **Sass**, this portfolio reflects my dedication to creating visually appealing and functional web applications.

## See My Work

Visit my portfolio at [ayoubzaanouni.com](https://ayoubzaanouni.com).

## Features

- **Responsive Design**: Ensures a seamless experience across all devices.
- **Interactive UI**: Built with React for dynamic and fast user interactions.
- **Custom Styling**: Leveraged Sass for maintainable and scalable CSS.
- **About Me Section**: Provides an overview of my background and expertise.
- **Contact Form**: Enables visitors to get in touch with me directly.

## Technologies Used

- **Frontend Framework**: Astro (SSR) with React islands for interactive UI and the `/admin` dashboard
- **Styling**: Sass
- **Content & Admin**: Supabase (Postgres, Auth, Storage), all on the free tier
- **Deployment**: Vercel (`@astrojs/vercel` adapter, SSR), deployed automatically by GitHub Actions

## Installation

To run this project locally:

1. Clone the repository and install dependencies (Node version in `.nvmrc`):
   ```bash
   git clone https://github.com/Ayoubzaanouni/portfolio.git
   cd portfolio
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your Supabase URL and anon key (see below).
   Without them the site still runs, using the static data in `src/data/`.
3. Start the development server:
   ```bash
   npm run start
   ```

The application will open in your default browser at `http://localhost:3000`.

## Editing content

All content (projects, experiences, about/intro text, skills & tools, resume PDF) lives in Supabase
and is edited at **`/admin`** (e.g. `https://ayoubzaanouni.com/admin`). Changes are live immediately, no redeploy needed.

In text fields, separate paragraphs with an empty line, use `**text**` for a purple highlight and `*text*` for bold.
Skill icons come from `src/utils/iconRegistry.js`; add an import there to offer more icons.

If Supabase is unreachable, the site falls back to the static data in `src/data/`. Since that's a
second, hand-maintained copy of the same content, run `npm run sync-fallback` after making changes
in `/admin` to regenerate those files from what's actually live (requires `PUBLIC_SUPABASE_URL` /
`PUBLIC_SUPABASE_ANON_KEY` in `.env.local`).

Public pages (`/`, `/about`, `/projects`, `/experiences`, `/resume`, `/project/:id`) are
server-rendered per request, so content is real, crawlable HTML — not something that only appears
after JavaScript runs. `/admin` stays a client-only React app (nothing there needs to be crawlable).

## One-time setup

### 1. Supabase (free)
1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql), then [`supabase/seed.sql`](supabase/seed.sql).
3. In **Authentication → Sign In / Providers**, turn off *Allow new users to sign up*.
4. In **Authentication → Users → Add user**, create your admin user (email + password, auto-confirm).
5. Back in **SQL Editor**, allow that user to edit content:
   ```sql
   insert into public.admins (email) values ('your-admin-email@example.com');
   ```
6. In **Project Settings → API**, copy the *Project URL* and the *anon public* key.

### 2. Vercel
1. Import the repo in [Vercel](https://vercel.com) (framework: Astro) or run `npx vercel link` locally.
2. In **Settings → Environment Variables**, add `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`
   for Production and Preview.
3. Add the contact-form variables too — see `.env.example` for the full list.
   `PUBLIC_RECAPTCHA_SITE_KEY` is public; `RECAPTCHA_SECRET_KEY`, `EMAILJS_SERVICE_ID`,
   `EMAILJS_TEMPLATE_ID` and `EMAILJS_PRIVATE_KEY` are server-only and back
   [`src/pages/api/contact.js`](src/pages/api/contact.js), which verifies the reCAPTCHA token with
   Google before sending the email itself via EmailJS's REST API — the browser never talks to
   EmailJS directly.

### 3. GitHub Actions (automatic deployment)
Deployments are done by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
a push to `main` deploys to production, and every pull request gets a preview URL posted as a comment.
`vercel.json` turns off Vercel's own Git deployments so nothing gets deployed twice.

Add these in **GitHub repo → Settings → Secrets and variables → Actions**:

| Secret | Where to find it |
| --- | --- |
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `npx vercel link` (`orgId`) |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` (`projectId`) |
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_ANON_KEY` | Supabase anon public key |

The two Supabase secrets are used by [`.github/workflows/supabase-keepalive.yml`](.github/workflows/supabase-keepalive.yml),
which pings the database every 3 days so the free project isn't paused for inactivity.

## Folder Structure

- `src`
  - `pages/` - Astro routes (`.astro` files = pages; `pages/api/contact.js` = the contact-form API route).
  - `admin/` - The `/admin` dashboard (login, content editors) — a client-only React app.
  - `api/content.js` - Reads and writes content in Supabase, with static fallback.
  - `components/` - Reusable Astro components (chrome: header, nav, footer, theme toggle).
  - `islands/` - React components mounted client-side inside Astro pages (Tilt avatar, résumé viewer).
  - `scenes/` - Leftover per-feature styles/components still referenced by pages and islands.
  - `data/` - Fallback content used when Supabase is not configured or unreachable.
  - `assets/` - Includes images, icons, and other static files.
  - `layouts/` - Shared Astro page shells (`Layout.astro` = `<head>`; `BaseLayout`/`HomeLayout` = header+content+footer).
- `scripts/sync-fallback.mjs` - Regenerates `src/data/*` from live Supabase content.
- `supabase/` - Database schema and seed data.

## Contributions

Contributions are welcome! If you'd like to suggest enhancements or report bugs, please open an issue or submit a pull request.


## Contact

Feel free to reach out to me for any questions or collaborations:

- **Email**: zaanouniab@gmai.com
- **LinkedIn**: [Ayoub Zaanouni](https://www.linkedin.com/in/zaanouni-ayoub/)
- **GitHub**: [AyoubZaanouni](https://github.com/AyoubZaanouni)

Thank you for visiting my portfolio!

