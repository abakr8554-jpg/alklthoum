'use client'

import Link from 'next/link'
import { ArrowUpRight, Calendar, User } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import {
  ARTICLE_CATEGORY_LABELS,
  formatArticleDate,
  type Article,
  type ArticleCategory,
} from '@/lib/articles'

const FB_PAGE = 'https://www.facebook.com/profile.php?id=100064085259698'

export default function BlogClient({ articles }: { articles: Article[] }) {
  const { isAr, dir } = useLang()

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      <section className="page-hero" style={{ background: 'var(--ink)' }}>
        <div className="page-hero-content">
          <p className="kicker light">
            {isAr ? '07 / المدونة والمقالات' : '07 / Blog & Articles'}
          </p>
          <h1 className="page-hero-title">
            {isAr ? 'أخبار و' : 'News &'}{' '}
            <em>{isAr ? 'رؤى' : 'Insights'}</em>
          </h1>
          <p className="page-hero-sub">
            {isAr
              ? 'آخر الأخبار والنصائح الزراعية من مجموعة الكلثوم.'
              : 'Latest news, tips, and agricultural insights from Al Kalthoum Group.'}
          </p>
        </div>
        <div className="page-hero-overlay" />
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              'url(/images/unsplash/corn-field.webp)',
          }}
        />
      </section>

      <section className="blog-section">
        {articles.length === 0 ? (
          <div className="blog-empty">
            <p>{isAr ? 'لا توجد مقالات بعد.' : 'No articles yet.'}</p>
          </div>
        ) : (
          <div className="blog-grid">
            {articles.map((article) => {
              const cat = article.category as ArticleCategory
              const catLabel = ARTICLE_CATEGORY_LABELS[cat]
              return (
                <article key={article.id} className="blog-card">
                  <Link href={`/blog/${article.slug}`} className="blog-card-image">
                    <img
                      src={article.coverImage || '/logo.png'}
                      alt={isAr ? article.titleAr : article.title}
                    />
                    <span className="blog-card-cat">
                      {isAr ? catLabel?.ar : catLabel?.en}
                    </span>
                  </Link>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>
                        <Calendar size={13} />
                        {formatArticleDate(article.publishedAt, isAr)}
                      </span>
                      <span>
                        <User size={13} />
                        {isAr ? article.authorAr : article.author}
                      </span>
                    </div>
                    <h2>
                      <Link href={`/blog/${article.slug}`}>
                        {isAr ? article.titleAr : article.title}
                      </Link>
                    </h2>
                    <p>{isAr ? article.excerptAr : article.excerpt}</p>
                    <Link href={`/blog/${article.slug}`} className="blog-read-more">
                      {isAr ? 'اقرأ المزيد' : 'Read more'}
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      <section className="fb-feed" aria-label={isAr ? 'تابعنا على فيسبوك' : 'Follow us on Facebook'}>
        <div className="fb-feed-head">
          <p className="fb-feed-eyebrow">{isAr ? 'تابعنا' : 'Follow us'}</p>
          <h2>{isAr ? 'نشاطنا على فيسبوك' : 'Latest from our Facebook'}</h2>
          <p style={{ color: 'var(--muted)', marginTop: '0.75rem', fontSize: '1rem' }}>
            {isAr
              ? 'تابع صفحتنا على فيسبوك لمتابعة أحدث أخبار المجموعة والنصائح الزراعية.'
              : 'Follow our Facebook page for the latest group news and agricultural tips.'}
          </p>
          <a
            href={FB_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="button primary-button"
            style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {isAr ? 'زيارة الصفحة' : 'Visit our page'} <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
