'use client'

import { ActionForm } from '@/components/admin/ActionForm'
import { saveSeoAction } from '@/app/admin/actions'

export type SeoValues = {
  path?: string
  title?: string
  titleAr?: string
  description?: string
  descriptionAr?: string
  ogImage?: string | null
  canonical?: string | null
  noIndex?: boolean
}

export function SeoForm({ seo }: { seo?: SeoValues }) {
  return (
    <ActionForm action={saveSeoAction}>
      <div className="admin-form-grid">
        <div className="admin-field">
          <label htmlFor="path">Path</label>
          <input
            id="path"
            name="path"
            required
            placeholder="/about"
            defaultValue={seo?.path || '/'}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="canonical">Canonical URL</label>
          <input id="canonical" name="canonical" defaultValue={seo?.canonical || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="title">Title (EN)</label>
          <input id="title" name="title" defaultValue={seo?.title || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="titleAr">Title (AR)</label>
          <input id="titleAr" name="titleAr" defaultValue={seo?.titleAr || ''} dir="rtl" />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="description">Description (EN)</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={seo?.description || ''}
          />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="descriptionAr">Description (AR)</label>
          <textarea
            id="descriptionAr"
            name="descriptionAr"
            rows={3}
            defaultValue={seo?.descriptionAr || ''}
            dir="rtl"
          />
        </div>
        <div className="admin-field">
          <label htmlFor="ogImage">OG image URL</label>
          <input id="ogImage" name="ogImage" defaultValue={seo?.ogImage || ''} />
        </div>
        <div className="admin-field">
          <label className="admin-check">
            <input type="checkbox" name="noIndex" defaultChecked={seo?.noIndex ?? false} />
            noindex
          </label>
        </div>
      </div>
      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary">
          Save SEO
        </button>
      </div>
    </ActionForm>
  )
}
