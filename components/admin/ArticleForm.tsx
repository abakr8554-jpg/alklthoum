'use client'

import Link from 'next/link'
import { ActionForm } from '@/components/admin/ActionForm'
import { saveArticleAction } from '@/app/admin/actions'
import { ARTICLE_CATEGORY_LABELS, type ArticleCategory } from '@/lib/articles'

export type ArticleFormValues = {
  id?: string
  slug?: string
  title?: string
  titleAr?: string
  excerpt?: string
  excerptAr?: string
  content?: string
  contentAr?: string
  coverImage?: string
  author?: string
  authorAr?: string
  category?: string
  publishedAt?: string
  sortOrder?: number
  published?: boolean
}

const CATEGORIES = Object.keys(ARTICLE_CATEGORY_LABELS) as ArticleCategory[]

export function ArticleForm({ article }: { article?: ArticleFormValues }) {
  const publishedAtDefault = article?.publishedAt
    ? article.publishedAt.slice(0, 10)
    : new Date().toISOString().slice(0, 10)

  return (
    <ActionForm action={saveArticleAction}>
      {article?.id ? <input type="hidden" name="id" value={article.id} /> : null}

      <div className="admin-form-grid">
        <div className="admin-field">
          <label htmlFor="title">Title (EN)</label>
          <input id="title" name="title" required defaultValue={article?.title || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="titleAr">Title (AR)</label>
          <input id="titleAr" name="titleAr" defaultValue={article?.titleAr || ''} dir="rtl" />
        </div>
        <div className="admin-field">
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" defaultValue={article?.slug || ''} placeholder="auto-from-title" />
        </div>
        <div className="admin-field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue={article?.category || 'news'}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {ARTICLE_CATEGORY_LABELS[cat].en}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="excerpt">Excerpt (EN)</label>
          <textarea id="excerpt" name="excerpt" rows={2} defaultValue={article?.excerpt || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="excerptAr">Excerpt (AR)</label>
          <textarea id="excerptAr" name="excerptAr" rows={2} defaultValue={article?.excerptAr || ''} dir="rtl" />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="content">Content (EN)</label>
          <textarea id="content" name="content" required rows={12} defaultValue={article?.content || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="contentAr">Content (AR)</label>
          <textarea id="contentAr" name="contentAr" rows={12} defaultValue={article?.contentAr || ''} dir="rtl" />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="coverImage">Cover image URL</label>
          <input id="coverImage" name="coverImage" defaultValue={article?.coverImage || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="author">Author (EN)</label>
          <input id="author" name="author" defaultValue={article?.author || 'Al Kalthoum Group'} />
        </div>
        <div className="admin-field">
          <label htmlFor="authorAr">Author (AR)</label>
          <input id="authorAr" name="authorAr" defaultValue={article?.authorAr || 'مجموعة الكلثوم'} dir="rtl" />
        </div>
        <div className="admin-field">
          <label htmlFor="publishedAt">Publish date</label>
          <input id="publishedAt" name="publishedAt" type="date" defaultValue={publishedAtDefault} />
        </div>
        <div className="admin-field">
          <label htmlFor="sortOrder">Sort order</label>
          <input id="sortOrder" name="sortOrder" type="number" defaultValue={article?.sortOrder ?? 0} />
        </div>
        <div className="admin-field">
          <label className="admin-check">
            <input type="checkbox" name="published" defaultChecked={article?.published ?? true} />
            Published
          </label>
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary">
          {article?.id ? 'Update article' : 'Create article'}
        </button>
        <Link href="/admin/articles" className="admin-btn admin-btn-secondary">
          Cancel
        </Link>
      </div>
    </ActionForm>
  )
}
