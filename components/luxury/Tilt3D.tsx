'use client'

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { useCallback, useRef } from 'react'

type Props = {
  children: ReactNode
  className?: string
  intensity?: number
  href?: string
}

export default function Tilt3D({ children, className, intensity = 10, ...props }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-intensity, intensity])
  const glare = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 70%)`

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      x.set(mouseX / rect.width - 0.5)
      y.set(mouseY / rect.height - 0.5)
    },
    [x, y, reduce]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const Wrapper = (props: any) => {
    if (props.href) {
      return (
        <a
          href={props.href}
          ref={ref as any}
          className={`lux-tilt ${className || ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000, display: 'block', textDecoration: 'none', color: 'inherit' }}
        >
          {props.children}
        </a>
      )
    }
    return (
      <motion.div
        ref={ref}
        className={`lux-tilt ${className || ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
      >
        {props.children}
      </motion.div>
    )
  }

  return (
    <Wrapper href={(props as any).href}>
      <motion.div
        className="lux-tilt-inner"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
      <motion.div className="lux-tilt-glare" aria-hidden style={{ background: glare }} />
    </Wrapper>
  )
}
