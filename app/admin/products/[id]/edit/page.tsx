import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { ProductForm } from '@/components/admin/ProductForm'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, companies] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.company.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    }),
  ])

  if (!product) notFound()

  let images = ''
  try {
    const parsed = JSON.parse(product.imagesJson || '[]') as string[]
    images = Array.isArray(parsed) ? parsed.join('\n') : ''
  } catch {
    images = ''
  }

  return (
    <>
      <PageHeader title="Edit product" description={product.name} />
      <div className="admin-card">
        <ProductForm
          companies={companies}
          product={{
            id: product.id,
            name: product.name,
            nameAr: product.nameAr,
            slug: product.slug,
            category: product.category,
            companyId: product.companyId,
            shortDescription: product.shortDescription,
            shortDescriptionAr: product.shortDescriptionAr,
            description: product.description,
            descriptionAr: product.descriptionAr,
            images,
            published: product.published,
            aiRecommended: product.aiRecommended,
          }}
        />
      </div>
    </>
  )
}
