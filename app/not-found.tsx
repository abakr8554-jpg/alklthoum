import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main id="top" className="sp is-soft">
      <Header variant="soft" />
      <section className="soft-section-head" style={{ padding: '120px 24px 80px', textAlign: 'center' }}>
        <p className="soft-kicker">404</p>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(36px, 5vw, 56px)' }}>Page not found</h1>
        <p style={{ margin: '0 auto 28px', maxWidth: '42ch', color: 'var(--soft-muted, #6b756e)' }}>
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" className="soft-btn-green">
          <span>Back to home</span>
          <span className="ico" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </section>
      <Footer />
    </main>
  )
}
