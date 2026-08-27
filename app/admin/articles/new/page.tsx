import { PageHeader } from '@/components/admin/PageHeader'
import { ArticleForm } from '@/components/admin/ArticleForm'

export default function NewArticlePage() {
  return (
    <>
      <PageHeader title="Add article" description="Create a blog post or news article." />
      <div className="admin-card">
        <ArticleForm />
      </div>
    </>
  )
}
