import path from 'node:path'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@/lib/generated/prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createClient() {
  const raw = process.env.DATABASE_URL || 'file:./prisma/dev.db'
  let url = raw
  if (raw.startsWith('file:./') || raw.startsWith('file:../')) {
    const rel = raw.replace(/^file:/, '')
    url = `file:${path.resolve(/*turbopackIgnore: true*/ process.cwd(), rel)}`
  }
  const adapter = new PrismaBetterSqlite3({ url })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
