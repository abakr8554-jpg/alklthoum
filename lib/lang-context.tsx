'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Lang } from './data'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  isAr: boolean
  dir: 'ltr' | 'rtl'
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  isAr: false,
  dir: 'ltr',
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang') as Lang | null
      if (saved === 'ar' || saved === 'en') setLangState(saved)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    // Set dir on <body> not <html> so the browser keeps the scrollbar on the
    // right edge regardless of language (html[dir=rtl] shifts the native
    // scrollbar to the left, creating a dark strip on the left side of the page).
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* ignore */
    }
  }

  const isAr = lang === 'ar'

  return (
    <LangContext.Provider value={{ lang, setLang, isAr, dir: isAr ? 'rtl' : 'ltr' }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
