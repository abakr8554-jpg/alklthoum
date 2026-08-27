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

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
}
```

Then create and apply a fresh migration for Postgres:

```bash
export DATABASE_URL="postgresql://USER:PASS@HOST:5432/DB?sslmode=require"
npx prisma migrate dev --name init_postgres
```

Commit the new migration folder before deploying.

> **Local dev:** keep using SQLite by leaving `provider = "sqlite"` on your machine, or point `DATABASE_URL` at a shared Neon dev branch.

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

Connect the Git repo to Vercel. The `vercel.json` build runs migrations automatically.

After first deploy, seed the database (Vercel CLI or one-off job):

```bash
vercel env pull .env.local
npm run db:seed
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
