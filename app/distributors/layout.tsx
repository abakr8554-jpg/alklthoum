import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Distributors',
  description:
    'Find your nearest authorized Al Kalthoum distributor for products and on-the-ground technical support.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
