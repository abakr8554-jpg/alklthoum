'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useLang } from '@/lib/lang-context'

const EXIT_EASE = [0.76, 0, 0.24, 1] as const
const SOFT_EASE = [0.22, 1, 0.36, 1] as const
const HOLD_MS = 2300

/**
 * Branded entrance curtain. Shows once per browser session on public pages:
 * a dark stage with the Al Kalthoum mark, then two veils part to reveal the
 * site. Click (or the Enter control) skips it; honours reduced-motion by not
 * showing at all. Scroll is locked only while it is on screen.
 */
export default function LuxIntro() {
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const { isAr } = useLang()
  const [visible, setVisible] = useState(false)

  const dismiss = useCallback(() => {
    document.documentElement.classList.remove('intro-locked')
    setVisible(false)
  }, [])

  useEffect(() => {
    if (reduce) return
    if (pathname.startsWith('/admin')) return
    let seen = true
    try {
      seen = sessionStorage.getItem('lux-intro-seen') === '1'
    } catch {
      seen = false
    }
    if (seen) return

    try {
      sessionStorage.setItem('lux-intro-seen', '1')
    } catch {
      /* ignore */
    }
    document.documentElement.classList.add('intro-locked')
    setVisible(true)
    const t = window.setTimeout(dismiss, HOLD_MS)
    return () => window.clearTimeout(t)
    // Run once on mount only — the session flag guards re-entry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Safety: never leave the page scroll-locked if this unmounts mid-flight.
  useEffect(() => {
    return () => document.documentElement.classList.remove('intro-locked')
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="lux-intro"
          className="lux-intro"
          style={{ background: 'transparent' }}
          onClick={dismiss}
          initial={{ opacity: 1 }}
          aria-hidden="true"
        >
          <motion.div
            className="lux-intro-veil"
            initial={{ y: 0 }}
            exit={{ y: '-101%' }}
            transition={{ duration: 0.9, ease: EXIT_EASE }}
          />
          <motion.div
            className="lux-intro-veil lux-intro-veil-b"
            initial={{ y: 0 }}
            exit={{ y: '101%' }}
            transition={{ duration: 0.9, ease: EXIT_EASE }}
          />

          <motion.div
            className="lux-intro-core"
            exit={{ opacity: 0, y: -16, transition: { duration: 0.35, ease: 'easeIn' } }}
          >
            <div className="lux-intro-emblem">
              <motion.span
                className="lux-intro-ring"
                initial={{ scale: 0.4, opacity: 0, rotate: -40 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.1, ease: SOFT_EASE }}
              />
              <motion.span
                className="lux-intro-ring"
                style={{ inset: '14%', width: '72%', height: '72%' }}
                initial={{ scale: 0.6, opacity: 0, rotate: 30 }}
                animate={{ scale: 1, opacity: 0.6, rotate: 0 }}
                transition={{ duration: 1.2, ease: SOFT_EASE, delay: 0.08 }}
              />
              <motion.div
                className="lux-intro-logo"
                initial={{ scale: 0.82, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: SOFT_EASE, delay: 0.18 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Al Kalthoum"
                  className="lux-intro-logo-img lux-intro-logo-img--full"
                />
              </motion.div>
            </div>

            <motion.span
              className="lux-intro-line"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: SOFT_EASE }}
            />

            <motion.span
              className="lux-intro-year"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.72 }}
            >
              {isAr ? 'منذ ١٩٩٣' : 'SINCE 1993'}
            </motion.span>

            <motion.button
              type="button"
              className="lux-intro-enter"
              onClick={dismiss}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {isAr ? 'ادخل' : 'Enter'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
