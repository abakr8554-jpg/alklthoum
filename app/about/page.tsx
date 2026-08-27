import { getCompanies } from '@/lib/cms/queries'
import AboutClient from './about-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'About | Al Kalthoum Group',
  description: 'Learn about Al Kalthoum Group — decades of agriculture, innovation, and partnership with farmers.',
}

export default async function AboutPage() {
  const companies = await getCompanies(true)
  return <AboutClient companiesCount={companies.length} />
}
