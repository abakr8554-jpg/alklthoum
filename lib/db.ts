import path from 'node:path'
import { PrismaClient } from '@/lib/generated/prisma/client'

// Dynamic imports or try/catch to avoid native module crash on Vercel
let PrismaBetterSqlite3: any
try {
  PrismaBetterSqlite3 = require('@prisma/adapter-better-sqlite3').PrismaBetterSqlite3
} catch (err) {
  // Ignore
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createClient(): PrismaClient {
  if (process.env.VERCEL) {
    console.log("Running on Vercel - returning mock Prisma client")
    return {
      adminUser: { findUnique: async () => null },
      contactMessage: { findMany: async () => [], count: async () => 0 },
      activityLog: { findMany: async () => [], create: async () => ({}) },
      article: { count: async () => 0 },
      product: { count: async () => 0 },
      user: { count: async () => 0 }
    } as unknown as PrismaClient
  }

  const raw = process.env.DATABASE_URL || 'file:./prisma/dev.db'
  let url = raw
  if (raw.startsWith('file:./') || raw.startsWith('file:../')) {
    const rel = raw.replace(/^file:/, '')
    url = `file:${path.resolve(process.cwd(), rel)}`
  }
  const adapter = new PrismaBetterSqlite3({ url })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
