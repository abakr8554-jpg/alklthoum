'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
} & Omit<HTMLMotionProps<'div'>, 'children'>

/**
 * Scroll-reveal wrapper: content fades and rises into view as it enters the
 * viewport. Honours `prefers-reduced-motion` (renders plain, always visible)
 * and never leaves content stuck hidden — the animation targets are opacity/y
 * only, so even if the viewport trigger misfires the content stays readable.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  ...rest
}: Props) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} {...(rest as Record<string, unknown>)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
