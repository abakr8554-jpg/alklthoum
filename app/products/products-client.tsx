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

const cropOptions = [
  'Tomato', 'Pepper', 'Watermelon', 'Potato', 'Cucumber', 'Strawberry',
  'Cotton', 'Citrus', 'Grapes', 'Onion',
]
const cropOptionsAr = [
  'الطماطم', 'الفلفل', 'البطيخ', 'البطاطا', 'الخيار', 'الفراولة',
  'القطن', 'الحمضيات', 'العنب', 'البصل',
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

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory
      const name = isAr ? p.nameAr : p.name
      const desc = isAr ? p.shortDescriptionAr : p.shortDescription
      const matchSearch =
        !searchQuery ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCrop =
        !selectedCrop ||
        p.targetCrops.includes(selectedCrop) ||
        p.targetCropsAr.includes(selectedCrop)
      return matchCat && matchSearch && matchCrop
    })
  }, [activeCategory, searchQuery, selectedCrop, isAr])

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
            onClick={() => setActiveCategory('all')}
          >
            {isAr ? 'الكل' : 'All'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? 'active' : ''}
              onClick={() => setActiveCategory(cat)}
            >
              {isAr ? categoryLabels[cat].ar : categoryLabels[cat].en}
            </button>
          ))}
        </div>

        {/* Crop filter toggle */}
        <button
          className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={14} />
          {isAr ? 'تصفية' : 'Filter'}
        </button>
      </section>

      {/* Crop filter dropdown */}
      {showFilters && (
        <div className="crop-filter-panel">
          <p>{isAr ? 'تصفية حسب المحصول:' : 'Filter by crop:'}</p>
          <div className="crop-pills">
            <button
              className={!selectedCrop ? 'active' : ''}
              onClick={() => setSelectedCrop(null)}
            >
              {isAr ? 'الكل' : 'All crops'}
            </button>
            {cropOptions.map((crop, i) => (
              <button
                key={crop}
                className={
                  selectedCrop === crop || selectedCrop === cropOptionsAr[i] ? 'active' : ''
                }
                onClick={() =>
                  setSelectedCrop(
                    selectedCrop === crop || selectedCrop === cropOptionsAr[i] ? null : crop,
                  )
                }
              >
                {isAr ? cropOptionsAr[i] : crop}
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
