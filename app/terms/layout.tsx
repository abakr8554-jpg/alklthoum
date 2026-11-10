import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that govern use of the Al Kalthoum Group website.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
