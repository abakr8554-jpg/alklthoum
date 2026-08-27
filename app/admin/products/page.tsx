import Link from 'next/link'
import { prisma } from '@/lib/db'
import { deleteProductAction } from '@/app/admin/actions'
import { PageHeader, AddLink } from '@/components/admin/PageHeader'
import { AdminTable } from '@/components/admin/AdminTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmDelete } from '@/components/admin/ConfirmDelete'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = (q || '').trim()

  const products = await prisma.product.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query } },
            { nameAr: { contains: query } },
            { slug: { contains: query } },
            { category: { contains: query } },
          ],
        }
      : undefined,
    include: { company: { select: { name: true } } },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <>
      <PageHeader
        title="المنتجات"
        description={`${products.length} منتج`}
        actions={<AddLink href="/admin/products/new" label="إضافة منتج" />}
      />

      <form className="admin-search" method="get">
        <input name="q" defaultValue={query} placeholder="ابحث عن منتج…" />
        <button type="submit" className="admin-btn admin-btn-secondary">
          بحث
        </button>
        {query ? (
          <Link href="/admin/products" className="admin-btn admin-btn-ghost">
            مسح
          </Link>
        ) : null}
      </form>

      <AdminTable
        headers={['المنتج', 'التصنيف', 'الشركة', 'الحالة', 'إجراءات']}
        empty={products.length === 0}
        emptyMessage={query ? 'لا توجد منتجات تطابق بحثك.' : 'لا توجد منتجات بعد.'}
      >
        {products.map((p) => (
          <tr key={p.id}>
            <td>
              <strong>{p.name}</strong>
              <div className="admin-muted admin-mono">{p.slug}</div>
            </td>
            <td>
              <span className="admin-badge admin-badge-info">{p.category}</span>
            </td>
            <td>{p.company?.name || '—'}</td>
            <td>
              <StatusBadge status={p.published} trueLabel="منشور" falseLabel="مسودة" />
              {p.aiRecommended ? (
                <span className="admin-badge admin-badge-warn" style={{ marginRight: 6 }}>
                  AI
                </span>
              ) : null}
            </td>
            <td>
              <div className="admin-actions">
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                >
                  تعديل
                </Link>
                <ConfirmDelete
                  action={deleteProductAction.bind(null, p.id)}
                  confirmMessage={`حذف "${p.name}"؟`}
                />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  )
}
