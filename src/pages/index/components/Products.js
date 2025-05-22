import React from 'react';
import { motion } from 'framer-motion';

const productList = [
  {
    key: 'adapter',
    img: require('@/assets/index_products/adapter.jpg'),
    alt: 'Adapter',
    label: '面板安装连接器',
  },
  {
    key: 'panel',
    img: require('@/assets/index_products/panel.jpg'),
    alt: 'Panel',
    label: '前置面板接口',
  },
  {
    key: 'wire',
    img: require('@/assets/index_products/wire.jpg'),
    alt: 'Wire',
    label: '面板安装线束',
  },
  {
    key: 'other',
    img: require('@/assets/index_products/other.jpg'),
    alt: 'Other',
    label: '其他',
  },
];

const Products = () => {
  const handleProductClick = (type) => {
    window.location.href = `/products-list?type=${type}`;
  };

  return (
    <section id="products" className="py-20 dark:bg-gray-900">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4 text-center">产品</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            我们提供多种高质量的产品，满足您的不同需求。
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {productList.map((product) => (
              <motion.div
                key={product.key}
                onClick={() => handleProductClick(product.key)}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={product.img} alt={product.alt} className="w-64 h-auto rounded-lg shadow-md" />
                <div className="text-center mt-2 text-lg text-gray-500 dark:text-gray-400">{product.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
