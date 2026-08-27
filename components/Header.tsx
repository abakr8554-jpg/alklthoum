'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { NAV_LINKS, SITE } from '@/lib/site'

type Props = {
  /** Kept for compatibility — soft nav is the global look */
  variant?: 'default' | 'solid' | 'soft'
}

export default function Header({ variant: _variant = 'soft' }: Props) {
  const { isAr, setLang, dir } = useLang()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const tx = (en: string, ar: string) => (isAr ? ar : en)

  return (
    <nav
      className={`soft-nav ${scrolled ? 'is-scrolled' : ''}`}
      dir={dir}
      aria-label={tx('Main navigation', 'القائمة الرئيسية')}
    >
      <div className="soft-nav-inner">
        <button
          className={`soft-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={tx('Open menu', 'فتح القائمة')}
          aria-expanded={menuOpen}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <Link href="/" className="soft-brand" onClick={() => setMenuOpen(false)}>
          <Image
            src={SITE.logo}
            alt={SITE.nameAr}
            width={750}
            height={914}
            className="soft-brand-img"
            priority
            unoptimized
          />
          <span className="soft-brand-text">
            <strong>{tx('Al Kalthoum', 'الكلثوم')}</strong>
            <small>{tx(SITE.tagline, SITE.taglineAr)}</small>
          </span>
        </Link>

        <div className={`soft-nav-pill ${menuOpen ? 'open' : ''}`}>
          <ul className="soft-nav-links">
            {NAV_LINKS.slice(0, 6).map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={active ? 'is-active' : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    {tx(link.en, link.ar)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="soft-nav-actions">
          <button
            type="button"
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="soft-lang"
            aria-label={tx('Switch language', 'تبديل اللغة')}
          >
            {isAr ? 'EN' : 'ع'}
          </button>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="soft-icon-btn"
            aria-label={tx('Call us', 'اتصل بنا')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.35 1.9.67 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.54 2.81.67A2 2 0 0122 16.92z" />
            </svg>
          </a>
          <Link href="/contact" className="soft-cta" onClick={() => setMenuOpen(false)}>
            <span>{tx('Get in touch', 'تواصل معنا')}</span>
            <span className="soft-cta-arrow" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
