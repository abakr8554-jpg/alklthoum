export type ArticleCategory = 'news' | 'tips' | 'industry' | 'company'

export interface Article {
  id: string
  slug: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  content: string
  contentAr: string
  coverImage: string
  author: string
  authorAr: string
  category: ArticleCategory
  publishedAt: string
}

export const ARTICLE_CATEGORY_LABELS: Record<
  ArticleCategory,
  { en: string; ar: string }
> = {
  news: { en: 'News', ar: 'أخبار' },
  tips: { en: 'Tips', ar: 'نصائح' },
  industry: { en: 'Industry', ar: 'القطاع' },
  company: { en: 'Company', ar: 'الشركة' },
}

export const articles: Article[] = [
  {
    id: 'art-smart-farming',
    slug: 'smart-farming-egypt-2026',
    title: 'Smart Farming Practices for Egyptian Growers',
    titleAr: 'ممارسات الزراعة الذكية للمزارعين المصريين',
    excerpt:
      'How precision irrigation, quality inputs, and data-driven decisions are reshaping yields across the Nile Delta and Upper Egypt.',
    excerptAr:
      'كيف يعيد الري الدقيق والمدخلات عالية الجودة والقرارات المبنية على البيانات تشكيل المحصول في الدلتا والصعيد.',
    content: `Egypt's agricultural sector is entering a new phase. Growers who combine reliable inputs with smarter water management are seeing measurable gains in yield consistency and post-harvest quality.

At Al Kalthoum Group, we support this transition through our divisions — from Sona Plast greenhouse films and irrigation hoses to Diamond fertilizers and Shadha seeds selected for regional conditions.

Key practices we recommend:

• Match irrigation scheduling to crop stage and soil moisture
• Use certified seeds and follow label rates for crop protection products
• Monitor fields regularly and act early on pest or disease pressure
• Partner with authorised distributors for technical support close to the farm

Together, these steps help farms stay productive through heat, dust, and seasonal variability — the realities of Egyptian agriculture.`,
    contentAr: `يشهد القطاع الزراعي المصري مرحلة جديدة. المزارعون الذين يجمعون بين مدخلات موثوقة وإدارة أذكى للمياه يلاحظون تحسناً ملموساً في ثبات المحصول وجودة ما بعد الحصاد.

في مجموعة الكلثوم، ندعم هذا التحول عبر أقسامنا — من أفلام البيوت المحمية وخراطيم الري في سونا بلاست إلى أسمدة دايموند وبذور شذى المختارة للظروف المحلية.

أهم الممارسات التي نوصي بها:

• مواءمة جدول الري مع مرحلة المحصول ورطوبة التربة
• استخدام بذور معتمدة والالتزام بالجرعات الموصى بها لمنتجات حماية المحصول
• متابعة الحقول بانتظام والتدخل مبكراً عند ظهور آفات أو أمراض
• التعاون مع موزعين معتمدين للحصول على دعم فني قريب من المزرعة

معاً، تساعد هذه الخطوات المزارع على البقاء منتجة رغم الحرارة والغبار وتقلب المواسم — واقع الزراعة في مصر.`,
    coverImage:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
    author: 'Al Kalthoum Group',
    authorAr: 'مجموعة الكلثوم',
    category: 'tips',
    publishedAt: '2026-02-10T09:00:00.000Z',
  },
  {
    id: 'art-greenhouse',
    slug: 'greenhouse-plastics-guide',
    title: 'Choosing the Right Greenhouse Plastic for Your Crop',
    titleAr: 'كيف تختار البلاستيك المناسب للبيوت المحمية',
    excerpt:
      'A practical guide to film thickness, UV stabilisation, and diffusion — from the Sona Plast team.',
    excerptAr:
      'دليل عملي لسماكة الفيلم ومثبتات الأشعة فوق البنفسجية وانتشار الضوء — من فريق سونا بلاست.',
    content: `Greenhouse performance starts with the cover material. The wrong film can reduce light transmission, trap excess heat, or fail prematurely under Egyptian sun exposure.

When selecting agricultural plastic, consider:

• Light diffusion vs. direct transmission for your crop type
• UV stabilisation rated for multi-season use
• Thickness appropriate for wind load and installation method
• Anti-drip additives to reduce disease pressure from condensation

Sona Plast, part of Al Kalthoum Group, manufactures films engineered for regional climate conditions. Our distributors can help you match product specifications to your structure and crop programme.

Contact your nearest authorised distributor or reach out through our website for technical guidance.`,
    contentAr: `تبدأ كفاءة البيوت المحمية بمادة التغطية. الفيلم غير المناسب قد يقلل نفاذ الضوء أو يحبس حرارة زائدة أو يتلف مبكراً تحت شمس مصر.

عند اختيار البلاستيك الزراعي، ضع في اعتبارك:

• انتشار الضوء مقابل النفاذ المباشر حسب نوع المحصول
• مثبتات UV مناسبة للاستخدام عبر مواسم متعددة
• السماكة المناسبة لحمل الرياح وطريقة التركيب
• إضافات مضادة للتقاطر لتقليل ضغط الأمراض من التكثف

سونا بلاست، ضمن مجموعة الكلثوم، تصنع أفلاماً مصممة لظروف المناخ المحلي. يساعدك موزعونا المعتمدون على مطابقة المواصفات مع هيكل البيت وبرنامج المحصول.

تواصل مع أقرب موزع معتمد أو عبر موقعنا للحصول على إرشاد فني.`,
    coverImage:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
    author: 'Sona Plast Team',
    authorAr: 'فريق سونا بلاست',
    category: 'industry',
    publishedAt: '2026-01-22T09:00:00.000Z',
  },
  {
    id: 'art-future',
    slug: 'together-we-make-the-future',
    title: 'Together We Make the Future',
    titleAr: 'معاً نصنع المستقبل',
    excerpt:
      'Al Kalthoum Group marks over three decades of serving Egyptian agriculture — and our commitment continues.',
    excerptAr:
      'مجموعة الكلثوم تحتفل بأكثر من ثلاثة عقود في خدمة الزراعة المصرية — والتزامنا مستمر.',
    content: `Since 1993, Al Kalthoum Group has grown from a focused agricultural supply business into a multi-division group serving growers nationwide.

Our companies — Shadha seeds, Al Kalthoum Farms, Fresh Fruit, Sona Plast, and Diamond for Fertilizers — each bring specialised expertise under one shared mission: supporting Egyptian farmers with quality inputs and reliable service.

Our new tagline, "Together We Make the Future," reflects how we work — with farmers, distributors, and partners — to build sustainable productivity across Egypt.

Explore our divisions, find your nearest distributor, or contact us to discuss partnership opportunities.`,
    contentAr: `منذ 1993، نمت مجموعة الكلثوم من نشاط متخصص في مستلزمات الزراعة إلى مجموعة متعددة الأقسام تخدم المزارعين في جميع أنحاء مصر.

شركاتنا — شذى للبذور، مزارع الكلثوم، Fresh Fruit، سونا بلاست، ودايموند للأسمدة — تقدم كل منها خبرة متخصصة ضمن رسالة واحدة: دعم المزارعين المصريين بمدخلات عالية الجودة وخدمة موثوقة.

شعارنا الجديد «معاً نصنع المستقبل» يعكس طريقة عملنا — مع المزارعين والموزعين والشركاء — لبناء إنتاجية مستدامة في مصر.

استكشف أقسامنا، اعثر على أقرب موزع، أو تواصل معنا لمناقشة فرص الشراكة.`,
    coverImage: '/images/hero-headquarters.png',
    author: 'Al Kalthoum Group',
    authorAr: 'مجموعة الكلثوم',
    category: 'company',
    publishedAt: '2026-01-05T09:00:00.000Z',
  },
]

export function getArticleBySlugStatic(slug: string) {
  return articles.find((a) => a.slug === slug) || null
}

export function formatArticleDate(iso: string, isAr: boolean) {
  const d = new Date(iso)
  return d.toLocaleDateString(isAr ? 'ar-EG' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
