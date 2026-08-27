'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Leaf, Target, Zap } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import type { Product, Company, Disease } from '@/lib/data'
import { categoryLabels } from '@/lib/data'

type Props = {
  product: Product
  company: Company | null
  related: Product[]
  diseases: Disease[]
}

export default function ProductClient({ product, company, related, diseases }: Props) {
  const { isAr, dir } = useLang()
  const [imageIndex, setImageIndex] = useState(0)

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">{isAr ? 'الرئيسية' : 'Home'}</Link>
        <span>/</span>
        <Link href="/products">{isAr ? 'المنتجات' : 'Products'}</Link>
        <span>/</span>
        <span>{isAr ? product.nameAr : product.name}</span>
      </div>

      {/* Product detail */}
      <section className="product-detail-section">
        {/* Image gallery */}
        <div className="product-gallery">
          <div className="product-main-image">
            <img
              src={product.images[imageIndex] || '/placeholder-product.jpg'}
              alt={isAr ? product.nameAr : product.name}
            />
            {product.aiRecommended && (
              <div className="ai-badge-large">
                ✦ {isAr ? 'موصى به بالذكاء الاصطناعي' : 'AI Recommended'}
              </div>
            )}
            {product.images.length > 1 && (
              <div className="gallery-controls">
                <button
                  onClick={() => setImageIndex((i) => Math.max(0, i - 1))}
                  disabled={imageIndex === 0}
                >
                  <ChevronLeft size={16} />
                </button>
                <span>{imageIndex + 1} / {product.images.length}</span>
                <button
                  onClick={() => setImageIndex((i) => Math.min(product.images.length - 1, i + 1))}
                  disabled={imageIndex === product.images.length - 1}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="product-thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={imageIndex === i ? 'active' : ''}
                  onClick={() => setImageIndex(i)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="product-info-panel">
          <p className="kicker">
            {isAr ? categoryLabels[product.category]?.ar : categoryLabels[product.category]?.en}
          </p>
          <h1 className="product-detail-title">{isAr ? product.nameAr : product.name}</h1>
          {company && (
            <Link href={`/companies/${company.slug}`} className="product-company-link">
              {isAr ? company.nameAr : company.name} →
            </Link>
          )}
          <p className="product-detail-desc">{isAr ? product.descriptionAr : product.description}</p>

          {/* Target crops */}
          {product.targetCrops.length > 0 && (
            <div className="product-tags-row">
              <Leaf size={14} />
              <div>
                {product.targetCrops.map((crop, i) => (
                  <span key={crop} className="crop-tag">
                    {isAr ? product.targetCropsAr[i] : crop}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Target diseases */}
          {diseases.length > 0 && (
            <div className="product-tags-row">
              <Target size={14} />
              <div>
                {diseases.map((d) => (
                  <Link key={d.id} href={`/diseases/${d.slug}`} className="disease-tag">
                    {isAr ? d.nameAr : d.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="product-cta-row">
            <Link href="/contact" className="button primary-button">
              {isAr ? 'اطلب هذا المنتج' : 'Request this product'} <ArrowUpRight size={14} />
            </Link>
            <Link href="/ai-assistant" className="button outline-button">
              {isAr ? 'تشخيص بالذكاء الاصطناعي' : 'AI Diagnosis'} <Zap size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="product-details-tabs">
        <div className="detail-block">
          <h2>{isAr ? 'المزايا' : 'Benefits'}</h2>
          <ul className="benefits-list">
            {(isAr ? product.benefitsAr : product.benefits).map((b, i) => (
              <li key={i}>
                <CheckCircle2 size={16} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-block">
          <h2>{isAr ? 'تعليمات الاستخدام' : 'Usage Instructions'}</h2>
          <p>{isAr ? product.usageInstructionsAr : product.usageInstructions}</p>
        </div>

        <div className="detail-block">
          <h2>{isAr ? 'طريقة التطبيق' : 'Application Method'}</h2>
          <p>{isAr ? product.applicationMethodAr : product.applicationMethod}</p>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="related-products-section">
          <h2>{isAr ? 'منتجات ذات صلة' : 'Related Products'}</h2>
          <div className="products-grid related-grid">
            {related.map((rp) => (
              <Link key={rp.id} href={`/products/${rp.slug}`} className="product-card">
                <div className="product-card-image">
                  <img src={rp.images[0] ?? '/placeholder-product.jpg'} alt={isAr ? rp.nameAr : rp.name} loading="lazy" />
                  <span className="product-cat-badge">
                    {isAr ? categoryLabels[rp.category]?.ar : categoryLabels[rp.category]?.en}
                  </span>
                </div>
                <div className="product-card-body">
                  <h3>{isAr ? rp.nameAr : rp.name}</h3>
                  <p>{isAr ? rp.shortDescriptionAr : rp.shortDescription}</p>
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
