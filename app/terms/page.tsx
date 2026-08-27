'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import { SITE } from '@/lib/site'

export default function TermsPage() {
  const { isAr, dir } = useLang()
  const tx = (en: string, ar: string) => (isAr ? ar : en)

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header variant="solid" />
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px', lineHeight: 1.7 }}>
        <p className="kicker">{tx('Legal', 'قانوني')}</p>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 24 }}>
          {tx('Terms & Conditions', 'الشروط والأحكام')}
        </h1>
        <p style={{ color: 'var(--muted)' }}>
          {tx(
            `By using the ${SITE.name} website, you agree to these terms.`,
            `باستخدام موقع ${SITE.nameAr}، فإنك توافق على هذه الشروط.`
          )}
        </p>
        <h2 style={{ marginTop: 36, fontSize: 22 }}>{tx('Website content', 'محتوى الموقع')}</h2>
        <p>
          {tx(
            'Product information is provided for general guidance. Specifications may change; please contact us to confirm availability and suitability for your project.',
            'تُقدَّم معلومات المنتجات للإرشاد العام. قد تتغير المواصفات؛ يُرجى التواصل معنا لتأكيد التوفر والملاءمة لمشروعك.'
          )}
        </p>
        <h2 style={{ marginTop: 36, fontSize: 22 }}>{tx('AI assistant', 'المساعد الذكي')}</h2>
        <p>
          {tx(
            'The plant diagnostics assistant provides informational suggestions only and is not a substitute for professional agronomic advice.',
            'يقدّم مساعد تشخيص النباتات اقتراحات معلوماتية فقط وليس بديلاً عن الاستشارة الزراعية المهنية.'
          )}
        </p>
        <h2 style={{ marginTop: 36, fontSize: 22 }}>{tx('Contact', 'التواصل')}</h2>
        <p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </article>
      <Footer />
    </main>
  )
}
