type Props = {
  status: boolean | string
  trueLabel?: string
  falseLabel?: string
}

export function StatusBadge({ status, trueLabel = 'Published', falseLabel = 'Draft' }: Props) {
  if (typeof status === 'boolean') {
    return (
      <span className={`admin-badge ${status ? 'admin-badge-success' : 'admin-badge-muted'}`}>
        {status ? trueLabel : falseLabel}
      </span>
    )
  }

  const s = status.toLowerCase()
  let cls = 'admin-badge-muted'
  if (s === 'new' || s === 'unread') cls = 'admin-badge-warn'
  else if (s === 'read' || s === 'published' || s === 'active') cls = 'admin-badge-success'
  else if (s === 'archived' || s === 'inactive') cls = 'admin-badge-muted'
  else if (s === 'high' || s === 'critical') cls = 'admin-badge-danger'
  else if (s === 'medium') cls = 'admin-badge-warn'
  else if (s === 'low') cls = 'admin-badge-info'

  return <span className={`admin-badge ${cls}`}>{status}</span>
}
