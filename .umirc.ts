import { ROUTES } from "./src/constants";
import { defineConfig } from "umi";


export default defineConfig({
  title: '富崎FUZUKI',
  metas: [
    {
      name: 'description',
      content: 'FUZUKI富崎 - 提供高品质工业连接解决方案，包括网络转接头、面板式网口、电缆管理系统等，满足多种工业场景需求。',
    },
    {
      name: 'keywords',
      content: 'FUZUKI, 工业连接, 网络转接头, 面板式网口, 电缆管理, 工业设备',
    },
    {
      name: 'baidu-site-verification',
      content: 'codeva-FgsvCnzilg',
    },
  ],
  // ssr: {},
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
  },
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  routes: ROUTES,
  npmClient: "npm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss", '@umijs/plugins/dist/locale'],
  // extraPostCSSPlugins: [require("@tailwindcss/postcss")],
});
