'use client'

type Props = {
  // Bound server actions like deleteProductAction.bind(null, id)
  action: (...args: never[]) => Promise<unknown>
  label?: string
  confirmMessage?: string
}

export function ConfirmDelete({
  action,
  label = 'Delete',
  confirmMessage = 'Delete this item permanently?',
}: Props) {
  return (
    <form
      action={async () => {
        if (!window.confirm(confirmMessage)) return
        await action()
      }}
    >
      <button type="submit" className="admin-btn admin-btn-danger admin-btn-sm">
        {label}
      </button>
    </form>
  )
}
