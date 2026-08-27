import type { Company, Product, Disease, Distributor, ProductCategory } from '@/lib/data'
import type { Article, ArticleCategory } from '@/lib/articles'

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function mapCompany(row: {
  id: string
  slug: string
  name: string
  nameAr: string
  tagline: string
  taglineAr: string
  description: string
  descriptionAr: string
  logo: string
  coverImage: string
  servicesJson: string
  email: string
  phone: string
  address: string
  addressAr: string
  externalUrl: string | null
}): Company {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameAr: row.nameAr,
    tagline: row.tagline,
    taglineAr: row.taglineAr,
    description: row.description,
    descriptionAr: row.descriptionAr,
    logo: row.logo,
    coverImage: row.coverImage,
    services: parseJson(row.servicesJson, []),
    contact: {
      email: row.email,
      phone: row.phone,
      address: row.address,
      addressAr: row.addressAr,
    },
    externalUrl: row.externalUrl || undefined,
  }
}

export function mapProduct(row: {
  id: string
  slug: string
  companyId: string | null
  category: string
  name: string
  nameAr: string
  shortDescription: string
  shortDescriptionAr: string
  description: string
  descriptionAr: string
  imagesJson: string
  targetCropsJson: string
  targetCropsArJson: string
  targetDiseasesJson: string
  benefitsJson: string
  benefitsArJson: string
  usageInstructions: string
  usageInstructionsAr: string
  applicationMethod: string
  applicationMethodAr: string
  aiRecommended: boolean
}): Product {
  return {
    id: row.id,
    slug: row.slug,
    companyId: row.companyId || '',
    category: row.category as ProductCategory,
    name: row.name,
    nameAr: row.nameAr,
    shortDescription: row.shortDescription,
    shortDescriptionAr: row.shortDescriptionAr,
    description: row.description,
    descriptionAr: row.descriptionAr,
    images: parseJson(row.imagesJson, []),
    targetCrops: parseJson(row.targetCropsJson, []),
    targetCropsAr: parseJson(row.targetCropsArJson, []),
    targetDiseases: parseJson(row.targetDiseasesJson, []),
    benefits: parseJson(row.benefitsJson, []),
    benefitsAr: parseJson(row.benefitsArJson, []),
    usageInstructions: row.usageInstructions,
    usageInstructionsAr: row.usageInstructionsAr,
    applicationMethod: row.applicationMethod,
    applicationMethodAr: row.applicationMethodAr,
    aiRecommended: row.aiRecommended,
  }
}

export function mapDisease(row: {
  id: string
  slug: string
  name: string
  nameAr: string
  scientificName: string | null
  description: string
  descriptionAr: string
  cause: string
  causeAr: string
  affectedCropsJson: string
  affectedCropsArJson: string
  symptomsJson: string
  symptomsArJson: string
  treatmentStepsJson: string
  treatmentStepsArJson: string
  preventionTipsJson: string
  preventionTipsArJson: string
  severity: string
  image: string
  recommendedProductIdsJson: string
}): Disease {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameAr: row.nameAr,
    scientificName: row.scientificName || undefined,
    description: row.description,
    descriptionAr: row.descriptionAr,
    cause: row.cause,
    causeAr: row.causeAr,
    affectedCrops: parseJson(row.affectedCropsJson, []),
    affectedCropsAr: parseJson(row.affectedCropsArJson, []),
    symptoms: parseJson(row.symptomsJson, []),
    symptomsAr: parseJson(row.symptomsArJson, []),
    treatmentSteps: parseJson(row.treatmentStepsJson, []),
    treatmentStepsAr: parseJson(row.treatmentStepsArJson, []),
    preventionTips: parseJson(row.preventionTipsJson, []),
    preventionTipsAr: parseJson(row.preventionTipsArJson, []),
    severity: row.severity as Disease['severity'],
    image: row.image,
    recommendedProductIds: parseJson(row.recommendedProductIdsJson, []),
  }
}

export function mapDistributor(row: {
  id: string
  name: string
  nameAr: string
  region: string
  regionAr: string
  wilaya: string
  wilayaAr: string
  address: string
  addressAr: string
  phone: string
  whatsapp: string
  lat: number
  lng: number
}): Distributor {
  return {
    id: row.id,
    name: row.name,
    nameAr: row.nameAr,
    region: row.region,
    regionAr: row.regionAr,
    wilaya: row.wilaya,
    wilayaAr: row.wilayaAr,
    address: row.address,
    addressAr: row.addressAr,
    phone: row.phone,
    whatsapp: row.whatsapp,
    lat: row.lat,
    lng: row.lng,
  }
}

export function mapArticle(row: {
  id: string
  slug: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  content: string
  contentAr: string
  coverImage: string
  author: string
  authorAr: string
  category: string
  publishedAt: Date | string
}): Article {
  // SQLite sometimes returns DateTime as a string instead of Date object
  const publishedAt =
    row.publishedAt instanceof Date
      ? row.publishedAt.toISOString()
      : new Date(row.publishedAt).toISOString()

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleAr: row.titleAr,
    excerpt: row.excerpt,
    excerptAr: row.excerptAr,
    content: row.content,
    contentAr: row.contentAr,
    coverImage: row.coverImage,
    author: row.author,
    authorAr: row.authorAr,
    category: row.category as ArticleCategory,
    publishedAt,
  }
}


export function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
