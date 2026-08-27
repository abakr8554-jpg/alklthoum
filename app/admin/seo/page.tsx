import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { SeoForm } from '@/components/admin/SeoForm'

export default async function SeoPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>
}) {
  const { path: editPath } = await searchParams
  const pages = await prisma.seoPage.findMany({ orderBy: { path: 'asc' } })
  const editing = editPath ? pages.find((p) => p.path === editPath) : null

  return (
    <>
      <PageHeader title="SEO" description="عناوين وأوصاف meta لكل صفحة." />

      <div className="admin-card">
        <h2>{editing ? `تعديل · ${editing.path}` : 'إضافة / تحديث صفحة SEO'}</h2>
        <SeoForm
          key={editing?.path || 'new'}
          seo={
            editing
              ? {
                  path: editing.path,
                  title: editing.title,
                  titleAr: editing.titleAr,
                  description: editing.description,
                  descriptionAr: editing.descriptionAr,
                  ogImage: editing.ogImage,
                  canonical: editing.canonical,
                  noIndex: editing.noIndex,
                }
              : { path: '/' }
          }
        />
      </div>

      <div className="admin-card">
        <h2>صفحات SEO</h2>
        {pages.length === 0 ? (
          <p className="admin-empty">لا توجد إدخالات SEO بعد.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>المسار</th>
                  <th>العنوان</th>
                  <th>الفهرسة</th>
                  <th>آخر تحديث</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p.id}>
                    <td className="admin-mono">{p.path}</td>
                    <td>
                      <strong>{p.title || '—'}</strong>
                      <div className="admin-muted">
                        {(p.description || '').slice(0, 80)}
                        {(p.description || '').length > 80 ? '…' : ''}
                      </div>
                    </td>
                    <td>
                      <StatusBadge
                        status={!p.noIndex}
                        trueLabel="مفهرسة"
                        falseLabel="noindex"
                      />
                    </td>
                    <td className="admin-muted">{p.updatedAt.toLocaleString('ar-EG')}</td>
                    <td>
                      <a
                        href={`/admin/seo?path=${encodeURIComponent(p.path)}`}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        تعديل
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
