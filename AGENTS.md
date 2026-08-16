# 工作流文档

## 开发流程与部署工作流

### 开发循环 (Development Loop)

#### 1. 需求分析与规划
- 接收用户需求
- 分析涉及的组件和文件
- 制定修改计划
- 规划测试用例

#### 2. 代码开发
- 创建新组件或修改现有组件
- 更新相关配置文件 (constants, locales 等)
- 确保代码符合项目规范
- 添加国际化支持 (中英文)

#### 3. 本地开发服务器
```bash
npm run dev
```
- 启动开发服务器
- 在浏览器实时预览
- 调试和修改代码
- 验证功能效果

#### 4. 编译与验证
```bash
npm run build
```
- 执行完整的 Webpack 编译
- 检查是否有编译错误
- 验证打包大小
- 确保无冲突

#### 5. 产物备份
```bash
# 复制 dist 文件夹到 fuzuki-assets，并用日期标注
D:\projects\fuzuki-assets\dist_YYYYMMDD
```
- 备份 build 产物
- 便于版本追踪
- 支持快速回滚

### 工作流清单

#### 前端开发步骤
1. 接收并理解需求
2. 分析现有实现与影响面
3. 修改组件、常量或国际化文件
4. 本地开发验证 (`npm run dev`)
5. 完整构建验证 (`npm run build`)
6. 确认编译通过
7. 备份 build 产物

#### 文件修改注意事项
- 组件文件: 使用 TypeScript (.tsx) 或 JavaScript (.js)
- 常量文件: [src/constants/index.ts](src/constants/index.ts)
- 国际化文件:
- 中文: [src/locales/zh-CN.ts](src/locales/zh-CN.ts)
- 英文: [src/locales/en-US.ts](src/locales/en-US.ts)
- 样式: 使用 Tailwind CSS className
- 动画: 使用 framer-motion

### 部署流程 (Deployment Pipeline)

#### 1. 本地验证
```bash
npm run dev
npm run build
```

#### 2. 产物生成
- 输出目录: `dist/`
- 包含内容:
  - HTML 入口
  - JS 打包文件
  - CSS 打包文件
  - 静态资源

#### 3. 版本管理
```
D:\projects\fuzuki-assets\dist_YYYYMMDD/
├── dist_20260816/  (当前版本)
├── dist_20260815/  (历史版本)
└── ...
```

#### 4. 部署到生产环境
- 将 `dist` 内容上传到 CDN 或服务器
- 更新域名、服务器或静态资源配置
- 验证生产环境访问正常
- 监控线上运行状态

#### 5. 回滚策略
- 保留历史版本在 `fuzuki-assets`
- 生产异常时可快速回滚到上一个版本
- 修复后重新构建并发布

### 开发环境配置

#### 主要依赖
- 框架: Umi v4.4.6 (React 框架)
- 样式: Tailwind CSS
- 动画: framer-motion
- 国际化: umi/intl

#### 项目结构
```
src/
├── components/        # 通用组件
├── constants/         # 配置常量
├── locales/           # 国际化文件
├── layouts/           # 布局组件
├── pages/             # 页面组件
└── assets/            # 静态资源
```

### 关键命令

```bash
npm run dev
npm run build
```

### 备份位置
- `D:\projects\fuzuki-assets\dist_20260816`

### 开发日期
- 创建日期: 2026-08-16
- 最后更新: 2026-08-16
