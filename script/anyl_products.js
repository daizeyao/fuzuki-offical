const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { Worker } = require('worker_threads');

// 最大并发数
const MAX_CONCURRENT = 16;

// 定义输入和输出路径
const productsDir = path.join(__dirname, '../../fuzuki-assets/products-260111-2');
const outputFile = path.join(__dirname, '../src/constants/products.json');
const workerPath = path.join(__dirname, 'compress-worker.js');

// 检查 ffmpeg 是否可用
function isFfmpegAvailable() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return true;
  } catch (err) {
    return false;
  }
}

// 创建 worker 线程处理压缩任务
function createWorkerPool(size) {
  const workers = [];
  for (let i = 0; i < size; i++) {
    workers.push(new Worker(workerPath));
  }
  return workers;
}

// 使用 worker 线程处理压缩任务（轮转分配，避免竞争）
function compressWithWorkerThread(worker, filePath) {
  return new Promise((resolve) => {
    const onMessage = (result) => {
      worker.removeListener('message', onMessage);
      resolve(result);
    };

    worker.on('message', onMessage);
    worker.postMessage(filePath);
  });
}

// 批量压缩文件（并发处理，最大并发数由 worker 池大小决定）
async function batchCompressFiles(workers, tasks) {
  const results = [];
  let taskIndex = 0;

  // 为每个 worker 分配初始任务
  const workerPromises = workers.map((worker) => processTasksWithWorker(worker));

  async function processTasksWithWorker(worker) {
    while (taskIndex < tasks.length) {
      // 原子性地获取下一个任务的索引
      const currentIndex = taskIndex++;
      if (currentIndex >= tasks.length) break;

      const filePath = tasks[currentIndex];
      const result = await compressWithWorkerThread(worker, filePath);
      results.push({ result, index: currentIndex });

      // 处理完成立刻打印日志
      if (result.success) {
        const savedKB = (result.savedSize / 1024).toFixed(2);
        const fileName = path.basename(filePath);
        if (savedKB > 0) {
          console.log(`✅ 压缩成功: ${fileName} (节省 ${savedKB} KB)`);
        }
      } else {
        const fileName = path.basename(filePath);
        console.log(`⚠️  压缩失败: ${fileName}`);
      }
    }
  }

  // 等待所有 worker 完成
  await Promise.all(workerPromises);

  // 按原始顺序返回结果
  return results.sort((a, b) => a.index - b.index).map((item) => item.result);
}

async function compressImagesInDirectory(dir) {
  const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff', '.gif', '.svg'];
  const allTasks = [];
  let totalCount = 0;

  // 递归收集所有需要压缩的文件
  function collectTasks(dirPath) {
    const entries = fs.existsSync(dirPath) ? fs.readdirSync(dirPath, { withFileTypes: true }) : [];

    entries.forEach((entry) => {
      const entryPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        collectTasks(entryPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        const fileSize = fs.statSync(entryPath).size;
        const fileSizeKB = fileSize / 1024;

        // 收集图片（>50KB）和 PDF 文件
        if ((imageExts.includes(ext) && fileSizeKB > 50)) {
          allTasks.push(entryPath);
          totalCount++;
        }
        if (ext === '.pdf') {
          allTasks.push(entryPath);
          totalCount++;
        }
      }
    });
  }

  // 开始收集
  collectTasks(dir);

  // 创建 worker 线程池并执行任务
  if (allTasks.length > 0) {
    console.log(`📝 开始使用 Worker 线程池处理 ${allTasks.length} 个文件...`);
    const workers = createWorkerPool(MAX_CONCURRENT);

    const results = await batchCompressFiles(workers, allTasks);
    const successResults = results.filter((r) => r.success);
    const compressedCount = successResults.length;

    // 统计节省的空间
    const totalSaved = successResults.reduce((sum, r) => sum + (r.savedSize || 0), 0);
    const savedMB = (totalSaved / 1024 / 1024).toFixed(2);

    // 关闭所有 worker
    workers.forEach((w) => w.terminate());

    console.log(`📂 处理完成: ${dir}，共压缩 ${compressedCount} 个文件，节省 ${savedMB} MB`);

    return compressedCount;
  } else {
    console.log(`ℹ️  未找到需要压缩的文件`);
    return 0;
  }
}

// 统计文件函数
function statisticsFiles(dir) {
  const stats = {
    imageExtensions: {},
    pdfCount: 0,
    pdfSize: 0,
    totalSize: 0,
    totalFiles: 0,
    allExtensions: {}, // 新增：统计所有后缀
  };

  function walkDir(dirPath) {
    const entries = fs.existsSync(dirPath) ? fs.readdirSync(dirPath, { withFileTypes: true }) : [];

    entries.forEach((entry) => {
      const entryPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        walkDir(entryPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase() || '无后缀';
        const fileSize = fs.statSync(entryPath).size;

        stats.totalSize += fileSize;
        stats.totalFiles++;

        // 统计PDF
        if (ext === '.pdf') {
          stats.pdfCount++;
          stats.pdfSize += fileSize;
        }

        // 统计图片扩展名
        const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff', '.gif', '.svg'];
        if (imageExts.includes(ext)) {
          if (!stats.imageExtensions[ext]) {
            stats.imageExtensions[ext] = { count: 0, size: 0 };
          }
          stats.imageExtensions[ext].count++;
          stats.imageExtensions[ext].size += fileSize;
        }

        // 统计所有后缀
        if (!stats.allExtensions[ext]) {
          stats.allExtensions[ext] = { count: 0, size: 0 };
        }
        stats.allExtensions[ext].count++;
        stats.allExtensions[ext].size += fileSize;
      }
    });
  }

  walkDir(dir);

  // 格式化输出
  console.log('\n========== 📊 文件统计报告 ==========');
  // 所有后缀统计
  console.log('\n📁 所有后缀类型统计:');
  let totalExtCount = 0;
  let totalExtSize = 0;
  Object.keys(stats.allExtensions).sort().forEach((ext) => {
    const { count, size } = stats.allExtensions[ext];
    totalExtCount += count;
    totalExtSize += size;
    const sizeMB = (size / 1024 / 1024).toFixed(2);
    console.log(`  ${ext}: ${count} 个文件，${sizeMB} MB`);
  });

  // 图片类型统计
  console.log('\n📸 图片类型统计:');
  let totalImageCount = 0;
  let totalImageSize = 0;
  Object.keys(stats.imageExtensions).sort().forEach((ext) => {
    const { count, size } = stats.imageExtensions[ext];
    totalImageCount += count;
    totalImageSize += size;
    const sizeMB = (size / 1024 / 1024).toFixed(2);
    console.log(`  ${ext}: ${count} 个文件，${sizeMB} MB`);
  });
  console.log(`\n  💾 图片总计: ${totalImageCount} 个文件，${(totalImageSize / 1024 / 1024).toFixed(2)} MB`);

  // PDF统计
  console.log(`\n📄 PDF统计: ${stats.pdfCount} 个文件，${(stats.pdfSize / 1024 / 1024).toFixed(2)} MB`);

  // 总体统计
  console.log(`\n📦 总体统计:`);
  console.log(`  总文件数: ${stats.totalFiles}`);
  console.log(`  占用内存: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB (${(stats.totalSize / 1024 / 1024 / 1024).toFixed(2)} GB)`);
  console.log('=====================================\n');

  return stats;
}


// 解析文件夹内容
function parseProductsDirectory(dir) {
  const categories = {};
  const priorityStats = {}; // 统计 priority

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

            // 统计 priority
            const priority = parsedDetail['priority'];
            if (priority && !priorityStats[priority]) {
              priorityStats[priority] = [];
            }
            if (priority && priority > 1) {
              priorityStats[priority].push(`${category.name}/${product.name}`);
            }

            // 格式化 detail.json 并重写原文件
            fs.writeFileSync(contentPath, JSON.stringify(parsedDetail, null, 2), 'utf-8');

            productData.detail = parsedDetail;
            productData.detail['priority'] = productData.detail?.priority ?? 1;
          } catch (error) {
            console.error(`解析 detail.json 文件时出错: ${contentPath}`, error);
          }
        }
      });

      // 将解析后的产品数据添加到分类中
      categories[category.name].push(productData);
    });
  });

  // 输出 priority 统计
  console.log('\n========== 📋 Priority 统计 ==========');
  const sortedPriorities = Object.keys(priorityStats).sort((a, b) => a - b);
  sortedPriorities.forEach((priority) => {
    console.log(`${priority}: [${priorityStats[priority].join(', ')}]`);
  });
  console.log('=====================================\n');

  return categories;
}

// 主函数
async function main() {
  try {
    console.log('Starting: image compression (ffmpeg) before parsing...');
    // if (isFfmpegAvailable()) {
    //   await compressImagesInDirectory(productsDir);
    // } else {
    //   console.warn('ffmpeg not found in PATH. Skipping image compression.');
    // }

    // 统计文件
    statisticsFiles(productsDir);

    const productsData = parseProductsDirectory(productsDir);

    // 写入到 products.json 文件
    fs.writeFileSync(outputFile, JSON.stringify(productsData, null, 2), 'utf-8');
    console.log('products.json 文件已成功生成！');
  } catch (error) {
    console.error('解析文件夹时出错:', error);
  }
}

main();