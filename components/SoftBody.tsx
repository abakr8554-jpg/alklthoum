'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Marks the document for soft luxury styling across public pages. */
export default function SoftBody() {
  const pathname = usePathname()

  useEffect(() => {
    const soft = !pathname.startsWith('/admin')
    document.documentElement.classList.toggle('is-soft-site', soft)
    document.body.classList.toggle('is-soft-site', soft)
    return () => {
      document.documentElement.classList.remove('is-soft-site')
      document.body.classList.remove('is-soft-site')
    }
  }, [pathname])

  return null
}
