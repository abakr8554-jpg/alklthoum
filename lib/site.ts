/**
 * Canonical brand & site configuration.
 * Real contact channels from the established public site are preserved.
 * Editable overrides live in WebsiteSettings (CMS).
 */

export const SITE = {
  name: 'Al Kalthoum Group',
  nameAr: 'مجموعة الكلثوم',
  tagline: 'Together We Make the Future',
  taglineAr: 'معاً نصنع المستقبل',
  foundedYear: 1993,
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://alkalthoum.com',
  email: 'info@alkalthoum.com',
  phone: '+20 109 330 9222',
  phoneTel: '+201093309222',
  whatsapp: '201093309222',
  address: {
    en: 'Egypt–Alexandria Desert Road, Egypt',
    ar: 'طريق مصر إسكندرية الصحراوي، مصر',
  },
  social: {
    facebook: 'https://www.facebook.com/share/1FmPM6DL6w/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/sona_plast_?igsh=bmMzaG9pbGJ3a21m&utm_source=qr',
    linkedin: '',
  },
  logo: '/logo.png',
  defaultOgImage: '/logo.png',
} as const

export const NAV_LINKS = [
  { href: '/', en: 'Home', ar: 'الرئيسية' },
  { href: '/about', en: 'About', ar: 'عن الشركة' },
  { href: '/companies', en: 'Our Group', ar: 'المجموعة' },
  { href: '/products', en: 'Divisions', ar: 'أقسام' },
  { href: '/blog', en: 'Blog', ar: 'المدونة' },
  { href: '/distributors', en: 'Distributors', ar: 'الموزعون' },
  { href: '/ai-assistant', en: 'AI Assistant', ar: 'المساعد الذكي' },
  { href: '/contact', en: 'Contact', ar: 'اتصل بنا' },
] as const

export const FOOTER_LINKS = {
  explore: [
    { href: '/', en: 'Home', ar: 'الرئيسية' },
    { href: '/about', en: 'About', ar: 'من نحن' },
    { href: '/products', en: 'Divisions', ar: 'أقسام' },
    { href: '/companies', en: 'Our Group', ar: 'المجموعة' },
    { href: '/blog', en: 'Blog', ar: 'المدونة' },
  ],
  services: [
    { href: '/ai-assistant', en: 'AI Assistant', ar: 'المساعد الذكي' },
    { href: '/diseases', en: 'Plant Diseases', ar: 'أمراض النباتات' },
    { href: '/distributors', en: 'Find Distributor', ar: 'الموزعون' },
    { href: '/contact', en: 'Contact', ar: 'اتصل بنا' },
    { href: '/faq', en: 'FAQ', ar: 'الأسئلة الشائعة' },
  ],
  legal: [
    { href: '/privacy', en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    { href: '/terms', en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  ],
} as const
