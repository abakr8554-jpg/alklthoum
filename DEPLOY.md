# Deployment Guide

## Vercel + Postgres (recommended for production)

SQLite does not work reliably on serverless multi-instance hosting. Use Postgres on Vercel.

### 1. Create a Postgres database

Choose one:

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Neon](https://neon.tech) (free tier works for staging)
- [Supabase](https://supabase.com)

Copy the connection string (`postgresql://...?sslmode=require`).

### 2. Switch Prisma to Postgres (one-time)

The schema is already set to Postgres (`provider = "postgresql"`) and the app
connects through the `@prisma/adapter-pg` driver adapter (see `lib/db.ts`).

Put the **pooled** connection string in `DATABASE_URL`, then create the tables
and seed data:

```bash
export DATABASE_URL="postgresql://USER:PASS@HOST-pooler.REGION.aws.neon.tech/DB?sslmode=require"
npm run db:setup   # = prisma db push  +  seed
```

`db push` syncs the schema directly (no migration files needed for a project
this size). To re-seed later without touching the schema: `npm run db:seed`.

> **Local dev:** point `DATABASE_URL` at the same Neon database (or a Neon dev
> branch). Local SQLite is no longer used.

### 3. Vercel environment variables

| Variable | Required |
|----------|----------|
| `DATABASE_URL` | Postgres connection string |
| `SESSION_SECRET` | `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Strong password (for seed) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `Al Kalthoum <noreply@alkalthoum.com>` |
| `CONTACT_TO_EMAIL` | Inbox for contact form |
| `GEMINI_API_KEY` | Optional — live AI diagnostics |

### 4. Deploy

Connect the Git repo to Vercel and set the environment variables above. The
tables + seed data are created once via `npm run db:setup` (step 2) against the
Neon database — you do **not** need to re-run it on every deploy.

To seed from your machine using the deployed env values:

```bash
vercel env pull .env.local
npm run db:setup
```

### 5. Post-deploy checklist

- [ ] Log in to `/admin/login` and change the admin password
- [ ] Verify contact form sends email via Resend
- [ ] Confirm distributors page shows Egypt locations
- [ ] Set custom domain and update `NEXT_PUBLIC_SITE_URL`

## VPS / single server (SQLite)

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npm run db:seed
npm run build
npm run start
```

Use a persistent volume for `prisma/dev.db` so data survives restarts.
