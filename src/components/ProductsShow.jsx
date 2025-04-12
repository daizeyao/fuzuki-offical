
import React from 'react';
import { motion } from 'framer-motion';
import { TAOBAO_URL } from '@/constants';

const ProductsShow = () => {

  return (
    <section className="relative bg-light dark:bg-gray-800 py-[15vh] flex items-center overflow-hidden">
      {/* 背景动画元素 */}
      <div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 dark:bg-gray-700/30 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">常用产品展示</h2>
        </motion.div>
        <div className="grid gap-12">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-full md:w-1/2">
                <div className="flex flex-wrap justify-center gap-4">
                  {product.image.map((img, imgIndex) => (
                    <motion.img
                      key={imgIndex}
                      src={img}
                      alt={`${product.title} - ${imgIndex + 1}`}
                      className="h-64 object-cover rounded-lg shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0 md:px-8">
                <motion.h2
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                  viewport={{ once: true }}
                >
                  {product.title}
                </motion.h2>
                <motion.p
                  className="text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {product.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <motion.a
            href={TAOBAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-primary rounded-lg shadow-lg hover:bg-primary-dark transition duration-300 btn"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            更多内容详见淘宝店铺
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default ProductsShow;
