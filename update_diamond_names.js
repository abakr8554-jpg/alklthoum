const fs = require('fs');
const dataTsPath = '/Users/a444/Desktop/al-kalthoum-agrico/lib/data.ts';
let dataTs = fs.readFileSync(dataTsPath, 'utf8');

const mappings = JSON.parse(fs.readFileSync('image_mappings.json', 'utf8'));

// Extract nice names from URLs
const niceNames = mappings.map(m => {
  let url = m.url;
  // Decode URL
  url = decodeURI(url);
  let filename = url.split('/').pop();
  filename = filename.replace('.jpg', '').replace('.png', '').replace('.JPG', '');
  
  // Clean up the name
  let name = filename;
  name = name.replace(/Diamond-for-Fertilizers---/g, '');
  name = name.replace(/Soluble-NPK---?/gi, 'Soluble NPK ');
  name = name.replace(/suspended-npk---?/gi, 'Suspended NPK ');
  name = name.replace(/liquid-drip---?/gi, 'Liquid Drip ');
  name = name.replace(/special-series---?/gi, 'Special Series ');
  name = name.replace(/-/g, ' ');
  name = name.replace(/\(2\)/g, '');
  name = name.trim();

  // If it's the weird placeholder arabic text, just name it generic
  if (name.includes('إعادة تصميم')) {
    name = "Diamond Product";
  }
  
  if (name === '11' || name === '2222') {
    name = "Diamond Standard";
  }

  return name;
});

// We need to replace the names of the 35 diamond products in data.ts
// We know they start after `// ── Fertilizers & Pesticides ──` and end before `// ── Potting Soil ──`
// Since I can't easily parse AST, I'll use regex to find `id: '...',` followed by `name:` etc., but wait, the id is random like `diamond-plant-y7ic7`.
// Let's just find the first 35 occurrences of `name:` after the marker.

const marker = '// ── Fertilizers & Pesticides ──';
const startIndex = dataTs.indexOf(marker);

let before = dataTs.substring(0, startIndex);
let after = dataTs.substring(startIndex);

// The diamond products currently have names like `name: 'Diamond Plant',` or `name: 'Diamond Standard',` or `name: 'Demo Plant',` etc.
// Let's just use a counter and string replace.

let index = 0;
// We know the exact IDs of the 35 products from the previous check.
const oldIds = [
  'diamond-plant-y7ic7', 'diamond-standard-3fzjo', 'diamond-plant-titrt', 'diamond-plant-3e0eb',
  'diamond-plant-m1tfm', 'diamond-plant-sl158', 'demo-ripettig-54dyt', 'demo-start-f39de',
  'diamond-plant-j84a1', 'diamond-standard-46xxu', 'diamond-plant-1bn8k', 'diamond-plant-zplhk',
  'demo-plant-69t78', 'demo-plant-pllil', 'demo-plant-bm1zu', 'demo-plant-xqwfn',
  'demo-plant-upea9', 'demo-plant-8j7qg', 'demo-plant-mpidu', 'demo-plant-4dzhf',
  'demo-plant-k0t99', 'demo-plant-vx2rx', 'demo-basic-37yr7', 'diamond-phosphoric-ke4id',
  'diamond-phosphoric-6xcdt', 'diamond-n-extra-premium-s4bal', 'diamond-n-extra-5m1jw',
  'diamond-n-plus-hppjv', 'diamond-cab-e4vko', 'diamond-cal-fref9', 'diamond-np-bo33p',
  'diamond-salt-destroy-nz62t', 'solo-diamond-caisl', 'diamond-pk-qksbt', 'diamond-l-b0-vfl2p'
];

for (let i = 0; i < oldIds.length; i++) {
  const oldId = oldIds[i];
  const newName = niceNames[i];
  
  // Find the block for this oldId
  const idRegex = new RegExp(`id: '${oldId}',[\\s\\S]*?name: '([^']+)',`);
  const match = after.match(idRegex);
  if (match) {
    const matchedText = match[0];
    const newText = matchedText.replace(`name: '${match[1]}'`, `name: '${newName}'`);
    after = after.replace(matchedText, newText);
    
    // Also update nameAr to match newName for now
    const arRegex = new RegExp(`nameAr: '([^']+)',`);
    const arMatch = after.match(arRegex); // This might match the wrong one, we need to do it within the block.
    // Better way: replace in the specific product block.
    
    // Let's do a more robust block replacement:
    const blockStart = after.indexOf(`id: '${oldId}'`);
    const nextBlockStart = after.indexOf(`id: '`, blockStart + 10);
    const blockEnd = nextBlockStart === -1 ? after.length : nextBlockStart;
    
    let block = after.substring(blockStart, blockEnd);
    block = block.replace(/nameAr: '([^']+)',/, `nameAr: '${newName}',`);
    
    after = after.substring(0, blockStart) + block + after.substring(blockEnd);
  }
}

fs.writeFileSync(dataTsPath, before + after);
console.log('Updated Diamond product names based on images.');

