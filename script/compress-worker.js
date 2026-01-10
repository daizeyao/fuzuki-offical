const { parentPort } = require('worker_threads');
const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// 获取短路径（解决 Ghostscript 中文路径问题）
function getShortPath(longPath) {
  return new Promise((resolve) => {
    exec(`for %I in ("${longPath}") do @echo %~sI`, { shell: 'cmd.exe' }, (err, stdout) => {
      if (err) return resolve(longPath); // fallback
      resolve(stdout.trim());
    });
  });
}

// 执行 ffmpeg 命令
function executeFFmpeg(args) {
  return new Promise((resolve) => {
    const process = spawn('ffmpeg', args, { stdio: 'ignore' });

    process.on('close', (code) => resolve(code === 0));
    process.on('error', () => resolve(false));
  });
}

// 执行 Ghostscript 命令
function executeGhostscript(args) {
  return new Promise((resolve) => {
    const process = spawn('gswin64c', args, { stdio: 'inherit' });

    process.on('close', (code) => resolve(code === 0));
    process.on('error', () => resolve(false));
  });
}

// 压缩图片
async function compressImage(filePath, ext) {
  const tmpPath = filePath.replace(ext, `.tmp${ext}`);
  let args;

  if (ext === '.jpg' || ext === '.jpeg' || ext === '.webp') {
    args = ['-y', '-i', filePath, '-q:v', '30', '-frames:v', '1', tmpPath];
  } else if (ext === '.png') {
    args = ['-y', '-i', filePath, '-compression_level', '9', '-pred', 'mixed', '-pix_fmt', 'rgb24', tmpPath];
  } else {
    args = ['-y', '-i', filePath, tmpPath];
  }

  const success = await executeFFmpeg(args);

  if (success && fs.existsSync(tmpPath)) {
    try {
      const origSize = fs.statSync(filePath).size;
      const tmpSize = fs.statSync(tmpPath).size;

      if (tmpSize > 0 && tmpSize < origSize) {
        fs.renameSync(tmpPath, filePath);
        return { success: true, type: 'image', path: filePath, savedSize: origSize - tmpSize };
      } else {
        fs.unlinkSync(tmpPath);
        return { success: true, type: 'image', path: filePath, savedSize: 0 };
      }
    } catch (err) {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      return { success: false, type: 'image', path: filePath, error: err.message };
    }
  } else {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    return { success: false, type: 'image', path: filePath };
  }
}
const { v4: uuidv4 } = require('uuid');

async function compressPDF(filePath) {
  const tempDir = path.join('D:\\temp', 'pdf-compress', uuidv4());
  fs.mkdirSync(tempDir, { recursive: true });

  const tempInput = path.join(tempDir, 'input.pdf');
  const tempOutput = path.join(tempDir, 'output.pdf');
  fs.copyFileSync(filePath, tempInput);

  const args = [
    '-sDEVICE=pdfwrite',
    '-dCompatibilityLevel=1.4',
    '-dPDFSETTINGS=/ebook',
    '-dNOPAUSE', '-dQUIET',
    '-dBATCH',
    `-sOutputFile=${tempOutput}`,
    tempInput
  ];

  const success = await executeGhostscript(args);

  try {
    if (success && fs.existsSync(tempOutput)) {
      const origSize = fs.statSync(filePath).size;
      const tmpSize = fs.statSync(tempOutput).size;

      if (tmpSize > 0) {
        fs.copyFileSync(tempOutput, filePath);
        return { success: true, type: 'pdf', path: filePath, savedSize: Math.max(origSize - tmpSize, 0) };
      }
    }
    return { success: false, type: 'pdf', path: filePath };
  } catch (err) {
    return { success: false, type: 'pdf', path: filePath, error: err.message };
  } finally {
    // 清理临时目录
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (cleanupErr) {
      console.warn(`⚠️ 无法删除临时目录: ${tempDir}`, cleanupErr);
    }
  }
}


// 处理压缩任务
async function handleCompressionTask(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff'];

  try {
    if (imageExts.includes(ext)) {
      return await compressImage(filePath, ext);
    } else if (ext === '.pdf') {
      return await compressPDF(filePath);
    } else {
      return { success: false, type: 'unknown', path: filePath, error: '不支持的文件格式' };
    }
  } catch (err) {
    return { success: false, path: filePath, error: err.message };
  }
}

// 接收主线程任务
parentPort.on('message', async (filePath) => {
  const result = await handleCompressionTask(filePath);
  parentPort.postMessage(result || { success: false, path: filePath, error: '未知错误' });
});
