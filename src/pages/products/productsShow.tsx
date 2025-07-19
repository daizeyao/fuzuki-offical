import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { TAOBAO_URL } from '@/constants';
import { useIntl } from 'umi';

const products = [
  {
    image: [require('@/assets/products_img/A828.png')],
    titleKey: 'productsShow.item1.title',
    descKey: 'productsShow.item1.desc',
    link: '/products-list?type=panel',
  },
  {
    image: [require('@/assets/products_img/MSDD90341F.png')],
    titleKey: 'productsShow.item2.title',
    descKey: 'productsShow.item2.desc',
    link: '/products-list?type=adapter',
  },
  {
    image: [require('@/assets/products_img/MSDD90401S.png')],
    titleKey: 'productsShow.item3.title',
    descKey: 'productsShow.item3.desc',
    link: '/products-list?type=adapter',
  },
  {
    image: [require('@/assets/products_img/MSDD08.png')],
    titleKey: 'productsShow.item4.title',
    descKey: 'productsShow.item4.desc',
    link: '/products-list?type=panel',
  },
  {
    image: [require('@/assets/products_img/CES-BES24.png')],
    titleKey: 'productsShow.item5.title',
    descKey: 'productsShow.item5.desc',
    link: '/products-list?type=other',
  },
  {
    image: [require('@/assets/products_img/MSDD90341.png')],
    titleKey: 'productsShow.item6.title',
    descKey: 'productsShow.item6.desc',
    link: '/products-list?type=wire',
  },
];

function ProductsShowPage() {
  const intl = useIntl();

  return (
    <>
      <section className="relative bg-light dark:bg-gray-800 py-[15vh] flex items-center overflow-hidden">
        <div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 dark:bg-gray-700/30 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container">
          <motion.div
            className="section-title text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
              {intl.formatMessage({ id: 'productsShow.title' })}
            </h2>
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
                <div className="w-full md:w-1/3">
                  <div className="flex flex-wrap justify-center gap-4">
                    {product.image.map((img, imgIndex) => (
                      <motion.a
                        key={imgIndex}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={img}
                          alt={`${intl.formatMessage({ id: product.titleKey })} - ${imgIndex + 1}`}
                          className="h-80 object-cover rounded-lg shadow-lg"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-2/3 mt-6 md:mt-0 md:px-8">
                  <motion.h2
                    className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                    viewport={{ once: true }}
                  >
                    {intl.formatMessage({ id: product.titleKey })}
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 dark:text-gray-300 whitespace-pre-line"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {intl.formatMessage({ id: product.descKey })}
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
              {intl.formatMessage({ id: 'productsShow.moreLink' })}
            </motion.a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductsShowPage;
