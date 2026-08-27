'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { useLang } from '@/lib/lang-context'
import { SITE } from '@/lib/site'

export default function ContactPage() {
  const { isAr, dir } = useLang()
  const tx = (en: string, ar: string) => (isAr ? ar : en)

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top" className="contact-page">
      <Header variant="solid" />

      <section className="contact-hero">
        <p className="kicker lime">{tx('Start a conversation', 'ابدأ محادثة')}</p>
        <h1>
          {tx('Let’s grow', 'لننمو')}
          <br />
          <em>{tx('something good.', 'معاً نحو الأفضل.')}</em>
        </h1>
      </section>

      <section className="contact-body">
        <div className="contact-form">
          <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 28, letterSpacing: '-0.02em' }}>
            {tx('Send us a message', 'أرسل لنا رسالة')}
          </h2>
          <ContactForm />
        </div>

        <div className="contact-sidebar">
          <div className="contact-info-block">
            <div className="ci-label">
              <Mail size={12} style={{ display: 'inline', marginInlineEnd: 6 }} />
              {tx('Email', 'البريد')}
            </div>
            <div className="ci-value">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </div>

          <div className="contact-info-block">
            <div className="ci-label">
              <Phone size={12} style={{ display: 'inline', marginInlineEnd: 6 }} />
              {tx('Phone', 'الهاتف')}
            </div>
            <div className="ci-value">
              <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
            </div>
          </div>

          <div className="contact-info-block">
            <div className="ci-label">
              <MapPin size={12} style={{ display: 'inline', marginInlineEnd: 6 }} />
              {tx('Address', 'العنوان')}
            </div>
            <div className="ci-value">{tx(SITE.address.en, SITE.address.ar)}</div>
          </div>

          <div className="contact-info-block">
            <div className="ci-label">WhatsApp</div>
            <div className="ci-value">
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
                {tx('Chat with us', 'راسلنا على واتساب')}
              </a>
            </div>
          </div>

          <div style={{ marginTop: 32, padding: 24, background: 'var(--background)', borderRadius: 4 }}>
            <p className="kicker" style={{ margin: '0 0 10px' }}>
              {tx('Response time', 'وقت الرد')}
            </p>
            <p style={{ margin: 0, color: '#516258', fontSize: 14, lineHeight: 1.6 }}>
              {tx(
                'We typically respond within 1–2 business days. For urgent matters, call or WhatsApp us directly.',
                'نرد عادة خلال يوم إلى يومي عمل. للأمور العاجلة، اتصل بنا أو راسلنا عبر واتساب.'
              )}
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .contact-hero { padding-top: calc(88px + clamp(48px, 7vw, 88px)); padding-inline: clamp(24px, 5vw, 80px); }
        .contact-form-el .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-form-el .form-group { margin-bottom: 16px; }
        .contact-form-el label { display: block; font-size: 12px; margin-bottom: 6px; color: var(--muted); }
        .contact-form-el input,
        .contact-form-el textarea,
        .contact-form-el select {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--border);
          background: #fff;
          border-radius: 4px;
          font: inherit;
        }
        .contact-form-el .sp-btn { margin-top: 8px; }
        @media (max-width: 640px) {
          .contact-form-el .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
