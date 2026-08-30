'use client'

import Link from 'next/link'
import { AlertTriangle, CheckCircle2, Leaf, Shield, Sprout, Zap } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import type { Disease, Product } from '@/lib/data'
import { categoryLabels } from '@/lib/data'

const severityColors: Record<string, string> = { low: '#2E6B1A', medium: '#E8571A', high: '#c0392b' }
const severityLabelEn: Record<string, string> = { low: 'Low', medium: 'Medium', high: 'High' }
const severityLabelAr: Record<string, string> = { low: 'منخفضة', medium: 'متوسطة', high: 'مرتفعة' }

type Props = {
  disease: Disease
  recommended: Product[]
}

export default function DiseaseClient({ disease, recommended }: Props) {
  const { isAr, dir } = useLang()

  const symptoms = isAr ? disease.symptomsAr : disease.symptoms
  const treatment = isAr ? disease.treatmentStepsAr : disease.treatmentSteps
  const prevention = isAr ? disease.preventionTipsAr : disease.preventionTips
  const crops = isAr ? disease.affectedCropsAr : disease.affectedCrops

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">{isAr ? 'الرئيسية' : 'Home'}</Link>
        <span>/</span>
        <Link href="/diseases">{isAr ? 'الأمراض' : 'Diseases'}</Link>
        <span>/</span>
        <span>{isAr ? disease.nameAr : disease.name}</span>
      </div>

      {/* Disease detail */}
      <section className="product-detail-section">
        {/* Image */}
        <div className="product-gallery">
          <div className="product-main-image">
            <img
              src={disease.image || '/placeholder-product.jpg'}
              alt={isAr ? disease.nameAr : disease.name}
            />
          </div>
        </div>

        {/* Info */}
        <div className="product-info-panel">
          <div
            className="severity-badge"
            style={{ background: severityColors[disease.severity], display: 'inline-block', marginBottom: 12 }}
          >
            {isAr ? severityLabelAr[disease.severity] : severityLabelEn[disease.severity]}{' '}
            {isAr ? 'الشدة' : 'Severity'}
          </div>
          <h1 className="product-detail-title">{isAr ? disease.nameAr : disease.name}</h1>
          {disease.scientificName && (
            <p className="product-company-link" style={{ fontStyle: 'italic' }}>
              {disease.scientificName}
            </p>
          )}
          <p className="product-detail-desc">{isAr ? disease.descriptionAr : disease.description}</p>

          {/* Affected crops */}
          {crops.length > 0 && (
            <div className="product-tags-row">
              <Leaf size={14} />
              <div>
                {crops.map((crop) => (
                  <span key={crop} className="crop-tag">{crop}</span>
                ))}
              </div>
            </div>
          )}

          {/* Cause */}
          {(disease.cause || disease.causeAr) && (
            <div style={{ marginTop: 20 }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16 }}>
                <Zap size={16} /> {isAr ? 'السبب' : 'Cause'}
              </h3>
              <p style={{ lineHeight: 1.65, marginTop: 6 }}>{isAr ? disease.causeAr : disease.cause}</p>
            </div>
          )}
        </div>
      </section>

      {/* Symptoms */}
      {symptoms.length > 0 && (
        <section className="result-section" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 8px' }}>
          <h3><AlertTriangle size={18} /> {isAr ? 'الأعراض' : 'Symptoms'}</h3>
          <ul className="prevention-list">
            {symptoms.map((s, i) => (
              <li key={i}><Sprout size={14} /><span>{s}</span></li>
            ))}
          </ul>
        </section>
      )}

      {/* Treatment */}
      {treatment.length > 0 && (
        <section className="result-section" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 8px' }}>
          <h3><CheckCircle2 size={18} /> {isAr ? 'خطوات العلاج' : 'Treatment Steps'}</h3>
          <ol className="treatment-list">
            {treatment.map((step, i) => (
              <li key={i}>
                <span className="treatment-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Prevention */}
      {prevention.length > 0 && (
        <section className="result-section" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 8px' }}>
          <h3><Shield size={18} /> {isAr ? 'نصائح الوقاية' : 'Prevention Tips'}</h3>
          <ul className="prevention-list">
            {prevention.map((tip, i) => (
              <li key={i}><Sprout size={14} /><span>{tip}</span></li>
            ))}
          </ul>
        </section>
      )}

      {/* Recommended products */}
      {recommended.length > 0 && (
        <section className="result-section" style={{ maxWidth: 1000, margin: '0 auto', padding: '8px 24px 40px' }}>
          <h3><Zap size={18} /> {isAr ? 'المنتجات الموصى بها' : 'Recommended Products'}</h3>
          <div className="recommended-products-grid">
            {recommended.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="rec-product-card">
                <div className="rec-product-img">
                  <img
                    src={product.images[0] ?? '/placeholder-product.jpg'}
                    alt={isAr ? product.nameAr : product.name}
                    loading="lazy"
                  />
                </div>
                <div className="rec-product-info">
                  <span className="rec-cat">
                    {isAr ? categoryLabels[product.category]?.ar : categoryLabels[product.category]?.en}
                  </span>
                  <h4>{isAr ? product.nameAr : product.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '0 24px 64px' }}>
        <Link href="/ai-assistant" className="button primary-button">
          {isAr ? 'تشخيص مرض نبات بالذكاء الاصطناعي' : 'Diagnose a plant with AI'} <Zap size={14} />
        </Link>
      </section>

      <Footer />
    </main>
  )
}
