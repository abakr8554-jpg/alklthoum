import { getCompanies } from '@/lib/cms/queries'
import { companyMapPositions } from '@/lib/data'
import CompaniesClient from './companies-client'

export const dynamic = 'force-dynamic'

export default async function CompaniesPage() {
  const companies = await getCompanies(true)

  const mapBrands = companies.map((c) => ({
    slug: c.slug,
    logo: c.logo,
    en: { name: c.name },
    ar: { name: c.nameAr },
    href: `/companies/${c.slug}`,
    x: companyMapPositions[c.slug]?.x ?? 50,
    y: companyMapPositions[c.slug]?.y ?? 50,
  }))

  return <CompaniesClient companies={companies} mapBrands={mapBrands} />
}
