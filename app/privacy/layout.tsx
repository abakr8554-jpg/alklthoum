import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Al Kalthoum Group handles and protects your information.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
