const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 定义输入和输出路径
const productsDir = path.join(__dirname, '../../fuzuki-assets/products-0512');
const outputFile = path.join(__dirname, '../src/constants/products.json');

// 解析文件夹内容
function parseProductsDirectory(dir) {
  const categories = {};

  // 遍历第一级目录（分类文件夹）
  const categoryFolders = fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name)); // 按文件名排序

  categoryFolders.forEach((category) => {
    console.log(`Processing category: ${category.name}`);
    const categoryPath = path.join(dir, category.name);
    categories[category.name] = [];

    // 遍历分类文件夹中的产品文件夹
    const productFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name)); // 按文件名排序
    console.log(`Found ${productFolders.length} products in category: ${category.name}`);

    productFolders.forEach((product) => {
      const productPath = path.join(categoryPath, product.name);
      const hash = crypto.createHash('md5').update(product.name).digest('hex');
      const productData = {
        pid: hash, // 使用名称的哈希值作为ID
        name: product.name,
        type: path.basename(categoryPath),
        certificates: [],
        diagram: [],
        show: [],
        detail: null,
      };

      // 遍历产品文件夹中的内容
      const productContents = fs.readdirSync(productPath, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name)); // 按文件名排序

      productContents.forEach((content) => {
        const contentPath = path.join(productPath, content.name);

        if (content.isDirectory()) {
          // 解析三个文件夹（certificates、diagram、show）
          if (['certificates', 'diagram', 'show'].includes(content.name)) {
            productData[content.name] = fs.readdirSync(contentPath, { withFileTypes: true })
              .filter((entry) => entry.isFile())
              .map((file) => file.name)
              .sort((a, b) => a.localeCompare(b)); // 按文件名排序
          }
        } else if (content.isFile() && content.name === 'detail.json') {
          try {
            // 解析 detail.json 文件
            const detailContent = fs.readFileSync(contentPath, 'utf-8');
            const parsedDetail = JSON.parse(detailContent);
            if (parsedDetail['priority'] && parsedDetail['priority'] !== 1) {
              console.log(`detail.json 中的 priority : ${parsedDetail['priority']}`);
            }
            // parsedDetail['priority'] = 1;

            // 删除同目录下的 formatted_detail.json 文件（如果存在）
            // const formattedDetailPath = path.join(productPath, 'formatted_detail.json');
            // if (fs.existsSync(formattedDetailPath)) {
            //   fs.unlinkSync(formattedDetailPath);
            //   console.log(`Deleted formatted_detail.json at: ${formattedDetailPath}`);
            // }

            // 格式化 detail.json 并重写原文件
            fs.writeFileSync(contentPath, JSON.stringify(parsedDetail, null, 2), 'utf-8');
            // console.log(`Formatted detail.json written to: ${contentPath}`);

            productData.detail = parsedDetail;
          } catch (error) {
            console.error(`解析 detail.json 文件时出错: ${contentPath}`, error);
          }
        }
      });

      // 将解析后的产品数据添加到分类中
      categories[category.name].push(productData);
    });
  });

  return categories;
}

// 主函数
function main() {
  try {
    const productsData = parseProductsDirectory(productsDir);

    // 写入到 products.json 文件
    fs.writeFileSync(outputFile, JSON.stringify(productsData, null, 2), 'utf-8');
    console.log('products.json 文件已成功生成！');
  } catch (error) {
    console.error('解析文件夹时出错:', error);
  }
}

main();