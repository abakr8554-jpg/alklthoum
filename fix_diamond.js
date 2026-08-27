const fs = require('fs');

async function scrape() {
    const categories = [
        'https://www.diamond-fertilizers.com/category/1/soluble-npk-series',
        'https://www.diamond-fertilizers.com/category/2/suspended-fertilizers-series',
        'https://www.diamond-fertilizers.com/category/3/liquid-drip-series',
        'https://www.diamond-fertilizers.com/category/4/special-series'
    ];
    
    let allProducts = [];
    let count = 0;
    
    for (const url of categories) {
        const res = await fetch(url);
        const html = await res.text();
        
        // Find product cards. In Diamond HTML, they use <a href=".../product/XX/slug">
        // followed by <div class="..."> <h2>...</h2> <p>...</p>
        
        // Let's find all hrefs that match /product/
        const regex = /href="(https:\/\/www\.diamond-fertilizers\.com\/product\/\d+\/[^"]+)"/g;
        let match;
        const productLinks = [];
        while ((match = regex.exec(html)) !== null) {
            if (!productLinks.includes(match[1])) {
                productLinks.push(match[1]);
            }
        }
        
        for (const pUrl of productLinks) {
            const pRes = await fetch(pUrl);
            const pHtml = await pRes.text();
            
            // Extract name
            const nameMatch = pHtml.match(/<h2>(.*?)<\/h2>/);
            let name = nameMatch ? nameMatch[1].trim() : 'Diamond Product';
            
            // Extract subtitle / description
            const subMatch = pHtml.match(/<h3>(.*?)<\/h3>/) || pHtml.match(/<span[^>]*>(.*?)<\/span>/);
            let sub = subMatch ? subMatch[1].trim() : '';
            
            // Extract image
            const imgMatch = pHtml.match(/<img[^>]*src=["']?([^"'\s>]+)["']?/);
            let img = imgMatch ? imgMatch[1] : '';
            
            allProducts.push({
                name: `${name} ${sub}`.trim(),
                image: img
            });
            count++;
            console.log(`Scraped: ${name} ${sub}`);
        }
    }
    
    fs.writeFileSync('diamond_full_scrape.json', JSON.stringify(allProducts, null, 2));
    console.log(`Total Diamond products scraped: ${count}`);
}
scrape();
