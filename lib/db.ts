import { PrismaClient } from '@/lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

let client: PrismaClient | undefined = globalForPrisma.prisma

function getClient(): PrismaClient {
  if (client) return client
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }
  const adapter = new PrismaPg({ connectionString })
  client = new PrismaClient({ adapter })
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client
  }
  return client
}

// Lazy proxy: the real PrismaClient is created only when a property is first
// accessed (i.e. at request time), never merely by importing this module. This
// keeps `next build` from evaluating a DB connection while collecting page data.
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const c = getClient()
    const value = Reflect.get(c as object, prop, c)
    return typeof value === 'function' ? value.bind(c) : value
  },
})
