import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Assistant',
  description:
    'Upload a plant photo — the Al Kalthoum AI assistant detects the issue and recommends matching treatments from our catalog.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
