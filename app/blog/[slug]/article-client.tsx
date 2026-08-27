'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/lib/lang-context'
import {
  ARTICLE_CATEGORY_LABELS,
  formatArticleDate,
  type Article,
  type ArticleCategory,
} from '@/lib/articles'

export default function ArticleClient({ article }: { article: Article }) {
  const { isAr, dir } = useLang()
  const cat = article.category as ArticleCategory
  const catLabel = ARTICLE_CATEGORY_LABELS[cat]
  const body = (isAr ? article.contentAr : article.content).split('\n\n')

  return (
    <main lang={isAr ? 'ar' : 'en'} dir={dir} id="top">
      <Header />

      <article className="blog-article">
        <div className="blog-article-hero">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={isAr ? article.titleAr : article.title}
              className="blog-article-cover"
            />
          ) : null}
          <div className="blog-article-hero-overlay" />
          <div className="blog-article-hero-content">
            <Link href="/blog" className="blog-back">
              <ArrowLeft size={14} />
              {isAr ? 'المدونة' : 'Blog'}
            </Link>
            <span className="blog-article-cat">
              {isAr ? catLabel?.ar : catLabel?.en}
            </span>
            <h1>{isAr ? article.titleAr : article.title}</h1>
            <div className="blog-article-meta">
              <span>
                <Calendar size={14} />
                {formatArticleDate(article.publishedAt, isAr)}
              </span>
              <span>
                <User size={14} />
                {isAr ? article.authorAr : article.author}
              </span>
            </div>
          </div>
        </div>

        <div className="blog-article-body">
          {(isAr ? article.excerptAr : article.excerpt) && (
            <p className="blog-article-lead">{isAr ? article.excerptAr : article.excerpt}</p>
          )}
          {body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  )
}
