'use client'

import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number | string
  suffix?: string
  className?: string
  duration?: number
}

export default function CountUp({ value, suffix = '', className, duration = 1.6 }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState('0')
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (reduce || !inView || hasAnimated) return

    const numValue = typeof value === 'number' ? value : parseFloat(value)
    if (isNaN(numValue)) {
      setDisplay(value.toString())
      return
    }

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      const current = Math.floor(progress * numValue)
      setDisplay(current.toString())
      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setDisplay(numValue.toString())
        setHasAnimated(true)
      }
    }
    window.requestAnimationFrame(step)
  }, [inView, value, duration, reduce, hasAnimated])

  if (reduce) {
    return (
      <span className={className}>
        {typeof value === 'number' ? value : value}
        {suffix}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
