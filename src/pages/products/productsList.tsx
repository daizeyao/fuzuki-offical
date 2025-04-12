import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import { productsData, Product } from '@/constants/productsData';
import { ALIYUN_OSS_URL } from '@/constants';

const typeChinese: Record<string, string> = {
  "all": "全部",
  "adapter": "面板安装适配器",
  "panel": "前置面板接口",
  "wire": "面板安装线束",
  "other": "其他",
};

const types = ['all', ...Object.keys(productsData).filter(type => type !== 'other'), 'other'];

function ProductsListPage() {
  const [type, setType] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const filterProducts = (type: string, search: string) => {
    const searchLower = search.toLowerCase();
    const filterBySearch = (item: any) => {
      if (search) {
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.detail.title.toLowerCase().includes(searchLower) ||
          item.detail.description?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    };

    if (type === "all") {
      const allProducts = Object.values(productsData).flat();
      return allProducts.filter(filterBySearch);
    } else {
      return (productsData[type] || []).filter(filterBySearch);
    }
  };

  const changeType = (type: string) => {
    setType(type);
    const filteredProducts = filterProducts(type, search);
    setProducts(filteredProducts);
  };

  useEffect(() => {
    const typeParam = searchParams.get('type');
    const searchParam = searchParams.get('search');
    setType(typeParam || "all");
    setSearch(searchParam || "");
  }, [searchParams]);

  useEffect(() => {
    const filteredProducts = filterProducts(type, search);
    setProducts(filteredProducts);
  }, [type, search]);

  return (
    <>
      <section className="relative bg-light dark:bg-gray-800 py-[12vh] flex items-center overflow-hidden">

        <div className="container">
          <motion.div
            className="section-title text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">产品中心</h2>
          </motion.div>

          <div className="flex justify-center mb-8">
            {types.map((item) => (
              <button
                key={item}
                onClick={() => changeType(item)}
                className={`px-4 py-2 mx-2 rounded-lg text-sm font-medium ${type === item
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300'
                  }`}
              >
                {typeChinese[item]}
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center mb-8">
            <i className="fas fa-search text-lg mr-2"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索产品..."
              className="px-4 py-2 w-full max-w-md rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product: Product, index: number) => (
                <motion.div
                  key={index}
                  className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <a href={`products-item?pid=${product.pid}`} target="_blank" rel="noopener noreferrer">
                    <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <img
                        src={`${ALIYUN_OSS_URL}products/${product.type}/${product.name}/show/${product.show[0]}`}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{product.detail.title}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductsListPage;
