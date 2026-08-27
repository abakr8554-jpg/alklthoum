const fs = require('fs');
const dataTsPath = '/Users/a444/Desktop/al-kalthoum-agrico/lib/data.ts';
let dataTs = fs.readFileSync(dataTsPath, 'utf8');

const companyOld = `{
    id: 'sona-plast',
    slug: 'sona-plast',
    name: 'Sona Plast',
    nameAr: 'سونا بلاست',
    tagline: 'Plastic Manufacturing',
    taglineAr: 'الصناعات البلاستيكية',
    description:
      'Sona Plast specializes in agricultural plastics, including greenhouse covers and irrigation pipes (GR) conforming to international quality standards.',
    descriptionAr:
      'سونا بلاست متخصصة في البلاستيك الزراعي، بما في ذلك أغطية البيوت المحمية وخراطيم الري (GR) المطابقة لمعايير الجودة العالمية.',
    logo: '/logos/clean/sona-plast.png',
    coverImage:
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=1600&q=85',
    services: [
      {
        title: 'Greenhouse Plastics',
        titleAr: 'بلاستيك الصوب',
        desc: 'UV-treated films for greenhouse longevity.',
        descAr: 'أغطية معالجة ضد الأشعة فوق البنفسجية لزيادة عمر الصوب.',
      },
      {
        title: 'Irrigation Systems',
        titleAr: 'أنظمة الري',
        desc: 'Durable GR irrigation pipes for tough environments.',
        descAr: 'خراطيم ري GR متينة للبيئات القاسية.',
      },
    ],
    contact: GROUP_CONTACT,
  },`;

const companyNew = `{
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
      email: 'info@alkalthoum.com',
      address: 'Industrial Zone, Egypt',
      addressAr: 'المنطقة الصناعية، مصر',
      website: 'https://www.sona-plast.com',
    },
  },`;

if (dataTs.includes(companyOld)) {
  dataTs = dataTs.replace(companyOld, companyNew);
  console.log('Company updated successfully.');
} else {
  console.error('Could not find old Sona company string.');
}

const products = [
  {
    id: 'sona-greenhouse',
    name: 'Greenhouse Films',
    nameAr: 'صوب زراعية',
    img: '/images/products/sona-greenhouse.jpg'
  },
  {
    id: 'sona-mulch',
    name: 'Mulch Films',
    nameAr: 'الملش',
    img: '/images/products/sona-mulch.jpg'
  },
  {
    id: 'sona-hoses',
    name: 'Irrigation Hoses',
    nameAr: 'الخراطيم',
    img: '/images/products/sona-hoses.jpg'
  },
  {
    id: 'sona-tunnel',
    name: 'Low Tunnels',
    nameAr: 'انفاق',
    img: '/images/products/sona-tunnel.png'
  },
  {
    id: 'sona-fumigation',
    name: 'Fumigation Films',
    nameAr: 'بلاستيك تعقيم',
    img: '/images/products/sona-fumigation.png'
  },
  {
    id: 'sona-grapes',
    name: 'Grapes Covers',
    nameAr: 'بلاستيك العنب',
    img: '/images/products/sona-grapes.jpg'
  }
];

const formatProducts = (products) => {
  return products.map(p => {
    return `  {
    id: '${p.id}',
    slug: '${p.id}',
    companyId: 'sona-plast',
    category: 'sona-plant-plastic',
    name: '${p.name}',
    nameAr: '${p.nameAr}',
    shortDescription: 'High quality agricultural plastic from Sona Plast.',
    shortDescriptionAr: 'بلاستيك زراعي عالي الجودة من سونا بلاست.',
    description: 'Sona Plast manufactures premium ${p.name.toLowerCase()} using the latest European technologies to meet all crop requirements.',
    descriptionAr: 'تقوم سونا بلاست بتصنيع ${p.nameAr} بجودة عالية باستخدام أحدث التقنيات الأوروبية لتلبية احتياجات جميع المحاصيل.',
    images: [
      '${p.img}'
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
  },`;
  }).join('\n');
};

const newProductsString = formatProducts(products);

const startMarker = '  // ── Sona Plant Plastic ──';
const endMarker = '  // ── Hoses ──';

const startIndex = dataTs.indexOf(startMarker);
const endIndex = dataTs.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = dataTs.substring(0, startIndex + startMarker.length + 1);
  const after = dataTs.substring(endIndex);
  
  dataTs = before + '\n' + newProductsString + '\n' + after;
  fs.writeFileSync(dataTsPath, dataTs);
  console.log('Successfully injected Sona products into data.ts');
} else {
  console.error('Could not find markers in data.ts for products');
}

