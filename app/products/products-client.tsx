'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import { categoryLabels, type ProductCategory, type Product } from '@/lib/data'

const categories: ProductCategory[] = [
  'seeds',
  'sona-plant-plastic',
  'hoses',
  'fertilizers-pesticides',
  'soil',
]

// Crop filter definitions. `match` lists the targetCrops values that belong to
// each pill (e.g. all pepper types roll up into one "Pepper" filter). Only crops
// actually present in the seed catalogue are shown — see `availableCrops` below.
type CropDef = { en: string; ar: string; match: string[]; cardImg?: string }
const CROP_DEFS: CropDef[] = [
  { en: 'Tomato', ar: 'الطماطم', match: ['Tomato'] },
  { en: 'Pepper', ar: 'الفلفل', match: ['Pepper', 'Sweet Pepper', 'Hot Pepper', 'Processing Pepper'] },
  { en: 'Melon', ar: 'الشمام', match: ['Melon'] },
  { en: 'Cucumber', ar: 'الخيار', match: ['Cucumber'], cardImg: '/images/crops/cucumber.webp' },
  { en: 'Eggplant', ar: 'الباذنجان', match: ['Eggplant'] },
  { en: 'Watermelon', ar: 'البطيخ', match: ['Watermelon'] },
  { en: 'Onion', ar: 'البصل', match: ['Onion'] },
  { en: 'Cabbage', ar: 'الكرنب', match: ['Cabbage'] },
  { en: 'Cauliflower', ar: 'القرنبيط', match: ['Cauliflower'] },
  { en: 'Bean', ar: 'الفاصوليا', match: ['Bean'] },
]

// Category landing cards (shown before any category is picked)
const CATEGORY_CARDS: {
  cat: ProductCategory
  img: string
  en: { name: string; desc: string }
  ar: { name: string; desc: string }
}[] = [
  {
    cat: 'seeds',
    img: 'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?auto=format&fit=crop&w=1400&q=80',
    en: { name: 'Seeds', desc: 'Hybrid varieties for tomatoes, peppers, watermelon and more.' },
    ar: { name: 'البذور', desc: 'أصناف هجينة للطماطم والفلفل والبطيخ والمزيد.' },
  },
  {
    cat: 'sona-plant-plastic',
    img: '/images/categories/plastic.png',
    en: { name: 'Sona Plant Plastic', desc: 'Greenhouse covers, mulch films, and high-performance agricultural plastics.' },
    ar: { name: 'سونا بلانت بلاستيك', desc: 'أغطية بيوت محمية وأفلام تغطية وبلاستيك زراعي عالي الأداء.' },
  },
  {
    cat: 'hoses',
    img: '/images/categories/hoses.png',
    en: { name: 'Hoses & Irrigation', desc: 'Precision drip systems and water management solutions.' },
    ar: { name: 'الخراطيم والري', desc: 'أنظمة تنقيط دقيقة وحلول إدارة المياه.' },
  },
  {
    cat: 'fertilizers-pesticides',
    img: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?auto=format&fit=crop&w=1400&q=80',
    en: { name: 'Fertilizers', desc: 'Crop nutrition programs for productive harvests.' },
    ar: { name: 'الأسمدة', desc: 'برامج تغذية المحاصيل لحصاد منتج.' },
  },
  {
    cat: 'soil',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=80',
    en: { name: 'Soil & Substrates', desc: 'Optimized growing media and soil conditioners supporting strong root development.' },
    ar: { name: 'التربة وبدائلها', desc: 'بيئات نمو ومحسنات تربة متطورة لدعم نمو جذري قوي.' },
  },
]

// Diamond fertilizer series — each becomes a card; a product belongs to the
// series whose slug list contains it.
const FERT_SERIES: { key: string; en: string; ar: string; slugs: string[] }[] = [
  {
    key: 'soluble', en: 'Soluble NPK', ar: 'الأسمدة الذائبة NPK',
    slugs: [
      'diamond-plant-15-30-15', 'diamond-plant-6-6-43', 'diamond-standard-6-6-43', 'diamond-plant-6-0-40-plus-2mgo',
      'demo-start-30-10-10', 'demo-ripettig-9-0-40', 'diamond-plant-21-7-21-plus-2mgo', 'diamond-plant-15-5-35-plus-2mgo',
      'diamond-plant-20-20-20', 'diamond-plant-19-19-19', 'diamond-standar-19-19-19', 'diamond-plant-15-40-10',
      'diamond-plant-28-14-14', 'diamond-plant-13-40-13', 'diamond-standard-20-20-20', 'torar-19-19-19',
      'torar-21-7-21-plus-2mgo', 'torar-16-8-24-plus-1mgo', 'torar-5-5-45-plus-1mgo', 'depra-19-19-19',
      'depra-8-0-40-plus-1mgo', 'depra-8-5-40', 'image-fert-19-19-19', 'image-fert-6-6-43',
      'image-fert-13-40-13', 'taziry-10-50-10',
    ],
  },
  {
    key: 'chelated', en: 'Chelated Micronutrients', ar: 'العناصر الصغرى المخلبية',
    slugs: [
      'taziry-h6', 'demo-mix', 'demo-microsoil-mix', 'demo-microsoil-z',
      'diamond-ferosoil', 'demo-folier-f', 'demo-m', 'torar-ferosoil',
    ],
  },
  {
    key: 'humic', en: 'Humic Substances', ar: 'المواد الهيوميكية',
    slugs: [
      'diamond-fulvic', 'diamond-humic',
    ],
  },
  {
    key: 'suspension', en: 'Suspension', ar: 'الأسمدة المعلّقة',
    slugs: [
      'demo-plant-20-20-20', 'demo-plant-10-6-60', 'demo-plant-27-27-27', 'demo-plant-18-44-00',
      'demo-plant-40-10-10', 'demo-plant-5-50-30', 'demo-plant-25-25-20', 'demo-plant-12-61-5',
      'demo-plant-12-50-12', 'diamond-salt-destroy', 'azaro-12-12-44', 'azaro-20-20-20',
      'azaro-30-10-30', 'azaro-6-50-30', 'azaro-12-50-12', 'depra-20-20-20',
      'depra-high-k', 'depra-20-50-10',
    ],
  },
  {
    key: 'liquid', en: 'Liquid', ar: 'الأسمدة السائلة',
    slugs: [
      'diamond-phosphoric-85', 'demo-basic', 'demo-economy', 'diamond-cal',
      'diamond-n-plus', 'diamond-kelpoxin', 'diamond-brixer', 'diamond-ktc-36',
      'diamond-power', 'diamond-pure-plant', 'diamond-premium-n-cal-m', 'diamond-root',
      'diamond-magic-15-5-8', 'demo-alga', 'nextra-vegetation', 'nextra-ripening',
      'nextra-flowering', 'nextra-planting', 'n-extra', 'n-extra-premium',
      'diamond-cal-b', 'diamond-l-bo', 'diamond-pk-00-45-55', 'diamond-np',
    ],
  },
]

export default function ProductsClient({ products }: { products: Product[] }) {
  const { isAr, dir } = useLang()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  // Fertilizer series filter (Soluble NPK / Chelated / Humic / Suspension / Liquid)
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)

  // Drive every filter level from the URL so each drill-down (category →
  // crop/series cards → products) is its own history entry. Back then walks
  // the levels one by one instead of jumping to the homepage.
  useEffect(() => {
    const cat = searchParams.get('cat') as ProductCategory | null
    const crop = searchParams.get('crop')
    const series = searchParams.get('series')
    setActiveCategory(cat && categories.includes(cat) ? cat : 'all')
    setSelectedCrop(crop || null)
    setSelectedSeries(FERT_SERIES.some((s) => s.key === series) ? series : null)
  }, [searchParams])

  const pushFilters = (opts: { cat?: ProductCategory | 'all'; crop?: string | null; series?: string | null }) => {
    const sp = new URLSearchParams()
    if (opts.cat && opts.cat !== 'all') sp.set('cat', opts.cat)
    if (opts.crop) sp.set('crop', opts.crop)
    if (opts.series) sp.set('series', opts.series)
    const qs = sp.toString()
    router.push(qs ? `/products?${qs}` : '/products', { scroll: false })
  }

  const chooseCategory = (cat: ProductCategory | 'all') => pushFilters({ cat })
  const chooseCrop = (cropEn: string | null) => pushFilters({ cat: 'seeds', crop: cropEn })
  const chooseSeries = (key: string | null) =>
    pushFilters({ cat: 'fertilizers-pesticides', series: key })

  // The crop filter shows only for seeds; the type filter only for fertilizers
  const cropFilterOpen = activeCategory === 'seeds'
  const fertFilterOpen = activeCategory === 'fertilizers-pesticides'

  // Landing view: show the category cards until a category is picked (or a search is typed)
  const showCards = activeCategory === 'all' && !searchQuery

  // Only show crops we actually stock seeds for, each with a representative photo
  const availableCrops = useMemo(() => {
    const present = new Set<string>()
    const imgByMatch = new Map<string, string>()
    for (const p of products) {
      if (p.category !== 'seeds') continue
      for (const c of p.targetCrops) {
        present.add(c)
        if (!imgByMatch.has(c) && p.images[0]) imgByMatch.set(c, p.images[0])
      }
    }
    return CROP_DEFS.filter((d) => d.match.some((m) => present.has(m))).map((d) => ({
      ...d,
      img: d.cardImg || d.match.map((m) => imgByMatch.get(m)).find(Boolean) || '/placeholder-product.jpg',
    }))
  }, [products])

  // Inside Seeds, show crop cards until a crop is chosen
  const showCropCards = activeCategory === 'seeds' && !selectedCrop && !searchQuery

  // Fertilizer series cards, each with a representative photo
  const fertSeriesCards = useMemo(() => {
    return FERT_SERIES.map((s) => {
      const match = products.find((p) => s.slugs.includes(p.slug) && p.images[0])
      return { ...s, img: match?.images[0] || '/placeholder-product.jpg' }
    })
  }, [products])
  const showFertCards = activeCategory === 'fertilizers-pesticides' && !selectedSeries && !searchQuery

  const filtered = useMemo(() => {
    const selectedDef = selectedCrop ? CROP_DEFS.find((d) => d.en === selectedCrop) : null
    const selSeries = selectedSeries ? FERT_SERIES.find((s) => s.key === selectedSeries) : null
    return products.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory
      const name = isAr ? p.nameAr : p.name
      const desc = isAr ? p.shortDescriptionAr : p.shortDescription
      const matchSearch =
        !searchQuery ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCrop =
        !selectedDef || selectedDef.match.some((m) => p.targetCrops.includes(m))
      const matchSeries = !selSeries || selSeries.slugs.includes(p.slug)
      return matchCat && matchSearch && matchCrop && matchSeries
    })
  }, [products, activeCategory, searchQuery, selectedCrop, selectedSeries, isAr])

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ background: 'var(--ink)' }}>
        <div
          className="page-hero-bg"
          style={{
            backgroundImage: "url('/covers/products.svg')",
          }}
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="kicker light">{isAr ? 'مستلزمات الحقل' : 'Field Inputs'}</p>
          <h1 className="page-hero-title">
            {isAr ? 'منتجاتنا' : 'Our'}{' '}
            <em>{isAr ? '' : 'Products'}</em>
          </h1>
          <p className="page-hero-sub">
            {isAr
              ? 'تشكيلة متكاملة من البذور والمواد الزراعية والأسمدة والمبيدات.'
              : 'A complete range of seeds, agricultural materials, fertilizers and pesticides.'}
          </p>
        </div>
      </section>

      {/* Filters bar */}
      <section className="products-filter-bar">
        {/* Search */}
        <div className="search-box">
          <Search size={15} />
          <input
            type="text"
            placeholder={isAr ? 'ابحث عن منتج...' : 'Search products...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} aria-label="Clear">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="cat-pills">
          <button
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => chooseCategory('all')}
          >
            {isAr ? 'الكل' : 'All'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? 'active' : ''}
              onClick={() => chooseCategory(cat)}
            >
              {isAr ? categoryLabels[cat].ar : categoryLabels[cat].en}
            </button>
          ))}
        </div>

      </section>

      {/* Crop cards (Seeds) — pick a crop to see its products */}
      {showCropCards && (
        <section className="products-cards-section">
          <p className="crop-cards-title">{isAr ? 'اختر المحصول:' : 'Choose a crop:'}</p>
          <div className="crop-cards-grid">
            {availableCrops.map((crop) => (
              <button
                key={crop.en}
                type="button"
                className="crop-card"
                onClick={() => chooseCrop(crop.en)}
              >
                <div className="crop-card-media">
                  <img src={crop.img} alt={isAr ? crop.ar : crop.en} loading="lazy" />
                </div>
                <span className="crop-card-name">{isAr ? crop.ar : crop.en}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Active crop bar — back to the crop cards */}
      {cropFilterOpen && selectedCrop && (
        <div className="crop-active-bar">
          <button className="crop-back-btn" onClick={() => chooseCrop(null)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden
              style={{ transform: isAr ? 'scaleX(1)' : 'scaleX(-1)' }}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            {isAr ? 'كل المحاصيل' : 'All crops'}
          </button>
          <span className="crop-active-name">
            {isAr
              ? availableCrops.find((c) => c.en === selectedCrop)?.ar
              : selectedCrop}
          </span>
        </div>
      )}

      {/* Fertilizer series cards — pick a series to see its products */}
      {showFertCards && (
        <section className="products-cards-section">
          <p className="crop-cards-title">{isAr ? 'اختر النوع:' : 'Choose a type:'}</p>
          <div className="crop-cards-grid">
            {fertSeriesCards.map((s) => (
              <button
                key={s.key}
                type="button"
                className="crop-card"
                onClick={() => chooseSeries(s.key)}
              >
                <div className="crop-card-media">
                  <img src={s.img} alt={isAr ? s.ar : s.en} loading="lazy" />
                </div>
                <span className="crop-card-name">{isAr ? s.ar : s.en}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Active fertilizer series bar — back to the series cards */}
      {fertFilterOpen && selectedSeries && (
        <div className="crop-active-bar">
          <button className="crop-back-btn" onClick={() => chooseSeries(null)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden
              style={{ transform: isAr ? 'scaleX(1)' : 'scaleX(-1)' }}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            {isAr ? 'كل الأنواع' : 'All types'}
          </button>
          <span className="crop-active-name">
            {(() => { const s = FERT_SERIES.find((x) => x.key === selectedSeries); return isAr ? s?.ar : s?.en })()}
          </span>
        </div>
      )}

      {/* Category landing cards */}
      {showCards && (
        <section className="products-cards-section">
          <div className="divisions-grid">
            {CATEGORY_CARDS.map((p, i) => {
              const wide = i === CATEGORY_CARDS.length - 1 && CATEGORY_CARDS.length % 2 === 1
              return (
                <button
                  key={p.cat}
                  type="button"
                  onClick={() => chooseCategory(p.cat)}
                  className={`division-card division-card-btn ${wide ? 'is-wide' : ''}`}
                >
                  <div className="division-media">
                    <div className="division-media-frame">
                      <img src={p.img} alt={isAr ? p.ar.name : p.en.name} loading="lazy" />
                    </div>
                  </div>
                  <div className="division-copy">
                    <div className="division-meta">
                      <span className="division-index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="division-rule" aria-hidden />
                    </div>
                    <h3>{isAr ? p.ar.name : p.en.name}</h3>
                    <p>{isAr ? p.ar.desc : p.en.desc}</p>
                    <span className="division-link">
                      {isAr ? 'استكشف القسم' : 'Explore division'}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* Products grid */}
      {!showCards && !showCropCards && !showFertCards && (
      <section className="products-grid-section">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>{isAr ? 'لا توجد منتجات تطابق بحثك.' : 'No products match your search.'}</p>
            <button onClick={() => { chooseCategory('all'); setSearchQuery('') }}>
              {isAr ? 'إعادة التعيين' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="product-card"
              >
                <div className="product-card-image">
                  <img src={product.images[0] ?? '/placeholder-product.jpg'} alt={isAr ? product.nameAr : product.name} loading="lazy" />
                  <span className="product-cat-badge">
                    {isAr
                      ? categoryLabels[product.category].ar
                      : categoryLabels[product.category].en}
                  </span>
                  {product.aiRecommended && (
                    <span className="ai-badge">
                      ✦ {isAr ? 'موصى به بالذكاء الاصطناعي' : 'AI Recommended'}
                    </span>
                  )}
                </div>
                <div className="product-card-body">
                  <h3>{isAr ? product.nameAr : product.name}</h3>
                  <p>{isAr ? product.shortDescriptionAr : product.shortDescription}</p>
                  {product.targetCrops.length > 0 && (
                    <div className="product-crops">
                      {product.targetCrops.slice(0, 3).map((crop, i) => (
                        <span key={crop}>{isAr ? product.targetCropsAr[i] : crop}</span>
                      ))}
                    </div>
                  )}
                  <span className="product-cta">
                    {isAr ? 'عرض التفاصيل' : 'View Details'} <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="products-count">
          {filtered.length} {isAr ? 'منتج' : 'products'}
        </div>
      </section>
      )}

      <Footer />
    </main>
  )
}
