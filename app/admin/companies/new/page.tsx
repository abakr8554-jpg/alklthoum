import { PageHeader } from '@/components/admin/PageHeader'
import { CompanyForm } from '@/components/admin/CompanyForm'

export default function NewCompanyPage() {
  return (
    <>
      <PageHeader title="Add company" description="Create a partner company profile." />
      <div className="admin-card">
        <CompanyForm />
      </div>
    </>
  )
}
