import Link from 'next/link'
import { prisma } from '@/lib/db'
import { deleteArticleAction } from '@/app/admin/actions'
import { PageHeader, AddLink } from '@/components/admin/PageHeader'
import { AdminTable } from '@/components/admin/AdminTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmDelete } from '@/components/admin/ConfirmDelete'
import { ARTICLE_CATEGORY_LABELS, type ArticleCategory } from '@/lib/articles'

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: [{ publishedAt: 'desc' }, { sortOrder: 'asc' }],
  })

  return (
    <>
      <PageHeader
        title="المقالات والمدونة"
        description={`${articles.length} مقال`}
        actions={<AddLink href="/admin/articles/new" label="إضافة مقال" />}
      />

      <AdminTable
        headers={['المقال', 'التصنيف', 'تاريخ النشر', 'الحالة', 'إجراءات']}
        empty={articles.length === 0}
        emptyMessage="لا توجد مقالات بعد."
      >
        {articles.map((a) => (
          <tr key={a.id}>
            <td>
              <strong>{a.title}</strong>
              <div className="admin-muted admin-mono">{a.slug}</div>
              <div className="admin-muted" style={{ maxWidth: 420 }}>
                {a.excerpt.slice(0, 100)}
                {a.excerpt.length > 100 ? '…' : ''}
              </div>
            </td>
            <td>
              <span className="admin-badge">
                {ARTICLE_CATEGORY_LABELS[a.category as ArticleCategory]?.ar || a.category}
              </span>
            </td>
            <td>{a.publishedAt.toLocaleDateString('ar-EG')}</td>
            <td>
              <StatusBadge status={a.published} trueLabel="منشور" falseLabel="مسودة" />
            </td>
            <td>
              <div className="admin-actions">
                <Link
                  href={`/admin/articles/${a.id}/edit`}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                >
                  تعديل
                </Link>
                <a
                  href={`/blog/${a.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                >
                  عرض
                </a>
                <ConfirmDelete
                  action={deleteArticleAction.bind(null, a.id)}
                  confirmMessage={`حذف "${a.title}"؟`}
                />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  )
}
