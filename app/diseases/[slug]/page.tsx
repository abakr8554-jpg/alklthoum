import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDiseaseBySlug, getProducts } from '@/lib/cms/queries'
import DiseaseClient from './disease-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const disease = await getDiseaseBySlug(slug)
  if (!disease) return { title: 'Disease' }
  return {
    title: `${disease.name} — Plant Diseases`,
    description: disease.description,
    openGraph: {
      title: disease.name,
      description: disease.description,
      images: disease.image ? [{ url: disease.image }] : undefined,
    },
  }
}

export default async function DiseaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const disease = await getDiseaseBySlug(slug)
  if (!disease) return notFound()

  const allProducts = await getProducts(true)
  const recommended = allProducts.filter(
    (p) =>
      disease.recommendedProductIds.includes(p.id) ||
      disease.recommendedProductIds.includes(p.slug) ||
      p.targetDiseases.includes(disease.id) ||
      p.targetDiseases.includes(disease.slug),
  )

  return <DiseaseClient disease={disease} recommended={recommended} />
}
