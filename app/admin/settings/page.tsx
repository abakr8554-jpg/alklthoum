import { prisma } from '@/lib/db'
import { getSettingsMap } from '@/lib/cms/queries'
import { PageHeader } from '@/components/admin/PageHeader'
import { SettingsForm } from '@/components/admin/SettingsForm'

export default async function SettingsPage() {
  const settings = await getSettingsMap()
  const rows = await prisma.websiteSetting.findMany()
  const raw: Record<string, string> = {}
  for (const r of rows) raw[r.key] = r.value

  const values: Record<string, string> = {
    site_name: raw.site_name || settings.siteName,
    site_name_ar: raw.site_name_ar || settings.siteNameAr,
    tagline: raw.tagline || settings.tagline,
    tagline_ar: raw.tagline_ar || settings.taglineAr,
    email: raw.email || settings.email,
    phone: raw.phone || settings.phone,
    whatsapp: raw.whatsapp || settings.whatsapp,
    address_en: raw.address_en || settings.addressEn,
    address_ar: raw.address_ar || settings.addressAr,
    facebook: raw.facebook || settings.facebook,
    instagram: raw.instagram || settings.instagram,
    linkedin: raw.linkedin || settings.linkedin,
    founded_year: raw.founded_year || settings.foundedYear,
    logo: raw.logo || settings.logo,
  }

  return (
    <>
      <PageHeader title="الإعدادات" description="هوية الموقع وبيانات التواصل." />
      <div className="admin-card">
        <SettingsForm values={values} />
      </div>
    </>
  )
}
