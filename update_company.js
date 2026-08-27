const fs = require('fs');
const dataTsPath = '/Users/a444/Desktop/al-kalthoum-agrico/lib/data.ts';
let dataTs = fs.readFileSync(dataTsPath, 'utf8');

const companyOld = `{
    id: 'diamond',
    slug: 'diamond',
    name: 'Diamond for Fertilizers',
    nameAr: 'دايموند للأسمدة',
    tagline: 'Fertilizers',
    taglineAr: 'الأسمدة',
    description:
      'Diamond Fertilizer Factory — among the highest fertilizer technology globally, producing compounds tailored to each crop for maximum productivity.',
    descriptionAr:
      'مصنع دايموند للأسمدة — من أعلى تكنولوجيا الأسمدة عالمياً، لتصنيع مركبات تناسب كل محصول لأقصى إنتاجية.',
    logo: '/logos/clean/diamond.png',
    coverImage:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1600&q=85',
    services: [
      {
        title: 'Crop Nutrition',
        titleAr: 'تغذية المحاصيل',
        desc: 'NPK and specialty blends for every growth stage.',
        descAr: 'مركبات NPK وخلطات متخصصة لكل مرحلة نمو.',
      },
      {
        title: 'Crop Protection Inputs',
        titleAr: 'مستلزمات حماية المحاصيل',
        desc: 'Professional-grade nutrition and protection programs.',
        descAr: 'برامج تغذية وحماية احترافية للمحاصيل.',
      },
    ],
    contact: GROUP_CONTACT,
  },`;

const companyNew = `{
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
  },`;

if (dataTs.includes(companyOld)) {
  dataTs = dataTs.replace(companyOld, companyNew);
  fs.writeFileSync(dataTsPath, dataTs);
  console.log('Company updated successfully.');
} else {
  console.error('Could not find old company string.');
}
