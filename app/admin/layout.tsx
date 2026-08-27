import { getSession } from '@/lib/auth'
import { AdminShell } from '@/components/admin/AdminShell'
import './admin.css'

export const metadata = {
  title: 'الكلثوم CMS',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  const user = session
    ? { name: session.name, email: session.email, role: session.role }
    : null

  return (
    <>
      {/* Arabic font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');`}</style>
      <AdminShell user={user}>{children}</AdminShell>
    </>
  )
}
