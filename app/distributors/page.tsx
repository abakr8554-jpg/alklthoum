'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  MapPin, Phone, MessageSquare, Navigation, Search, X,
  ExternalLink, Loader2, AlertCircle
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import { distributors, getNearestDistributors, type Distributor } from '@/lib/data'

const GOVERNORATE_OPTIONS = [
  'Giza', 'Cairo', 'Alexandria', 'Tanta', 'Assiut', 'Ismailia',
  'Dakahlia', 'Sharqia', 'Qalyubia', 'Beheira',
]
const GOVERNORATE_OPTIONS_AR = [
  'الجيزة', 'القاهرة', 'الإسكندرية', 'طنطا', 'أسيوط', 'الإسماعيلية',
  'الدقهلية', 'الشرقية', 'القليوبية', 'البحيرة',
]

type GeoState = 'idle' | 'loading' | 'success' | 'denied'

export default function DistributorsPage() {
  const { isAr, dir } = useLang()
  const [geoState, setGeoState] = useState<GeoState>('idle')
  const [userLat, setUserLat] = useState<number | null>(null)
  const [userLng, setUserLng] = useState<number | null>(null)
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [highlighted, setHighlighted] = useState<string | null>(null)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoState('denied')
      return
    }
    setGeoState('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude)
        setUserLng(pos.coords.longitude)
        setGeoState('success')
      },
      () => setGeoState('denied'),
      { timeout: 10000 },
    )
  }, [])

  const visibleDistributors: Distributor[] = (() => {
    let list = [...distributors]

    if (userLat !== null && userLng !== null) {
      list = getNearestDistributors(userLat, userLng, distributors.length)
    }

    if (selectedGovernorate) {
      list = list.filter(
        (d) =>
          d.wilaya.toLowerCase().includes(selectedGovernorate.toLowerCase()) ||
          d.wilayaAr.includes(selectedGovernorate) ||
          d.region.toLowerCase().includes(selectedGovernorate.toLowerCase()) ||
          d.regionAr.includes(selectedGovernorate),
      )
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.nameAr.includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.regionAr.includes(q),
      )
    }

    return list
  })()

  const nearest = userLat && userLng ? getNearestDistributors(userLat, userLng, 3) : []

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ background: 'var(--ink)' }}>
        <div className="page-hero-content">
          <p className="kicker light">
            {isAr ? '06 / الموزعون المعتمدون' : '06 / Authorised Distributors'}
          </p>
          <h1 className="page-hero-title">
            {isAr ? 'أقرب موزع' : 'Find Your'}{' '}
            <em>{isAr ? 'إليك' : 'Distributor'}</em>
          </h1>
          <p className="page-hero-sub">
            {isAr
              ? 'اعثر على أقرب موزع معتمد في محافظتك — اتصل مباشرة أو احصل على الاتجاهات.'
              : 'Find the nearest authorised distributor in your governorate — call directly or get directions.'}
          </p>
        </div>
        <div className="page-hero-overlay" />
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1800&q=80)',
          }}
        />
      </section>

      {/* Location access */}
      <section className="dist-location-bar">
        <div className="dist-location-inner">
          {geoState === 'idle' && (
            <>
              <div className="dist-location-text">
                <Navigation size={18} />
                <div>
                  <strong>{isAr ? 'استخدم موقعك الحالي' : 'Use your current location'}</strong>
                  <p>{isAr ? 'لعرض أقرب الموزعين إليك' : 'to show the nearest distributors to you'}</p>
                </div>
              </div>
              <button className="button primary-button" onClick={requestLocation}>
                {isAr ? 'السماح بالموقع' : 'Allow Location'}
              </button>
            </>
          )}
          {geoState === 'loading' && (
            <div className="dist-location-text">
              <Loader2 size={18} className="animate-spin" />
              <span>{isAr ? 'جاري تحديد موقعك...' : 'Detecting your location...'}</span>
            </div>
          )}
          {geoState === 'success' && (
            <div className="dist-location-text">
              <MapPin size={18} style={{ color: 'var(--brand-green)' }} />
              <span style={{ color: 'var(--brand-green)' }}>
                {isAr ? 'تم تحديد موقعك — نعرض أقرب الموزعين' : 'Location detected — showing nearest distributors'}
              </span>
            </div>
          )}
          {geoState === 'denied' && (
            <div className="dist-location-text">
              <AlertCircle size={18} style={{ color: 'var(--rust)' }} />
              <span style={{ color: 'var(--rust)' }}>
                {isAr ? 'لم يتم السماح بالموقع. اختر محافظتك يدوياً.' : 'Location denied. Select your governorate manually.'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Nearest 3 banner (when location available) */}
      {geoState === 'success' && nearest.length > 0 && (
        <div className="nearest-banner">
          <h3>{isAr ? 'أقرب 3 موزعين إليك' : '3 Nearest to You'}</h3>
          <div className="nearest-chips">
            {nearest.map((d) => (
              <button
                key={d.id}
                className={`nearest-chip ${highlighted === d.id ? 'active' : ''}`}
                onClick={() => {
                  setHighlighted(d.id)
                  document.getElementById(`dist-${d.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
              >
                <MapPin size={12} />
                {isAr ? d.nameAr : d.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="dist-filters">
        {/* Search */}
        <div className="search-box">
          <Search size={15} />
          <input
            type="text"
            placeholder={isAr ? 'ابحث عن موزع...' : 'Search distributors...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}><X size={13} /></button>
          )}
        </div>

        {/* Governorate select */}
        <select
          className="wilaya-select"
          value={selectedGovernorate}
          onChange={(e) => setSelectedGovernorate(e.target.value)}
        >
          <option value="">{isAr ? 'كل المحافظات' : 'All Governorates'}</option>
          {GOVERNORATE_OPTIONS.map((g, i) => (
            <option key={g} value={g}>{isAr ? GOVERNORATE_OPTIONS_AR[i] : g}</option>
          ))}
        </select>

        {(selectedGovernorate || searchQuery) && (
          <button
            className="filter-clear"
            onClick={() => { setSelectedGovernorate(''); setSearchQuery('') }}
          >
            <X size={13} /> {isAr ? 'مسح' : 'Clear'}
          </button>
        )}
      </div>

      {/* Distributor cards */}
      <section className="dist-section">
        {visibleDistributors.length === 0 ? (
          <div className="empty-state">
            <p>{isAr ? 'لا يوجد موزعون يطابقون بحثك.' : 'No distributors match your search.'}</p>
            <button onClick={() => { setSelectedGovernorate(''); setSearchQuery('') }}>
              {isAr ? 'إعادة التعيين' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="dist-grid">
            {visibleDistributors.map((dist) => (
              <div
                key={dist.id}
                id={`dist-${dist.id}`}
                className={`dist-card ${highlighted === dist.id ? 'highlighted' : ''}`}
              >
                <div className="dist-card-head">
                  <div className="dist-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3>{isAr ? dist.nameAr : dist.name}</h3>
                    <p className="dist-region">
                      {isAr ? dist.wilayaAr : dist.wilaya} — {isAr ? dist.regionAr : dist.region}
                    </p>
                  </div>
                </div>

                <div className="dist-address">
                  <MapPin size={13} />
                  <span>{isAr ? dist.addressAr : dist.address}</span>
                </div>

                <div className="dist-actions">
                  <a href={`tel:${dist.phone}`} className="dist-btn dist-call">
                    <Phone size={14} />
                    {dist.phone}
                  </a>
                  <a
                    href={`https://wa.me/${dist.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dist-btn dist-whatsapp"
                  >
                    <MessageSquare size={14} />
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${dist.lat},${dist.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dist-btn dist-maps"
                  >
                    <Navigation size={14} />
                    {isAr ? 'الاتجاهات' : 'Directions'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Map section */}
      <section className="dist-map-section">
        <div className="dist-map-header">
          <h2>{isAr ? 'شبكة التوزيع' : 'Distribution Network'}</h2>
          <p>{isAr ? 'موزعون معتمدون في جميع أنحاء مصر' : 'Authorised distributors across Egypt'}</p>
        </div>
        <div className="dist-map-visual">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80"
            alt="Distribution network"
            style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 8, opacity: 0.6 }}
          />
          <div className="dist-map-overlay">
            <div className="dist-stats">
              <div>
                <strong>{distributors.length}</strong>
                <span>{isAr ? 'موزع معتمد' : 'Authorised Distributors'}</span>
              </div>
              <div>
                <strong>6</strong>
                <span>{isAr ? 'محافظة' : 'Governorates'}</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>{isAr ? 'دعم WhatsApp' : 'WhatsApp Support'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
