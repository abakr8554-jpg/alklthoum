'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import Reveal from '@/components/luxury/Reveal'
import {
  ARTICLE_CATEGORY_LABELS,
  formatArticleDate,
  type Article,
  type ArticleCategory,
} from '@/lib/articles'

export default function BlogPreview({ articles }: { articles: Article[] }) {
  const { isAr } = useLang()
  const tx = (en: string, ar: string) => (isAr ? ar : en)
  const latest = articles.slice(0, 3)

  if (latest.length === 0) return null

  return (
    <section className="sp-blog band-white" id="blog">
      <div className="sp-container">
        <Reveal className="sp-section-head">
          <span className="soft-kicker">{tx('Blog & Articles', 'المدونة والمقالات')}</span>
          <h2>{tx('Latest insights', 'آخر المقالات')}</h2>
          <p>
            {tx(
              'News, tips, and updates from across Al Kalthoum Group.',
              'أخبار ونصائح وتحديثات من مجموعة الكلثوم.',
            )}
          </p>
        </Reveal>

        <div className="blog-preview-grid">
          {latest.map((article, i) => {
            const cat = article.category as ArticleCategory
            const catLabel = ARTICLE_CATEGORY_LABELS[cat]
            return (
              <Reveal key={article.id} delay={i * 0.08}>
                <article className="blog-preview-card">
                  <Link href={`/blog/${article.slug}`} className="blog-preview-image">
                    <img
                      src={article.coverImage || '/logo.png'}
                      alt={isAr ? article.titleAr : article.title}
                    />
                    <span className="blog-preview-cat">
                      {isAr ? catLabel?.ar : catLabel?.en}
                    </span>
                  </Link>
                  <div className="blog-preview-body">
                    <time>{formatArticleDate(article.publishedAt, isAr)}</time>
                    <h3>
                      <Link href={`/blog/${article.slug}`}>
                        {isAr ? article.titleAr : article.title}
                      </Link>
                    </h3>
                    <p>{isAr ? article.excerptAr : article.excerpt}</p>
                    <Link href={`/blog/${article.slug}`} className="blog-preview-link">
                      {tx('Read article', 'اقرأ المقال')}
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2} className="sp-blog-cta">
          <Link href="/blog" className="soft-btn-outline">
            {tx('View all articles', 'عرض كل المقالات')}
            <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
