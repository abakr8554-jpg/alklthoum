import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

const COOKIE_NAME = 'ak_admin_session'
const SESSION_DAYS = 7

export type SessionPayload = {
  userId: string
  email: string
  role: string
  name: string
  exp?: number
}

function getSecret() {
  const secret = process.env.SESSION_SECRET || 'fallback_secret_for_demo_only_1234'
  if (!secret || secret.length < 16) {
    throw new Error('SESSION_SECRET must be set (min 16 chars)')
  }
  return new TextEncoder().encode(secret)
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret())
}

export async function decrypt(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ['HS256'] })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function createSession(user: { id: string; email: string; role: string; name: string }) {
  const token = await encrypt({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  })
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  return decrypt(token)
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session?.userId) return null
  const user = await prisma.adminUser.findFirst({
    where: { id: session.userId, active: true },
  })
  if (!user) return null
  return { session, user }
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export function canManageUsers(role: string) {
  return role === 'superadmin'
}

export function canWrite(role: string) {
  return role === 'superadmin' || role === 'admin' || role === 'editor'
}
