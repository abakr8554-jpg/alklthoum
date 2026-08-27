'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'
import { FOOTER_LINKS, SITE } from '@/lib/site'

export default function Footer() {
  const { isAr, dir } = useLang()
  const year = new Date().getFullYear()
  const tx = (en: string, ar: string) => (isAr ? ar : en)

  return (
    <footer className="site-footer" dir={dir} id="site-footer">
      <div className="site-footer-inner">
        <div className="footer-top">
          <div className="footer-logo-col">
            <Link href="/" className="real-logo" aria-label={SITE.nameAr}>
              <Image
                src={SITE.logo}
                alt={SITE.nameAr}
                width={750}
                height={914}
                style={{ height: 44, width: 'auto' }}
                unoptimized
              />
            </Link>
            <p className="footer-tagline">
              {tx(SITE.tagline, SITE.taglineAr)}
              <br />
              {tx(`Since ${SITE.foundedYear}.`, `منذ ${SITE.foundedYear}.`)}
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h4 className="footer-col-title">{tx('Explore', 'استكشف')}</h4>
              {FOOTER_LINKS.explore.map((l) => (
                <Link key={l.href} href={l.href}>
                  {tx(l.en, l.ar)}
                </Link>
              ))}
            </div>
            <div>
              <h4 className="footer-col-title">{tx('Services', 'الخدمات')}</h4>
              {FOOTER_LINKS.services.map((l) => (
                <Link key={l.href} href={l.href}>
                  {tx(l.en, l.ar)}
                </Link>
              ))}
            </div>
            <div>
              <h4 className="footer-col-title">{tx('Legal', 'قانوني')}</h4>
              {FOOTER_LINKS.legal.map((l) => (
                <Link key={l.href} href={l.href}>
                  {tx(l.en, l.ar)}
                </Link>
              ))}
            </div>
            <div>
              <h4 className="footer-col-title">{tx('Contact', 'تواصل')}</h4>
              <div className="footer-contact-block">
                <p>{tx(SITE.address.en, SITE.address.ar)}</p>
                <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {tx(SITE.name, SITE.nameAr)}
          </span>
          <span>{tx('Built for the future of agriculture', 'صُنع لمستقبل الزراعة')}</span>
          <a href="#top">{tx('Back to top ↑', 'العودة للأعلى ↑')}</a>
        </div>
      </div>
    </footer>
  )
}
