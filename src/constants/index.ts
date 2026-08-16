export const TAOBAO_URL = "https://shop72851379.taobao.com/";
export const DOUYIN_URL = "https://v.douyin.com/3626X3JY5tc/";
export const TIANMAO_URL = "https://m.tb.cn/h.hH08WLQJEqQY1Cx";
export const TAO_1688_URL = "https://qr.1688.com/s/EPlBdEK8";
export const PDD_URL = "https://mobile.yangkeduo.com/mall_page.html?ps=o4Kg5IhszE";
export const JD_URL = "https://3.cn/2np-Ywyb";

export const ALIYUN_OSS_URL = "https://fuzuki-products.oss-cn-hangzhou.aliyuncs.com/";
export const PRODUCTS_DIR = "products-260118";
export const PRODUCT_SAMPLE_PDF = "https://fuzuki-products.oss-cn-hangzhou.aliyuncs.com/00FUZUKI%E5%AF%8C%E5%B4%8E%E7%BB%BC%E5%90%88%E4%BA%A7%E5%93%81%E6%A0%B7%E6%9C%AC2026%E5%8E%8B%E7%BC%A9%E7%89%88.pdf";

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
  {
    label: 'navbar.downloadCatalog',
    path: '#',
    special: true,
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