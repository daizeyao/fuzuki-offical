export const TAOBAO_URL = "https://shop72851379.taobao.com/";
export const DOUYIN_URL = "https://v.douyin.com/3626X3JY5tc/";
export const ALIYUN_OSS_URL = "https://fuzuki-products.oss-cn-hangzhou.aliyuncs.com/";
export const PRODUCTS_DIR = "products-0512";

export const NAV_ITEMS = [
  {
    label: 'navbar.home',
    path: '/',
    dropdown: [
      { label: 'navbar.about', href: '/#about' },
      { label: 'navbar.products', href: '/#products' },
      { label: 'navbar.features', href: '/#features' },
      { label: 'navbar.services', href: '/#services' },
      { label: 'navbar.faq', href: '/#faq' },
    ],
  },
  {
    label: 'navbar.products',
    path: '/products-show',
    dropdown: [
      { label: 'navbar.showcase', href: '/products-show' },
      { label: 'navbar.list', href: '/products-list' },
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