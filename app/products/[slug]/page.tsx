import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, getProducts, getCompanies, getDiseases } from '@/lib/cms/queries'
import ProductClient from './product-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product | Al Kalthoum Group' }
  return {
    title: `${product.name} | Al Kalthoum Group`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return notFound()


  const [allProducts, allCompanies, allDiseases] = await Promise.all([
    getProducts(true),
    getCompanies(true),
    getDiseases(true),
  ])

  const company = allCompanies.find((c) => c.id === product.companyId) || null
  const related = allProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3)
  const diseases = product.targetDiseases
    .map((dId) => allDiseases.find((d) => d.id === dId || d.slug === dId))
    .filter(Boolean) as typeof allDiseases

  return (
    <ProductClient
      product={product}
      company={company}
      related={related}
      diseases={diseases}
    />
  )
}
