import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, '')
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/companies',
    '/distributors',
    '/ai-assistant',
    '/contact',
    '/faq',
    '/blog',
    '/privacy',
    '/terms',
  ]

  const { getArticles, getProducts, getCompanies } = await import('@/lib/cms/queries')
  const [articles, products, companies] = await Promise.all([
    getArticles(true),
    getProducts(true),
    getCompanies(true),
  ])

  const articleRoutes = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const companyRoutes = companies.map((c) => ({
    url: `${base}/companies/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path || '/'}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.8,
    })),
    ...productRoutes,
    ...companyRoutes,
    ...articleRoutes,
  ]
}
