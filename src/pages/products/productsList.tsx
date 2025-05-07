import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import { productsData, Product } from '@/constants/productsData';
import { ALIYUN_OSS_URL, PRODUCTS_DIR } from '@/constants';

const typeChinese: Record<string, string> = {
  "all": "全部",
  "adapter": "面板安装适配器",
  "panel": "前置面板接口",
  "wire": "面板安装线束",
  "other": "其他",
};

const types = ['all', ...Object.keys(productsData).filter(type => type !== 'other'), 'other'];

const ITEMS_PER_PAGE = 12; // Number of items per page

function ProductsListPage() {
  const [type, setType] = useState<string>("全部");
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
      return allProducts.filter(filterBySearch).sort((a, b) => b.detail.priority - a.detail.priority);
    } else {
      return (productsData[type] || [])
        .filter(filterBySearch)
        .sort((a, b) => b.detail.priority - a.detail.priority);
    }
  };

  const changeType = (type: string) => {
    setType(type);
    setCurrentPage(1);
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

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

          <div className="flex justify-center mb-8 flex-wrap gap-2">
            {types.map((item) => (
              <button
                key={item}
                onClick={() => changeType(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${type === item
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedProducts.map((product: Product, index: number) => (
                <motion.div
                  key={index}
                  className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <a href={`products-item?pid=${product.pid}`} target="_blank" key={product.pid} rel="noopener noreferrer">
                    <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <img
                        src={`${ALIYUN_OSS_URL}${PRODUCTS_DIR}/${product.type}/${product.name}/show/${product.show[0]}`}
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
          <div className="flex justify-center mt-8">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 mx-1 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300"
              >
                上一页
              </button>
            )}
            {currentPage > 2 && (
              <button
                onClick={() => handlePageChange(1)}
                className="px-4 py-2 mx-1 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300"
              >
                1
              </button>
            )}
            {currentPage > 3 && <span className="px-2">...</span>}
            {Array.from({ length: 3 }, (_, index) => {
              const page = currentPage - 1 + index;
              if (page > 0 && page <= totalPages) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium ${currentPage === page
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300'
                      }`}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}
            {currentPage < totalPages - 2 && <span className="px-2">...</span>}
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-4 py-2 mx-1 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300"
              >
                {totalPages}
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 mx-1 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300"
              >
                下一页
              </button>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductsListPage;
