const fs = require('fs');

const generateProducts = () => {
  let products = [];
  
  const parseFile = (filePath, categoryName) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let i = 0;
    while (i < lines.length) {
      if (lines[i].startsWith('## ')) {
        const name = lines[i].replace('## ', '').trim();
        const npk = lines[i+1] ? lines[i+1].trim() : '';
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2,7);
        
        if (name && !name.includes('Demo') || true) { // keep all 36
          products.push({
            id: id,
            slug: id,
            companyId: 'diamond',
            category: 'fertilizers-pesticides',
            name: `${name} ${npk !== '--' && npk !== '---' && npk !== '...' ? npk : ''}`.trim(),
            nameAr: `${name} ${npk !== '--' && npk !== '---' && npk !== '...' ? npk : ''}`.trim(), // We can translate later or leave as English names
            shortDescription: `${categoryName} series fertilizer.`,
            shortDescriptionAr: `سماد من سلسلة ${categoryName}.`,
            description: `High quality ${name} fertilizer from Diamond Fertilizers. ${npk}`,
            descriptionAr: `سماد ${name} عالي الجودة من شركة دايموند للأسمدة. ${npk}`,
            images: [
              'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80' // default fertilizer image
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
            aiRecommended: false
          });
        }
        i += 2;
      } else {
        i++;
      }
    }
  };

  parseFile('/Users/a444/.gemini/antigravity-ide/brain/77b44445-b550-4a91-a089-0974e7139197/.system_generated/steps/1063/content.md', 'Soluble NPK');
  parseFile('/Users/a444/.gemini/antigravity-ide/brain/77b44445-b550-4a91-a089-0974e7139197/.system_generated/steps/1065/content.md', 'Suspended Fertilizers');
  parseFile('/Users/a444/.gemini/antigravity-ide/brain/77b44445-b550-4a91-a089-0974e7139197/.system_generated/steps/1067/content.md', 'Liquid Drip');
  parseFile('/Users/a444/.gemini/antigravity-ide/brain/77b44445-b550-4a91-a089-0974e7139197/.system_generated/steps/1069/content.md', 'Special');

  fs.writeFileSync('new_products.json', JSON.stringify(products, null, 2));
  console.log(`Generated ${products.length} products`);
};

generateProducts();
