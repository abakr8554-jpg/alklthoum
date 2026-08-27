const fs = require('fs');
const dataTsPath = '/Users/a444/Desktop/al-kalthoum-agrico/lib/data.ts';
let dataTs = fs.readFileSync(dataTsPath, 'utf8');

// I want to delete the whole block from `// ── Hoses ──` up to the next category marker `// ── Fertilizers & Pesticides ──`

const startMarker = '  // ── Hoses ──';
const endMarker = '  // ── Fertilizers & Pesticides ──';

const startIndex = dataTs.indexOf(startMarker);
const endIndex = dataTs.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = dataTs.substring(0, startIndex);
  const after = dataTs.substring(endIndex);
  
  dataTs = before + after;
  fs.writeFileSync(dataTsPath, dataTs);
  console.log('Successfully removed old hoses');
} else {
  console.error('Could not find markers');
}

