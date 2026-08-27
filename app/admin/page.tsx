import Link from 'next/link'
import { prisma } from '@/lib/db'
import { getAdminStats } from '@/lib/cms/queries'
import { PageHeader } from '@/components/admin/PageHeader'
import { AdminTable } from '@/components/admin/AdminTable'
import { StatusBadge } from '@/components/admin/StatusBadge'

export default async function AdminOverviewPage() {
  const [stats, messages, logs] = await Promise.all([
    getAdminStats(),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
    prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 12,
      include: { user: { select: { name: true, email: true } } },
    }),
  ])

  return (
    <>
      <PageHeader
        title="نظرة عامة"
        description="المحتوى والرسائل في لمحة سريعة."
        actions={
          <Link href="/admin/messages" className="admin-btn admin-btn-secondary">
            عرض الرسائل
          </Link>
        }
      />

      <div className="admin-kpi-grid">
        <div className="admin-kpi">
          <div className="admin-kpi-label">المنتجات</div>
          <div className="admin-kpi-value">{stats.products}</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-label">الشركات</div>
          <div className="admin-kpi-value">{stats.companies}</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-label">الموزعون</div>
          <div className="admin-kpi-value">{stats.distributors}</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-label">المقالات</div>
          <div className="admin-kpi-value">{stats.articles}</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-label">الرسائل</div>
          <div className="admin-kpi-value">{stats.messages}</div>
          {stats.unread > 0 ? <div className="admin-kpi-hint">{stats.unread} جديدة</div> : null}
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-label">الوسائط</div>
          <div className="admin-kpi-value">{stats.media}</div>
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <h2>آخر الرسائل</h2>
          <AdminTable
            headers={['المرسل', 'الموضوع', 'الحالة', 'التاريخ']}
            empty={messages.length === 0}
            emptyMessage="لا توجد رسائل بعد."
          >
            {messages.map((m) => (
              <tr key={m.id}>
                <td>
                  <strong>{m.name}</strong>
                  <div className="admin-muted">{m.email}</div>
                </td>
                <td>{m.subject || '—'}</td>
                <td>
                  <StatusBadge status={m.status} />
                </td>
                <td className="admin-muted">{m.createdAt.toLocaleString('ar-EG')}</td>
              </tr>
            ))}
          </AdminTable>
        </div>

        <div className="admin-card">
          <h2>آخر النشاطات</h2>
          <AdminTable
            headers={['الإجراء', 'العنصر', 'المستخدم', 'الوقت']}
            empty={logs.length === 0}
            emptyMessage="لا توجد نشاطات بعد."
          >
            {logs.map((log) => (
              <tr key={log.id}>
                <td>
                  <strong>{log.action}</strong>
                  {log.detail ? <div className="admin-muted">{log.detail}</div> : null}
                </td>
                <td className="admin-mono">
                  {log.entity}
                  {log.entityId ? ` · ${log.entityId.slice(0, 8)}` : ''}
                </td>
                <td className="admin-muted">{log.user?.name || '—'}</td>
                <td className="admin-muted">{log.createdAt.toLocaleString('ar-EG')}</td>
              </tr>
            ))}
          </AdminTable>
        </div>
      </div>
    </>
  )
}
