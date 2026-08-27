import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { ArticleForm } from '@/components/admin/ArticleForm'

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()

  return (
    <>
      <PageHeader title="Edit article" description={article.title} />
      <div className="admin-card">
        <ArticleForm
          article={{
            id: article.id,
            slug: article.slug,
            title: article.title,
            titleAr: article.titleAr,
            excerpt: article.excerpt,
            excerptAr: article.excerptAr,
            content: article.content,
            contentAr: article.contentAr,
            coverImage: article.coverImage,
            author: article.author,
            authorAr: article.authorAr,
            category: article.category,
            publishedAt: article.publishedAt.toISOString(),
            sortOrder: article.sortOrder,
            published: article.published,
          }}
        />
      </div>
    </>
  )
}
