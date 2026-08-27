const fs = require('fs');

const extractCategory = async (url, categorySlug) => {
    try {
        const res = await fetch(url);
        const html = await res.text();
        
        let products = [];
        
        // The HTML looks roughly like:
        // <img src=https://diamond-fertilizers.com/storage/54/Diamond-for-Fertilizers---Soluble-NPK--6-00-40.jpg ...>
        // <div class="contain">
        //     <a href="..." class="project-title">Product Name</a>
        //     <p>Description</p>
        
        // Let's use a simpler approach. Split by `class="product-box"`
        const parts = html.split('class="product-box"');
        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            
            // Extract image
            const imgMatch = part.match(/<img[^>]*src=["']?([^"'\s>]+)["']?/);
            let img = imgMatch ? imgMatch[1] : null;
            if (img && img.startsWith('/')) img = 'https://www.diamond-fertilizers.com' + img;
            
            // Extract title
            const titleMatch = part.match(/class="project-title"[^>]*>([^<]+)<\/a>/);
            let title = titleMatch ? titleMatch[1].trim() : 'Unknown Product';
            
            // Extract description
            const descMatch = part.match(/<p><p><span[^>]*>([^<]+)<\/span>/);
            let desc = descMatch ? descMatch[1].trim() : '';
            if (!desc) {
                const altDescMatch = part.match(/<p>([^<]+)<\/p>/);
                if (altDescMatch) desc = altDescMatch[1].trim();
            }
            
            if (img && img.includes('storage')) {
                products.push({
                    title,
                    desc,
                    img
                });
            }
        }
        return products;
    } catch (e) {
        console.error(e);
        return [];
    }
}

const run = async () => {
    let all = [];
    all.push(...await extractCategory('https://www.diamond-fertilizers.com/category/1/soluble-npk-series', 'soluble'));
    all.push(...await extractCategory('https://www.diamond-fertilizers.com/category/2/suspended-fertilizers-series', 'suspended'));
    all.push(...await extractCategory('https://www.diamond-fertilizers.com/category/3/liquid-drip-series', 'liquid'));
    all.push(...await extractCategory('https://www.diamond-fertilizers.com/category/4/special-series', 'special'));
    
    fs.writeFileSync('diamond_scraped.json', JSON.stringify(all, null, 2));
    console.log(`Scraped ${all.length} products`);
}

run();
