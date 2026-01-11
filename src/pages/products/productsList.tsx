import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import { productsData, Product } from '@/constants/productsData';
import { ALIYUN_OSS_URL, PRODUCTS_DIR } from '@/constants';
import { useIntl } from 'umi';

const ITEMS_PER_PAGE = 12;

function ProductsListPage() {
  const intl = useIntl();
  const [type, setType] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams] = useSearchParams();

  const types = [
    "all",
    "panel",
    "adapter",
    "wire",
    "other"
  ];

  const filterProducts = (type: string, search: string) => {
    const searchLower = search.toLowerCase();
    const filterBySearch = (item: Product) => {
      if (search) {
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.detail.title.toLowerCase().includes(searchLower) ||
          item.detail.description?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    };

    const all = Object.values(productsData).flat();
    const filtered = type === 'all' ? all : productsData[type] || [];
    return filtered.filter(filterBySearch).sort((a, b) => b.detail.priority - a.detail.priority);
  };

  const changeType = (newType: string) => {
    setType(newType);
    setCurrentPage(1);
    setProducts(filterProducts(newType, search));
  };

  useEffect(() => {
    const typeParam = searchParams.get('type') || 'all';
    const searchParam = searchParams.get('search') || '';
    setType(typeParam);
    setSearch(searchParam);
  }, [searchParams]);

  useEffect(() => {
    setProducts(filterProducts(type, search));
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
              {intl.formatMessage({ id: 'productsList.title' })}
            </h2>
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
                {intl.formatMessage({ id: `productsList.type.${item}` })}
              </button>
            ))}
          </div>

          <div className="flex justify-center items-center mb-8">
            <i className="fas fa-search text-lg mr-2"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={intl.formatMessage({ id: 'productsList.searchPlaceholder' })}
              className="px-4 py-2 w-full max-w-md rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <motion.div
                  key={product.pid}
                  className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                  whileHover={{ y: -5, boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={`products-item?pid=${product.pid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <img
                        src={`${ALIYUN_OSS_URL}${PRODUCTS_DIR}/${product.type}/${product.name}/show/${product.show[0]}`}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {product.detail.title}
                      </p>
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
                {intl.formatMessage({ id: 'productsList.pagination.prev' })}
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
                {intl.formatMessage({ id: 'productsList.pagination.next' })}
              </button>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductsListPage;
