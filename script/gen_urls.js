const fs = require('fs');
const path = require('path');

// Define the output file path
const outputFilePath = path.join(__dirname, './urls.txt');

// Generate URLs
const baseUrl = 'https://fuzuki.cn/products-show?id=';
const maxId = 100; // Change this to the maximum ID you want
const urls = [];

for (let i = 1; i <= maxId; i++) {
    urls.push(`${baseUrl}${i}`);
}

// Write URLs to the file
fs.writeFileSync(outputFilePath, urls.join('\n'), 'utf8');

console.log(`URLs have been generated and saved to ${outputFilePath}`);