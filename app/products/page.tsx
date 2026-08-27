import { Suspense } from 'react'
import { getProducts } from '@/lib/cms/queries'
import ProductsClient from './products-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Products | Al Kalthoum Group',
  description: 'Agricultural products — greenhouse films, drip irrigation, seeds, fertilizers and more.',
}

export default async function ProductsPage() {
  const products = await getProducts(true)
  return (
    <Suspense
      fallback={
        <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: '#173b2b' }}>
          Loading products…
        </main>
      }
    >
      <ProductsClient products={products} />
    </Suspense>
  )
}
