import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: Props) {
  return (
    <div className="admin-page-header">
      <div>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="admin-page-actions">{actions}</div> : null}
    </div>
  )
}

export function AddLink({ href, label = 'Add new' }: { href: string; label?: string }) {
  return (
    <Link href={href} className="admin-btn admin-btn-primary">
      {label}
    </Link>
  )
}
