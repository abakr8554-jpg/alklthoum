'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import { SITE } from '@/lib/site'

export default function PrivacyPage() {
  const { isAr, dir } = useLang()
  const tx = (en: string, ar: string) => (isAr ? ar : en)

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header variant="solid" />
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px', lineHeight: 1.7 }}>
        <p className="kicker">{tx('Legal', 'قانوني')}</p>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 24 }}>
          {tx('Privacy Policy', 'سياسة الخصوصية')}
        </h1>
        <p style={{ color: 'var(--muted)' }}>
          {tx(
            `This policy explains how ${SITE.name} collects and uses information submitted through this website.`,
            `توضح هذه السياسة كيف تجمع ${SITE.nameAr} المعلومات المقدمة عبر هذا الموقع وتستخدمها.`
          )}
        </p>
        <h2 style={{ marginTop: 36, fontSize: 22 }}>{tx('Information we collect', 'المعلومات التي نجمعها')}</h2>
        <p>
          {tx(
            'When you use our contact forms, we collect the details you provide (such as name, email, company, and message). Messages may be stored securely for follow-up.',
            'عند استخدام نماذج الاتصال، نجمع التفاصيل التي تقدمها (مثل الاسم والبريد والشركة والرسالة). قد تُخزَّن الرسائل بشكل آمن للمتابعة.'
          )}
        </p>
        <h2 style={{ marginTop: 36, fontSize: 22 }}>{tx('How we use information', 'كيف نستخدم المعلومات')}</h2>
        <p>
          {tx(
            'We use contact information to respond to enquiries, improve our services, and operate the website. We do not sell personal information.',
            'نستخدم معلومات الاتصال للرد على الاستفسارات وتحسين خدماتنا وتشغيل الموقع. لا نبيع المعلومات الشخصية.'
          )}
        </p>
        <h2 style={{ marginTop: 36, fontSize: 22 }}>{tx('Contact', 'التواصل')}</h2>
        <p>
          {tx('Questions about privacy:', 'لأسئلة حول الخصوصية:')}{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </article>
      <Footer />
    </main>
  )
}
