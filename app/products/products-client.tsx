'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
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
type CropDef = { en: string; ar: string; match: string[] }
const CROP_DEFS: CropDef[] = [
  { en: 'Tomato', ar: 'الطماطم', match: ['Tomato'] },
  { en: 'Pepper', ar: 'الفلفل', match: ['Pepper', 'Sweet Pepper', 'Hot Pepper', 'Processing Pepper'] },
  { en: 'Melon', ar: 'الشمام', match: ['Melon'] },
  { en: 'Cucumber', ar: 'الخيار', match: ['Cucumber'] },
  { en: 'Eggplant', ar: 'الباذنجان', match: ['Eggplant'] },
  { en: 'Watermelon', ar: 'البطيخ', match: ['Watermelon'] },
  { en: 'Onion', ar: 'البصل', match: ['Onion'] },
  { en: 'Cabbage', ar: 'الكرنب', match: ['Cabbage'] },
  { en: 'Cauliflower', ar: 'القرنبيط', match: ['Cauliflower'] },
  { en: 'Bean', ar: 'الفاصوليا', match: ['Bean'] },
]

export default function ProductsClient({ products }: { products: Product[] }) {
  const { isAr, dir } = useLang()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('cat') as ProductCategory | null
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat)
    }
  }, [searchParams])

  // Choosing a category resets the crop filter (crops only apply to seeds)
  const chooseCategory = (cat: ProductCategory | 'all') => {
    setActiveCategory(cat)
    setSelectedCrop(null)
    if (cat !== 'seeds') setShowFilters(false)
  }

  // The crop filter shows automatically for seeds, or when toggled on elsewhere
  const cropFilterOpen = activeCategory === 'seeds' || showFilters

  // Only show crops we actually stock seeds for
  const availableCrops = useMemo(() => {
    const present = new Set<string>()
    for (const p of products) {
      if (p.category !== 'seeds') continue
      for (const c of p.targetCrops) present.add(c)
    }
    return CROP_DEFS.filter((d) => d.match.some((m) => present.has(m)))
  }, [products])

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
      return matchCat && matchSearch && matchCrop
    })
  }, [products, activeCategory, searchQuery, selectedCrop, isAr])

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

        {/* Crop filter toggle — hidden for seeds, where the crop filter shows automatically */}
        {activeCategory !== 'seeds' && (
          <button
            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={14} />
            {isAr ? 'تصفية' : 'Filter'}
          </button>
        )}
      </section>

      {/* Crop filter dropdown */}
      {cropFilterOpen && (
        <div className="crop-filter-panel">
          <p>{isAr ? 'تصفية حسب المحصول:' : 'Filter by crop:'}</p>
          <div className="crop-pills">
            <button
              className={!selectedCrop ? 'active' : ''}
              onClick={() => setSelectedCrop(null)}
            >
              {isAr ? 'الكل' : 'All crops'}
            </button>
            {availableCrops.map((crop) => (
              <button
                key={crop.en}
                className={selectedCrop === crop.en ? 'active' : ''}
                onClick={() => setSelectedCrop(selectedCrop === crop.en ? null : crop.en)}
              >
                {isAr ? crop.ar : crop.en}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products grid */}
      <section className="products-grid-section">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>{isAr ? 'لا توجد منتجات تطابق بحثك.' : 'No products match your search.'}</p>
            <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSelectedCrop(null) }}>
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

      <Footer />
    </main>
  )
}
