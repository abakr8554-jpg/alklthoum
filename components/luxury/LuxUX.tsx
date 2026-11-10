'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

/**
 * Site-wide premium UX layer:
 *  1. A thin reading-progress bar pinned to the top of the viewport.
 *  2. A back-to-top control that fades in once the page is scrolled.
 *  3. A subtle magnetic pull on primary buttons (fine pointers only).
 * All of it is skipped under reduced-motion and on the /admin area.
 */
export default function LuxUX() {
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const { isAr } = useLang()
  const [showTop, setShowTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  const isAdmin = pathname.startsWith('/admin')

  // Back-to-top visibility
  useEffect(() => {
    if (isAdmin) return
    const onScroll = () => setShowTop(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isAdmin])

  // Magnetic pull on primary CTAs
  useEffect(() => {
    if (reduce || isAdmin) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia?.('(pointer: fine)').matches) return

    let raf = 0
    const cleanups: Array<() => void> = []

    const bind = () => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>('.sp-btn-primary, [data-magnetic]'),
      )
      els.forEach((el) => {
        const strength = 0.28
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const x = (e.clientX - (r.left + r.width / 2)) * strength
          const y = (e.clientY - (r.top + r.height / 2)) * strength
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(() => {
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`
          })
        }
        const onLeave = () => {
          cancelAnimationFrame(raf)
          el.style.transform = ''
        }
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        el.style.transition = 'transform 0.35s cubic-bezier(0.22,1,0.36,1)'
        cleanups.push(() => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
          el.style.transform = ''
          el.style.transition = ''
        })
      })
    }

    // Let the route's DOM settle before binding.
    const t = window.setTimeout(bind, 120)
    return () => {
      window.clearTimeout(t)
      cancelAnimationFrame(raf)
      cleanups.forEach((fn) => fn())
    }
  }, [reduce, isAdmin, pathname])

  if (isAdmin) return null

  return (
    <>
      <motion.div className="lux-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <button
        type="button"
        className={`lux-totop${showTop ? ' is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={isAr ? 'العودة لأعلى' : 'Back to top'}
      >
        <ArrowUp size={18} strokeWidth={2.4} />
      </button>
    </>
  )
}
