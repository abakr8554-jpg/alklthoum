const fs = require('fs');
const dataTsPath = '/Users/a444/Desktop/al-kalthoum-agrico/lib/data.ts';
let dataTs = fs.readFileSync(dataTsPath, 'utf8');

const products = JSON.parse(fs.readFileSync('new_products.json', 'utf8'));

const formatProducts = (products) => {
  return products.map(p => {
    return `  {
    id: '${p.id}',
    slug: '${p.slug}',
    companyId: '${p.companyId}',
    category: '${p.category}',
    name: '${p.name}',
    nameAr: '${p.nameAr}',
    shortDescription: '${p.shortDescription}',
    shortDescriptionAr: '${p.shortDescriptionAr}',
    description: '${p.description}',
    descriptionAr: '${p.descriptionAr}',
    images: [
      '${p.images[0]}'
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
  },`;
  }).join('\n');
};

const newProductsString = formatProducts(products);

const startMarker = '  // ── Fertilizers & Pesticides ──';
const endMarker = '  // ── Soil ──';

const startIndex = dataTs.indexOf(startMarker);
const endIndex = dataTs.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = dataTs.substring(0, startIndex + startMarker.length + 1);
  const after = dataTs.substring(endIndex);
  
  const newDataTs = before + '\n' + newProductsString + '\n' + after;
  fs.writeFileSync(dataTsPath, newDataTs);
  console.log('Successfully injected products into data.ts');
} else {
  console.error('Could not find markers in data.ts');
}
