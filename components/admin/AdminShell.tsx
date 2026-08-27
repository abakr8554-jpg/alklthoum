'use client'

import Link from 'next/link'
import { usePathname, redirect } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Building2,
  Bug,
  MapPin,
  HelpCircle,
  Mail,
  Image,
  Settings,
  Search,
  Users,
  Activity,
  LogOut,
  Newspaper,
} from 'lucide-react'
import { logoutAction } from '@/app/admin/actions'

const NAV = [
  { href: '/admin', label: 'الرئيسية', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'المنتجات', icon: Package },
  { href: '/admin/companies', label: 'الشركات', icon: Building2 },
  { href: '/admin/diseases', label: 'الأمراض', icon: Bug },
  { href: '/admin/distributors', label: 'الموزعون', icon: MapPin },
  { href: '/admin/articles', label: 'المقالات', icon: Newspaper },
  { href: '/admin/faqs', label: 'الأسئلة الشائعة', icon: HelpCircle },
  { href: '/admin/messages', label: 'الرسائل', icon: Mail },
  { href: '/admin/media', label: 'الوسائط', icon: Image },
  { href: '/admin/settings', label: 'الإعدادات', icon: Settings },
  { href: '/admin/seo', label: 'SEO', icon: Search },
  { href: '/admin/users', label: 'المستخدمون', icon: Users },
  { href: '/admin/activity', label: 'السجل', icon: Activity },
]

export type AdminUserInfo = {
  name: string
  email: string
  role: string
}

export function AdminShell({
  user,
  children,
}: {
  user: AdminUserInfo | null
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLogin = pathname === '/admin/login' || pathname.startsWith('/admin/login/')

  if (isLogin) {
    return <div className="admin-root" dir="rtl" lang="ar">{children}</div>
  }

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="admin-root" dir="rtl" lang="ar">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <span className="admin-brand-mark">CMS</span>
            <strong>لوحة الكلثوم</strong>
          </div>

          <nav className="admin-nav">
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`)
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className={active ? 'active' : undefined}>
                  <Icon className="admin-nav-icon" size={16} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-user">
              <strong>{user.name}</strong>
              {user.email} · {user.role}
            </div>
            <form action={logoutAction}>
              <button type="submit" className="admin-logout-btn">
                <LogOut size={14} />
                تسجيل الخروج
              </button>
            </form>
          </div>
        </aside>

        <main className="admin-main">{children}</main>
      </div>
    </div>
  )
}
