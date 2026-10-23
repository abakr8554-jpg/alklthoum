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

export default function ProductsClient({ products }: { products: Product[] }) {
  const { isAr, dir } = useLang()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  // Fertilizer sub-type filter: 'liquid' (W/V%) or 'powder' (W/W%)
  const [selectedFertType, setSelectedFertType] = useState<'liquid' | 'powder' | null>(null)

  // Drive every filter level from the URL so each drill-down (category →
  // crop/type cards → products) is its own history entry. Back then walks
  // the levels one by one instead of jumping to the homepage.
  useEffect(() => {
    const cat = searchParams.get('cat') as ProductCategory | null
    const crop = searchParams.get('crop')
    const type = searchParams.get('type')
    setActiveCategory(cat && categories.includes(cat) ? cat : 'all')
    setSelectedCrop(crop || null)
    setSelectedFertType(type === 'liquid' || type === 'powder' ? type : null)
  }, [searchParams])

  const pushFilters = (opts: { cat?: ProductCategory | 'all'; crop?: string | null; type?: string | null }) => {
    const sp = new URLSearchParams()
    if (opts.cat && opts.cat !== 'all') sp.set('cat', opts.cat)
    if (opts.crop) sp.set('crop', opts.crop)
    if (opts.type) sp.set('type', opts.type)
    const qs = sp.toString()
    router.push(qs ? `/products?${qs}` : '/products', { scroll: false })
  }

  const chooseCategory = (cat: ProductCategory | 'all') => pushFilters({ cat })
  const chooseCrop = (cropEn: string | null) => pushFilters({ cat: 'seeds', crop: cropEn })
  const chooseFertType = (type: 'liquid' | 'powder' | null) =>
    pushFilters({ cat: 'fertilizers-pesticides', type })

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

  // Fertilizer type cards (liquid / powder), each with a representative photo
  const fertTypeCards = useMemo(() => {
    const defs = [
      { key: 'liquid' as const, en: 'Liquid', ar: 'سائل', unit: 'W/V%' },
      { key: 'powder' as const, en: 'Powder', ar: 'بودر', unit: 'W/W%' },
    ]
    return defs.map((d) => {
      const match = products.find(
        (p) => p.category === 'fertilizers-pesticides' && p.unit === d.unit && p.images[0],
      )
      return { ...d, img: match?.images[0] || '/placeholder-product.jpg' }
    })
  }, [products])
  const showFertCards = activeCategory === 'fertilizers-pesticides' && !selectedFertType && !searchQuery

  const filtered = useMemo(() => {
    const selectedDef = selectedCrop ? CROP_DEFS.find((d) => d.en === selectedCrop) : null
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
      const matchFertType =
        !selectedFertType ||
        (selectedFertType === 'liquid' ? p.unit === 'W/V%' : p.unit === 'W/W%')
      return matchCat && matchSearch && matchCrop && matchFertType
    })
  }, [products, activeCategory, searchQuery, selectedCrop, selectedFertType, isAr])

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

      {/* Fertilizer type cards — pick a type to see its products */}
      {showFertCards && (
        <section className="products-cards-section">
          <p className="crop-cards-title">{isAr ? 'اختر النوع:' : 'Choose a type:'}</p>
          <div className="crop-cards-grid fert-cards-grid">
            {fertTypeCards.map((t) => (
              <button
                key={t.key}
                type="button"
                className="crop-card"
                onClick={() => chooseFertType(t.key)}
              >
                <div className="crop-card-media">
                  <img src={t.img} alt={isAr ? t.ar : t.en} loading="lazy" />
                </div>
                <span className="crop-card-name">{isAr ? t.ar : t.en}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Active fertilizer type bar — back to the type cards */}
      {fertFilterOpen && selectedFertType && (
        <div className="crop-active-bar">
          <button className="crop-back-btn" onClick={() => chooseFertType(null)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden
              style={{ transform: isAr ? 'scaleX(1)' : 'scaleX(-1)' }}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            {isAr ? 'كل الأنواع' : 'All types'}
          </button>
          <span className="crop-active-name">
            {selectedFertType === 'liquid' ? (isAr ? 'سائل' : 'Liquid') : (isAr ? 'بودر' : 'Powder')}
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
