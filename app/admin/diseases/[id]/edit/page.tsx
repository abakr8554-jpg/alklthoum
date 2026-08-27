import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { DiseaseForm } from '@/components/admin/DiseaseForm'

export default async function EditDiseasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const disease = await prisma.disease.findUnique({ where: { id } })
  if (!disease) notFound()

  return (
    <>
      <PageHeader title="Edit disease" description={disease.name} />
      <div className="admin-card">
        <DiseaseForm
          disease={{
            id: disease.id,
            name: disease.name,
            nameAr: disease.nameAr,
            slug: disease.slug,
            scientificName: disease.scientificName,
            description: disease.description,
            descriptionAr: disease.descriptionAr,
            severity: disease.severity,
            image: disease.image,
            published: disease.published,
          }}
        />
      </div>
    </>
  )
}
