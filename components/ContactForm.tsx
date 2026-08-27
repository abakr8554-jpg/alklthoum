'use client'

import { useActionState, useEffect, useRef } from 'react'
import { sendContactEmail, type ContactFormState } from '@/app/contact/actions'
import { useLang } from '@/lib/lang-context'

const initial: ContactFormState = { status: 'idle', message: '' }

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const { isAr } = useLang()
  const [state, action, pending] = useActionState(sendContactEmail, initial)
  const formRef = useRef<HTMLFormElement>(null)
  const tx = (en: string, ar: string) => (isAr ? ar : en)

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
  }, [state.status])

  return (
    <form
      ref={formRef}
      action={action}
      className={compact ? 'sp-contact-form' : 'contact-form-el'}
      noValidate
    >
      <div className={compact ? 'sp-form-row' : 'form-row'}>
        <div className={compact ? 'sp-input-group' : 'form-group'}>
          <label htmlFor="cf-name" className="sr-only">
            {tx('Full name', 'الاسم الكامل')}
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={tx('Full Name *', 'الاسم الكامل *')}
          />
        </div>
        <div className={compact ? 'sp-input-group' : 'form-group'}>
          <label htmlFor="cf-email" className="sr-only">
            {tx('Email', 'البريد')}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={tx('Email Address *', 'البريد الإلكتروني *')}
          />
        </div>
      </div>
      {!compact && (
        <div className="form-group">
          <label htmlFor="cf-company">{tx('Company', 'الشركة')}</label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" />
        </div>
      )}
      <div className={compact ? 'sp-input-group' : 'form-group'}>
        {!compact && <label htmlFor="cf-subject">{tx('Subject', 'الموضوع')}</label>}
        <input
          id="cf-subject"
          name="subject"
          type="text"
          placeholder={compact ? tx('Subject', 'موضوع الرسالة') : undefined}
        />
      </div>
      <div className={compact ? 'sp-input-group' : 'form-group'}>
        {!compact && <label htmlFor="cf-message">{tx('Message', 'الرسالة')} *</label>}
        <textarea
          id="cf-message"
          name="message"
          required
          rows={compact ? 4 : 6}
          placeholder={compact ? tx('How can we help you?', 'كيف يمكننا مساعدتك؟') : undefined}
        />
      </div>

      {state.status !== 'idle' && (
        <p
          role="status"
          className={state.status === 'success' ? 'form-success' : 'form-error'}
          style={{
            margin: '0 0 12px',
            fontSize: 14,
            color: state.status === 'success' ? '#2E6B1A' : '#a33',
          }}
        >
          {state.message}
        </p>
      )}

      <button type="submit" className="sp-btn sp-btn-primary" disabled={pending}>
        <span>{pending ? tx('Sending…', 'جاري الإرسال…') : tx('Send Message', 'إرسال الرسالة')}</span>
      </button>
    </form>
  )
}
