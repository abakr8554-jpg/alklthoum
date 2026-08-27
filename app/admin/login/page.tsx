import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { LoginForm } from '@/components/admin/LoginForm'

export const metadata = {
  title: 'تسجيل الدخول · الكلثوم CMS',
}

export default async function AdminLoginPage() {
  const session = await getSession()
  if (session?.userId) {
    redirect('/admin')
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <div className="mark">AK</div>
          <h1>لوحة الكلثوم</h1>
          <p>سجّل دخولك لإدارة المحتوى</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
