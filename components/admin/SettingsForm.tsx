'use client'

import { ActionForm } from '@/components/admin/ActionForm'
import { saveSettingsAction } from '@/app/admin/actions'

export function SettingsForm({
  values,
}: {
  values: Record<string, string>
}) {
  const fields: { key: string; label: string; type?: string }[] = [
    { key: 'site_name', label: 'Site name (EN)' },
    { key: 'site_name_ar', label: 'Site name (AR)' },
    { key: 'tagline', label: 'Tagline (EN)' },
    { key: 'tagline_ar', label: 'Tagline (AR)' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'address_en', label: 'Address (EN)' },
    { key: 'address_ar', label: 'Address (AR)' },
    { key: 'facebook', label: 'Facebook URL' },
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'linkedin', label: 'LinkedIn URL' },
    { key: 'founded_year', label: 'Founded year' },
    { key: 'logo', label: 'Logo URL' },
  ]

  return (
    <ActionForm action={saveSettingsAction}>
      <div className="admin-form-grid">
        {fields.map((f) => (
          <div
            key={f.key}
            className={`admin-field ${f.key.startsWith('address') || f.key === 'tagline' || f.key === 'tagline_ar' ? 'admin-field-full' : ''}`}
          >
            <label htmlFor={f.key}>{f.label}</label>
            <input
              id={f.key}
              name={f.key}
              type={f.type || 'text'}
              defaultValue={values[f.key] || ''}
              dir={f.key.endsWith('_ar') || f.key.includes('_ar') ? 'rtl' : undefined}
            />
          </div>
        ))}
      </div>
      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary">
          Save settings
        </button>
      </div>
    </ActionForm>
  )
}
