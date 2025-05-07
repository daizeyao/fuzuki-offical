import React, { useState } from 'react';
import { motion } from 'framer-motion';

const products_adapter = require("@/assets/index_products/adapter.jpg");
const products_panel = require("@/assets/index_products/panel.jpg");
const products_wire = require("@/assets/index_products/wire.jpg");
const products_other = require("@/assets/index_products/other.jpg");

const Products = () => {
  const [isYearly, setIsYearly] = useState(false);

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
            <div onClick={() => handleProductClick('adapter')} className="cursor-pointer">
              <img src={products_adapter} alt="Adapter" className="w-64 h-auto rounded-lg shadow-md" />
              <div className="text-center mt-2 text-lg text-gray-500 dark:text-gray-400">面板安装连接器</div>
            </div>
            <div onClick={() => handleProductClick('panel')} className="cursor-pointer">
              <img src={products_panel} alt="Panel" className="w-64 h-auto rounded-lg shadow-md" />
              <div className="text-center mt-2 text-lg text-gray-500 dark:text-gray-400">前置面板接口</div>
            </div>
            <div onClick={() => handleProductClick('wire')} className="cursor-pointer">
              <img src={products_wire} alt="Wire" className="w-64 h-auto rounded-lg shadow-md" />
              <div className="text-center mt-2 text-lg text-gray-500 dark:text-gray-400">面板安装线束</div>
            </div>
            <div onClick={() => handleProductClick('other')} className="cursor-pointer">
              <img src={products_other} alt="Other" className="w-64 h-auto rounded-lg shadow-md" />
              <div className="text-center mt-2 text-lg text-gray-500 dark:text-gray-400">其他</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products; 