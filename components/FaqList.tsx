'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'

type FaqItem = {
  id: string
  question: string
  questionAr: string
  answer: string
  answerAr: string
}

export default function FaqList({ items }: { items: FaqItem[] }) {
  const { isAr, dir } = useLang()
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null)

  return (
    <section dir={dir} style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((item) => {
          const isOpen = open === item.id
          return (
            <div
              key={item.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 6,
                background: '#fff',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  textAlign: 'start',
                  padding: '18px 20px',
                  background: 'transparent',
                  border: 0,
                  fontWeight: 600,
                  fontSize: 16,
                  color: 'var(--ink)',
                }}
              >
                {isAr ? item.questionAr : item.question}
              </button>
              {isOpen && (
                <div style={{ padding: '0 20px 20px', color: 'var(--muted)', lineHeight: 1.7 }}>
                  {isAr ? item.answerAr : item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
