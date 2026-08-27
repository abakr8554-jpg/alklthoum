import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/db'
import {
  companies,
  products,
  diseases,
  distributors,
} from '../lib/data'
import { articles } from '../lib/articles'
import { SITE } from '../lib/site'

const LEGACY_DISTRIBUTOR_REGIONS = [
  'Biskra', 'Algiers', 'Oran', 'Constantine', 'Sétif', 'Ghardaïa',
]

async function main() {
  console.log('Seeding database…')

  const email = process.env.ADMIN_EMAIL || 'admin@alkalthoum.com'
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe_Agrico_2026!'
  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: 'Administrator', role: 'superadmin', active: true },
    create: {
      email,
      name: 'Administrator',
      passwordHash,
      role: 'superadmin',
      active: true,
    },
  })

  // Map old string IDs → new cuid IDs
  const companyIdMap = new Map<string, string>()

  for (const [i, c] of companies.entries()) {
    const row = await prisma.company.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        nameAr: c.nameAr,
        tagline: c.tagline,
        taglineAr: c.taglineAr,
        description: c.description,
        descriptionAr: c.descriptionAr,
        logo: c.logo || '/logo.png',
        coverImage: c.coverImage,
        servicesJson: JSON.stringify(c.services),
        email: c.contact.email,
        phone: c.contact.phone,
        address: c.contact.address,
        addressAr: c.contact.addressAr,
        externalUrl: c.externalUrl || null,
        sortOrder: i,
        published: true,
      },
      create: {
        slug: c.slug,
        name: c.name,
        nameAr: c.nameAr,
        tagline: c.tagline,
        taglineAr: c.taglineAr,
        description: c.description,
        descriptionAr: c.descriptionAr,
        logo: c.logo || '/logo.png',
        coverImage: c.coverImage,
        servicesJson: JSON.stringify(c.services),
        email: c.contact.email,
        phone: c.contact.phone,
        address: c.contact.address,
        addressAr: c.contact.addressAr,
        externalUrl: c.externalUrl || null,
        sortOrder: i,
        published: true,
      },
    })
    companyIdMap.set(c.id, row.id)
  }

  for (const [i, p] of products.entries()) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        companyId: companyIdMap.get(p.companyId) || null,
        category: p.category,
        name: p.name,
        nameAr: p.nameAr,
        shortDescription: p.shortDescription,
        shortDescriptionAr: p.shortDescriptionAr,
        description: p.description,
        descriptionAr: p.descriptionAr,
        imagesJson: JSON.stringify(p.images),
        targetCropsJson: JSON.stringify(p.targetCrops),
        targetCropsArJson: JSON.stringify(p.targetCropsAr),
        targetDiseasesJson: JSON.stringify(p.targetDiseases),
        benefitsJson: JSON.stringify(p.benefits),
        benefitsArJson: JSON.stringify(p.benefitsAr),
        usageInstructions: p.usageInstructions,
        usageInstructionsAr: p.usageInstructionsAr,
        applicationMethod: p.applicationMethod,
        applicationMethodAr: p.applicationMethodAr,
        aiRecommended: !!p.aiRecommended,
        sortOrder: i,
        published: true,
      },
      create: {
        slug: p.slug,
        companyId: companyIdMap.get(p.companyId) || null,
        category: p.category,
        name: p.name,
        nameAr: p.nameAr,
        shortDescription: p.shortDescription,
        shortDescriptionAr: p.shortDescriptionAr,
        description: p.description,
        descriptionAr: p.descriptionAr,
        imagesJson: JSON.stringify(p.images),
        targetCropsJson: JSON.stringify(p.targetCrops),
        targetCropsArJson: JSON.stringify(p.targetCropsAr),
        targetDiseasesJson: JSON.stringify(p.targetDiseases),
        benefitsJson: JSON.stringify(p.benefits),
        benefitsArJson: JSON.stringify(p.benefitsAr),
        usageInstructions: p.usageInstructions,
        usageInstructionsAr: p.usageInstructionsAr,
        applicationMethod: p.applicationMethod,
        applicationMethodAr: p.applicationMethodAr,
        aiRecommended: !!p.aiRecommended,
        sortOrder: i,
        published: true,
      },
    })
  }

  for (const d of diseases) {
    await prisma.disease.upsert({
      where: { slug: d.slug },
      update: {
        name: d.name,
        nameAr: d.nameAr,
        scientificName: d.scientificName || null,
        description: d.description,
        descriptionAr: d.descriptionAr,
        cause: d.cause,
        causeAr: d.causeAr,
        affectedCropsJson: JSON.stringify(d.affectedCrops),
        affectedCropsArJson: JSON.stringify(d.affectedCropsAr),
        symptomsJson: JSON.stringify(d.symptoms),
        symptomsArJson: JSON.stringify(d.symptomsAr),
        treatmentStepsJson: JSON.stringify(d.treatmentSteps),
        treatmentStepsArJson: JSON.stringify(d.treatmentStepsAr),
        preventionTipsJson: JSON.stringify(d.preventionTips),
        preventionTipsArJson: JSON.stringify(d.preventionTipsAr),
        severity: d.severity,
        image: d.image,
        recommendedProductIdsJson: JSON.stringify(d.recommendedProductIds),
        published: true,
      },
      create: {
        slug: d.slug,
        name: d.name,
        nameAr: d.nameAr,
        scientificName: d.scientificName || null,
        description: d.description,
        descriptionAr: d.descriptionAr,
        cause: d.cause,
        causeAr: d.causeAr,
        affectedCropsJson: JSON.stringify(d.affectedCrops),
        affectedCropsArJson: JSON.stringify(d.affectedCropsAr),
        symptomsJson: JSON.stringify(d.symptoms),
        symptomsArJson: JSON.stringify(d.symptomsAr),
        treatmentStepsJson: JSON.stringify(d.treatmentSteps),
        treatmentStepsArJson: JSON.stringify(d.treatmentStepsAr),
        preventionTipsJson: JSON.stringify(d.preventionTips),
        preventionTipsArJson: JSON.stringify(d.preventionTipsAr),
        severity: d.severity,
        image: d.image,
        recommendedProductIdsJson: JSON.stringify(d.recommendedProductIds),
        published: true,
      },
    })
  }

  // Distributors — sync from lib/data (replace legacy Algeria entries)
  await prisma.distributor.deleteMany({
    where: { region: { in: LEGACY_DISTRIBUTOR_REGIONS } },
  })

  for (const d of distributors) {
    const existing = await prisma.distributor.findFirst({
      where: { name: d.name },
    })
    const data = {
      name: d.name,
      nameAr: d.nameAr,
      region: d.region,
      regionAr: d.regionAr,
      wilaya: d.wilaya,
      wilayaAr: d.wilayaAr,
      address: d.address,
      addressAr: d.addressAr,
      phone: d.phone,
      whatsapp: d.whatsapp,
      lat: d.lat,
      lng: d.lng,
      published: true,
    }
    if (existing) {
      await prisma.distributor.update({ where: { id: existing.id }, data })
    } else {
      await prisma.distributor.create({ data })
    }
  }

  for (const [i, a] of articles.entries()) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        titleAr: a.titleAr,
        excerpt: a.excerpt,
        excerptAr: a.excerptAr,
        content: a.content,
        contentAr: a.contentAr,
        coverImage: a.coverImage,
        author: a.author,
        authorAr: a.authorAr,
        category: a.category,
        published: true,
        publishedAt: new Date(a.publishedAt),
        sortOrder: i,
      },
      create: {
        slug: a.slug,
        title: a.title,
        titleAr: a.titleAr,
        excerpt: a.excerpt,
        excerptAr: a.excerptAr,
        content: a.content,
        contentAr: a.contentAr,
        coverImage: a.coverImage,
        author: a.author,
        authorAr: a.authorAr,
        category: a.category,
        published: true,
        publishedAt: new Date(a.publishedAt),
        sortOrder: i,
      },
    })
  }

  const faqCount = await prisma.faq.count()
  if (faqCount === 0) {
    const faqs = [
      {
        question: 'What products does Al Kalthoum Group offer?',
        questionAr: 'ما المنتجات التي تقدمها مجموعة الكلثوم؟',
        answer:
          'We provide seeds, agricultural plastics, irrigation hoses, fertilizers & crop protection, and growing media through our specialized divisions.',
        answerAr:
          'نوفر البذور والبلاستيك الزراعي وخراطيم الري والأسمدة وحماية المحاصيل ووسائط الزراعة عبر أقسامنا المتخصصة.',
      },
      {
        question: 'How can I find a local distributor?',
        questionAr: 'كيف أجد موزعاً محلياً؟',
        answer: 'Visit our Distributors page and filter by region, or contact us and we will connect you with the nearest partner.',
        answerAr: 'زر صفحة الموزعين وفلتر حسب المنطقة، أو تواصل معنا لنوصلك بأقرب شريك.',
      },
      {
        question: 'How does the AI plant assistant work?',
        questionAr: 'كيف يعمل المساعد الذكي للنباتات؟',
        answer:
          'Upload a clear photo of the affected plant. Our system analyzes visible symptoms and suggests matching treatments from our catalog.',
        answerAr:
          'ارفع صورة واضحة للنبات المصاب. يحلل النظام الأعراض الظاهرة ويقترح علاجات مطابقة من كتالوجنا.',
      },
    ]
    for (const [i, f] of faqs.entries()) {
      await prisma.faq.create({ data: { ...f, sortOrder: i, published: true } })
    }
  }

  const settings: Record<string, string> = {
    site_name: SITE.name,
    site_name_ar: SITE.nameAr,
    tagline: SITE.tagline,
    tagline_ar: SITE.taglineAr,
    email: SITE.email,
    phone: SITE.phone,
    whatsapp: SITE.whatsapp,
    address_en: SITE.address.en,
    address_ar: SITE.address.ar,
    facebook: SITE.social.facebook,
    instagram: SITE.social.instagram,
    linkedin: SITE.social.linkedin,
    founded_year: String(SITE.foundedYear),
    logo: SITE.logo,
  }
  for (const [key, value] of Object.entries(settings)) {
    await prisma.websiteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  }

  const seoPages = [
    {
      path: '/',
      title: 'Al Kalthoum Group | Agricultural Solutions',
      titleAr: 'مجموعة الكلثوم | معاً نصنع المستقبل',
      description:
        'Agricultural plastics, irrigation, seeds, fertilizers and AI plant diagnostics from Al Kalthoum Group.',
      descriptionAr: 'بلاستيك زراعي وري وبذور وأسمدة وتشخيص ذكي للنباتات من مجموعة الكلثوم.',
    },
    {
      path: '/about',
      title: 'About Al Kalthoum Group',
      titleAr: 'عن مجموعة الكلثوم',
      description: 'Our story, values, and commitment to modern agriculture.',
      descriptionAr: 'قصتنا وقيمنا والتزامنا بالزراعة الحديثة.',
    },
    {
      path: '/products',
      title: 'Products | Al Kalthoum Group',
      titleAr: 'المنتجات | مجموعة الكلثوم',
      description: 'Browse seeds, plastics, irrigation, fertilizers and soil products.',
      descriptionAr: 'تصفح البذور والبلاستيك والري والأسمدة ومنتجات التربة.',
    },
    {
      path: '/blog',
      title: 'Blog & Articles | Al Kalthoum Group',
      titleAr: 'المدونة والمقالات | مجموعة الكلثوم',
      description: 'News, tips, and agricultural insights from Al Kalthoum Group.',
      descriptionAr: 'أخبار ونصائح ورؤى زراعية من مجموعة الكلثوم.',
    },
    {
      path: '/contact',
      title: 'Contact | Al Kalthoum Group',
      titleAr: 'اتصل بنا | مجموعة الكلثوم',
      description: 'Get in touch with Al Kalthoum Group for products, partnerships and support.',
      descriptionAr: 'تواصل مع مجموعة الكلثوم للمنتجات والشراكات والدعم.',
    },
  ]
  for (const page of seoPages) {
    await prisma.seoPage.upsert({
      where: { path: page.path },
      update: page,
      create: page,
    })
  }

  console.log('Seed complete.')
  console.log(`Admin login: ${email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
