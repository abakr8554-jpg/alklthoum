'use client'

import { useActionState, useState, useEffect } from 'react'
import type { ActionResult } from '@/app/admin/actions'

type Props = {
  action: (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>
  children: React.ReactNode
  className?: string
}

export function ActionForm({ action, children, className = 'admin-form' }: Props) {
  const [state, formAction, pending] = useActionState(action, null)
  const [dismissed, setDismissed] = useState(false)

  // Reset dismiss whenever state changes (new submission result)
  useEffect(() => { setDismissed(false) }, [state])

  const showError = state && !state.ok && !dismissed
  const showSuccess = state?.ok && state.message && !dismissed

  return (
    <form
      action={formAction}
      className={className}
      // NOTE: No encType — Server Actions handle FormData natively
      // NOTE: No fieldset[disabled] — disabling fieldset before FormData capture empties all fields in React 19
    >
      {showError && (
        <div className="admin-alert admin-alert-error">
          <span>{state.message}</span>
          <button type="button" onClick={() => setDismissed(true)} className="admin-alert-close">✕</button>
        </div>
      )}
      {showSuccess && (
        <div className="admin-alert admin-alert-success">
          <span>{state.message}</span>
          <button type="button" onClick={() => setDismissed(true)} className="admin-alert-close">✕</button>
        </div>
      )}

      {/* Wrap in div with visual loading state (no disabled — avoids React 19 FormData bug) */}
      <div
        style={{
          opacity: pending ? 0.6 : 1,
          pointerEvents: pending ? 'none' : 'auto',
          transition: 'opacity 0.15s',
        }}
      >
        {children}
      </div>

      {pending && <p className="admin-muted">جارٍ الحفظ…</p>}
    </form>
  )
}
