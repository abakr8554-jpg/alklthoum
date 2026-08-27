'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import {
  createSession,
  destroySession,
  hashPassword,
  requireAdmin,
  verifyPassword,
  canManageUsers,
  canWrite,
} from '@/lib/auth'
import { escapeHtml, slugify } from '@/lib/cms/mappers'

export type ActionResult = { ok: true; message?: string; id?: string } | { ok: false; message: string }

async function guard(write = false) {
  const auth = await requireAdmin()
  if (!auth) return { error: 'Unauthorized' as const }
  if (write && !canWrite(auth.user.role)) return { error: 'Forbidden' as const }
  return auth
}

async function log(userId: string | undefined, action: string, entity: string, entityId = '', detail = '') {
  try {
    await prisma.activityLog.create({
      data: { userId, action, entity, entityId, detail },
    })
  } catch {
    /* non-blocking */
  }
}

export async function loginAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')

  if (!email || !password) {
    return { ok: false, message: 'Email and password are required.' }
  }

  const user = await prisma.adminUser.findUnique({ where: { email } })
  if (!user || !user.active) {
    return { ok: false, message: 'Invalid credentials.' }
  }

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) {
    return { ok: false, message: 'Invalid credentials.' }
  }

  await createSession({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  })
  await log(user.id, 'login', 'admin', user.id)
  redirect('/admin')
}

export async function logoutAction() {
  const auth = await requireAdmin()
  if (auth) await log(auth.user.id, 'logout', 'admin', auth.user.id)
  await destroySession()
  redirect('/admin/login')
}

/* ── Products ─────────────────────────────────────── */

const productSchema = z.object({
  name: z.string().min(1),
  nameAr: z.string().min(1),
  slug: z.string().optional(),
  category: z.string().min(1),
  companyId: z.string().optional(),
  shortDescription: z.string().optional(),
  shortDescriptionAr: z.string().optional(),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  images: z.string().optional(),
})

export async function saveProductAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }

  const id = String(formData.get('id') || '')
  // Checkboxes return null when unchecked — convert to boolean first
  const published = formData.get('published') !== null
  const aiRecommended = formData.get('aiRecommended') !== null

  const parsed = productSchema.safeParse({
    name: String(formData.get('name') || ''),
    nameAr: String(formData.get('nameAr') || ''),
    slug: String(formData.get('slug') || ''),
    category: String(formData.get('category') || ''),
    companyId: String(formData.get('companyId') || ''),
    shortDescription: String(formData.get('shortDescription') || ''),
    shortDescriptionAr: String(formData.get('shortDescriptionAr') || ''),
    description: String(formData.get('description') || ''),
    descriptionAr: String(formData.get('descriptionAr') || ''),
    images: String(formData.get('images') || ''),
  })
  if (!parsed.success) return { ok: false, message: 'يرجى ملء الاسم والفئة.' }

  const data = parsed.data
  const slug = slugify(data.slug || data.name)
  const images = (data.images || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)

  // Handle file uploads
  const imageFiles = formData.getAll('imageFiles') as File[]
  if (imageFiles && imageFiles.length > 0) {
    for (const file of imageFiles) {
      if (file instanceof File && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Generate unique filename
        const timestamp = Date.now()
        const random = Math.random().toString(36).substring(2, 9)
        const ext = file.name.split('.').pop() || 'jpg'
        const filename = `${timestamp}-${random}.${ext}`
        
        // Save to public/uploads
        const fs = await import('fs/promises')
        const path = await import('path')
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        const filepath = path.join(uploadDir, filename)
        
        await fs.mkdir(uploadDir, { recursive: true })
        await fs.writeFile(filepath, buffer)
        
        // Add URL to images array
        images.push(`/uploads/${filename}`)
      }
    }
  }

  const payload = {
    name: data.name,
    nameAr: data.nameAr,
    slug,
    category: data.category,
    companyId: data.companyId || null,
    shortDescription: data.shortDescription || '',
    shortDescriptionAr: data.shortDescriptionAr || '',
    description: data.description || '',
    descriptionAr: data.descriptionAr || '',
    imagesJson: JSON.stringify(images),
    published,
    aiRecommended,
  }

  try {
    const row = id
      ? await prisma.product.update({ where: { id }, data: payload })
      : await prisma.product.create({ data: payload })
    await log(auth.user.id, id ? 'update' : 'create', 'product', row.id, row.name)
    revalidatePath('/admin')
    revalidatePath('/products')
    revalidatePath(`/products/${row.slug}`)
    return { ok: true, message: 'Product saved.', id: row.id }
  } catch (e) {
    console.error(e)
    return { ok: false, message: 'Could not save product (slug may already exist).' }
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }
  try {
    await prisma.product.delete({ where: { id } })
    await log(auth.user.id, 'delete', 'product', id)
    revalidatePath('/admin')
    revalidatePath('/products')
    return { ok: true, message: 'Deleted.' }
  } catch {
    return { ok: false, message: 'Delete failed.' }
  }
}

/* ── Companies ────────────────────────────────────── */

export async function saveCompanyAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }

  const id = String(formData.get('id') || '')
  const name = String(formData.get('name') || '').trim()
  const nameAr = String(formData.get('nameAr') || '').trim()
  if (!name || !nameAr) return { ok: false, message: 'Name is required (EN & AR).' }

  const slug = slugify(String(formData.get('slug') || name))
  const payload = {
    name,
    nameAr,
    slug,
    tagline: String(formData.get('tagline') || ''),
    taglineAr: String(formData.get('taglineAr') || ''),
    description: String(formData.get('description') || ''),
    descriptionAr: String(formData.get('descriptionAr') || ''),
    logo: String(formData.get('logo') || '/logo.png'),
    coverImage: String(formData.get('coverImage') || ''),
    email: String(formData.get('email') || ''),
    phone: String(formData.get('phone') || ''),
    address: String(formData.get('address') || ''),
    addressAr: String(formData.get('addressAr') || ''),
    published: formData.get('published') === 'on' || formData.get('published') === 'true',
  }

  try {
    const row = id
      ? await prisma.company.update({ where: { id }, data: payload })
      : await prisma.company.create({ data: { ...payload, servicesJson: '[]' } })
    await log(auth.user.id, id ? 'update' : 'create', 'company', row.id, row.name)
    revalidatePath('/admin')
    revalidatePath('/companies')
    return { ok: true, message: 'Company saved.', id: row.id }
  } catch {
    return { ok: false, message: 'Could not save company.' }
  }
}

export async function deleteCompanyAction(id: string): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }
  try {
    await prisma.company.delete({ where: { id } })
    await log(auth.user.id, 'delete', 'company', id)
    revalidatePath('/admin')
    revalidatePath('/companies')
    return { ok: true, message: 'Deleted.' }
  } catch {
    return { ok: false, message: 'Delete failed.' }
  }
}

/* ── Distributors ─────────────────────────────────── */

export async function saveDistributorAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }

  const id = String(formData.get('id') || '')
  const name = String(formData.get('name') || '').trim()
  const nameAr = String(formData.get('nameAr') || '').trim()
  if (!name || !nameAr) return { ok: false, message: 'Name is required.' }

  const payload = {
    name,
    nameAr,
    region: String(formData.get('region') || ''),
    regionAr: String(formData.get('regionAr') || ''),
    wilaya: String(formData.get('wilaya') || ''),
    wilayaAr: String(formData.get('wilayaAr') || ''),
    address: String(formData.get('address') || ''),
    addressAr: String(formData.get('addressAr') || ''),
    phone: String(formData.get('phone') || ''),
    whatsapp: String(formData.get('whatsapp') || ''),
    lat: Number(formData.get('lat') || 0),
    lng: Number(formData.get('lng') || 0),
    published: formData.get('published') === 'on' || formData.get('published') === 'true',
  }

  try {
    const row = id
      ? await prisma.distributor.update({ where: { id }, data: payload })
      : await prisma.distributor.create({ data: payload })
    await log(auth.user.id, id ? 'update' : 'create', 'distributor', row.id, row.name)
    revalidatePath('/admin')
    revalidatePath('/distributors')
    return { ok: true, message: 'Distributor saved.', id: row.id }
  } catch {
    return { ok: false, message: 'Could not save distributor.' }
  }
}

export async function deleteDistributorAction(id: string): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }
  try {
    await prisma.distributor.delete({ where: { id } })
    await log(auth.user.id, 'delete', 'distributor', id)
    revalidatePath('/admin')
    revalidatePath('/distributors')
    return { ok: true, message: 'Deleted.' }
  } catch {
    return { ok: false, message: 'Delete failed.' }
  }
}

/* ── Diseases ─────────────────────────────────────── */

export async function saveDiseaseAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }

  const id = String(formData.get('id') || '')
  const name = String(formData.get('name') || '').trim()
  const nameAr = String(formData.get('nameAr') || '').trim()
  if (!name || !nameAr) return { ok: false, message: 'Name is required.' }
  const slug = slugify(String(formData.get('slug') || name))

  const payload = {
    name,
    nameAr,
    slug,
    scientificName: String(formData.get('scientificName') || '') || null,
    description: String(formData.get('description') || ''),
    descriptionAr: String(formData.get('descriptionAr') || ''),
    severity: String(formData.get('severity') || 'medium'),
    image: String(formData.get('image') || ''),
    published: formData.get('published') === 'on' || formData.get('published') === 'true',
  }

  try {
    const row = id
      ? await prisma.disease.update({ where: { id }, data: payload })
      : await prisma.disease.create({ data: payload })
    await log(auth.user.id, id ? 'update' : 'create', 'disease', row.id, row.name)
    revalidatePath('/admin')
    return { ok: true, message: 'Disease saved.', id: row.id }
  } catch {
    return { ok: false, message: 'Could not save disease.' }
  }
}

export async function deleteDiseaseAction(id: string): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }
  try {
    await prisma.disease.delete({ where: { id } })
    await log(auth.user.id, 'delete', 'disease', id)
    revalidatePath('/admin')
    return { ok: true, message: 'Deleted.' }
  } catch {
    return { ok: false, message: 'Delete failed.' }
  }
}

/* ── FAQs ─────────────────────────────────────────── */

export async function saveFaqAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }

  const id = String(formData.get('id') || '')
  const question = String(formData.get('question') || '').trim()
  const questionAr = String(formData.get('questionAr') || '').trim()
  const answer = String(formData.get('answer') || '').trim()
  const answerAr = String(formData.get('answerAr') || '').trim()
  if (!question || !answer) return { ok: false, message: 'Question and answer required.' }

  const payload = {
    question,
    questionAr: questionAr || question,
    answer,
    answerAr: answerAr || answer,
    sortOrder: Number(formData.get('sortOrder') || 0),
    published: formData.get('published') === 'on' || formData.get('published') === 'true',
  }

  try {
    const row = id
      ? await prisma.faq.update({ where: { id }, data: payload })
      : await prisma.faq.create({ data: payload })
    await log(auth.user.id, id ? 'update' : 'create', 'faq', row.id)
    revalidatePath('/admin')
    revalidatePath('/faq')
    return { ok: true, message: 'FAQ saved.', id: row.id }
  } catch {
    return { ok: false, message: 'Could not save FAQ.' }
  }
}

export async function deleteFaqAction(id: string): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }
  try {
    await prisma.faq.delete({ where: { id } })
    await log(auth.user.id, 'delete', 'faq', id)
    revalidatePath('/admin')
    revalidatePath('/faq')
    return { ok: true, message: 'Deleted.' }
  } catch {
    return { ok: false, message: 'Delete failed.' }
  }
}

/* ── Articles ───────────────────────────────────── */

export async function saveArticleAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }

  const id = String(formData.get('id') || '')
  const title = String(formData.get('title') || '').trim()
  const titleAr = String(formData.get('titleAr') || '').trim()
  const excerpt = String(formData.get('excerpt') || '').trim()
  const excerptAr = String(formData.get('excerptAr') || '').trim()
  const content = String(formData.get('content') || '').trim()
  const contentAr = String(formData.get('contentAr') || '').trim()
  if (!title || !content) return { ok: false, message: 'Title and content are required.' }

  const slugInput = String(formData.get('slug') || '').trim()
  const slug = slugify(slugInput || title)
  const publishedAtRaw = String(formData.get('publishedAt') || '').trim()
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : new Date()

  const payload = {
    slug,
    title,
    titleAr: titleAr || title,
    excerpt,
    excerptAr: excerptAr || excerpt,
    content,
    contentAr: contentAr || content,
    coverImage: String(formData.get('coverImage') || '').trim(),
    author: String(formData.get('author') || 'Al Kalthoum Group').trim(),
    authorAr: String(formData.get('authorAr') || 'مجموعة الكلثوم').trim(),
    category: String(formData.get('category') || 'news').trim(),
    published: formData.get('published') === 'on' || formData.get('published') === 'true',
    publishedAt,
    sortOrder: Number(formData.get('sortOrder') || 0),
  }

  try {
    const row = id
      ? await prisma.article.update({ where: { id }, data: payload })
      : await prisma.article.create({ data: payload })
    await log(auth.user.id, id ? 'update' : 'create', 'article', row.id)
    revalidatePath('/admin')
    revalidatePath('/admin/articles')
    revalidatePath('/blog')
    revalidatePath(`/blog/${row.slug}`)
    revalidatePath('/')
    return { ok: true, message: 'Article saved.', id: row.id }
  } catch {
    return { ok: false, message: 'Could not save article. Check slug is unique.' }
  }
}

export async function deleteArticleAction(id: string): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }
  try {
    const row = await prisma.article.findUnique({ where: { id } })
    await prisma.article.delete({ where: { id } })
    await log(auth.user.id, 'delete', 'article', id)
    revalidatePath('/admin')
    revalidatePath('/admin/articles')
    revalidatePath('/blog')
    if (row?.slug) revalidatePath(`/blog/${row.slug}`)
    revalidatePath('/')
    return { ok: true, message: 'Deleted.' }
  } catch {
    return { ok: false, message: 'Delete failed.' }
  }
}

/* ── Messages ─────────────────────────────────────── */

export async function updateMessageStatusAction(id: string, status: string): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }
  try {
    await prisma.contactMessage.update({ where: { id }, data: { status } })
    await log(auth.user.id, 'update', 'message', id, status)
    revalidatePath('/admin')
    return { ok: true }
  } catch {
    return { ok: false, message: 'Update failed.' }
  }
}

export async function deleteMessageAction(id: string): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }
  try {
    await prisma.contactMessage.delete({ where: { id } })
    await log(auth.user.id, 'delete', 'message', id)
    revalidatePath('/admin')
    return { ok: true }
  } catch {
    return { ok: false, message: 'Delete failed.' }
  }
}

/* ── Settings & SEO ───────────────────────────────── */

export async function saveSettingsAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }

  const keys = [
    'site_name', 'site_name_ar', 'tagline', 'tagline_ar', 'email', 'phone', 'whatsapp',
    'address_en', 'address_ar', 'facebook', 'instagram', 'linkedin', 'founded_year', 'logo',
  ]
  try {
    for (const key of keys) {
      const value = String(formData.get(key) ?? '')
      await prisma.websiteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    }
    await log(auth.user.id, 'update', 'settings', '', 'website')
    revalidatePath('/')
    revalidatePath('/admin')
    return { ok: true, message: 'Settings saved.' }
  } catch {
    return { ok: false, message: 'Could not save settings.' }
  }
}

export async function saveSeoAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }

  const path = String(formData.get('path') || '').trim()
  if (!path.startsWith('/')) return { ok: false, message: 'Path must start with /' }

  const data = {
    title: String(formData.get('title') || ''),
    titleAr: String(formData.get('titleAr') || ''),
    description: String(formData.get('description') || ''),
    descriptionAr: String(formData.get('descriptionAr') || ''),
    ogImage: String(formData.get('ogImage') || '') || null,
    canonical: String(formData.get('canonical') || '') || null,
    noIndex: formData.get('noIndex') === 'on',
  }

  try {
    await prisma.seoPage.upsert({
      where: { path },
      update: data,
      create: { path, ...data },
    })
    await log(auth.user.id, 'update', 'seo', path)
    revalidatePath(path)
    revalidatePath('/admin')
    return { ok: true, message: 'SEO saved.' }
  } catch {
    return { ok: false, message: 'Could not save SEO.' }
  }
}

/* ── Users ────────────────────────────────────────── */

export async function saveUserAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }
  if (!canManageUsers(auth.user.role)) return { ok: false, message: 'Only superadmins can manage users.' }

  const id = String(formData.get('id') || '')
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const name = String(formData.get('name') || '').trim()
  const role = String(formData.get('role') || 'editor')
  const password = String(formData.get('password') || '')

  if (!email || !name) return { ok: false, message: 'Name and email required.' }

  try {
    if (id) {
      const data: { name: string; role: string; email: string; passwordHash?: string; active?: boolean } = {
        name,
        role,
        email,
        active: formData.get('active') !== 'off',
      }
      if (password.length >= 8) data.passwordHash = await hashPassword(password)
      await prisma.adminUser.update({ where: { id }, data })
    } else {
      if (password.length < 8) return { ok: false, message: 'Password must be at least 8 characters.' }
      await prisma.adminUser.create({
        data: {
          email,
          name,
          role,
          passwordHash: await hashPassword(password),
          active: true,
        },
      })
    }
    await log(auth.user.id, id ? 'update' : 'create', 'user', id || email)
    revalidatePath('/admin')
    return { ok: true, message: 'User saved.' }
  } catch {
    return { ok: false, message: 'Could not save user.' }
  }
}

/* ── Media upload ─────────────────────────────────── */

export async function uploadMediaAction(formData: FormData): Promise<ActionResult> {
  const auth = await guard(true)
  if ('error' in auth) return { ok: false, message: auth.error }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: 'No file provided.' }
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf']
  if (!allowed.includes(file.type)) {
    return { ok: false, message: 'File type not allowed.' }
  }
  if (file.size > 8 * 1024 * 1024) {
    return { ok: false, message: 'File too large (max 8MB).' }
  }

  const { writeFile, mkdir } = await import('node:fs/promises')
  const path = await import('node:path')
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin'
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'pdf'].includes(ext) ? ext : 'bin'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`
  const dir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(dir, { recursive: true })
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(path.join(dir, filename), buffer)

  const url = `/uploads/${filename}`
  const asset = await prisma.mediaAsset.create({
    data: {
      filename: file.name,
      url,
      mimeType: file.type,
      size: file.size,
      alt: String(formData.get('alt') || ''),
      folder: String(formData.get('folder') || 'general'),
    },
  })
  await log(auth.user.id, 'upload', 'media', asset.id, escapeHtml(file.name))
  revalidatePath('/admin')
  return { ok: true, message: 'Uploaded.', id: url }
}
