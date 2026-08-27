import Link from 'next/link'
import { prisma } from '@/lib/db'
import { deleteDiseaseAction } from '@/app/admin/actions'
import { PageHeader, AddLink } from '@/components/admin/PageHeader'
import { AdminTable } from '@/components/admin/AdminTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmDelete } from '@/components/admin/ConfirmDelete'

export default async function DiseasesPage() {
  const diseases = await prisma.disease.findMany({ orderBy: { name: 'asc' } })

  return (
    <>
      <PageHeader
        title="الأمراض"
        description={`${diseases.length} مرض`}
        actions={<AddLink href="/admin/diseases/new" label="إضافة مرض" />}
      />

      <AdminTable
        headers={['المرض', 'الاسم العلمي', 'الخطورة', 'الحالة', 'إجراءات']}
        empty={diseases.length === 0}
        emptyMessage="لا توجد أمراض بعد."
      >
        {diseases.map((d) => (
          <tr key={d.id}>
            <td>
              <strong>{d.name}</strong>
              <div className="admin-muted admin-mono">{d.slug}</div>
            </td>
            <td>
              <em className="admin-muted">{d.scientificName || '—'}</em>
            </td>
            <td>
              <StatusBadge status={d.severity} />
            </td>
            <td>
              <StatusBadge status={d.published} trueLabel="منشور" falseLabel="مسودة" />
            </td>
            <td>
              <div className="admin-actions">
                <Link
                  href={`/admin/diseases/${d.id}/edit`}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                >
                  تعديل
                </Link>
                <ConfirmDelete
                  action={deleteDiseaseAction.bind(null, d.id)}
                  confirmMessage={`حذف "${d.name}"؟`}
                />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  )
}
