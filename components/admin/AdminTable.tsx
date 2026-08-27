import type { ReactNode } from 'react'

type Props = {
  headers: string[]
  children: ReactNode
  empty?: boolean
  emptyMessage?: string
}

export function AdminTable({ headers, children, empty, emptyMessage = 'No items found.' }: Props) {
  if (empty) {
    return (
      <div className="admin-table-wrap">
        <div className="admin-empty">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
