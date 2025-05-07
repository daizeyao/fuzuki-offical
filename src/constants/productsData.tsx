export type Product = {
  pid: string;
  name: string;
  type: string,
  certificates: string[];
  diagram: string[];
  show: string[];
  detail: {
    title: string;
    description: string;
    taobao_link: string;
    priority: number;
  };
};

type ProductsData = Record<string, Product[]>;

const productsDataJson = require('./products.json')

export const productsData: ProductsData = productsDataJson as ProductsData;