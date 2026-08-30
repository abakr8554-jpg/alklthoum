import { Suspense } from 'react'
import { getDiseases } from '@/lib/cms/queries'
import DiseasesClient from './diseases-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Plant Diseases',
  description:
    'A reference library of common plant diseases — symptoms, causes, treatment and prevention for greenhouse and field crops.',
}

export default async function DiseasesPage() {
  const diseases = await getDiseases(true)
  return (
    <Suspense
      fallback={
        <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: '#173b2b' }}>
          Loading…
        </main>
      }
    >
      <DiseasesClient diseases={diseases} />
    </Suspense>
  )
}
