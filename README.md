# Al Kalthoum Group — Corporate Website & CMS

Enterprise bilingual (EN/AR) platform for Al Kalthoum Group: public marketing site + production admin CMS.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Prisma 7 + SQLite (`@prisma/adapter-better-sqlite3`)
- JWT admin sessions (`jose` + httpOnly cookies)
- Resend (contact email) · optional Gemini Vision (AI assistant)
- Tailwind CSS 4 + custom design system

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit secrets
npx prisma migrate dev
npm run db:seed
npm run dev
```

- Public site: http://localhost:3000
- Admin CMS: http://localhost:3000/admin/login

Default admin (from `.env`):

- Email: `ADMIN_EMAIL`
- Password: `ADMIN_PASSWORD`

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Prisma generate + production build |
| `npm run start` | Production server |
| `npm run db:migrate` | Apply migrations (production) |
| `npm run db:seed` | Seed admin, catalog, FAQs, settings |
| `npm run db:studio` | Prisma Studio |

## CMS capabilities

Products, companies, diseases, distributors, FAQs, contact messages, media uploads, website settings, SEO pages, admin users (RBAC), activity logs.

## Production deployment checklist

### 1. Environment variables (required)

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | SQLite path or Postgres URL |
| `SESSION_SECRET` | Yes | Min 16 chars — `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Yes | First admin email |
| `ADMIN_PASSWORD` | Yes | Strong password for seed |
| `NEXT_PUBLIC_SITE_URL` | Yes | e.g. `https://alkalthoum.com` |
| `RESEND_API_KEY` | Recommended | Contact form email delivery |
| `CONTACT_TO_EMAIL` | Recommended | Inbox for contact submissions |
| `GEMINI_API_KEY` | Optional | Live AI plant diagnostics |

### 2. Database

**VPS / single server (SQLite):**

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run build
npm run start
```

**Vercel / serverless:** switch to Postgres — SQLite is not suitable for multi-instance hosting.

### 3. Before go-live

- [ ] Set strong `SESSION_SECRET` and change default admin password after first login
- [ ] Configure Resend with a verified sender domain (replace `onboarding@resend.dev` in production)
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` matches your domain
- [ ] Review content in Admin → Settings, Companies, Products
- [ ] Test contact form end-to-end
- [ ] Test `/admin/login` and CMS write access
- [ ] Verify Arabic/English toggle on all main pages

### 4. Build verification

```bash
npm run build
```

All public routes should build without errors. Admin routes are server-rendered dynamically.

### 5. SEO

- `/robots.txt` — blocks `/admin`
- `/sitemap.xml` — static pages + products + companies
- JSON-LD organization schema in root layout

## Hosting notes

- **Node.js 20+** recommended
- Persist the SQLite file path if using SQLite (`prisma/dev.db` or custom path)
- For production email, update the `from` address in `app/contact/actions.ts` after Resend domain verification
