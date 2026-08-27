'use client'

import Link from 'next/link'
import { ActionForm } from '@/components/admin/ActionForm'
import { saveCompanyAction } from '@/app/admin/actions'

export type CompanyFormValues = {
  id?: string
  name?: string
  nameAr?: string
  slug?: string
  tagline?: string
  taglineAr?: string
  description?: string
  descriptionAr?: string
  logo?: string
  coverImage?: string
  email?: string
  phone?: string
  address?: string
  addressAr?: string
  published?: boolean
}

export function CompanyForm({ company }: { company?: CompanyFormValues }) {
  return (
    <ActionForm action={saveCompanyAction}>
      {company?.id ? <input type="hidden" name="id" value={company.id} /> : null}

      <div className="admin-form-grid">
        <div className="admin-field">
          <label htmlFor="name">Name (EN)</label>
          <input id="name" name="name" required defaultValue={company?.name || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="nameAr">Name (AR)</label>
          <input id="nameAr" name="nameAr" required defaultValue={company?.nameAr || ''} dir="rtl" />
        </div>
        <div className="admin-field">
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" defaultValue={company?.slug || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="logo">Logo URL</label>
          <input id="logo" name="logo" defaultValue={company?.logo || '/logo.png'} />
        </div>
        <div className="admin-field">
          <label htmlFor="tagline">Tagline (EN)</label>
          <input id="tagline" name="tagline" defaultValue={company?.tagline || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="taglineAr">Tagline (AR)</label>
          <input id="taglineAr" name="taglineAr" defaultValue={company?.taglineAr || ''} dir="rtl" />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="description">Description (EN)</label>
          <textarea id="description" name="description" rows={5} defaultValue={company?.description || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="descriptionAr">Description (AR)</label>
          <textarea
            id="descriptionAr"
            name="descriptionAr"
            rows={5}
            defaultValue={company?.descriptionAr || ''}
            dir="rtl"
          />
        </div>
        <div className="admin-field">
          <label htmlFor="coverImage">Cover image URL</label>
          <input id="coverImage" name="coverImage" defaultValue={company?.coverImage || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" defaultValue={company?.email || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" defaultValue={company?.phone || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="address">Address (EN)</label>
          <input id="address" name="address" defaultValue={company?.address || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="addressAr">Address (AR)</label>
          <input id="addressAr" name="addressAr" defaultValue={company?.addressAr || ''} dir="rtl" />
        </div>
        <div className="admin-field">
          <label className="admin-check">
            <input type="checkbox" name="published" defaultChecked={company?.published ?? true} />
            Published
          </label>
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary">
          Save company
        </button>
        <Link href="/admin/companies" className="admin-btn admin-btn-secondary">
          Cancel
        </Link>
      </div>
    </ActionForm>
  )
}
