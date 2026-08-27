import { PageHeader } from '@/components/admin/PageHeader'
import { DiseaseForm } from '@/components/admin/DiseaseForm'

export default function NewDiseasePage() {
  return (
    <>
      <PageHeader title="Add disease" description="Create a plant disease entry." />
      <div className="admin-card">
        <DiseaseForm />
      </div>
    </>
  )
}
