import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { LangProvider } from '@/lib/lang-context'
import SoftBody from '@/components/SoftBody'
import { SITE } from '@/lib/site'
import './globals.css'

const siteUrl = SITE.url

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.nameAr} | ${SITE.taglineAr}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Agricultural plastics, irrigation systems, seeds, fertilizers and AI plant diagnostics from Al Kalthoum Group.',
  keywords: [
    'Al Kalthoum',
    'agriculture',
    'irrigation',
    'greenhouse film',
    'seeds',
    'fertilizers',
    'Sona Plast',
    'الكلثوم',
    'الزراعة',
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    title: `${SITE.name} | ${SITE.tagline}`,
    description:
      'Agricultural plastics, irrigation systems, seeds, fertilizers and AI plant diagnostics from Al Kalthoum Group.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_EG'],
    url: siteUrl,
    siteName: SITE.name,
    images: [{ url: SITE.logo, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#173b2b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    alternateName: SITE.nameAr,
    url: siteUrl,
    logo: `${siteUrl}${SITE.logo}`,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      streetAddress: SITE.address.en,
    },
    sameAs: [SITE.social.facebook, SITE.social.instagram].filter(Boolean),
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load fonts via CSS links — avoids Turbopack next/font google resolver bug */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LangProvider>
          <SoftBody />
          {children}
        </LangProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
