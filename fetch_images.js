const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode} for ${url}`));
      }
    }).on('error', reject);
  });
};

const extractProductsAndImages = async (categoryUrl, categorySlug) => {
    let mapping = [];
    try {
        const res = await fetch(categoryUrl);
        const html = await res.text();
        
        // Product structure in HTML is roughly:
        // <img src=https://diamond-fertilizers.com/storage/54/Diamond-for-Fertilizers---Soluble-NPK--6-00-40.jpg ...>
        // ...
        // <h2>Diamond Plant</h2>
        // <p>6:0:40 + 2MgO</p>
        
        // We'll use a simpler approach: get all image URLs that have 'storage/' in them.
        const imgRegex = /src=([^ "]+)/g;
        const matches = [...html.matchAll(imgRegex)];
        
        let i = 0;
        for (const match of matches) {
            let imgSrc = match[1];
            if (imgSrc.startsWith('"') || imgSrc.startsWith("'")) imgSrc = imgSrc.substring(1, imgSrc.length - 1);
            
            if (imgSrc.includes('storage/')) {
                // Encode URI to handle arabic characters in URL
                const safeUrl = encodeURI(imgSrc);
                const ext = path.extname(safeUrl.split('?')[0].split('/').pop()) || '.jpg';
                const filename = `diamond-${categorySlug}-${i}${ext}`;
                const filepath = path.join(__dirname, 'public', 'images', 'products', filename);
                
                try {
                    await downloadImage(safeUrl, filepath);
                    console.log(`Downloaded ${safeUrl} to ${filename}`);
                    mapping.push({ url: safeUrl, localPath: `/images/products/${filename}` });
                } catch (e) {
                    console.log(`Failed ${safeUrl}:`, e.message);
                }
                i++;
            }
        }
    } catch(e) {
        console.error(e);
    }
    return mapping;
};

const run = async () => {
    if (!fs.existsSync(path.join(__dirname, 'public', 'images', 'products'))) {
        fs.mkdirSync(path.join(__dirname, 'public', 'images', 'products'), { recursive: true });
    }
    
    let allMappings = [];
    allMappings.push(...await extractProductsAndImages('https://www.diamond-fertilizers.com/category/1/soluble-npk-series', 'soluble'));
    allMappings.push(...await extractProductsAndImages('https://www.diamond-fertilizers.com/category/2/suspended-fertilizers-series', 'suspended'));
    allMappings.push(...await extractProductsAndImages('https://www.diamond-fertilizers.com/category/3/liquid-drip-series', 'liquid'));
    allMappings.push(...await extractProductsAndImages('https://www.diamond-fertilizers.com/category/4/special-series', 'special'));
    
    fs.writeFileSync('image_mappings.json', JSON.stringify(allMappings, null, 2));
    console.log(`Total images downloaded: ${allMappings.length}`);
}

run();
