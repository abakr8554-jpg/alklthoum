'use client'

import Link from 'next/link'
import { ArrowUpRight, Users, Award, Leaf, TrendingUp } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import { SITE } from '@/lib/site'

const values = [
  {
    icon: <Leaf size={24} />,
    en: { title: 'Sustainability', desc: 'Every solution we build considers the long-term health of the land.' },
    ar: { title: 'الاستدامة', desc: 'كل حل نبنيه يراعي الصحة طويلة الأمد للأرض.' },
  },
  {
    icon: <Users size={24} />,
    en: { title: 'Partnership', desc: 'We grow alongside farmers, not just for them.' },
    ar: { title: 'الشراكة', desc: 'ننمو جنباً إلى جنب مع المزارعين، وليس فقط من أجلهم.' },
  },
  {
    icon: <TrendingUp size={24} />,
    en: { title: 'Innovation', desc: 'From drip irrigation to AI diagnostics — always moving forward.' },
    ar: { title: 'الابتكار', desc: 'من الري بالتنقيط إلى تشخيص الذكاء الاصطناعي — دائماً نتقدم للأمام.' },
  },
  {
    icon: <Award size={24} />,
    en: { title: 'Quality', desc: 'Demanding standards applied to every product and every project.' },
    ar: { title: 'الجودة', desc: 'معايير صارمة تُطبّق على كل منتج وكل مشروع.' },
  },
]

export default function AboutClient({ companiesCount }: { companiesCount: number }) {
  const { isAr, dir } = useLang()
  const years = new Date().getFullYear() - SITE.foundedYear

  const stats = [
    { value: `${years}+`, en: 'Years of experience', ar: 'سنة خبرة' },
    { value: String(companiesCount), en: 'Group companies', ar: 'شركات المجموعة' },
    { value: '5', en: 'Product divisions', ar: 'أقسام' },
    { value: '360°', en: 'Agricultural solutions', ar: 'حلول زراعية شاملة' },
  ]

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top" className="about-page">
      <Header variant="solid" />

      <section className="ap-hero">
        <div
          className="ap-hero-bg"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80)',
          }}
        />
        <div className="ap-hero-overlay" />
        <div className="ap-hero-content">
          <span className="ap-label">{isAr ? '01 / من نحن' : '01 / Who We Are'}</span>
          <h1 className="ap-hero-h1">
            {isAr ? 'قصتنا' : (
              <>
                <span>Our</span> <em>Story</em>
              </>
            )}
          </h1>
          <p className="ap-hero-sub">
            {isAr
              ? 'عقود من الزراعة والابتكار والشراكة مع المزارعين.'
              : 'Decades of agriculture, innovation, and partnership with farmers.'}
          </p>
        </div>
      </section>

      <section className="ap-intro">
        <div className="ap-intro-inner">
          <div className="ap-intro-left">
            <span className="ap-label muted">{isAr ? 'الرؤية' : 'Vision'}</span>
            <h2 className="ap-intro-h2">
              {isAr ? (
                <>
                  الزراعة ليست مجرد صناعتنا.
                  <br />
                  <em>إنها إرثنا.</em>
                </>
              ) : (
                <>
                  Agriculture is not just our industry.
                  <br />
                  <em>It is our inheritance.</em>
                </>
              )}
            </h2>
          </div>
          <div className="ap-intro-right">
            <p>
              {isAr
                ? `مجموعة الكلثوم مجموعة زراعية تؤمن بأن المستقبل يُزرع — بصبر ودقة ومعاً. منذ ${SITE.foundedYear}، نمت المجموعة لتشمل شركات متخصصة تقدّم البلاستيك الزراعي والري والبذور ومستلزمات المحاصيل.`
                : `Al Kalthoum Group is an agricultural group that believes the future is grown — patiently, precisely, and together. Since ${SITE.foundedYear}, the group has grown to include specialist companies delivering agricultural plastics, irrigation, seeds, and crop inputs.`}
            </p>
            <p>
              {isAr
                ? 'نؤمن بأن التكنولوجيا يجب أن تخدم الأرض، وأن الابتكار الأفضل هو الذي يفهم واقع الحقل — حرارته وغباره وبداياته المبكرة.'
                : 'We believe technology must serve the land, and that the best innovation understands the reality of the field — its heat, its dust, its early starts.'}
            </p>
            <Link href="/companies" className="ap-text-link">
              {isAr ? 'اكتشف شركاتنا' : 'Discover our companies'} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="ap-stats-section">
        <div className="ap-stats-inner">
          {stats.map((s, i) => (
            <div key={i} className="ap-stat">
              <strong>{s.value}</strong>
              <span>{isAr ? s.ar : s.en}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ap-values">
        <div className="ap-values-inner">
          <div className="ap-values-header">
            <span className="ap-label">{isAr ? 'قيمنا' : 'Our Values'}</span>
            <h2 className="ap-values-h2">{isAr ? 'ما يحركنا' : 'What drives us'}</h2>
          </div>
          <div className="ap-values-grid">
            {values.map((v, i) => (
              <div key={i} className="ap-value-card">
                <div className="ap-value-icon">{v.icon}</div>
                <h3>{isAr ? v.ar.title : v.en.title}</h3>
                <p>{isAr ? v.ar.desc : v.en.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-cta">
        <div className="ap-cta-inner">
          <h2 className="ap-cta-h2">{isAr ? 'هل أنت مستعد للنمو معنا؟' : 'Ready to grow with us?'}</h2>
          <p>
            {isAr
              ? 'تواصل مع فريقنا للمنتجات أو الشراكات أو دعم الموزعين.'
              : 'Contact our team for products, partnerships, or distributor support.'}
          </p>
          <div className="ap-cta-btns">
            <Link href="/contact" className="sp-btn sp-btn-primary">
              <span>{isAr ? 'اتصل بنا' : 'Contact us'}</span>
            </Link>
            <Link href="/products" className="sp-btn sp-btn-primary">
              <span>{isAr ? 'تصفح المنتجات' : 'Browse products'}</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
