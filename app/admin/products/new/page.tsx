import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { ProductForm } from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const companies = await prisma.company.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  })

  return (
    <>
      <PageHeader title="Add product" description="Create a new catalog product." />
      <div className="admin-card">
        <ProductForm companies={companies} />
      </div>
    </>
  )
}
