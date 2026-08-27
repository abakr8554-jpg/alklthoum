'use client'

import { ActionForm } from '@/components/admin/ActionForm'
import { saveFaqAction } from '@/app/admin/actions'

export type FaqValues = {
  id?: string
  question?: string
  questionAr?: string
  answer?: string
  answerAr?: string
  sortOrder?: number
  published?: boolean
}

export function FaqForm({
  faq,
  submitLabel = 'Save FAQ',
}: {
  faq?: FaqValues
  submitLabel?: string
}) {
  return (
    <ActionForm action={saveFaqAction}>
      {faq?.id ? <input type="hidden" name="id" value={faq.id} /> : null}

      <div className="admin-form-grid">
        <div className="admin-field admin-field-full">
          <label>Question (EN)</label>
          <input name="question" required defaultValue={faq?.question || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label>Question (AR)</label>
          <input name="questionAr" defaultValue={faq?.questionAr || ''} dir="rtl" />
        </div>
        <div className="admin-field admin-field-full">
          <label>Answer (EN)</label>
          <textarea name="answer" required rows={4} defaultValue={faq?.answer || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label>Answer (AR)</label>
          <textarea name="answerAr" rows={4} defaultValue={faq?.answerAr || ''} dir="rtl" />
        </div>
        <div className="admin-field">
          <label>Sort order</label>
          <input name="sortOrder" type="number" defaultValue={faq?.sortOrder ?? 0} />
        </div>
        <div className="admin-field">
          <label className="admin-check">
            <input type="checkbox" name="published" defaultChecked={faq?.published ?? true} />
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
