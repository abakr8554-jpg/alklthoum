// ─── Types ─────────────────────────────────────────────────────────────────────

import { distributors as egyptDistributors } from './distributors-data'

export type Lang = 'en' | 'ar'

export interface Company {
  id: string
  slug: string
  name: string
  nameAr: string
  tagline: string
  taglineAr: string
  description: string
  descriptionAr: string
  logo: string        // path or URL
  coverImage: string
  services: { title: string; titleAr: string; desc: string; descAr: string }[]
  contact: { email: string; phone: string; address: string; addressAr: string; website?: string }
  externalUrl?: string
}

export type ProductCategory =
  | 'seeds'
  | 'sona-plant-plastic'
  | 'hoses'
  | 'fertilizers-pesticides'
  | 'soil'

export interface Product {
  id: string
  slug: string
  companyId: string
  category: ProductCategory
  name: string
  nameAr: string
  shortDescription: string
  shortDescriptionAr: string
  description: string
  descriptionAr: string
  images: string[]
  targetCrops: string[]
  targetCropsAr: string[]
  targetDiseases: string[]     // disease IDs
  benefits: string[]
  benefitsAr: string[]
  usageInstructions: string
  usageInstructionsAr: string
  applicationMethod: string
  applicationMethodAr: string
  aiRecommended?: boolean
}

export interface Disease {
  id: string
  slug: string
  name: string
  nameAr: string
  scientificName?: string
  description: string
  descriptionAr: string
  cause: string
  causeAr: string
  affectedCrops: string[]
  affectedCropsAr: string[]
  symptoms: string[]
  symptomsAr: string[]
  treatmentSteps: string[]
  treatmentStepsAr: string[]
  preventionTips: string[]
  preventionTipsAr: string[]
  severity: 'low' | 'medium' | 'high'
  image: string
  recommendedProductIds: string[]
}

export interface Distributor {
  id: string
  name: string
  nameAr: string
  region: string
  regionAr: string
  wilaya: string
  wilayaAr: string
  address: string
  addressAr: string
  phone: string
  whatsapp: string
  lat: number
  lng: number
}

// ─── Category Labels ────────────────────────────────────────────────────────────

export const categoryLabels: Record<ProductCategory, { en: string; ar: string }> = {
  'seeds': { en: 'Seeds', ar: 'البذور' },
  'sona-plant-plastic': { en: 'Sona Plant Plastic', ar: 'سونا بلانت بلاستيك' },
  'hoses': { en: 'Hoses', ar: 'الخراطيم' },
  'fertilizers-pesticides': { en: 'Fertilizers & Pesticides', ar: 'الأسمدة والمبيدات' },
  'soil': { en: 'Soil', ar: 'التربة' },
}

// ─── Companies ──────────────────────────────────────────────────────────────────

/** Map positions for the homepage / companies brand constellation */
export const companyMapPositions: Record<string, { x: number; y: number }> = {
  shaza: { x: 50, y: 8 },
  diamond: { x: 83, y: 24 },
  'kalthoum-farms': { x: 91, y: 59 },
  'kayra-tarim': { x: 68, y: 88 },
  'fresh-fruit': { x: 32, y: 88 },
  'sona-plast': { x: 9, y: 59 },
  'sona-drip': { x: 17, y: 24 },
}

const GROUP_CONTACT = {
  email: 'info@alkalthoum.com',
  phone: '+20 109 330 9222',
  address: 'Egypt–Alexandria Desert Road, Egypt',
  addressAr: 'طريق مصر إسكندرية الصحراوي، مصر',
}

export const companies: Company[] = [
  {
    id: 'shaza',
    slug: 'shaza',
    name: 'Shadha',
    nameAr: 'شذى',
    tagline: 'Live Farm',
    taglineAr: 'مزرعة حية',
    description:
      'Shadha Live Farm — premium agricultural production and live farm experiences as part of the Al Kalthoum Group ecosystem.',
    descriptionAr:
      'مزرعة شذى الحية — إنتاج زراعي متميز وتجارب مزرعية حية ضمن منظومة مجموعة الكلثوم.',
    logo: '/logos/clean/shaza.png',
    coverImage:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=85',
    services: [
      {
        title: 'Live Farm Production',
        titleAr: 'الإنتاج المزرعي',
        desc: 'Fresh, quality-controlled farm output for regional markets.',
        descAr: 'إنتاج مزرعي طازج بجودة عالية للأسواق الإقليمية.',
      },
      {
        title: 'Agri Experiences',
        titleAr: 'تجارب زراعية',
        desc: 'Connecting consumers and partners with modern farm operations.',
        descAr: 'ربط المستهلكين والشركاء بعمليات مزرعية حديثة.',
      },
    ],
    contact: GROUP_CONTACT,
  },
  {
    id: 'kalthoum-farms',
    slug: 'kalthoum-farms',
    name: 'Al Kalthoum Farms',
    nameAr: 'مزارع الكلثوم',
    tagline: 'Seeds & Agriculture',
    taglineAr: 'البذور والزراعة',
    description:
      'The first seed company in Egypt and a pioneer in agricultural development — hybrid seeds, nurseries, and large-scale farm projects.',
    descriptionAr:
      'أول شركة بذور في مصر ورائدة في التطوير الزراعي — بذور هجينة ومشاتل ومشاريع زراعية ضخمة.',
    logo: '/logos/clean/kalthoum-farms.png',
    coverImage:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=85',
    services: [
      {
        title: 'Hybrid Seeds',
        titleAr: 'البذور الهجينة',
        desc: 'Certified varieties for tomatoes, peppers, watermelon and more.',
        descAr: 'أصناف معتمدة للطماطم والفلفل والبطيخ والمزيد.',
      },
      {
        title: 'Nurseries & Projects',
        titleAr: 'المشاتل والمشاريع',
        desc: "Including Egypt's largest vaccination nursery.",
        descAr: 'بما في ذلك أكبر مشتل تطعيم في مصر.',
      },
    ],
    contact: GROUP_CONTACT,
  },
  {
    id: 'fresh-fruit',
    slug: 'fresh-fruit',
    name: 'Fresh Fruit',
    nameAr: 'فريش فروت',
    tagline: 'Fresh Produce & Export',
    taglineAr: 'المنتجات الطازجة والتصدير',
    description:
      'Fresh Fruit Company — expanding beyond Egyptian borders with branches in Lebanon and Iraq to serve the regional agricultural sector.',
    descriptionAr:
      'شركة فريش فروت — التوسع خارج الحدود المصرية بفروع في لبنان والعراق لخدمة القطاع الزراعي الإقليمي.',
    logo: '/logos/clean/fresh-fruit.png',
    coverImage:
      'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=1600&q=85',
    services: [
      {
        title: 'Fresh Produce',
        titleAr: 'منتجات طازجة',
        desc: 'Quality fruit and produce for domestic and export markets.',
        descAr: 'فواكه ومنتجات طازجة للأسواق المحلية والتصدير.',
      },
      {
        title: 'Regional Branches',
        titleAr: 'فروع إقليمية',
        desc: 'Operations in Lebanon, Iraq and across the group network.',
        descAr: 'عمليات في لبنان والعراق وعبر شبكة المجموعة.',
      },
    ],
    contact: GROUP_CONTACT,
  },
  {
    id: 'sona-plast',
    slug: 'sona-plast',
    name: 'Sona Plast',
    nameAr: 'سونا بلاست',
    tagline: 'Leading role in manufacturing agricultural plastic films and irrigation pipes',
    taglineAr: 'دور رائد في تصنيع الأفلام البلاستيكية الزراعية وأنابيب الري',
    description:
      'Sona Plast factory for manufacturing all types of agricultural plastic films and drip irrigation pipes. Operating with global machinery equipped with the latest European technologies to meet all customer needs for all crops.',
    descriptionAr:
      'مصنع سونا بلاست لتصنيع جميع أنواع الأغشية البلاستيكية الزراعية وأنابيب الري بالتنقيط. يعمل بآلات عالمية مزودة بأحدث التقنيات الأوروبية لتلبية احتياجات عملائنا لجميع المحاصيل.',
    logo: '/logos/clean/sona-plast.png',
    coverImage:
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=1600&q=85',
    services: [
      {
        title: 'Agricultural Films',
        titleAr: 'الأفلام الزراعية',
        desc: 'Greenhouse films, mulch, tunnels, and fumigation films.',
        descAr: 'بلاستيك الصوب، الملش، الأنفاق، وبلاستيك التعقيم.',
      },
      {
        title: 'Irrigation Pipes',
        titleAr: 'أنابيب الري',
        desc: 'High-quality GR pipes for drip irrigation.',
        descAr: 'خراطيم GR عالية الجودة للري بالتنقيط.',
      },
    ],
    contact: {
      phone: '201093309222',
      email: 'info@sonaplast.eg.com',
      address: 'Industrial Zone, Egypt',
      addressAr: 'المنطقة الصناعية، مصر',
      website: 'https://www.sona-plast.com',
    },
  },
  {
    id: 'diamond',
    slug: 'diamond',
    name: 'Diamond for Fertilizers & Pesticides',
    nameAr: 'دايموند للأسمدة والمبيدات',
    tagline: 'Leading Fertilizer Industry in the Middle East',
    taglineAr: 'رواد صناعة الأسمدة في الشرق الأوسط',
    description:
      'Within Al Kalthoum Agricultural Group, with over three decades of experience, Diamond continues to lead in providing advanced fertilizer solutions by developing innovative formulations suitable for various agricultural environments.',
    descriptionAr:
      'ضمن مجموعة الكلثوم الزراعية، وبخبرة تمتد لأكثر من ثلاثة عقود، تواصل شركة ديموند ريادتها في تقديم حلول الأسمدة المتطورة، من خلال تطوير تركيبات مبتكرة تلائم مختلف البيئات الزراعية، مع التزام راسخ بالجودة والاستدامة، لنكون الشريك الموثوق في تحقيق نمو وإنتاجية مستدامة.',
    logo: '/logos/clean/diamond.png',
    coverImage:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1600&q=85',
    services: [
      {
        title: 'Soluble NPK Series',
        titleAr: 'سلسلة NPK القابلة للذوبان',
        desc: 'Water-soluble fertilizers for advanced fertigation.',
        descAr: 'أسمدة قابلة للذوبان في الماء للري المتقدم.',
      },
      {
        title: 'Suspended Fertilizers',
        titleAr: 'الأسمدة المعلقة',
        desc: 'High-concentration suspended nutrient formulations.',
        descAr: 'تركيبات مغذية معلقة عالية التركيز.',
      },
      {
        title: 'Liquid Drip Series',
        titleAr: 'سلسلة الري بالتنقيط السائل',
        desc: 'Liquid solutions for precise drip application.',
        descAr: 'محاليل سائلة لتطبيق دقيق عبر التنقيط.',
      },
      {
        title: 'Special Series',
        titleAr: 'السلسلة الخاصة',
        desc: 'Specialized formulas for specific soil and crop needs.',
        descAr: 'تركيبات خاصة لاحتياجات التربة والمحاصيل المحددة.',
      },
    ],
    contact: {
      phone: '201022262774',
      email: 'info@diamond-fertilizers.com',
      address: 'Block 11, 4th Industrial Zone, New Borg El Arab City, Alexandria, Egypt',
      addressAr: 'بلوك 11 المنطقة الصناعية الرابعة - مدينة برج العرب الجديدة - الأسكندرية - مصر',
      website: 'https://www.diamond-fertilizers.com',
    },
  },
  {
    id: 'kayra-tarim',
    slug: 'kayra-tarim',
    name: 'Kayra Tarim',
    nameAr: 'كايرا تاريم',
    tagline: 'Agricultural Solutions',
    taglineAr: 'حلول زراعية',
    description: 'Specialized agricultural solutions and products for optimal crop yield.',
    descriptionAr: 'حلول ومنتجات زراعية متخصصة للحصول على أفضل محصول زراعي.',
    logo: '/logos/clean/logo-1.png',
    coverImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=85',
    services: [
      {
        title: 'Crop Enhancement',
        titleAr: 'تحسين المحاصيل',
        desc: 'Advanced agricultural inputs for better growth.',
        descAr: 'مدخلات زراعية متطورة لنمو أفضل.',
      }
    ],
    contact: GROUP_CONTACT,
  },
  {
    id: 'sona-drip',
    slug: 'sona-drip',
    name: 'Sona Drip',
    nameAr: 'سونا دريب',
    tagline: 'Irrigation Systems',
    taglineAr: 'أنظمة الري',
    description: 'Advanced drip irrigation systems for efficient water management in agriculture.',
    descriptionAr: 'أنظمة ري بالتنقيط متطورة لإدارة المياه بكفاءة في الزراعة.',
    logo: '/logos/clean/logo-2.png',
    coverImage: 'https://images.unsplash.com/photo-1563514222-d856980d7f4e?auto=format&fit=crop&w=1600&q=85',
    services: [
      {
        title: 'Irrigation Solutions',
        titleAr: 'حلول الري',
        desc: 'Modern drip and micro-irrigation systems.',
        descAr: 'أنظمة ري حديثة بالتنقيط والري الدقيق.',
      }
    ],
    contact: GROUP_CONTACT,
  }
]

// ─── Products ───────────────────────────────────────────────────────────────────

export const products: Product[] = [
  // ── Seeds ──
  {
    id: 'tomato-hybrid-f1',
    slug: 'tomato-hybrid-f1',
    companyId: 'kalthoum-farms',
    category: 'seeds',
    name: 'Tomato Hybrid F1',
    nameAr: 'بذور طماطم هجين F1',
    shortDescription: 'High-yield hybrid tomato seeds resistant to major diseases.',
    shortDescriptionAr: 'بذور طماطم هجينة عالية الإنتاج مقاومة للأمراض الرئيسية.',
    description:
      'Our premium F1 hybrid tomato seeds are bred for exceptional yield, early maturity, and strong resistance to fusarium wilt and tomato mosaic virus. Ideal for both open field and greenhouse cultivation.',
    descriptionAr:
      'بذور الطماطم الهجينة F1 المميزة لدينا تم تربيتها لإنتاجية استثنائية ونضج مبكر ومقاومة قوية لذبول الفيوزاريوم وفيروس موزاييك الطماطم. مثالية لزراعة الحقول المفتوحة والبيوت المحمية.',
    images: [
      'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546094097-35c89c7e6af9?auto=format&fit=crop&w=800&q=80',
    ],
    targetCrops: ['Tomato'],
    targetCropsAr: ['الطماطم'],
    targetDiseases: ['fusarium-wilt', 'tomato-mosaic-virus'],
    benefits: [
      'High yield potential (up to 80 t/ha)',
      'Early maturity (65–70 days)',
      'Excellent post-harvest shelf life',
      'Resistant to TMV, Fusarium wilt',
    ],
    benefitsAr: [
      'إمكانية إنتاج عالية (تصل إلى 80 طن/هكتار)',
      'نضج مبكر (65–70 يوم)',
      'مدة صلاحية ما بعد الحصاد ممتازة',
      'مقاوم لـ TMV وذبول الفيوزاريوم',
    ],
    usageInstructions: 'Sow 0.5–1 g per m² in nursery trays. Transplant at 4–6 leaf stage.',
    usageInstructionsAr: 'ازرع 0.5–1 جرام لكل م² في صواني المشتل. انقل الشتلات في مرحلة 4–6 أوراق.',
    applicationMethod: 'Direct sowing or transplanting after nursery stage.',
    applicationMethodAr: 'الزراعة المباشرة أو الزرع بعد مرحلة المشتل.',
    aiRecommended: true,
  },
  {
    id: 'pepper-bell-mixed',
    slug: 'pepper-bell-mixed',
    companyId: 'kalthoum-farms',
    category: 'seeds',
    name: 'Bell Pepper Mixed Colors',
    nameAr: 'بذور فلفل ملون مشكل',
    shortDescription: 'Mixed color bell pepper seeds for vibrant market appeal.',
    shortDescriptionAr: 'بذور فلفل ملون مشكل لمظهر سوقي جذاب.',
    description:
      'A mixed selection of red, yellow, and orange bell pepper varieties. High sugar content, thick walls, and excellent transportability.',
    descriptionAr:
      'تشكيلة مختارة من أصناف الفلفل الأحمر والأصفر والبرتقالي. محتوى سكر مرتفع وجدران سميكة وقابلية نقل ممتازة.',
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80',
    ],
    targetCrops: ['Bell Pepper'],
    targetCropsAr: ['الفلفل الحلو'],
    targetDiseases: ['powdery-mildew'],
    benefits: [
      'Mixed color variety for premium markets',
      'Disease resistant',
      'High brix content',
    ],
    benefitsAr: [
      'تنوع ألوان للأسواق المميزة',
      'مقاوم للأمراض',
      'محتوى بريكس مرتفع',
    ],
    usageInstructions: 'Sow seeds in trays at 25–28°C. Germination in 7–10 days.',
    usageInstructionsAr: 'ابذر البذور في الصواني عند 25–28 درجة مئوية. الإنبات في 7–10 أيام.',
    applicationMethod: 'Nursery sowing then transplanting.',
    applicationMethodAr: 'البذر في المشتل ثم زرع الشتلات.',
  },
  {
    id: 'watermelon-seedless',
    slug: 'watermelon-seedless',
    companyId: 'kalthoum-farms',
    category: 'seeds',
    name: 'Seedless Watermelon',
    nameAr: 'بذور بطيخ بلا بذور',
    shortDescription: 'Triploid seedless watermelon for high-value markets.',
    shortDescriptionAr: 'بطيخ ثلاثي الصبغيات بلا بذور للأسواق عالية القيمة.',
    description:
      'Premium triploid seedless watermelon variety. Large fruit size (8–12 kg), sweet flesh, and excellent shipping qualities.',
    descriptionAr:
      'صنف بطيخ بلا بذور ثلاثي الصبغيات المميز. حجم ثمرة كبير (8–12 كجم) ولب حلو وجودة شحن ممتازة.',
    images: [
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80',
    ],
    targetCrops: ['Watermelon'],
    targetCropsAr: ['البطيخ'],
    targetDiseases: ['powdery-mildew', 'fusarium-wilt'],
    benefits: [
      'Seedless — premium market price',
      '8–12 kg average fruit weight',
      'High Brix sugar content (12–14)',
    ],
    benefitsAr: [
      'بلا بذور — سعر سوق مميز',
      'متوسط وزن الثمرة 8–12 كجم',
      'محتوى سكر بريكس مرتفع (12–14)',
    ],
    usageInstructions: 'Requires pollinator variety. Plant in rows of 2m × 3m spacing.',
    usageInstructionsAr: 'يتطلب صنفاً ملقحاً. ازرع في صفوف بمسافة 2م × 3م.',
    applicationMethod: 'Transplanting from nursery.',
    applicationMethodAr: 'الزرع من المشتل.',
    aiRecommended: true,
  },
  // ── Sona Plant Plastic ──

  {
    id: 'sona-greenhouse',
    slug: 'sona-greenhouse',
    companyId: 'sona-plast',
    category: 'sona-plant-plastic',
    name: 'Greenhouse Films',
    nameAr: 'صوب زراعية',
    shortDescription: 'High quality agricultural plastic from Sona Plast.',
    shortDescriptionAr: 'بلاستيك زراعي عالي الجودة من سونا بلاست.',
    description: 'Sona Plast manufactures premium greenhouse films using the latest European technologies to meet all crop requirements.',
    descriptionAr: 'تقوم سونا بلاست بتصنيع صوب زراعية بجودة عالية باستخدام أحدث التقنيات الأوروبية لتلبية احتياجات جميع المحاصيل.',
    images: [
      '/images/products/sona-greenhouse.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['European Technology', 'High Durability', 'Weather Resistance'],
    benefitsAr: ['تقنية أوروبية', 'متانة عالية', 'مقاومة للعوامل الجوية'],
    usageInstructions: 'Follow standard agricultural practices for installation.',
    usageInstructionsAr: 'اتبع الممارسات الزراعية القياسية للتركيب.',
    applicationMethod: 'Field application.',
    applicationMethodAr: 'تطبيق حقلي.',
    aiRecommended: false,
  },
  {
    id: 'sona-mulch',
    slug: 'sona-mulch',
    companyId: 'sona-plast',
    category: 'sona-plant-plastic',
    name: 'Mulch Films',
    nameAr: 'الملش',
    shortDescription: 'High quality agricultural plastic from Sona Plast.',
    shortDescriptionAr: 'بلاستيك زراعي عالي الجودة من سونا بلاست.',
    description: 'Sona Plast manufactures premium mulch films using the latest European technologies to meet all crop requirements.',
    descriptionAr: 'تقوم سونا بلاست بتصنيع الملش بجودة عالية باستخدام أحدث التقنيات الأوروبية لتلبية احتياجات جميع المحاصيل.',
    images: [
      '/images/products/sona-mulch.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['European Technology', 'High Durability', 'Weather Resistance'],
    benefitsAr: ['تقنية أوروبية', 'متانة عالية', 'مقاومة للعوامل الجوية'],
    usageInstructions: 'Follow standard agricultural practices for installation.',
    usageInstructionsAr: 'اتبع الممارسات الزراعية القياسية للتركيب.',
    applicationMethod: 'Field application.',
    applicationMethodAr: 'تطبيق حقلي.',
    aiRecommended: false,
  },
  {
    id: 'sona-hoses-blind',
    slug: 'sona-hoses-blind',
    companyId: 'sona-plast',
    category: 'hoses',
    name: 'Blind Pipes',
    nameAr: 'أنابيب عمياء',
    shortDescription: 'High quality blind pipes for agricultural irrigation.',
    shortDescriptionAr: 'أنابيب عمياء عالية الجودة للري الزراعي.',
    description: 'Blind pipes available in 16mm, 18mm, 20mm thicknesses with warranty up to 10 years.',
    descriptionAr: 'أنابيب عمياء متوفرة بسماكات 16 مم، 18 مم، 20 مم مع ضمان يصل إلى 10 سنوات.',
    images: ['/images/products/sona-hoses-1.jpg', '/images/products/sona-hoses-2.png'],
    targetCrops: ['All Crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High Durability', 'Weather Resistance'],
    benefitsAr: ['متانة عالية', 'مقاومة للعوامل الجوية'],
    usageInstructions: 'Follow standard agricultural practices for installation.',
    usageInstructionsAr: 'اتبع الممارسات الزراعية القياسية للتركيب.',
    applicationMethod: 'Field application.',
    applicationMethodAr: 'تطبيق حقلي.',
    aiRecommended: false,
  },
  {
    id: 'sona-hoses-gr',
    slug: 'sona-hoses-gr',
    companyId: 'sona-plast',
    category: 'hoses',
    name: 'GR Pipes',
    nameAr: 'أنابيب GR',
    shortDescription: 'GR pipes with built-in drippers for efficient irrigation.',
    shortDescriptionAr: 'أنابيب GR مع نقاطات مدمجة للري الفعال.',
    description: 'GR pipes available with 20-50cm dripper spacing. Water flow rates: 1, 1.5, 2, 4 L/h.',
    descriptionAr: 'أنابيب GR متوفرة بمسافات نقاطات من 20 إلى 50 سم. معدل تدفق المياه: 1، 1.5، 2، 4 لتر/ساعة.',
    images: ['/images/products/sona-hoses-5.jpg', '/images/products/sona-hoses-6.jpg'],
    targetCrops: ['All Crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['Efficient Irrigation', 'Even Water Distribution'],
    benefitsAr: ['ري فعال', 'توزيع متساوي للمياه'],
    usageInstructions: 'Follow standard agricultural practices for installation.',
    usageInstructionsAr: 'اتبع الممارسات الزراعية القياسية للتركيب.',
    applicationMethod: 'Field application.',
    applicationMethodAr: 'تطبيق حقلي.',
    aiRecommended: false,
  },
  {
    id: 'sona-hoses-drippers',
    slug: 'sona-hoses-drippers',
    companyId: 'sona-plast',
    category: 'hoses',
    name: 'GR Anti-Leak Drippers',
    nameAr: 'نقاط GR مانع للتسريب ومنظم للضغط',
    shortDescription: 'Pressure compensating and anti-drain GR drippers.',
    shortDescriptionAr: 'نقاط GR مانع للتسريب ومنظم للضغط.',
    description: 'Pressure compensating drippers that prevent leaking and ensure uniform water distribution across the field.',
    descriptionAr: 'نقاطات تعويض الضغط التي تمنع التسرب وتضمن توزيعًا متساويًا للمياه في جميع أنحاء الحقل.',
    images: ['/images/products/sona-hoses-3.jpg', '/images/products/sona-hoses-4.jpg'],
    targetCrops: ['All Crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['Pressure Compensating', 'Anti-Drain'],
    benefitsAr: ['منظم للضغط', 'مانع للتسريب'],
    usageInstructions: 'Follow standard agricultural practices for installation.',
    usageInstructionsAr: 'اتبع الممارسات الزراعية القياسية للتركيب.',
    applicationMethod: 'Field application.',
    applicationMethodAr: 'تطبيق حقلي.',
    aiRecommended: false,
  },
  {
    id: 'sona-tunnel',
    slug: 'sona-tunnel',
    companyId: 'sona-plast',
    category: 'sona-plant-plastic',
    name: 'Low Tunnels',
    nameAr: 'انفاق',
    shortDescription: 'High quality agricultural plastic from Sona Plast.',
    shortDescriptionAr: 'بلاستيك زراعي عالي الجودة من سونا بلاست.',
    description: 'Sona Plast manufactures premium low tunnels using the latest European technologies to meet all crop requirements.',
    descriptionAr: 'تقوم سونا بلاست بتصنيع انفاق بجودة عالية باستخدام أحدث التقنيات الأوروبية لتلبية احتياجات جميع المحاصيل.',
    images: [
      '/images/products/sona-tunnel.png'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['European Technology', 'High Durability', 'Weather Resistance'],
    benefitsAr: ['تقنية أوروبية', 'متانة عالية', 'مقاومة للعوامل الجوية'],
    usageInstructions: 'Follow standard agricultural practices for installation.',
    usageInstructionsAr: 'اتبع الممارسات الزراعية القياسية للتركيب.',
    applicationMethod: 'Field application.',
    applicationMethodAr: 'تطبيق حقلي.',
    aiRecommended: false,
  },
  {
    id: 'sona-fumigation',
    slug: 'sona-fumigation',
    companyId: 'sona-plast',
    category: 'sona-plant-plastic',
    name: 'Fumigation Films',
    nameAr: 'بلاستيك تعقيم',
    shortDescription: 'High quality agricultural plastic from Sona Plast.',
    shortDescriptionAr: 'بلاستيك زراعي عالي الجودة من سونا بلاست.',
    description: 'Sona Plast manufactures premium fumigation films using the latest European technologies to meet all crop requirements.',
    descriptionAr: 'تقوم سونا بلاست بتصنيع بلاستيك تعقيم بجودة عالية باستخدام أحدث التقنيات الأوروبية لتلبية احتياجات جميع المحاصيل.',
    images: [
      '/images/products/sona-fumigation.png'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['European Technology', 'High Durability', 'Weather Resistance'],
    benefitsAr: ['تقنية أوروبية', 'متانة عالية', 'مقاومة للعوامل الجوية'],
    usageInstructions: 'Follow standard agricultural practices for installation.',
    usageInstructionsAr: 'اتبع الممارسات الزراعية القياسية للتركيب.',
    applicationMethod: 'Field application.',
    applicationMethodAr: 'تطبيق حقلي.',
    aiRecommended: false,
  },
  {
    id: 'sona-grapes',
    slug: 'sona-grapes',
    companyId: 'sona-plast',
    category: 'sona-plant-plastic',
    name: 'Grapes Covers',
    nameAr: 'بلاستيك العنب',
    shortDescription: 'High quality agricultural plastic from Sona Plast.',
    shortDescriptionAr: 'بلاستيك زراعي عالي الجودة من سونا بلاست.',
    description: 'Sona Plast manufactures premium grapes covers using the latest European technologies to meet all crop requirements.',
    descriptionAr: 'تقوم سونا بلاست بتصنيع بلاستيك العنب بجودة عالية باستخدام أحدث التقنيات الأوروبية لتلبية احتياجات جميع المحاصيل.',
    images: [
      '/images/products/sona-grapes.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['European Technology', 'High Durability', 'Weather Resistance'],
    benefitsAr: ['تقنية أوروبية', 'متانة عالية', 'مقاومة للعوامل الجوية'],
    usageInstructions: 'Follow standard agricultural practices for installation.',
    usageInstructionsAr: 'اتبع الممارسات الزراعية القياسية للتركيب.',
    applicationMethod: 'Field application.',
    applicationMethodAr: 'تطبيق حقلي.',
    aiRecommended: false,
  },
  // ── Fertilizers & Pesticides ──

  {
    id: 'diamond-plant-y7ic7',
    slug: 'diamond-plant-y7ic7',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 6 00 40',
    nameAr: 'Soluble NPK 6 00 40',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Plant fertilizer from Diamond Fertilizers. 6:0:40 + 2MgO',
    descriptionAr: 'سماد Diamond Plant عالي الجودة من شركة دايموند للأسمدة. 6:0:40 + 2MgO',
    images: [
      '/images/products/diamond-soluble-0.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-standard-3fzjo',
    slug: 'diamond-standard-3fzjo',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 6 6 43',
    nameAr: 'Soluble NPK 6 6 43',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Standard fertilizer from Diamond Fertilizers. 6:6:43',
    descriptionAr: 'سماد Diamond Standard عالي الجودة من شركة دايموند للأسمدة. 6:6:43',
    images: [
      '/images/products/diamond-soluble-1.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-plant-titrt',
    slug: 'diamond-plant-titrt',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 6 6 43',
    nameAr: 'Soluble NPK 6 6 43',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Plant fertilizer from Diamond Fertilizers. 6:6:43',
    descriptionAr: 'سماد Diamond Plant عالي الجودة من شركة دايموند للأسمدة. 6:6:43',
    images: [
      '/images/products/diamond-soluble-2.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-plant-3e0eb',
    slug: 'diamond-plant-3e0eb',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 15 30 15',
    nameAr: 'Soluble NPK 15 30 15',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Plant fertilizer from Diamond Fertilizers. 15:30:15',
    descriptionAr: 'سماد Diamond Plant عالي الجودة من شركة دايموند للأسمدة. 15:30:15',
    images: [
      '/images/products/diamond-soluble-3.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-plant-m1tfm',
    slug: 'diamond-plant-m1tfm',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 15 5 35',
    nameAr: 'Soluble NPK 15 5 35',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Plant fertilizer from Diamond Fertilizers. 15:5:35 + 2MgO',
    descriptionAr: 'سماد Diamond Plant عالي الجودة من شركة دايموند للأسمدة. 15:5:35 + 2MgO',
    images: [
      '/images/products/diamond-soluble-4.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-plant-sl158',
    slug: 'diamond-plant-sl158',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Diamond Product',
    nameAr: 'Diamond Product',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Plant fertilizer from Diamond Fertilizers. 21:7:21 + 2MgO',
    descriptionAr: 'سماد Diamond Plant عالي الجودة من شركة دايموند للأسمدة. 21:7:21 + 2MgO',
    images: [
      '/images/products/diamond-soluble-5.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-ripettig-54dyt',
    slug: 'demo-ripettig-54dyt',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 9 00 40',
    nameAr: 'Soluble NPK 9 00 40',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Demo Ripettig fertilizer from Diamond Fertilizers. 9:0:40',
    descriptionAr: 'سماد Demo Ripettig عالي الجودة من شركة دايموند للأسمدة. 9:0:40',
    images: [
      '/images/products/diamond-soluble-6.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-start-f39de',
    slug: 'demo-start-f39de',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Diamond Product',
    nameAr: 'Diamond Product',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Demo Start fertilizer from Diamond Fertilizers. 30:10:10',
    descriptionAr: 'سماد Demo Start عالي الجودة من شركة دايموند للأسمدة. 30:10:10',
    images: [
      '/images/products/diamond-soluble-7.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-plant-j84a1',
    slug: 'diamond-plant-j84a1',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 15 40 10',
    nameAr: 'Soluble NPK 15 40 10',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Plant fertilizer from Diamond Fertilizers. 15:40:10',
    descriptionAr: 'سماد Diamond Plant عالي الجودة من شركة دايموند للأسمدة. 15:40:10',
    images: [
      '/images/products/diamond-soluble-8.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-standard-46xxu',
    slug: 'diamond-standard-46xxu',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 19 19 19',
    nameAr: 'Soluble NPK 19 19 19',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Standard fertilizer from Diamond Fertilizers. 19:19:19',
    descriptionAr: 'سماد Diamond Standard عالي الجودة من شركة دايموند للأسمدة. 19:19:19',
    images: [
      '/images/products/diamond-soluble-9.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-plant-1bn8k',
    slug: 'diamond-plant-1bn8k',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 19 19 19',
    nameAr: 'Soluble NPK 19 19 19',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Plant fertilizer from Diamond Fertilizers. 19:19:19',
    descriptionAr: 'سماد Diamond Plant عالي الجودة من شركة دايموند للأسمدة. 19:19:19',
    images: [
      '/images/products/diamond-soluble-10.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-plant-zplhk',
    slug: 'diamond-plant-zplhk',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Soluble NPK 20 20 20',
    nameAr: 'Soluble NPK 20 20 20',
    shortDescription: 'Soluble NPK series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Soluble NPK.',
    description: 'High quality Diamond Plant fertilizer from Diamond Fertilizers. 20:20:20',
    descriptionAr: 'سماد Diamond Plant عالي الجودة من شركة دايموند للأسمدة. 20:20:20',
    images: [
      '/images/products/diamond-soluble-11.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-69t78',
    slug: 'demo-plant-69t78',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Diamond Product',
    nameAr: 'Diamond Product',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 18:44:00',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 18:44:00',
    images: [
      '/images/products/diamond-suspended-0.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-pllil',
    slug: 'demo-plant-pllil',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Diamond Standard',
    nameAr: 'Diamond Standard',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 27:27:27',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 27:27:27',
    images: [
      '/images/products/diamond-suspended-1.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-bm1zu',
    slug: 'demo-plant-bm1zu',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Suspended NPK 10 6 60',
    nameAr: 'Suspended NPK 10 6 60',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 10:6:60',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 10:6:60',
    images: [
      '/images/products/diamond-suspended-2.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-xqwfn',
    slug: 'demo-plant-xqwfn',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Suspended NPK 20 20 20',
    nameAr: 'Suspended NPK 20 20 20',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 20:20:20',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 20:20:20',
    images: [
      '/images/products/diamond-suspended-3.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-upea9',
    slug: 'demo-plant-upea9',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Suspended NPK 225 25 20',
    nameAr: 'Suspended NPK 225 25 20',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 25:25:20',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 25:25:20',
    images: [
      '/images/products/diamond-suspended-4.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-8j7qg',
    slug: 'demo-plant-8j7qg',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Suspended NPK 5 50 30',
    nameAr: 'Suspended NPK 5 50 30',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 5:50:30',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 5:50:30',
    images: [
      '/images/products/diamond-suspended-5.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-mpidu',
    slug: 'demo-plant-mpidu',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Suspended NPK 40 10 10',
    nameAr: 'Suspended NPK 40 10 10',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 40:10:10',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 40:10:10',
    images: [
      '/images/products/diamond-suspended-6.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-4dzhf',
    slug: 'demo-plant-4dzhf',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Suspended NPK 00 52 34',
    nameAr: 'Suspended NPK 00 52 34',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 00:52:34',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 00:52:34',
    images: [
      '/images/products/diamond-suspended-7.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-k0t99',
    slug: 'demo-plant-k0t99',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Suspended NPK 12 50 12',
    nameAr: 'Suspended NPK 12 50 12',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 12:50:12',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 12:50:12',
    images: [
      '/images/products/diamond-suspended-8.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-plant-vx2rx',
    slug: 'demo-plant-vx2rx',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Suspended NPK 12 61 5',
    nameAr: 'Suspended NPK 12 61 5',
    shortDescription: 'Suspended Fertilizers series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Suspended Fertilizers.',
    description: 'High quality Demo Plant fertilizer from Diamond Fertilizers. 12:61:5',
    descriptionAr: 'سماد Demo Plant عالي الجودة من شركة دايموند للأسمدة. 12:61:5',
    images: [
      '/images/products/diamond-suspended-9.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'demo-basic-37yr7',
    slug: 'demo-basic-37yr7',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Liquid Drip diamond phosphoric 85',
    nameAr: 'Liquid Drip diamond phosphoric 85',
    shortDescription: 'Liquid Drip series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Liquid Drip.',
    description: 'High quality Demo Basic fertilizer from Diamond Fertilizers. --',
    descriptionAr: 'سماد Demo Basic عالي الجودة من شركة دايموند للأسمدة. --',
    images: [
      '/images/products/diamond-liquid-0.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-phosphoric-ke4id',
    slug: 'diamond-phosphoric-ke4id',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Liquid Drip diamond phosphoric 2',
    nameAr: 'Liquid Drip diamond phosphoric 2',
    shortDescription: 'Liquid Drip series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Liquid Drip.',
    description: 'High quality Diamond Phosphoric fertilizer from Diamond Fertilizers. 85',
    descriptionAr: 'سماد Diamond Phosphoric عالي الجودة من شركة دايموند للأسمدة. 85',
    images: [
      '/images/products/diamond-liquid-1.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-phosphoric-6xcdt',
    slug: 'diamond-phosphoric-6xcdt',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Liquid Drip diamond phosphoric',
    nameAr: 'Liquid Drip diamond phosphoric',
    shortDescription: 'Liquid Drip series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Liquid Drip.',
    description: 'High quality Diamond Phosphoric fertilizer from Diamond Fertilizers. 85',
    descriptionAr: 'سماد Diamond Phosphoric عالي الجودة من شركة دايموند للأسمدة. 85',
    images: [
      '/images/products/diamond-liquid-2.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-n-extra-premium-s4bal',
    slug: 'diamond-n-extra-premium-s4bal',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Liquid Drip N Extra premium',
    nameAr: 'Liquid Drip N Extra premium',
    shortDescription: 'Liquid Drip series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Liquid Drip.',
    description: 'High quality Diamond N Extra Premium fertilizer from Diamond Fertilizers. 30:08:05',
    descriptionAr: 'سماد Diamond N Extra Premium عالي الجودة من شركة دايموند للأسمدة. 30:08:05',
    images: [
      '/images/products/diamond-liquid-3.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-n-extra-5m1jw',
    slug: 'diamond-n-extra-5m1jw',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Liquid Drip N Extra',
    nameAr: 'Liquid Drip N Extra',
    shortDescription: 'Liquid Drip series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Liquid Drip.',
    description: 'High quality Diamond N extra fertilizer from Diamond Fertilizers. 30:3.75:1.5',
    descriptionAr: 'سماد Diamond N extra عالي الجودة من شركة دايموند للأسمدة. 30:3.75:1.5',
    images: [
      '/images/products/diamond-liquid-4.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-n-plus-hppjv',
    slug: 'diamond-n-plus-hppjv',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Diamond Product',
    nameAr: 'Diamond Product',
    shortDescription: 'Liquid Drip series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Liquid Drip.',
    description: 'High quality Diamond N Plus fertilizer from Diamond Fertilizers. 40%',
    descriptionAr: 'سماد Diamond N Plus عالي الجودة من شركة دايموند للأسمدة. 40%',
    images: [
      '/images/products/diamond-liquid-5.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-cab-e4vko',
    slug: 'diamond-cab-e4vko',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Diamond Product',
    nameAr: 'Diamond Product',
    shortDescription: 'Liquid Drip series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Liquid Drip.',
    description: 'High quality Diamond CaB fertilizer from Diamond Fertilizers. 20:2.5',
    descriptionAr: 'سماد Diamond CaB عالي الجودة من شركة دايموند للأسمدة. 20:2.5',
    images: [
      '/images/products/diamond-liquid-6.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-cal-fref9',
    slug: 'diamond-cal-fref9',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Liquid Drip diamond cal',
    nameAr: 'Liquid Drip diamond cal',
    shortDescription: 'Liquid Drip series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Liquid Drip.',
    description: 'High quality Diamond Cal fertilizer from Diamond Fertilizers. 13.5:27',
    descriptionAr: 'سماد Diamond Cal عالي الجودة من شركة دايموند للأسمدة. 13.5:27',
    images: [
      '/images/products/diamond-liquid-7.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-np-bo33p',
    slug: 'diamond-np-bo33p',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Liquid Drip diamond NP',
    nameAr: 'Liquid Drip diamond NP',
    shortDescription: 'Liquid Drip series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Liquid Drip.',
    description: 'High quality Diamond NP fertilizer from Diamond Fertilizers. 12:61',
    descriptionAr: 'سماد Diamond NP عالي الجودة من شركة دايموند للأسمدة. 12:61',
    images: [
      '/images/products/diamond-liquid-8.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-salt-destroy-nz62t',
    slug: 'diamond-salt-destroy-nz62t',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Special Series salt destroy',
    nameAr: 'Special Series salt destroy',
    shortDescription: 'Special series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Special.',
    description: 'High quality Diamond Salt Destroy fertilizer from Diamond Fertilizers. ...',
    descriptionAr: 'سماد Diamond Salt Destroy عالي الجودة من شركة دايموند للأسمدة. ...',
    images: [
      '/images/products/diamond-special-0.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'solo-diamond-caisl',
    slug: 'solo-diamond-caisl',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Special Series 00 00 50',
    nameAr: 'Special Series 00 00 50',
    shortDescription: 'Special series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Special.',
    description: 'High quality Solo Diamond fertilizer from Diamond Fertilizers. ---',
    descriptionAr: 'سماد Solo Diamond عالي الجودة من شركة دايموند للأسمدة. ---',
    images: [
      '/images/products/diamond-special-1.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-pk-qksbt',
    slug: 'diamond-pk-qksbt',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Diamond Standard',
    nameAr: 'Diamond Standard',
    shortDescription: 'Special series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Special.',
    description: 'High quality Diamond PK fertilizer from Diamond Fertilizers. 00:45:55',
    descriptionAr: 'سماد Diamond PK عالي الجودة من شركة دايموند للأسمدة. 00:45:55',
    images: [
      '/images/products/diamond-special-2.png'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  {
    id: 'diamond-l-b0-vfl2p',
    slug: 'diamond-l-b0-vfl2p',
    companyId: 'diamond',
    category: 'fertilizers-pesticides',
    name: 'Special Series diamond l bo',
    nameAr: 'Special Series diamond l bo',
    shortDescription: 'Special series fertilizer.',
    shortDescriptionAr: 'سماد من سلسلة Special.',
    description: 'High quality Diamond L B0 fertilizer from Diamond Fertilizers. ---',
    descriptionAr: 'سماد Diamond L B0 عالي الجودة من شركة دايموند للأسمدة. ---',
    images: [
      '/images/products/diamond-special-3.jpg'
    ],
    targetCrops: ['All crops'],
    targetCropsAr: ['جميع المحاصيل'],
    targetDiseases: [],
    benefits: ['High quality formulation', 'Enhanced nutrient uptake'],
    benefitsAr: ['تركيبة عالية الجودة', 'تعزيز امتصاص العناصر الغذائية'],
    usageInstructions: 'Follow package instructions.',
    usageInstructionsAr: 'اتبع التعليمات الموجودة على العبوة.',
    applicationMethod: 'Soil or foliar application depending on crop.',
    applicationMethodAr: 'تطبيق أرضي أو ورقي حسب المحصول.',
    aiRecommended: false,
  },
  // ── Soil ──
  {
    id: 'perlite-coarse',
    slug: 'perlite-coarse',
    companyId: 'kalthoum-farms',
    category: 'soil',
    name: 'Coarse Perlite 3–6mm',
    nameAr: 'بيرلايت خشن 3–6 مم',
    shortDescription: 'Horticultural perlite for improved drainage and aeration in growing media.',
    shortDescriptionAr: 'بيرلايت بستاني لتحسين الصرف والتهوية في بيئات النمو.',
    description:
      'High-quality expanded perlite (3–6mm grade) for mixing into potting media, hydroponic systems, and greenhouse substrates. Improves drainage while retaining some moisture.',
    descriptionAr:
      'بيرلايت موسع عالي الجودة (درجة 3–6 مم) للخلط في بيئات الأصص وأنظمة الزراعة المائية وركائز البيوت المحمية. يحسن الصرف مع الاحتفاظ ببعض الرطوبة.',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    ],
    targetCrops: ['All crops', 'Hydroponics'],
    targetCropsAr: ['جميع المحاصيل', 'الزراعة المائية'],
    targetDiseases: [],
    benefits: [
      'Sterile — pathogen-free',
      'pH neutral (7.0–7.5)',
      'Reusable after sterilization',
      'Lightweight — reduces substrate weight',
    ],
    benefitsAr: [
      'معقم — خالٍ من مسببات الأمراض',
      'pH محايد (7.0–7.5)',
      'قابل لإعادة الاستخدام بعد التعقيم',
      'خفيف الوزن — يقلل وزن الركيزة',
    ],
    usageInstructions: 'Mix 20–30% by volume into growing media. Can be used as standalone hydroponic substrate.',
    usageInstructionsAr: 'اخلط 20–30% من الحجم في بيئات النمو. يمكن استخدامه كركيزة مستقلة للزراعة المائية.',
    applicationMethod: 'Mix into substrate or use as standalone.',
    applicationMethodAr: 'الخلط في الركيزة أو الاستخدام المستقل.',
  },
  {
    id: 'coco-peat-compressed',
    slug: 'coco-peat-compressed',
    companyId: 'kalthoum-farms',
    category: 'soil',
    name: 'Compressed Coco Peat Blocks',
    nameAr: 'بلوكات الكوكوبيت المضغوطة',
    shortDescription: 'Organic coco peat growing medium with excellent water retention.',
    shortDescriptionAr: 'وسط نمو كوكوبيت عضوي بقدرة احتجاز مياه ممتازة.',
    description:
      'Premium washed and buffered coco peat compressed blocks. Low EC, pH 5.5–6.5, high water retention capacity, and excellent root aeration.',
    descriptionAr:
      'بلوكات كوكوبيت مضغوطة مغسولة ومعالجة مميزة. EC منخفض، pH 5.5–6.5، قدرة احتجاز مياه عالية وتهوية جذور ممتازة.',
    images: [
      'https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=800&q=80',
    ],
    targetCrops: ['Tomato', 'Pepper', 'Strawberry', 'Herbs'],
    targetCropsAr: ['الطماطم', 'الفلفل', 'الفراولة', 'الأعشاب'],
    targetDiseases: [],
    benefits: [
      'EC < 0.5 mS/cm after washing',
      'pH 5.5–6.5 ideal for most crops',
      'Expands 5–8× when hydrated',
      'Sustainable — organic byproduct',
    ],
    benefitsAr: [
      'EC < 0.5 mS/cm بعد الغسيل',
      'pH 5.5–6.5 مثالي لمعظم المحاصيل',
      'يتمدد 5–8 أضعاف عند الترطيب',
      'مستدام — منتج ثانوي عضوي',
    ],
    usageInstructions: 'Hydrate block with 20–25L water before use. Mix with perlite for hydroponics.',
    usageInstructionsAr: 'رطب البلوك بـ 20–25 لتر ماء قبل الاستخدام. اخلط مع البيرلايت للزراعة المائية.',
    applicationMethod: 'Use as growing medium in pots, bags, or slabs.',
    applicationMethodAr: 'استخدم كوسط نمو في الأوعية أو الأكياس أو الألواح.',
    aiRecommended: true,
  },
]

// ─── Diseases ───────────────────────────────────────────────────────────────────

export const diseases: Disease[] = [
  {
    id: 'fusarium-wilt',
    slug: 'fusarium-wilt',
    name: 'Fusarium Wilt',
    nameAr: 'ذبول الفيوزاريوم',
    scientificName: 'Fusarium oxysporum',
    description: 'A soil-borne fungal disease causing progressive wilting and death of plants.',
    descriptionAr: 'مرض فطري ينتقل عبر التربة يسبب ذبولاً تدريجياً وموت النباتات.',
    cause: 'Caused by Fusarium oxysporum, a soil-borne pathogen that colonizes root vascular tissue.',
    causeAr: 'يسببه الفيوزاريوم أوكسيسبوروم، ممرض ينتقل عبر التربة يستعمر أنسجة الأوعية الدموية للجذور.',
    affectedCrops: ['Tomato', 'Watermelon', 'Banana', 'Cotton'],
    affectedCropsAr: ['الطماطم', 'البطيخ', 'الموز', 'القطن'],
    symptoms: [
      'Progressive yellowing of lower leaves',
      'One-sided wilting of branches',
      'Brown discoloration of stem vascular tissue',
      'Plant death in severe cases',
    ],
    symptomsAr: [
      'اصفرار تدريجي للأوراق السفلية',
      'ذبول أحادي الجانب للأفرع',
      'تلون بني لأنسجة الأوعية الدموية للساق',
      'موت النبات في الحالات الشديدة',
    ],
    treatmentSteps: [
      'Remove and destroy infected plants immediately',
      'Apply fungicide drenches to surrounding plants',
      'Use resistant varieties in subsequent seasons',
      'Solarize soil before replanting',
    ],
    treatmentStepsAr: [
      'أزل النباتات المصابة وأتلفها فوراً',
      'ضع محاليل مبيدات فطرية للنباتات المحيطة',
      'استخدم أصنافاً مقاومة في المواسم التالية',
      'عقّم التربة بالشمس قبل إعادة الزرع',
    ],
    preventionTips: [
      'Use certified disease-free seed',
      'Practice crop rotation (minimum 3 years)',
      'Maintain good drainage',
      'Avoid over-irrigation',
    ],
    preventionTipsAr: [
      'استخدم بذوراً معتمدة خالية من الأمراض',
      'مارس دورة المحاصيل (3 سنوات على الأقل)',
      'حافظ على صرف جيد',
      'تجنب الري الزائد',
    ],
    severity: 'high',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    recommendedProductIds: ['tomato-hybrid-f1', 'npk-20-20-20'],
  },
  {
    id: 'powdery-mildew',
    slug: 'powdery-mildew',
    name: 'Powdery Mildew',
    nameAr: 'البياض الدقيقي',
    scientificName: 'Erysiphe cichoracearum / Leveillula taurica',
    description: 'A fungal disease causing white powdery growth on leaf surfaces.',
    descriptionAr: 'مرض فطري يسبب نمواً أبيض مسحوقياً على أسطح الأوراق.',
    cause: 'Caused by several fungal species of the order Erysiphales. Thrives in warm days and cool nights.',
    causeAr: 'تسببه عدة أنواع فطرية من رتبة Erysiphales. يزدهر في الأيام الدافئة والليالي الباردة.',
    affectedCrops: ['Tomato', 'Cucumber', 'Pepper', 'Watermelon', 'Grapes'],
    affectedCropsAr: ['الطماطم', 'الخيار', 'الفلفل', 'البطيخ', 'العنب'],
    symptoms: [
      'White or grey powdery spots on leaves',
      'Yellowing of infected leaves',
      'Distorted and stunted new growth',
      'Premature leaf drop',
    ],
    symptomsAr: [
      'بقع بيضاء أو رمادية مسحوقية على الأوراق',
      'اصفرار الأوراق المصابة',
      'تشوه وتقزم النمو الجديد',
      'تساقط مبكر للأوراق',
    ],
    treatmentSteps: [
      'Apply sulfur-based or systemic fungicide immediately',
      'Remove heavily infected plant parts',
      'Improve air circulation around plants',
      'Avoid overhead irrigation',
    ],
    treatmentStepsAr: [
      'ضع مبيداً فطرياً كبريتياً أو جهازياً فوراً',
      'أزل الأجزاء النباتية المصابة بشدة',
      'حسّن دوران الهواء حول النباتات',
      'تجنب الري فوق الرأس',
    ],
    preventionTips: [
      'Choose resistant varieties',
      'Ensure adequate plant spacing for air circulation',
      'Apply preventive fungicide sprays',
      'Avoid excessive nitrogen fertilization',
    ],
    preventionTipsAr: [
      'اختر أصناف مقاومة',
      'تأكد من مسافة مناسبة بين النباتات لدوران الهواء',
      'ضع رشات مبيدات فطرية وقائية',
      'تجنب التسميد الآزوتي الزائد',
    ],
    severity: 'medium',
    image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=800&q=80',
    recommendedProductIds: ['fungicide-copper', 'npk-20-20-20'],
  },
  {
    id: 'early-blight',
    slug: 'early-blight',
    name: 'Early Blight',
    nameAr: 'اللفحة المبكرة',
    scientificName: 'Alternaria solani',
    description: 'A common fungal disease causing dark spots with concentric rings on leaves.',
    descriptionAr: 'مرض فطري شائع يسبب بقعاً داكنة بحلقات متحدة المركز على الأوراق.',
    cause: 'Caused by Alternaria solani. Favored by warm temperatures (24–29°C) and wet conditions.',
    causeAr: 'يسببه Alternaria solani. يفضل درجات الحرارة الدافئة (24–29 درجة مئوية) والظروف الرطبة.',
    affectedCrops: ['Tomato', 'Potato', 'Pepper'],
    affectedCropsAr: ['الطماطم', 'البطاطا', 'الفلفل'],
    symptoms: [
      'Dark brown spots with concentric rings (target spots)',
      'Yellow halos surrounding spots',
      'Spots coalesce to kill entire leaves',
      'Fruit infections near stem end',
    ],
    symptomsAr: [
      'بقع بنية داكنة بحلقات متحدة المركز (بقع هدفية)',
      'هالات صفراء تحيط بالبقع',
      'اندماج البقع لقتل الأوراق بالكامل',
      'إصابات ثمار قرب نهاية الساق',
    ],
    treatmentSteps: [
      'Apply copper-based or mancozeb fungicide',
      'Remove infected lower leaves',
      'Stake plants to improve air circulation',
      'Apply mulch to reduce soil splash',
    ],
    treatmentStepsAr: [
      'ضع مبيداً فطرياً نحاسياً أو مانكوزيب',
      'أزل الأوراق السفلية المصابة',
      'دعّم النباتات لتحسين دوران الهواء',
      'ضع التغطية لتقليل رذاذ التربة',
    ],
    preventionTips: [
      'Rotate crops (avoid solanaceous crops for 2 years)',
      'Use mulch to prevent soil-borne spore splash',
      'Apply preventive fungicides at first symptoms',
      'Choose resistant varieties',
    ],
    preventionTipsAr: [
      'دوّر المحاصيل (تجنب محاصيل العائلة الباذنجانية لمدة عامين)',
      'استخدم التغطية لمنع رذاذ الجراثيم المنقولة بالتربة',
      'ضع مبيدات فطرية وقائية عند أول أعراض',
      'اختر أصناف مقاومة',
    ],
    severity: 'medium',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    recommendedProductIds: ['fungicide-copper'],
  },
  {
    id: 'late-blight',
    slug: 'late-blight',
    name: 'Late Blight',
    nameAr: 'اللفحة المتأخرة',
    scientificName: 'Phytophthora infestans',
    description: 'A destructive disease causing rapid plant collapse in cool wet conditions.',
    descriptionAr: 'مرض مدمر يسبب انهياراً سريعاً للنباتات في ظروف باردة ورطبة.',
    cause: 'Caused by Phytophthora infestans, an oomycete pathogen. Spreads rapidly under wet cool conditions.',
    causeAr: 'يسببه Phytophthora infestans. ينتشر بسرعة في ظروف رطبة وباردة.',
    affectedCrops: ['Tomato', 'Potato'],
    affectedCropsAr: ['الطماطم', 'البطاطا'],
    symptoms: [
      'Water-soaked lesions on leaves and stems',
      'White fuzzy sporulation on underside of leaves',
      'Dark brown rot on fruits',
      'Rapid whole-plant collapse',
    ],
    symptomsAr: [
      'آفات مشبعة بالماء على الأوراق والسيقان',
      'تبوغ أبيض فطري على الجانب السفلي من الأوراق',
      'عفن بني داكن على الثمار',
      'انهيار سريع لكامل النبات',
    ],
    treatmentSteps: [
      'Apply preventive fungicide at first sign',
      'Remove and destroy infected plant material',
      'Avoid working in field when plants are wet',
      'Apply copper or mancozeb every 5–7 days',
    ],
    treatmentStepsAr: [
      'ضع مبيداً فطرياً وقائياً عند أول علامة',
      'أزل وأتلف المواد النباتية المصابة',
      'تجنب العمل في الحقل عندما تكون النباتات رطبة',
      'ضع نحاساً أو مانكوزيب كل 5–7 أيام',
    ],
    preventionTips: [
      'Apply copper fungicide preventively before wet weather',
      'Avoid overhead irrigation',
      'Improve field drainage',
      'Monitor weather forecasts for infection risk',
    ],
    preventionTipsAr: [
      'ضع مبيداً فطرياً نحاسياً وقائياً قبل الطقس الرطب',
      'تجنب الري فوق الرأس',
      'حسّن صرف الحقل',
      'راقب توقعات الطقس لخطر الإصابة',
    ],
    severity: 'high',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    recommendedProductIds: ['fungicide-copper', 'npk-20-20-20'],
  },
  {
    id: 'tomato-mosaic-virus',
    slug: 'tomato-mosaic-virus',
    name: 'Tomato Mosaic Virus',
    nameAr: 'فيروس موزاييك الطماطم',
    scientificName: 'Tomato mosaic virus (ToMV)',
    description: 'A viral disease causing mosaic patterns and growth distortion in tomatoes.',
    descriptionAr: 'مرض فيروسي يسبب أنماطاً فسيفسائية وتشوه نمو في الطماطم.',
    cause: 'Caused by Tomato mosaic virus (ToMV), transmitted through infected seed, tools, and hands.',
    causeAr: 'يسببه فيروس موزاييك الطماطم، ينتقل عبر البذور المصابة والأدوات والأيدي.',
    affectedCrops: ['Tomato', 'Pepper'],
    affectedCropsAr: ['الطماطم', 'الفلفل'],
    symptoms: [
      'Mosaic pattern of light and dark green on leaves',
      'Leaf curling and distortion',
      'Stunted plant growth',
      'Mottled or discolored fruit',
    ],
    symptomsAr: [
      'نمط فسيفسائي من الأخضر الفاتح والداكن على الأوراق',
      'التواء الأوراق وتشوهها',
      'تقزم نمو النبات',
      'ثمار مبقعة أو متغيرة اللون',
    ],
    treatmentSteps: [
      'No cure exists — remove infected plants',
      'Disinfect tools with 10% bleach solution',
      'Wash hands thoroughly before handling plants',
      'Control aphid vectors',
    ],
    treatmentStepsAr: [
      'لا يوجد علاج — أزل النباتات المصابة',
      'عقّم الأدوات بمحلول 10% كلور',
      'اغسل يديك جيداً قبل التعامل مع النباتات',
      'سيطر على ناقلات حشرة المن',
    ],
    preventionTips: [
      'Use certified virus-free seed',
      'Use resistant varieties (ToMV-resistant)',
      'Control aphid populations',
      'Disinfect tools between plants',
    ],
    preventionTipsAr: [
      'استخدم بذوراً معتمدة خالية من الفيروسات',
      'استخدم أصناف مقاومة (مقاومة ToMV)',
      'سيطر على أعداد حشرة المن',
      'عقّم الأدوات بين النباتات',
    ],
    severity: 'high',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    recommendedProductIds: ['tomato-hybrid-f1', 'insecticide-imidacloprid'],
  },
]

// ─── Distributors ────────────────────────────────────────────────────────────────

export const distributors: Distributor[] = egyptDistributors


// ─── Helpers ────────────────────────────────────────────────────────────────────

export function getProductsByCategory(cat: ProductCategory) {
  return products.filter((p) => p.category === cat)
}

export function getProductsByCompany(companyId: string) {
  return products.filter((p) => p.companyId === companyId)
}

export function getProductsByDisease(diseaseId: string) {
  return products.filter((p) => p.targetDiseases.includes(diseaseId))
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.targetCrops.some((c) => product.targetCrops.includes(c))),
    )
    .slice(0, limit)
}

export function getDiseaseById(id: string) {
  return diseases.find((d) => d.id === id)
}

export function getCompanyById(id: string) {
  return companies.find((c) => c.id === id)
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getCompanyBySlug(slug: string) {
  return companies.find((c) => c.slug === slug)
}

export function getNearestDistributors(lat: number, lng: number, limit = 3): Distributor[] {
  return [...distributors]
    .sort((a, b) => {
      const da = Math.sqrt((a.lat - lat) ** 2 + (a.lng - lng) ** 2)
      const db = Math.sqrt((b.lat - lat) ** 2 + (b.lng - lng) ** 2)
      return da - db
    })
    .slice(0, limit)
}
