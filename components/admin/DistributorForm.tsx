'use client'

import { ActionForm } from '@/components/admin/ActionForm'
import { saveDistributorAction } from '@/app/admin/actions'

export type DistributorValues = {
  id?: string
  name?: string
  nameAr?: string
  region?: string
  regionAr?: string
  wilaya?: string
  wilayaAr?: string
  address?: string
  addressAr?: string
  phone?: string
  whatsapp?: string
  lat?: number
  lng?: number
  published?: boolean
}

export function DistributorForm({
  distributor,
  submitLabel = 'Save distributor',
}: {
  distributor?: DistributorValues
  submitLabel?: string
}) {
  return (
    <ActionForm action={saveDistributorAction}>
      {distributor?.id ? <input type="hidden" name="id" value={distributor.id} /> : null}

      <div className="admin-form-grid">
        <div className="admin-field">
          <label htmlFor={`name-${distributor?.id || 'new'}`}>Name (EN)</label>
          <input
            id={`name-${distributor?.id || 'new'}`}
            name="name"
            required
            defaultValue={distributor?.name || ''}
          />
        </div>
        <div className="admin-field">
          <label htmlFor={`nameAr-${distributor?.id || 'new'}`}>Name (AR)</label>
          <input
            id={`nameAr-${distributor?.id || 'new'}`}
            name="nameAr"
            required
            defaultValue={distributor?.nameAr || ''}
            dir="rtl"
          />
        </div>
        <div className="admin-field">
          <label>Region (EN)</label>
          <input name="region" defaultValue={distributor?.region || ''} />
        </div>
        <div className="admin-field">
          <label>Region (AR)</label>
          <input name="regionAr" defaultValue={distributor?.regionAr || ''} dir="rtl" />
        </div>
        <div className="admin-field">
          <label>Wilaya (EN)</label>
          <input name="wilaya" defaultValue={distributor?.wilaya || ''} />
        </div>
        <div className="admin-field">
          <label>Wilaya (AR)</label>
          <input name="wilayaAr" defaultValue={distributor?.wilayaAr || ''} dir="rtl" />
        </div>
        <div className="admin-field admin-field-full">
          <label>Address (EN)</label>
          <input name="address" defaultValue={distributor?.address || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label>Address (AR)</label>
          <input name="addressAr" defaultValue={distributor?.addressAr || ''} dir="rtl" />
        </div>
        <div className="admin-field">
          <label>Phone</label>
          <input name="phone" defaultValue={distributor?.phone || ''} />
        </div>
        <div className="admin-field">
          <label>WhatsApp</label>
          <input name="whatsapp" defaultValue={distributor?.whatsapp || ''} />
        </div>
        <div className="admin-field">
          <label>Latitude</label>
          <input name="lat" type="number" step="any" defaultValue={distributor?.lat ?? 0} />
        </div>
        <div className="admin-field">
          <label>Longitude</label>
          <input name="lng" type="number" step="any" defaultValue={distributor?.lng ?? 0} />
        </div>
        <div className="admin-field">
          <label className="admin-check">
            <input type="checkbox" name="published" defaultChecked={distributor?.published ?? true} />
            Published
          </label>
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary">
          {submitLabel}
        </button>
      </div>
    </ActionForm>
  )
}
