import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCompanyBySlug, getProducts } from '@/lib/cms/queries'
import CompanyClient from './company-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) return { title: 'Company | Al Kalthoum Group' }
  return {
    title: `${company.name} | Al Kalthoum Group`,
    description: company.description,
    openGraph: {
      title: company.name,
      description: company.description,
      images: company.coverImage ? [{ url: company.coverImage }] : undefined,
    },
  }
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) return notFound()

  const allProducts = await getProducts(true)
  const companyProducts = allProducts.filter((p) => p.companyId === company.id)

  return <CompanyClient company={company} companyProducts={companyProducts} />
}
