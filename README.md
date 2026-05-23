# TrustLed AI — Next.js Website

A Next.js (App Router) version of the TrustLed AI advisory firm website. Seven pages with shared layout, scroll animations, FAQ accordion, Netlify Forms contact handling, and an admin CMS with live in-page editing (integrated from `trustled-ai`).

The original static HTML files are preserved in `legacy/` for reference.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin & live edit

1. Configure `.env` with your `ADMIN_USERNAME` and `ADMIN_PASSWORD` (and `MONGODB_URI` when you want edits to persist).
2. Optionally set `MONGODB_URI` so edits persist (without it, defaults are used when the DB is unreachable).
3. Sign in at `/admin/login`, then open `/admin` to jump to any page with `?edit=1`.
4. Click **Edit page** on the floating toolbar, change copy in place, then **Save changes**.

## Production build

```bash
npm run build
npm start
```

## Deploy to Netlify

1. Connect this repository to Netlify, or drag the folder to [Netlify Drop](https://app.netlify.com/drop).
2. Netlify detects Next.js automatically via `@netlify/plugin-nextjs` (configured in `netlify.toml`).
3. Add your custom domain under Site settings → Domain management.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/services` | Services (Advisory, Shadow AI, Automation) |
| `/solutions` | ASAT |
| `/education` | Education & Training |
| `/about` | About + team |
| `/contact` | Contact form |
| `/thank-you` | Shown after form submission |
| `/admin` | CMS dashboard (protected) |
| `/admin/login` | Admin sign-in |

## Contact form

Uses Netlify Forms. A static form definition lives in `public/forms/contact.html` so Netlify can detect fields at deploy time. Submissions appear in your Netlify dashboard under Forms; enable email notifications in Site settings → Forms → Notifications to forward to hello@trustledai.com.

## Project structure

```
app/           Next.js App Router pages and global styles
components/    Header, Footer, FAQ, contact form, live-edit, content views
lib/           Admin auth, MongoDB content store, schemas
app/api/       Admin APIs for saving page content
legacy/        Original self-contained HTML site
public/        Static assets and Netlify form definition
```
