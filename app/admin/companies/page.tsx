import Link from 'next/link'
import { prisma } from '@/lib/db'
import { deleteCompanyAction } from '@/app/admin/actions'
import { PageHeader, AddLink } from '@/components/admin/PageHeader'
import { AdminTable } from '@/components/admin/AdminTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmDelete } from '@/components/admin/ConfirmDelete'

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: true } } },
  })

  return (
    <>
      <PageHeader
        title="الشركات"
        description={`${companies.length} شركة`}
        actions={<AddLink href="/admin/companies/new" label="إضافة شركة" />}
      />

      <AdminTable
        headers={['الشركة', 'المعرف', 'المنتجات', 'الحالة', 'إجراءات']}
        empty={companies.length === 0}
        emptyMessage="لا توجد شركات بعد."
      >
        {companies.map((c) => (
          <tr key={c.id}>
            <td>
              <strong>{c.name}</strong>
              <div className="admin-muted">{c.tagline || '—'}</div>
            </td>
            <td className="admin-mono">{c.slug}</td>
            <td>{c._count.products}</td>
            <td>
              <StatusBadge status={c.published} trueLabel="منشور" falseLabel="مسودة" />
            </td>
            <td>
              <div className="admin-actions">
                <Link
                  href={`/admin/companies/${c.id}/edit`}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                >
                  تعديل
                </Link>
                <ConfirmDelete
                  action={deleteCompanyAction.bind(null, c.id)}
                  confirmMessage={`حذف "${c.name}"؟`}
                />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  )
}
