'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import type { Company, Product } from '@/lib/data'
import { categoryLabels } from '@/lib/data'

type Props = {
  company: Company
  companyProducts: Product[]
}

export default function CompanyClient({ company, companyProducts }: Props) {
  const { isAr, dir } = useLang()

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">{isAr ? 'الرئيسية' : 'Home'}</Link>
        <span>/</span>
        <Link href="/companies">{isAr ? 'الشركات' : 'Companies'}</Link>
        <span>/</span>
        <span>{isAr ? company.nameAr : company.name}</span>
      </div>

      {/* Cover hero */}
      <section className="company-hero">
        <div className="company-hero-bg" style={{ backgroundImage: `url(${company.coverImage})` }} />
        <div className="company-hero-overlay" />
        <div className="company-hero-content">
          <p className="kicker light">{isAr ? company.taglineAr : company.tagline}</p>
          <h1>{isAr ? company.nameAr : company.name}</h1>
          <p>{isAr ? company.descriptionAr : company.description}</p>
        </div>
      </section>

      {/* Services */}
      <section className="company-detail-section">
        <div className="company-detail-grid">
          <div className="company-detail-main">
            <h2 className="section-h2">{isAr ? 'خدماتنا' : 'Our Services'}</h2>
            <div className="services-list">
              {company.services.map((s, i) => (
                <div key={i} className="service-item">
                  <div className="service-num">0{i + 1}</div>
                  <div>
                    <h3>{isAr ? s.titleAr : s.title}</h3>
                    <p>{isAr ? s.descAr : s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact sidebar */}
          <aside className="company-contact-sidebar">
            <h3>{isAr ? 'معلومات التواصل' : 'Contact Information'}</h3>
            <div className="contact-items">
              <div className="contact-item">
                <Mail size={16} />
                <div>
                  <span>{isAr ? 'البريد الإلكتروني' : 'Email'}</span>
                  <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <div>
                  <span>{isAr ? 'الهاتف' : 'Phone'}</span>
                  <a href={`tel:${company.contact.phone}`}>{company.contact.phone}</a>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <div>
                  <span>{isAr ? 'العنوان' : 'Address'}</span>
                  <p>{isAr ? company.contact.addressAr : company.contact.address}</p>
                </div>
              </div>
            </div>
            <Link href="/contact" className="button primary-button" style={{ marginTop: 24, display: 'inline-flex' }}>
              {isAr ? 'تواصل معنا' : 'Get in touch'} <ArrowUpRight size={14} />
            </Link>
            <Link href="/" className="company-back-group">
              ← {isAr ? 'العودة للمجموعة الرئيسية' : 'Back to Al Kalthoum Group'}
            </Link>
          </aside>
        </div>
      </section>

      {/* Products */}
      {companyProducts.length > 0 && (
        <section className="company-products-section">
          <div className="section-head">
            <h2 className="section-h2">{isAr ? 'منتجاتنا' : 'Our Products'}</h2>
            <Link href="/products" className="text-link">
              {isAr ? 'عرض كل المنتجات' : 'View all products'} <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="products-grid">
            {companyProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="product-card">
                <div className="product-card-image">
                  <img src={product.images[0] ?? '/placeholder-product.jpg'} alt={isAr ? product.nameAr : product.name} loading="lazy" />
                  <span className="product-cat-badge">
                    {isAr ? categoryLabels[product.category]?.ar : categoryLabels[product.category]?.en}
                  </span>
                </div>
                <div className="product-card-body">
                  <h3>{isAr ? product.nameAr : product.name}</h3>
                  <p>{isAr ? product.shortDescriptionAr : product.shortDescription}</p>
                  <span className="product-cta">
                    {isAr ? 'عرض التفاصيل' : 'View Details'} <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
