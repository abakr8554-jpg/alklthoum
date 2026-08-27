'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  as?: keyof typeof motion
} & Omit<HTMLMotionProps<'div'>, 'children'>

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  once = true,
  ...rest
}: Props) {
  // Disabled to show content immediately without animation
  return <div className={className}>{children}</div>
}
