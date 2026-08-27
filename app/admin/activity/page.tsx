import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { AdminTable } from '@/components/admin/AdminTable'

export default async function ActivityPage() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: { user: { select: { name: true, email: true } } },
  })

  return (
    <>
      <PageHeader
        title="سجل النشاط"
        description="آخر 200 إجراء في النظام."
      />

      <AdminTable
        headers={['الوقت', 'المستخدم', 'الإجراء', 'العنصر', 'التفاصيل']}
        empty={logs.length === 0}
        emptyMessage="لا توجد نشاطات مسجلة بعد."
      >
        {logs.map((log) => (
          <tr key={log.id}>
            <td className="admin-muted" style={{ whiteSpace: 'nowrap' }}>
              {log.createdAt.toLocaleString('ar-EG')}
            </td>
            <td>
              {log.user?.name || '—'}
              {log.user?.email ? (
                <div className="admin-muted">{log.user.email}</div>
              ) : null}
            </td>
            <td>
              <strong>{log.action}</strong>
            </td>
            <td className="admin-mono">
              {log.entity}
              {log.entityId ? (
                <div className="admin-muted">{log.entityId}</div>
              ) : null}
            </td>
            <td className="admin-muted">{log.detail || '—'}</td>
          </tr>
        ))}
      </AdminTable>
    </>
  )
}
