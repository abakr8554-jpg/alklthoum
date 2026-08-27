const fs = require('fs');
const dataTsPath = '/Users/a444/Desktop/al-kalthoum-agrico/lib/data.ts';
let dataTs = fs.readFileSync(dataTsPath, 'utf8');

const mappings = JSON.parse(fs.readFileSync('image_mappings.json', 'utf8'));

// The products are in dataTs, each has images: [ 'https://images.unsplash.com...' ]
// They are sequential for diamond products (after `// ── Fertilizers & Pesticides ──`)
// We'll replace the first 35 instances of the unsplash url after the marker.

const marker = '// ── Fertilizers & Pesticides ──';
const startIndex = dataTs.indexOf(marker);

if (startIndex === -1) {
    console.log("Marker not found");
    process.exit(1);
}

let before = dataTs.substring(0, startIndex);
let after = dataTs.substring(startIndex);

const unsplashUrl = 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80';

for (let i = 0; i < mappings.length; i++) {
    const localPath = mappings[i].localPath;
    after = after.replace(unsplashUrl, localPath);
}

fs.writeFileSync(dataTsPath, before + after);
console.log(`Updated ${mappings.length} product images in data.ts`);
