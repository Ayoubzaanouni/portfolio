# Personal Portfolio

Welcome to my personal portfolio! This project showcases my work, skills, and experience as a software engineer. Built with **React** and styled with **Sass**, this portfolio reflects my dedication to creating visually appealing and functional web applications.

## See My Work

Visit my portfolio at [ayoubzaanouni.com](https://ayoubzaanouni.com).

## Features

- **Responsive Design**: Ensures a seamless experience across all devices.
- **Interactive UI**: Built with React for dynamic and fast user interactions.
- **Custom Styling**: Leveraged Sass for maintainable and scalable CSS.
- **About Me Section**: Provides an overview of my background and expertise.
- **Contact Form**: Enables visitors to get in touch with me directly.

## Technologies Used

- **Frontend Framework**: React (Vite)
- **Styling**: Sass
- **Content & Admin**: Supabase (Postgres, Auth, Storage), all on the free tier
- **Deployment**: Vercel, deployed automatically by GitHub Actions

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

If Supabase is unreachable, the site falls back to the static data in `src/data/`.

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
1. Import the repo in [Vercel](https://vercel.com) (framework: Vite) or run `npx vercel link` locally.
2. In **Settings → Environment Variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   for Production and Preview. If you connected Supabase through Vercel's integration, its
   `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are picked up automatically
   (see `vite.config.js`).

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
  - `admin/` - The `/admin` dashboard (login, content editors).
  - `api/content.js` - Reads and writes content in Supabase, with static fallback.
  - `components/` - Contains reusable React components.
  - `data/` - Fallback content used when Supabase is not configured or unreachable.
  - `assets/` - Includes images, icons, and other static files.
  - `scenes/` - Contains individual pages for the portfolio.
  - `App.jsx` - Main component that renders the application.
  - `index.jsx` - Entry point of the React application.
- `supabase/` - Database schema and seed data.

## Contributions

Contributions are welcome! If you'd like to suggest enhancements or report bugs, please open an issue or submit a pull request.


## Contact

Feel free to reach out to me for any questions or collaborations:

- **Email**: zaanouniab@gmai.com
- **LinkedIn**: [Ayoub Zaanouni](https://www.linkedin.com/in/zaanouni-ayoub/)
- **GitHub**: [AyoubZaanouni](https://github.com/AyoubZaanouni)

Thank you for visiting my portfolio!

