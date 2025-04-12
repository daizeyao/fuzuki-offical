export const TAOBAO_URL = "https://shop72851379.taobao.com/";
export const DOUYIN_URL = "https://v.douyin.com/3626X3JY5tc/";
export const ALIYUN_OSS_URL = "https://fuzuki-products.oss-cn-hangzhou.aliyuncs.com/";

export const NAV_ITEMS = [
  {
    label: '首页',
    path: '/',
    dropdown: [
      { label: '关于我们', href: '/#about' },
      { label: '功能', href: '/#features' },
      { label: '服务', href: '/#services' },
      { label: '价格', href: '/#pricing' },
      { label: '常见问题', href: '/#faq' },
    ],
  },
  {
    label: '产品中心',
    path: '/products-show',
    dropdown: [
      { label: '常用产品展示', href: '/products-show' },
      { label: '所有产品', href: '/products-list' },
    ],
  },
];

export const ROUTES = [
  {
    path: '/',
    component: "index/index.tsx",
  },
  {
    path: '/products-show',
    component: "products/productsShow.tsx",
  },
  {
    path: '/products-list',
    component: "products/productsList.tsx",
  },
  {
    path: '/products-item',
    component: "products/productsItem.tsx",
  }
];