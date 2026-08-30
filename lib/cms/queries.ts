import 'server-only'
import { prisma } from '@/lib/db'
import { mapCompany, mapDisease, mapDistributor, mapProduct, mapArticle } from './mappers'
import {
  companies as staticCompanies,
  products as staticProducts,
  diseases as staticDiseases,
  distributors as staticDistributors,
} from '@/lib/data'
import { articles as staticArticles } from '@/lib/articles'
import { SITE } from '@/lib/site'

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    console.error('[cms]', err)
    return fallback
  }
}

export async function getCompanies(publishedOnly = true) {
  return safe(async () => {
    const rows = await prisma.company.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { sortOrder: 'asc' },
    })
    return rows.length ? rows.map(mapCompany) : staticCompanies
  }, staticCompanies)
}

export async function getCompanyBySlug(slug: string) {
  return safe(async () => {
    const row = await prisma.company.findUnique({ where: { slug } })
    if (row && row.published) return mapCompany(row)
    return staticCompanies.find((c) => c.slug === slug) || null
  }, staticCompanies.find((c) => c.slug === slug) || null)
}

export async function getProducts(publishedOnly = true) {
  return safe(async () => {
    const rows = await prisma.product.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { sortOrder: 'asc' },
    })
    return rows.length ? rows.map(mapProduct) : staticProducts
  }, staticProducts)
}

export async function getProductBySlug(slug: string) {
  return safe(async () => {
    const row = await prisma.product.findUnique({ where: { slug } })
    if (row && row.published) return mapProduct(row)
    return staticProducts.find((p) => p.slug === slug) || null
  }, staticProducts.find((p) => p.slug === slug) || null)
}

export async function getDiseases(publishedOnly = true) {
  return safe(async () => {
    const rows = await prisma.disease.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { name: 'asc' },
    })
    return rows.length ? rows.map(mapDisease) : staticDiseases
  }, staticDiseases)
}

export async function getDistributors(publishedOnly = true) {
  return safe(async () => {
    const rows = await prisma.distributor.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { name: 'asc' },
    })
    return rows.length ? rows.map(mapDistributor) : staticDistributors
  }, staticDistributors)
}

export async function getDiseaseBySlug(slug: string) {
  return safe(async () => {
    const row = await prisma.disease.findUnique({ where: { slug } })
    if (row && row.published) return mapDisease(row)
    return staticDiseases.find((d) => d.slug === slug) || null
  }, staticDiseases.find((d) => d.slug === slug) || null)
}

export async function getFaqs(publishedOnly = true) {
  return safe(async () => {
    return prisma.faq.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { sortOrder: 'asc' },
    })
  }, [])
}

export async function getArticles(publishedOnly = true) {
  return safe(async () => {
    const rows = await prisma.article.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: [{ publishedAt: 'desc' }, { sortOrder: 'asc' }],
    })
    return rows.length ? rows.map(mapArticle) : staticArticles
  }, staticArticles)
}

export async function getArticleBySlug(slug: string) {
  return safe(async () => {
    const row = await prisma.article.findUnique({ where: { slug } })
    if (row && row.published) return mapArticle(row)
    return staticArticles.find((a) => a.slug === slug) || null
  }, staticArticles.find((a) => a.slug === slug) || null)
}

export async function getSettingsMap() {
  return safe(async () => {
    const rows = await prisma.websiteSetting.findMany()
    const map: Record<string, string> = {}
    for (const r of rows) map[r.key] = r.value
    return {
      siteName: map.site_name || SITE.name,
      siteNameAr: map.site_name_ar || SITE.nameAr,
      tagline: map.tagline || SITE.tagline,
      taglineAr: map.tagline_ar || SITE.taglineAr,
      email: map.email || SITE.email,
      phone: map.phone || SITE.phone,
      whatsapp: map.whatsapp || SITE.whatsapp,
      addressEn: map.address_en || SITE.address.en,
      addressAr: map.address_ar || SITE.address.ar,
      facebook: map.facebook || SITE.social.facebook,
      instagram: map.instagram || SITE.social.instagram,
      linkedin: map.linkedin || SITE.social.linkedin,
      foundedYear: map.founded_year || String(SITE.foundedYear),
      logo: map.logo || SITE.logo,
    }
  }, {
    siteName: SITE.name,
    siteNameAr: SITE.nameAr,
    tagline: SITE.tagline,
    taglineAr: SITE.taglineAr,
    email: SITE.email,
    phone: SITE.phone,
    whatsapp: SITE.whatsapp,
    addressEn: SITE.address.en,
    addressAr: SITE.address.ar,
    facebook: SITE.social.facebook,
    instagram: SITE.social.instagram,
    linkedin: SITE.social.linkedin,
    foundedYear: String(SITE.foundedYear),
    logo: SITE.logo,
  })
}

export async function getSeoForPath(path: string) {
  return safe(async () => {
    return prisma.seoPage.findUnique({ where: { path } })
  }, null)
}

export async function getAdminStats() {
  return safe(async () => {
    const [products, companies, messages, distributors, media, unread, articles] = await Promise.all([
      prisma.product.count(),
      prisma.company.count(),
      prisma.contactMessage.count(),
      prisma.distributor.count(),
      prisma.mediaAsset.count(),
      prisma.contactMessage.count({ where: { status: 'new' } }),
      prisma.article.count(),
    ])
    return { products, companies, messages, distributors, media, unread, articles }
  }, { products: 0, companies: 0, messages: 0, distributors: 0, media: 0, unread: 0, articles: 0 })
}
