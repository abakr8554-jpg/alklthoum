import { prisma } from '@/lib/db'
import { deleteDistributorAction } from '@/app/admin/actions'
import { PageHeader } from '@/components/admin/PageHeader'
import { ConfirmDelete } from '@/components/admin/ConfirmDelete'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { DistributorForm } from '@/components/admin/DistributorForm'

export default async function DistributorsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>
}) {
  const { edit } = await searchParams
  const distributors = await prisma.distributor.findMany({ orderBy: { name: 'asc' } })
  const editing = edit ? distributors.find((d) => d.id === edit) : null

  return (
    <>
      <PageHeader
        title="الموزعون"
        description={`${distributors.length} موزع`}
      />

      <div className="admin-card">
        <h2>{editing ? `تعديل · ${editing.name}` : 'إضافة موزع'}</h2>
        <DistributorForm
          key={editing?.id || 'new'}
          distributor={
            editing
              ? {
                  id: editing.id,
                  name: editing.name,
                  nameAr: editing.nameAr,
                  region: editing.region,
                  regionAr: editing.regionAr,
                  wilaya: editing.wilaya,
                  wilayaAr: editing.wilayaAr,
                  address: editing.address,
                  addressAr: editing.addressAr,
                  phone: editing.phone,
                  whatsapp: editing.whatsapp,
                  lat: editing.lat,
                  lng: editing.lng,
                  published: editing.published,
                }
              : undefined
          }
          submitLabel={editing ? 'تحديث الموزع' : 'إنشاء موزع'}
        />
      </div>

      <div className="admin-card">
        <h2>جميع الموزعين</h2>
        <div className="admin-inline-forms">
          {distributors.length === 0 ? (
            <p className="admin-empty">لا يوجد موزعون بعد.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>الولاية</th>
                    <th>الهاتف</th>
                    <th>الحالة</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {distributors.map((d) => (
                    <tr key={d.id}>
                      <td>
                        <strong>{d.name}</strong>
                        <div className="admin-muted">{d.address || '—'}</div>
                      </td>
                      <td>
                        <span className="admin-badge">{d.wilaya || '—'}</span>
                      </td>
                      <td>{d.phone || '—'}</td>
                      <td>
                        <StatusBadge status={d.published} trueLabel="منشور" falseLabel="مسودة" />
                      </td>
                      <td>
                        <div className="admin-actions">
                          <a
                            href={`/admin/distributors?edit=${d.id}`}
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                          >
                            تعديل
                          </a>
                          <ConfirmDelete
                            action={deleteDistributorAction.bind(null, d.id)}
                            confirmMessage={`حذف "${d.name}"؟`}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
