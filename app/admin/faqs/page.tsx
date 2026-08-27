import { prisma } from '@/lib/db'
import { deleteFaqAction } from '@/app/admin/actions'
import { PageHeader } from '@/components/admin/PageHeader'
import { ConfirmDelete } from '@/components/admin/ConfirmDelete'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { FaqForm } from '@/components/admin/FaqForm'

export default async function FaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>
}) {
  const { edit } = await searchParams
  const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: 'asc' } })
  const editing = edit ? faqs.find((f) => f.id === edit) : null

  return (
    <>
      <PageHeader title="الأسئلة الشائعة" description={`${faqs.length} سؤال`} />

      <div className="admin-card">
        <h2>{editing ? 'تعديل سؤال' : 'إضافة سؤال'}</h2>
        <FaqForm
          key={editing?.id || 'new'}
          faq={
            editing
              ? {
                  id: editing.id,
                  question: editing.question,
                  questionAr: editing.questionAr,
                  answer: editing.answer,
                  answerAr: editing.answerAr,
                  sortOrder: editing.sortOrder,
                  published: editing.published,
                }
              : undefined
          }
          submitLabel={editing ? 'تحديث السؤال' : 'إنشاء السؤال'}
        />
      </div>

      <div className="admin-card">
        <h2>جميع الأسئلة</h2>
        {faqs.length === 0 ? (
          <p className="admin-empty">لا توجد أسئلة بعد.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>الترتيب</th>
                  <th>السؤال</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((f) => (
                  <tr key={f.id}>
                    <td>{f.sortOrder}</td>
                    <td>
                      <strong>{f.question}</strong>
                      <div className="admin-muted" style={{ maxWidth: 420 }}>
                        {f.answer.slice(0, 120)}
                        {f.answer.length > 120 ? '…' : ''}
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={f.published} trueLabel="منشور" falseLabel="مسودة" />
                    </td>
                    <td>
                      <div className="admin-actions">
                        <a
                          href={`/admin/faqs?edit=${f.id}`}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          تعديل
                        </a>
                        <ConfirmDelete
                          action={deleteFaqAction.bind(null, f.id)}
                          confirmMessage="حذف هذا السؤال؟"
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
    </>
  )
}
