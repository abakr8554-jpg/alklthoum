'use client'

import Link from 'next/link'
import { ActionForm } from '@/components/admin/ActionForm'
import { saveDiseaseAction } from '@/app/admin/actions'

export type DiseaseFormValues = {
  id?: string
  name?: string
  nameAr?: string
  slug?: string
  scientificName?: string | null
  description?: string
  descriptionAr?: string
  severity?: string
  image?: string
  published?: boolean
}

export function DiseaseForm({ disease }: { disease?: DiseaseFormValues }) {
  return (
    <ActionForm action={saveDiseaseAction}>
      {disease?.id ? <input type="hidden" name="id" value={disease.id} /> : null}

      <div className="admin-form-grid">
        <div className="admin-field">
          <label htmlFor="name">Name (EN)</label>
          <input id="name" name="name" required defaultValue={disease?.name || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="nameAr">Name (AR)</label>
          <input id="nameAr" name="nameAr" required defaultValue={disease?.nameAr || ''} dir="rtl" />
        </div>
        <div className="admin-field">
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" defaultValue={disease?.slug || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="scientificName">Scientific name</label>
          <input
            id="scientificName"
            name="scientificName"
            defaultValue={disease?.scientificName || ''}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="severity">Severity</label>
          <select id="severity" name="severity" defaultValue={disease?.severity || 'medium'}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="image">Image URL</label>
          <input id="image" name="image" defaultValue={disease?.image || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="description">Description (EN)</label>
          <textarea id="description" name="description" rows={5} defaultValue={disease?.description || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="descriptionAr">Description (AR)</label>
          <textarea
            id="descriptionAr"
            name="descriptionAr"
            rows={5}
            defaultValue={disease?.descriptionAr || ''}
            dir="rtl"
          />
        </div>
        <div className="admin-field">
          <label className="admin-check">
            <input type="checkbox" name="published" defaultChecked={disease?.published ?? true} />
            Published
          </label>
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary">
          Save disease
        </button>
        <Link href="/admin/diseases" className="admin-btn admin-btn-secondary">
          Cancel
        </Link>
      </div>
    </ActionForm>
  )
}
