import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireAdmin, canManageUsers } from '@/lib/auth'
import { PageHeader } from '@/components/admin/PageHeader'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { UserCreateForm } from '@/components/admin/UserCreateForm'

export default async function UsersPage() {
  const auth = await requireAdmin()
  if (!auth) redirect('/admin/login')

  const isSuper = canManageUsers(auth.user.role)
  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
    },
  })

  return (
    <>
      <PageHeader
        title="المستخدمون"
        description={
          isSuper
            ? 'إدارة مديري النظام.'
            : 'عرض المديرين. فقط المسؤولون الرئيسيون يمكنهم إنشاء مستخدمين.'
        }
      />

      {isSuper ? (
        <div className="admin-card">
          <h2>إنشاء مستخدم</h2>
          <UserCreateForm />
        </div>
      ) : (
        <div className="admin-card">
          <p className="admin-muted">تحتاج صلاحية المسؤول الرئيسي لإنشاء مستخدمين.</p>
        </div>
      )}

      <div className="admin-card">
        <h2>مستخدمو النظام</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الدور</th>
                <th>الحالة</th>
                <th>تاريخ الإنشاء</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <strong>{u.name}</strong>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className="admin-badge admin-badge-info">{u.role}</span>
                  </td>
                  <td>
                    <StatusBadge
                      status={u.active}
                      trueLabel="نشط"
                      falseLabel="موقوف"
                    />
                  </td>
                  <td className="admin-muted">{u.createdAt.toLocaleDateString('ar-EG')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
