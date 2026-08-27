'use client'

import { useActionState } from 'react'
import { loginAction, type ActionResult } from '@/app/admin/actions'

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null as ActionResult | null)

  return (
    <form action={formAction} className="admin-form">
      {state && !state.ok ? <div className="admin-alert admin-alert-error">{state.message}</div> : null}

      <div className="admin-field">
        <label htmlFor="email">البريد الإلكتروني</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="admin@example.com"
        />
      </div>

      <div className="admin-field">
        <label htmlFor="password">كلمة المرور</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </div>

      <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
        {pending ? 'جارٍ الدخول…' : 'تسجيل الدخول'}
      </button>
    </form>
  )
}
