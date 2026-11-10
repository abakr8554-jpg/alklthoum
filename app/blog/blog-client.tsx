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

// Public Facebook posts from the Al Kalthoum page (embedded via the official
// plugin — only live posts are listed; removed/unavailable ones are omitted).
const FB_POSTS = [
  'https://www.facebook.com/story.php?story_fbid=1561307602682067&id=100064085259698',
  'https://www.facebook.com/story.php?story_fbid=1552920690187425&id=100064085259698',
]

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
              'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1800&q=80)',
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

      <section className="fb-feed" aria-label={isAr ? 'منشورات فيسبوك' : 'Facebook posts'}>
        <div className="fb-feed-head">
          <p className="fb-feed-eyebrow">{isAr ? 'من فيسبوك' : 'From Facebook'}</p>
          <h2>{isAr ? 'آخر منشوراتنا على فيسبوك' : 'Latest from our Facebook'}</h2>
        </div>
        <div className="fb-feed-grid">
          {FB_POSTS.map((href) => (
            <div key={href} className="fb-feed-card">
              <iframe
                src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
                  href,
                )}&show_text=true&width=340`}
                width={340}
                height={550}
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder={0}
                allowFullScreen
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={isAr ? 'منشور فيسبوك' : 'Facebook post'}
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
