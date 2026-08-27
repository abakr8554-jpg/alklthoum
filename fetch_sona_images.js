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

const imagesToDownload = [
    { url: 'https://sona-plast.com/storage/69/3.jpg', name: 'sona-greenhouse.jpg' },
    { url: 'https://sona-plast.com/storage/134/IMG_6188.JPG', name: 'sona-mulch.jpg' },
    { url: 'https://sona-plast.com/storage/106/WhatsApp-Image-2025-04-30-at-15.54.15_9176370b-(1).jpg', name: 'sona-hoses.jpg' },
    { url: 'https://sona-plast.com/storage/28/1.png', name: 'sona-tunnel.png' },
    { url: 'https://sona-plast.com/storage/66/2-(1).png', name: 'sona-fumigation.png' },
    { url: 'https://sona-plast.com/storage/131/IMG_6185.JPG', name: 'sona-grapes.jpg' }
];

const run = async () => {
    if (!fs.existsSync(path.join(__dirname, 'public', 'images', 'products'))) {
        fs.mkdirSync(path.join(__dirname, 'public', 'images', 'products'), { recursive: true });
    }
    
    for (const img of imagesToDownload) {
        const filepath = path.join(__dirname, 'public', 'images', 'products', img.name);
        try {
            await downloadImage(img.url, filepath);
            console.log(`Downloaded ${img.url} to ${img.name}`);
        } catch (e) {
            console.log(`Failed ${img.url}:`, e.message);
        }
    }
}

run();
