'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Upload, Camera, X, Zap, Leaf, AlertTriangle, CheckCircle2,
  ArrowUpRight, RefreshCw, Shield, Sprout, ChevronRight,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import { products as allProducts, categoryLabels } from '@/lib/data'
import { analyzeImage, type AIAnalysisResult } from './actions'

type Step = 'upload' | 'analyzing' | 'results'

const severityColors = { low: '#2E6B1A', medium: '#E8571A', high: '#c0392b' }
const severityLabelEn = { low: 'Low', medium: 'Medium', high: 'High' }
const severityLabelAr = { low: 'منخفض', medium: 'متوسط', high: 'مرتفع' }

export default function AIAssistantPage() {
  const { isAr, dir } = useLang()
  const [step, setStep] = useState<Step>('upload')
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<AIAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError(isAr ? 'يرجى رفع صورة صالحة.' : 'Please upload a valid image.')
        return
      }
      setError(null)

      // Preview
      const reader = new FileReader()
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string
        setPreview(dataUrl)
        setStep('analyzing')

        try {
          // Extract base64 + mime type (data:image/xxx;base64,....)
          const base64 = dataUrl.split(',')[1]
          const mimeType = dataUrl.substring(5, dataUrl.indexOf(';')) || 'image/jpeg'
          const analysis = await analyzeImage(base64, mimeType)
          setResult(analysis)
          setStep('results')
        } catch {
          setError(
            isAr
              ? 'تعذّر تحليل الصورة (قد يكون الضغط عاليًا). انتظر لحظة وحاول مرة أخرى.'
              : 'Could not analyze the image (service may be busy). Please wait a moment and try again.',
          )
          setStep('upload')
        }
      }
      reader.readAsDataURL(file)
    },
    [isAr],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const reset = () => {
    setStep('upload')
    setPreview(null)
    setResult(null)
    setError(null)
  }

  const recommendedProducts = result
    ? allProducts.filter((p) => result.recommendedProductIds.includes(p.id))
    : []

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      {/* Page Hero */}
      <section className="ai-hero">
        <div className="ai-hero-content">
          <div className="ai-hero-badge">
            <Zap size={14} />
            {isAr ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
          </div>
          <h1>
            {isAr ? 'المساعد الزراعي' : 'AI Agriculture'}{' '}
            <em>{isAr ? 'الذكي' : 'Assistant'}</em>
          </h1>
          <p>
            {isAr
              ? 'ارفع صورة نباتك — يكتشف الذكاء الاصطناعي المرض ويقترح أفضل منتجاتنا للعلاج.'
              : 'Upload a plant photo — AI detects the disease and recommends the best treatment from our catalog.'}
          </p>
        </div>
        <div className="ai-hero-decoration">
          <Leaf size={120} strokeWidth={0.5} />
        </div>
      </section>

      <section className="ai-workspace">
        {/* ── Upload step ── */}
        {step === 'upload' && (
          <div className="ai-upload-area">
            {error && (
              <div className="ai-error">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            <div
              className={`dropzone ${dragging ? 'dragging' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => { fileRef.current?.removeAttribute('capture'); fileRef.current?.click() }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') { fileRef.current?.removeAttribute('capture'); fileRef.current?.click() } }}
              aria-label={isAr ? 'منطقة رفع الصورة' : 'Image upload area'}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                id="plant-image-input"
              />
              <div className="dropzone-icon">
                <Upload size={36} />
              </div>
              <h3>{isAr ? 'ارفع صورة النبات' : 'Upload Plant Image'}</h3>
              <p>
                {isAr
                  ? 'اسحب وأفلت الصورة هنا، أو انقر للاختيار'
                  : 'Drag & drop an image here, or click to select'}
              </p>
              <div className="dropzone-actions">
                <button
                  type="button"
                  className="upload-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (fileRef.current) {
                      fileRef.current.removeAttribute('capture')
                      fileRef.current.click()
                    }
                  }}
                >
                  <Upload size={15} />
                  {isAr ? 'اختر صورة' : 'Choose Image'}
                </button>
                <button
                  type="button"
                  className="upload-btn camera-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (fileRef.current) {
                      fileRef.current.setAttribute('capture', 'environment')
                      fileRef.current.click()
                    }
                  }}
                >
                  <Camera size={15} />
                  {isAr ? 'التقط صورة' : 'Take Photo'}
                </button>
              </div>
              <p className="dropzone-hint">
                {isAr ? 'JPG, PNG, WEBP — حتى 10 ميغابايت' : 'JPG, PNG, WEBP — up to 10MB'}
              </p>
            </div>

            {/* How it works */}
            <div className="how-it-works">
              <h3>{isAr ? 'كيف يعمل؟' : 'How it works'}</h3>
              <div className="steps-row">
                {[
                  {
                    icon: <Upload size={20} />,
                    en: 'Upload a clear photo of the affected plant',
                    ar: 'ارفع صورة واضحة للنبات المتضرر',
                  },
                  {
                    icon: <Zap size={20} />,
                    en: 'AI analyzes the image for disease & severity',
                    ar: 'يحلل الذكاء الاصطناعي الصورة للكشف عن المرض وشدته',
                  },
                  {
                    icon: <Leaf size={20} />,
                    en: 'Get treatment steps & product recommendations',
                    ar: 'احصل على خطوات العلاج وتوصيات المنتجات',
                  },
                ].map((s, i) => (
                  <div key={i} className="step-item">
                    <div className="step-icon">{s.icon}</div>
                    <p>{isAr ? s.ar : s.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Analyzing step ── */}
        {step === 'analyzing' && (
          <div className="ai-analyzing">
            {preview && (
              <div className="analyzing-preview">
                <img src={preview} alt="Plant being analyzed" />
                <div className="scan-line" />
              </div>
            )}
            <div className="analyzing-text">
              <div className="ai-spinner">
                <Zap size={24} />
              </div>
              <h3>{isAr ? 'جاري التحليل...' : 'Analyzing...'}</h3>
              <p>
                {isAr
                  ? 'الذكاء الاصطناعي يفحص النبات ويحدد المرض'
                  : 'AI is examining your plant and identifying the disease'}
              </p>
              <div className="analyzing-steps">
                {[
                  { en: 'Detecting plant type', ar: 'تحديد نوع النبات' },
                  { en: 'Identifying disease patterns', ar: 'تحديد أنماط المرض' },
                  { en: 'Assessing severity level', ar: 'تقييم مستوى الشدة' },
                  { en: 'Matching treatment products', ar: 'مطابقة منتجات العلاج' },
                ].map((s, i) => (
                  <div key={i} className="analyzing-step-item">
                    <div className="step-dot" style={{ animationDelay: `${i * 0.3}s` }} />
                    <span>{isAr ? s.ar : s.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Results step ── */}
        {step === 'results' && result && (
          <div className="ai-results">
            {/* Header row */}
            <div className="results-header">
              <div className="results-image-thumb">
                {preview && <img src={preview} alt="Analyzed plant" />}
              </div>
              <div className="results-summary">
                <div
                  className="severity-badge"
                  style={{ background: severityColors[result.severity] }}
                >
                  {isAr ? severityLabelAr[result.severity] : severityLabelEn[result.severity]}{' '}
                  {isAr ? 'الشدة' : 'Severity'}
                </div>
                <h2>
                  {isAr ? result.diseaseNameAr : result.diseaseName}
                </h2>
                <p className="results-plant">
                  <Leaf size={14} /> {isAr ? result.plantNameAr : result.plantName}
                </p>
                {result.demo && (
                  <p
                    style={{
                      fontSize: 12,
                      color: '#b45309',
                      background: 'rgba(232,87,26,.1)',
                      padding: '6px 10px',
                      borderRadius: 8,
                      margin: '8px 0 0',
                    }}
                  >
                    {isAr
                      ? '⚠ نتيجة توضيحية (وضع تجريبي) — فعّل مفتاح الذكاء الاصطناعي للتحليل الحقيقي.'
                      : '⚠ Sample result (demo mode) — enable the AI key for real analysis.'}
                  </p>
                )}
                <div className="confidence-bar">
                  <span>{isAr ? 'الثقة:' : 'Confidence:'}</span>
                  <div className="confidence-track">
                    <div
                      className="confidence-fill"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <strong>{result.confidence}%</strong>
                </div>
              </div>
              <button className="reset-btn" onClick={reset} aria-label="Analyze another image">
                <RefreshCw size={16} />
                {isAr ? 'صورة جديدة' : 'New image'}
              </button>
            </div>

            {/* Description & Cause */}
            <div className="result-blocks">
              <div className="result-block">
                <h3><AlertTriangle size={16} /> {isAr ? 'وصف المرض' : 'Disease Description'}</h3>
                <p>{isAr ? result.descriptionAr : result.description}</p>
              </div>
              <div className="result-block">
                <h3><Zap size={16} /> {isAr ? 'السبب' : 'Cause'}</h3>
                <p>{isAr ? result.causeAr : result.cause}</p>
              </div>
            </div>

            {/* Treatment steps */}
            <div className="result-section">
              <h3>
                <CheckCircle2 size={18} />
                {isAr ? 'خطوات العلاج' : 'Treatment Steps'}
              </h3>
              <ol className="treatment-list">
                {(isAr ? result.treatmentStepsAr : result.treatmentSteps).map((step, i) => (
                  <li key={i}>
                    <span className="treatment-num">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Prevention tips */}
            <div className="result-section">
              <h3>
                <Shield size={18} />
                {isAr ? 'نصائح الوقاية' : 'Prevention Tips'}
              </h3>
              <ul className="prevention-list">
                {(isAr ? result.preventionTipsAr : result.preventionTips).map((tip, i) => (
                  <li key={i}>
                    <Sprout size={14} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended products */}
            {recommendedProducts.length > 0 && (
              <div className="result-section">
                <h3>
                  <Zap size={18} />
                  {isAr ? 'المنتجات الموصى بها' : 'Recommended Products'}
                </h3>
                <div className="recommended-products-grid">
                  {recommendedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="rec-product-card"
                    >
                      <div className="rec-product-img">
                        <img
                          src={product.images[0] ?? '/placeholder-product.jpg'}
                          alt={isAr ? product.nameAr : product.name}
                          loading="lazy"
                        />
                        <span className="ai-badge">✦ {isAr ? 'موصى به' : 'Recommended'}</span>
                      </div>
                      <div className="rec-product-info">
                        <span className="rec-cat">
                          {isAr
                            ? categoryLabels[product.category].ar
                            : categoryLabels[product.category].en}
                        </span>
                        <h4>{isAr ? product.nameAr : product.name}</h4>
                        <p>{isAr ? product.shortDescriptionAr : product.shortDescription}</p>
                        <span className="product-cta">
                          {isAr ? 'عرض التفاصيل' : 'View Details'}{' '}
                          <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Find distributor CTA */}
            <div className="result-distributor-cta">
              <div>
                <h3>{isAr ? 'أقرب موزع إليك' : 'Find Your Nearest Distributor'}</h3>
                <p>
                  {isAr
                    ? 'احصل على هذه المنتجات من أقرب موزع معتمد في منطقتك.'
                    : 'Get these products from the nearest authorised distributor in your area.'}
                </p>
              </div>
              <Link href="/distributors" className="button primary-button">
                {isAr ? 'ابحث عن موزع' : 'Find Distributor'} <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
