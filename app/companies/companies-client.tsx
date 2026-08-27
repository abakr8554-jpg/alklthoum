'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BrandConstellation from '@/components/luxury/BrandConstellation'
import { useLang } from '@/lib/lang-context'
import type { Company } from '@/lib/data'

type MapBrand = {
  slug: string
  logo: string
  en: { name: string }
  ar: { name: string }
  href: string
  x: number
  y: number
}

type Props = {
  companies: Company[]
  mapBrands: MapBrand[]
}

export default function CompaniesClient({ companies, mapBrands }: Props) {
  const { isAr, dir } = useLang()

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      <section className="soft-page-hero">
        <p className="soft-page-kicker">{isAr ? 'المجموعة' : 'The Group'}</p>
        <h1>{isAr ? 'شركاتنا' : 'Our Companies'}</h1>
        <p>
          {isAr
            ? 'عائلة متكاملة من الشركات المتخصصة تعمل معاً لبناء مستقبل زراعي أقوى.'
            : 'A connected family of specialist companies working together for a stronger agricultural future.'}
        </p>
      </section>

      <section className="companies-hub soft-hub">
        <BrandConstellation brands={mapBrands} />
      </section>

      <section className="companies-section">
        <div className="companies-grid">
          {companies.map((company) => (
            <div key={company.id} className="company-card">
              <div className="company-card-cover">
                <img src={company.coverImage} alt={isAr ? company.nameAr : company.name} loading="lazy" />
                <div className="company-card-overlay" />
              </div>
              <div className="company-card-body">
                <div className="company-card-logo">
                  <img src={company.logo} alt="" loading="lazy" />
                </div>
                <p className="kicker">{isAr ? company.taglineAr : company.tagline}</p>
                <h2>{isAr ? company.nameAr : company.name}</h2>
                <p className="company-desc">{isAr ? company.descriptionAr : company.description}</p>

                <div className="company-services-preview">
                  {company.services.slice(0, 3).map((s, i) => (
                    <span key={i} className="service-chip">
                      {isAr ? s.titleAr : s.title}
                    </span>
                  ))}
                </div>

                <div className="company-card-footer">
                  <div className="company-contact-mini">
                    <span><Mail size={12} /> {company.contact.email}</span>
                    <span><Phone size={12} /> {company.contact.phone}</span>
                  </div>
                  <Link href={`/companies/${company.slug}`} className="company-visit-btn">
                    {isAr ? 'زيارة الشركة' : 'Visit Company'} <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
