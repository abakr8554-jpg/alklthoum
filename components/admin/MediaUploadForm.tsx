'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { uploadMediaAction } from '@/app/admin/actions'

export function MediaUploadForm() {
  const router = useRouter()
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  return (
    <form
      className="admin-form"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.currentTarget
        const fd = new FormData(form)
        setMessage(null)
        setError(null)
        startTransition(async () => {
          const result = await uploadMediaAction(fd)
          if (result.ok) {
            setMessage(result.message || 'Uploaded.')
            form.reset()
            router.refresh()
          } else {
            setError(result.message)
          }
        })
      }}
    >
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      {message ? <div className="admin-alert admin-alert-success">{message}</div> : null}

      <div className="admin-form-grid">
        <div className="admin-field">
          <label htmlFor="file">File</label>
          <input id="file" name="file" type="file" required accept="image/*,application/pdf" />
        </div>
        <div className="admin-field">
          <label htmlFor="alt">Alt text</label>
          <input id="alt" name="alt" placeholder="Optional description" />
        </div>
        <div className="admin-field">
          <label htmlFor="folder">Folder</label>
          <input id="folder" name="folder" defaultValue="general" />
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
          {pending ? 'Uploading…' : 'Upload'}
        </button>
      </div>
    </form>
  )
}
