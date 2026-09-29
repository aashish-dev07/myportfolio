# Aashish Kumar — Portfolio

A single-page developer portfolio built with **Next.js 16 (App Router)**, **TypeScript**,
**Tailwind CSS v4** and **Motion**. All content comes from the resume and lives in one
data file.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## The one file you need to edit

Everything on the page — name, contact details, skills, experience, projects,
education, certifications — is defined in **`src/data/profile.ts`**. Change it there
and the whole site updates; no component edits needed.

At the top of that file are the two placeholders to replace first:

```ts
export const GITHUB_URL = "https://github.com/aashish-kumar";
export const LINKEDIN_URL = "https://www.linkedin.com/in/aashish-kumar";
```

## Sections

| Section    | What it shows                                                        |
| ---------- | -------------------------------------------------------------------- |
| Hero       | Name, rotating role, summary, phone, email, GitHub link, CV download, live stats |
| About      | Summary, four capability pillars, education, certifications           |
| Skills     | Eight categories behind animated tabs, with proficiency bars          |
| Experience | Scroll-linked vertical timeline across all three roles                |
| Projects   | Filterable cards (All / Node.js / Laravel / Personal) with expandable detail |
| Contact    | Direct channels plus a validated query form                           |

## Resume download

The PDF lives at `public/Aashish-Kumar-Resume.pdf` and is linked from the hero,
the mobile menu and the contact card. To update it, drop a new PDF in at that
same path — or change `resume` / `resumeFileName` in `src/data/profile.ts` if you
rename the file.

## Contact form

`POST /api/contact` handles submissions. It has:

- shared validation (`src/lib/validation.ts`) run on both client and server,
- a honeypot field and a fixed-window rate limit (5 requests / minute / IP),
- HTML escaping on everything that reaches the email body.

**Email delivery is optional.** With no configuration the route validates the
message and logs it to the server console, so the form works out of the box in
development. To receive messages by email, copy `.env.example` to `.env.local`
and fill in the SMTP values:

```bash
cp .env.example .env.local
```

The in-memory rate limiter resets on redeploy and does not span instances — fine
for a personal site, but swap it for Redis if you ever run more than one.

## Theming

Dark by default, with a toggle in the nav. Colors are CSS custom properties in
`src/app/globals.css` (`:root` for dark, `[data-theme="light"]` for light), so
re-skinning means editing that token block only. An inline script in the layout
applies the stored theme before first paint, so there is no flash.

## Motion

Every animation degrades under `prefers-reduced-motion`: the typing rotator shows
a static phrase, counters jump to their final value, the follower cursor does not
render, and decorative loops are disabled in CSS.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Deploying

Push to GitHub and import the repo on Vercel — it needs no configuration. Add the
`SMTP_*` and `CONTACT_TO` environment variables there if you want the form to send
email in production.
