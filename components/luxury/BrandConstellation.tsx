'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLang } from '@/lib/lang-context'
import { SITE } from '@/lib/site'

export type ConstellationBrand = {
  slug: string
  logo: string
  href: string
  en: { name: string }
  ar: { name: string }
  /** Legacy static layout coords — ignored when orbit mode is used */
  x?: number
  y?: number
}

type Props = {
  brands: ConstellationBrand[]
  centerLogo?: string
  /** Orbit duration in seconds */
  speed?: number
}

export default function BrandConstellation({
  brands,
  centerLogo = SITE.logo,
  speed = 42,
}: Props) {
  const { isAr } = useLang()
  const router = useRouter()
  const step = brands.length ? 360 / brands.length : 72

  return (
    <div
      className="hub-orbit-scene hub-orbit-3d"
      aria-label={isAr ? 'شركات المجموعة' : 'Group companies'}
      style={{ '--orbit-speed': `${speed}s` } as React.CSSProperties}
    >
      <div className="hub-deco-ring hub-deco-ring-1" aria-hidden />
      <div className="hub-deco-ring hub-deco-ring-2" aria-hidden />

      <div className="hub-orbit-ring">
        {brands.map((brand, i) => {
          const angle = i * step
          return (
            <div
              key={brand.slug}
              className="hub-orbit-item"
              style={{ '--angle': `${angle}deg` } as React.CSSProperties}
            >
              <div
                className="hub-c-static"
                style={{ '--neg-angle': `${-angle}deg` } as React.CSSProperties}
              >
                <div className="hub-c-anim">
                  <Link
                    href={brand.href}
                    className="hub-card-box hub-logo-card"
                    aria-label={isAr ? brand.ar.name : brand.en.name}
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(brand.href)
                    }}
                  >
                    <Image
                      src={brand.logo}
                      alt=""
                      width={50}
                      height={50}
                      className="hub-logo-img"
                      unoptimized
                    />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Link
        href="/"
        className="hub-orbit-logo"
        aria-label={isAr ? SITE.nameAr : SITE.name}
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
          router.push('/')
        }}
      >
        <div className="hub-center-glow" aria-hidden />
        <Image
          src={centerLogo}
          alt={isAr ? 'مجموعة الكلثوم' : 'Al Kalthoum Group'}
          width={750}
          height={914}
          className="hub-center-img"
          priority
          unoptimized
        />
      </Link>
    </div>
  )
}
