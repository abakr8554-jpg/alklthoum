'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search, X } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import type { Disease } from '@/lib/data'

const severities: Array<Disease['severity']> = ['low', 'medium', 'high']
const severityLabelEn: Record<string, string> = { low: 'Low', medium: 'Medium', high: 'High' }
const severityLabelAr: Record<string, string> = { low: 'منخفضة', medium: 'متوسطة', high: 'مرتفعة' }

export default function DiseasesClient({ diseases }: { diseases: Disease[] }) {
  const { isAr, dir } = useLang()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSeverity, setActiveSeverity] = useState<Disease['severity'] | 'all'>('all')

  const filtered = useMemo(() => {
    return diseases.filter((d) => {
      const matchSeverity = activeSeverity === 'all' || d.severity === activeSeverity
      const name = isAr ? d.nameAr : d.name
      const desc = isAr ? d.descriptionAr : d.description
      const q = searchQuery.toLowerCase()
      const matchSearch =
        !searchQuery ||
        name.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        (d.scientificName ?? '').toLowerCase().includes(q)
      return matchSeverity && matchSearch
    })
  }, [diseases, activeSeverity, searchQuery, isAr])

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ background: 'var(--ink)' }}>
        <div
          className="page-hero-bg"
          style={{ backgroundImage: "url('/covers/diseases.svg')" }}
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="kicker light">{isAr ? 'مكتبة زراعية' : 'Field Reference'}</p>
          <h1 className="page-hero-title">
            {isAr ? 'أمراض النباتات' : 'Plant'}{' '}
            <em>{isAr ? '' : 'Diseases'}</em>
          </h1>
          <p className="page-hero-sub">
            {isAr
              ? 'دليل مرجعي لأشهر أمراض المحاصيل: الأعراض والأسباب والعلاج والوقاية.'
              : 'A reference guide to common crop diseases: symptoms, causes, treatment and prevention.'}
          </p>
        </div>
      </section>

      {/* Filters bar */}
      <section className="products-filter-bar">
        <div className="search-box">
          <Search size={15} />
          <input
            type="text"
            placeholder={isAr ? 'ابحث عن مرض...' : 'Search diseases...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} aria-label="Clear">
              <X size={13} />
            </button>
          )}
        </div>

        <div className="cat-pills">
          <button
            className={activeSeverity === 'all' ? 'active' : ''}
            onClick={() => setActiveSeverity('all')}
          >
            {isAr ? 'الكل' : 'All'}
          </button>
          {severities.map((sev) => (
            <button
              key={sev}
              className={activeSeverity === sev ? 'active' : ''}
              onClick={() => setActiveSeverity(sev)}
            >
              {isAr ? severityLabelAr[sev] : severityLabelEn[sev]}
            </button>
          ))}
        </div>
      </section>

      {/* Diseases grid */}
      <section className="products-grid-section">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>{isAr ? 'لا توجد أمراض تطابق بحثك.' : 'No diseases match your search.'}</p>
            <button onClick={() => { setActiveSeverity('all'); setSearchQuery('') }}>
              {isAr ? 'إعادة التعيين' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((disease) => (
              <Link
                key={disease.id}
                href={`/diseases/${disease.slug}`}
                className="product-card"
              >
                <div className="product-card-image">
                  <img
                    src={disease.image || '/placeholder-product.jpg'}
                    alt={isAr ? disease.nameAr : disease.name}
                    loading="lazy"
                  />
                  <span className={`product-cat-badge severity-${disease.severity}`}>
                    {isAr ? severityLabelAr[disease.severity] : severityLabelEn[disease.severity]}
                  </span>
                </div>
                <div className="product-card-body">
                  <h3>{isAr ? disease.nameAr : disease.name}</h3>
                  {disease.scientificName && (
                    <p style={{ fontStyle: 'italic', opacity: 0.75 }}>{disease.scientificName}</p>
                  )}
                  <p>{isAr ? disease.descriptionAr : disease.description}</p>
                  {disease.affectedCrops.length > 0 && (
                    <div className="product-crops">
                      {disease.affectedCrops.slice(0, 3).map((crop, i) => (
                        <span key={crop}>{isAr ? disease.affectedCropsAr[i] : crop}</span>
                      ))}
                    </div>
                  )}
                  <span className="product-cta">
                    {isAr ? 'عرض التفاصيل' : 'View Details'} <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="products-count">
          {filtered.length} {isAr ? 'مرض' : 'diseases'}
        </div>
      </section>

      <Footer />
    </main>
  )
}
