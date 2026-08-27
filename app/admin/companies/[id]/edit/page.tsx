import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { CompanyForm } from '@/components/admin/CompanyForm'

export default async function EditCompanyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const company = await prisma.company.findUnique({ where: { id } })
  if (!company) notFound()

  return (
    <>
      <PageHeader title="Edit company" description={company.name} />
      <div className="admin-card">
        <CompanyForm
          company={{
            id: company.id,
            name: company.name,
            nameAr: company.nameAr,
            slug: company.slug,
            tagline: company.tagline,
            taglineAr: company.taglineAr,
            description: company.description,
            descriptionAr: company.descriptionAr,
            logo: company.logo,
            coverImage: company.coverImage,
            email: company.email,
            phone: company.phone,
            address: company.address,
            addressAr: company.addressAr,
            published: company.published,
          }}
        />
      </div>
    </>
  )
}
