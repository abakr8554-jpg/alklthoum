'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/luxury/Reveal'
import Tilt3D from '@/components/luxury/Tilt3D'
import CountUp from '@/components/luxury/CountUp'
import BrandConstellation, { type ConstellationBrand } from '@/components/luxury/BrandConstellation'
import { SITE } from '@/lib/site'
import { companies, products, categoryLabels, companyMapPositions, type ProductCategory } from '@/lib/data'
import { articles } from '@/lib/articles'
import BlogPreview from '@/components/BlogPreview'

const ORBIT_BRANDS: ConstellationBrand[] = companies.map((c) => ({
  slug: c.slug,
  logo: c.logo,
  en: { name: c.name },
  ar: { name: c.nameAr },
  href: `/companies/${c.slug}`,
  x: companyMapPositions[c.slug]?.x ?? 50,
  y: companyMapPositions[c.slug]?.y ?? 50,
}))

const SLIDES = [
  {
    img: '/images/hero-headquarters.png',
    en: {
      title: ['Together We', 'Make the Future'],
      accent: '',
      lead: 'An agricultural group connecting manufacturing, distribution, and AI plant diagnostics.',
    },
    ar: {
      title: ['معاً نصنع', 'المستقبل'],
      accent: '',
      lead: 'مجموعة زراعية تربط التصنيع والتوزيع وتشخيص النباتات بالذكاء الاصطناعي.',
    },
  },
  {
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85',
    en: {
      title: ['Inputs built', 'for the field'],
      accent: 'PROVEN',
      lead: 'Precision supply and partnerships designed for heat, dust, and real farm conditions.',
    },
    ar: {
      title: ['مستلزمات', 'مبنية للحقل'],
      accent: 'مُجرَّبة',
      lead: 'توريد دقيق وشراكات مصممة للحرارة والغبار وواقع المزرعة.',
    },
  },
  {
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=85',
    en: {
      title: ['Al Kalthoum with you', 'from seed'],
      accent: 'to harvest',
      lead: 'Plastics, irrigation, seeds and crop inputs — with field support from planting to harvest.',
    },
    ar: {
      title: ['الكلثوم معك', 'من البذرة'],
      accent: 'حتى الثمرة',
      lead: 'بلاستيك وري وبذور ومستلزمات محاصيل — مع دعم ميداني من الزراعة حتى الحصاد.',
    },
  },
]

const PRODUCT_SECTIONS: {
  cat: ProductCategory
  img: string
  en: { name: string; desc: string }
  ar: { name: string; desc: string }
}[] = [
  {
    cat: 'seeds',
    img: 'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?auto=format&fit=crop&w=1400&q=80',
    en: { name: 'Seeds', desc: 'Hybrid varieties for tomatoes, peppers, watermelon and more.' },
    ar: { name: 'البذور', desc: 'أصناف هجينة للطماطم والفلفل والبطيخ والمزيد.' },
  },
  {
    cat: 'sona-plant-plastic',
    img: '/images/categories/plastic.png',
    en: {
      name: 'Sona Plant Plastic',
      desc: 'Greenhouse covers, mulch films, and high-performance agricultural plastics.',
    },
    ar: {
      name: 'سونا بلانت بلاستيك',
      desc: 'أغطية بيوت محمية وأفلام تغطية وبلاستيك زراعي عالي الأداء.',
    },
  },
  {
    cat: 'hoses',
    img: '/images/categories/hoses.png',
    en: { name: 'Hoses & Irrigation', desc: 'Precision drip systems and water management solutions.' },
    ar: { name: 'الخراطيم والري', desc: 'أنظمة تنقيط دقيقة وحلول إدارة المياه.' },
  },
  {
    cat: 'fertilizers-pesticides',
    img: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?auto=format&fit=crop&w=1400&q=80',
    en: { name: 'Fertilizers & Protection', desc: 'Crop nutrition and protection programs for productive harvests.' },
    ar: { name: 'الأسمدة والحماية', desc: 'برامج تغذية وحماية المحاصيل لحصاد منتج.' },
  },
  {
    cat: 'soil',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=80',
    en: { name: 'Soil & Substrates', desc: 'Growing media and soil amendments for greenhouse and open field.' },
    ar: { name: 'التربة والركائز', desc: 'وسائط زراعية ومحسنات التربة للبيوت المحمية والحقول.' },
  },
]

const FEATURES = [
  {
    en: {
      title: 'Integrated Group',
      desc: 'Specialist companies covering irrigation, plastics, protected growing, distribution, and engineering.',
    },
    ar: {
      title: 'مجموعة متكاملة',
      desc: 'شركات متخصصة تغطي الري والبلاستيك والبيوت المحمية والتوزيع والهندسة.',
    },
  },
  {
    en: {
      title: 'Field-Proven Solutions',
      desc: 'Products selected and developed for real farm conditions — heat, dust, and early starts.',
    },
    ar: {
      title: 'حلول مجرّبة في الحقل',
      desc: 'منتجات مختارة ومطوّرة لظروف المزرعة الحقيقية — الحرارة والغبار والبدايات المبكرة.',
    },
  },
  {
    en: {
      title: 'Modern Manufacturing',
      desc: 'Agricultural plastics, irrigation components, and crop inputs manufactured to demanding standards.',
    },
    ar: {
      title: 'تصنيع حديث',
      desc: 'بلاستيك زراعي ومكوّنات ري ومستلزمات محاصيل بمعايير صارمة.',
    },
  },
  {
    en: {
      title: `30+ Years`,
      desc: 'Decades of agricultural knowledge aimed at raising efficiency for the farmer.',
    },
    ar: {
      title: `+30 عاماً`,
      desc: 'عقود من المعرفة الزراعية تهدف لرفع كفاءة المزارع.',
    },
  },
]

const HERO_STATS = [
  { num: null as number | null, suffix: '+', labelEn: 'Years Experience', labelAr: 'سنة خبرة', isText: false, useYears: true },
  { num: ORBIT_BRANDS.length, suffix: '', labelEn: 'Group companies', labelAr: 'شركات المجموعة', isText: false, useYears: false },
  { num: 5, suffix: '', labelEn: 'Divisions', labelAr: 'أقسام', isText: false, useYears: false },
  { num: 'AI', suffix: '', labelEn: 'Plant Diagnostics', labelAr: 'تشخيص النباتات', isText: true, useYears: false },
] as const

const PROCESS = [
  { en: 'Consult', ar: 'استشارة' },
  { en: 'Supply', ar: 'توريد' },
  { en: 'Install', ar: 'تركيب' },
  { en: 'Support', ar: 'دعم' },
]

const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
]

export default function HomePage() {
  const { isAr, dir } = useLang()
  const [slide, setSlide] = useState(0)
  const [ready, setReady] = useState(true)
  const tx = (en: string, ar: string) => (isAr ? ar : en)
  const years = 30
  const current = SLIDES[slide]
  const title = isAr ? current.ar.title : current.en.title
  const accent = isAr ? current.ar.accent : current.en.accent
  const lead = isAr ? current.ar.lead : current.en.lead

  useEffect(() => {
    if (!ready) return
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 7000)
    return () => clearInterval(t)
  }, [ready])

  return (
    <div lang={isAr ? 'ar' : 'en'} dir={dir} className="sp is-soft" id="top">
      <Header variant="soft" />

      <section className="soft-hero" aria-label={tx('Hero', 'الواجهة')}>
        <div className="soft-hero-shell">
          <div className="soft-hero-copy">
            <div key={`title-${slide}`}>
              <div className="soft-hero-title-row">
                <h1 className="soft-hero-title">
                  {title[0]}
                  <br />
                  {title[1]}
                  {accent ? <> <em>{accent}</em></> : null}
                </h1>
                <div className="soft-proof">
                  <div className="soft-proof-avatars" aria-hidden>
                    {AVATARS.map((src) => (
                      <span key={src} style={{ backgroundImage: `url(${src})` }} />
                    ))}
                  </div>
                  <div>
                    <strong>{years}+</strong>
                    <small>{tx('years with farmers', 'عاماً مع المزارعين')}</small>
                  </div>
                </div>
              </div>
            </div>

            <p key={`lead-${slide}`} className="soft-hero-lead">
              {lead}
            </p>

            <div className="soft-hero-actions">
              <Link href="/products" className="soft-btn-dark">
                <span>{tx('Explore divisions', 'استكشف الأقسام')}</span>
                <span className="ico" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              <Link href="/about" className="soft-btn-light">
                <span className="ico" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>{tx('How we work', 'كيف نعمل')}</span>
              </Link>
            </div>

            <div className="soft-hero-pager">
              <div className="soft-pager-num">
                {String(slide + 1).padStart(2, '0')} <em>/ {String(SLIDES.length).padStart(2, '0')}</em>
              </div>
              <div className="soft-pager-btns">
                <button
                  type="button"
                  aria-label={tx('Previous', 'السابق')}
                  onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label={tx('Next', 'التالي')}
                  onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={`soft-hero-visual ${ready ? 'is-ready' : ''}`}>
            <div className="soft-visual-tilt">
              <div className="soft-visual-frame">
                {SLIDES.map((s, i) => (
                  <img
                    key={s.img}
                    src={s.img}
                    alt=""
                    className="soft-visual-main"
                    style={{ opacity: slide === i ? 1 : 0, transition: 'opacity 1.1s ease' }}
                  />
                ))}
                <div className="soft-visual-gradient" aria-hidden />

                <div className="soft-float soft-float-b">
                  <span className="soft-float-ico" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div>
                    <strong>{tx('Egypt & beyond', 'مصر وما بعدها')}</strong>
                    <small>{tx('Field coverage', 'تغطية ميدانية')}</small>
                  </div>
                </div>

                <div className="soft-process" aria-label={tx('How we deliver', 'كيف نقدّم الخدمة')}>
                  {PROCESS.map((step, i) => (
                    <div key={step.en} style={{ display: 'contents' }}>
                      <div className="soft-process-step">
                        <span aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                        <small>{tx(step.en, step.ar)}</small>
                      </div>
                      {i < PROCESS.length - 1 && (
                        <svg className="soft-process-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="soft-hero-stats-bar">
          <div className="soft-hero-stats" aria-label={tx('Key figures', 'أرقام رئيسية')}>
            {HERO_STATS.map((s, i) => (
              <div key={i} className={`soft-hero-stat${s.isText ? ' is-ai' : ''}`}>
                <span className="sp-stat-num type-en-display">
                  {s.isText ? (
                    s.num
                  ) : (
                    <CountUp value={(s.useYears ? years : s.num) as number} suffix={s.suffix} />
                  )}
                </span>
                <span className="sp-stat-label">{tx(s.labelEn, s.labelAr)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="companies-hub soft-hub band-mint" id="group">
        <div className="sp-container">
          <Reveal>
            <div className="soft-section-head">
              <p className="soft-kicker">{tx('The Group', 'المجموعة')}</p>
              <h2>{tx('Our Companies', 'شركاتنا')}</h2>
              <p>
                {tx(
                  'Five specialist brands under one agricultural group.',
                  'خمس علامات متخصصة تحت مجموعة زراعية واحدة.'
                )}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <BrandConstellation brands={ORBIT_BRANDS} />
          </Reveal>

          <Reveal>
            <div className="hub-orbit-cta">
              <Link href="/companies" className="soft-btn-green">
                <span>{tx('View all companies', 'عرض كل الشركات')}</span>
                <span className="ico" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="divisions band-sand" id="projects">
        <div className="sp-container">
          <Reveal>
            <header className="divisions-head">
              <div className="divisions-head-copy">
                <p className="divisions-eyebrow">{tx('Divisions', 'أقسام')}</p>
                <h2>{tx('Our Divisions', 'أقسامنا')}</h2>
              </div>
              <p className="divisions-lead">
                {tx(
                  'Five specialized divisions delivering agricultural inputs, technology, and field support across the value chain.',
                  'خمسة أقسام متخصصة تقدّم المستلزمات الزراعية والتقنية والدعم الميداني عبر سلسلة القيمة.'
                )}
              </p>
            </header>
          </Reveal>

          <div className="divisions-grid">
            {PRODUCT_SECTIONS.map((p, i) => (
              <Reveal
                key={p.cat}
                delay={(i % 2) * 0.1}
                className={i === PRODUCT_SECTIONS.length - 1 && PRODUCT_SECTIONS.length % 2 === 1 ? 'is-wide' : undefined}
              >
                <Tilt3D 
                  intensity={7} 
                  className="division-tilt"
                  href={`/products?cat=${p.cat}`}
                >
                  <div className={`division-card ${i === PRODUCT_SECTIONS.length - 1 && PRODUCT_SECTIONS.length % 2 === 1 ? 'is-wide' : ''}`}>
                    <div className="division-media">
                      <div className="division-media-frame">
                        <img src={p.img} alt={isAr ? p.ar.name : p.en.name} loading="lazy" />
                      </div>
                    </div>
                    <div className="division-copy">
                      <div className="division-meta">
                        <span className="division-index">{String(i + 1).padStart(2, '0')}</span>
                        <span className="division-rule" aria-hidden />
                      </div>
                      <h3>{isAr ? p.ar.name : p.en.name}</h3>
                      <p>{isAr ? p.ar.desc : p.en.desc}</p>
                      <span className="division-link">
                        {tx('Explore division', 'استكشف القسم')}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Tilt3D>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="divisions-foot">
              <Link href="/products" className="divisions-all">
                {tx('Browse all divisions', 'تصفح كل الأقسام')}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sp-about band-white" id="solutions">
        <div className="sp-container sp-about-grid">
          <Reveal className="sp-about-text">
            <p className="sp-about-eyebrow">{tx('Who We Are', 'من نحن')}</p>
            <h2>
              {tx(
                'An agricultural group delivering plastics, irrigation, seeds, and crop inputs — with practical support for farmers.',
                'مجموعة زراعية تقدّم البلاستيك والري والبذور ومستلزمات المحاصيل — مع دعم عملي للمزارعين.'
              )}
            </h2>
            <p className="sp-subtitle">
              {tx(
                'Through decades of work, we focus on reliable inputs and solutions that help farmers improve yield and efficiency.',
                'من خلال عقود من العمل، نركّز على مستلزمات موثوقة وحلول تساعد المزارعين على تحسين الإنتاجية والكفاءة.'
              )}
            </p>
            <p className="sp-desc">
              {tx(
                'Our portfolio spans Sona Plant agricultural plastics, irrigation systems, crop nutrition, and an AI assistant that helps identify plant issues and recommend matching products from our catalog.',
                'تشمل محفظتنا بلاستيك سونا بلانت الزراعي وأنظمة الري وتغذية المحاصيل ومساعداً ذكياً يساعد على تحديد مشكلات النباتات واقتراح المنتجات المناسبة من كتالوجنا.'
              )}
            </p>
            <Link href="/about" className="soft-btn-orange">
              <span>{tx('Learn More', 'اقرأ المزيد')}</span>
              <span className="ico" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="sp-about-img is-lux">
            <Tilt3D intensity={8}>
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=85"
                alt={tx('Agricultural field', 'حقل زراعي')}
              />
            </Tilt3D>
          </Reveal>
        </div>
      </section>

      <section className="corp-values band-forest">
        <div className="sp-container">
          <Reveal>
            <header className="corp-values-head">
              <p className="divisions-eyebrow">{tx('Why Al Kalthoum', 'لماذا الكلثوم')}</p>
              <h2>{tx('Built for serious agriculture', 'مبنيون لزراعة جادة')}</h2>
            </header>
          </Reveal>
          <div className="corp-values-grid">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <article className="corp-value">
                  <span className="corp-value-index">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{isAr ? f.ar.title : f.en.title}</h3>
                  <p>{isAr ? f.ar.desc : f.en.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-ai-cta band-white">
        <div className="sp-container sp-ai-cta-grid">
          <Reveal className="sp-ai-cta-text">
            <span className="sp-ai-badge">
              {tx('AI-Powered Analysis', 'تحليل مدعوم بالذكاء الاصطناعي')}
            </span>
            <h2>{tx('Diagnose Plant Issues Instantly', 'شخّص مشكلات النباتات فوراً')}</h2>
            <p>
              {tx(
                'Upload a photo of your plant — our assistant suggests matching treatments from our catalog.',
                'ارفع صورة لنباتك — يقترح المساعد علاجات مطابقة من كتالوجنا.'
              )}
            </p>
            <Link href="/ai-assistant" className="soft-btn-green">
              <span>{tx('Try AI Assistant', 'جرّب المساعد الذكي')}</span>
              <span className="ico" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="sp-ai-cta-img">
            <Tilt3D intensity={12}>
              <div className="sp-ai-cta-img-inner">
                <img
                  src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80"
                  alt={tx('Plant leaf analysis', 'تحليل ورقة نبات')}
                />
              </div>
            </Tilt3D>
          </Reveal>
        </div>
      </section>

      <BlogPreview articles={articles} />

      <section className="sp-contact band-sand" id="contact">
        <div className="sp-container sp-contact-grid">
          <Reveal className="sp-contact-info">
            <h2>{tx('Get In Touch', 'تواصل معنا')}</h2>
            <p>
              {tx(
                'Questions about products or partnerships? Our team is ready to help.',
                'أسئلة عن المنتجات أو الشراكات؟ فريقنا مستعد للمساعدة.'
              )}
            </p>
            <div className="sp-contact-items">
              <div className="sp-contact-item">
                <div className="sp-contact-icon" aria-hidden>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4>{tx('Headquarters', 'المقر الرئيسي')}</h4>
                  <p>{tx(SITE.address.en, SITE.address.ar)}</p>
                </div>
              </div>
              <div className="sp-contact-item">
                <div className="sp-contact-icon" aria-hidden>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.35 1.9.67 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.54 2.81.67A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4>{tx('Phone', 'الهاتف')}</h4>
                  <p>
                    <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
                  </p>
                </div>
              </div>
              <div className="sp-contact-item">
                <div className="sp-contact-icon" aria-hidden>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <h4>{tx('Email', 'البريد')}</h4>
                  <p>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="sp-contact-form-wrap">
            <ContactForm compact />
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
