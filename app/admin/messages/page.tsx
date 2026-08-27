import { prisma } from '@/lib/db'
import {
  updateMessageStatusAction,
  deleteMessageAction,
} from '@/app/admin/actions'
import { PageHeader } from '@/components/admin/PageHeader'
import { AdminTable } from '@/components/admin/AdminTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmDelete } from '@/components/admin/ConfirmDelete'

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <PageHeader
        title="الرسائل"
        description={`${messages.length} رسالة`}
      />

      <AdminTable
        headers={['المرسل', 'الموضوع / الرسالة', 'الحالة', 'التاريخ', 'إجراءات']}
        empty={messages.length === 0}
        emptyMessage="الصندوق فارغ."
      >
        {messages.map((m) => (
          <tr key={m.id}>
            <td>
              <strong>{m.name}</strong>
              <div className="admin-muted">{m.email}</div>
              {m.company ? <div className="admin-muted">{m.company}</div> : null}
            </td>
            <td>
              <strong>{m.subject || '(بدون موضوع)'}</strong>
              <div className="admin-muted" style={{ maxWidth: 360, whiteSpace: 'pre-wrap' }}>
                {m.message.slice(0, 180)}
                {m.message.length > 180 ? '…' : ''}
              </div>
            </td>
            <td>
              <StatusBadge status={m.status} />
            </td>
            <td className="admin-muted">{m.createdAt.toLocaleString('ar-EG')}</td>
            <td>
              <div className="admin-actions">
                {m.status !== 'read' ? (
                  <form
                    action={async () => {
                      'use server'
                      await updateMessageStatusAction(m.id, 'read')
                    }}
                  >
                    <button type="submit" className="admin-btn admin-btn-secondary admin-btn-sm">
                      تمييز كمقروء
                    </button>
                  </form>
                ) : null}
                {m.status !== 'archived' ? (
                  <form
                    action={async () => {
                      'use server'
                      await updateMessageStatusAction(m.id, 'archived')
                    }}
                  >
                    <button type="submit" className="admin-btn admin-btn-ghost admin-btn-sm">
                      أرشفة
                    </button>
                  </form>
                ) : null}
                <ConfirmDelete
                  action={deleteMessageAction.bind(null, m.id)}
                  confirmMessage="حذف هذه الرسالة؟"
                />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  )
}
