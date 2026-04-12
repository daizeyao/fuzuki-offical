import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntl } from 'umi';

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const LazyImage = ({ src, alt, className }: LazyImageProps) => {
  const [isInView, setIsInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = wrapperRef.current;
    if (!target || isInView) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        // Start loading a little early for smoother visual experience.
        rootMargin: '120px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [isInView]);

  return (
    <div ref={wrapperRef} className="w-64 h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
      {isInView ? (
        <img src={src} alt={alt} loading="lazy" className={className} />
      ) : (
        <div className="w-full h-full animate-pulse bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
      )}
    </div>
  );
};

const Products = () => {
  const intl = useIntl();

  const productList = [
    {
      key: 'adapter',
      img: require('@/assets/index_products/adapter.jpg'),
      alt: 'Adapter',
      label: intl.formatMessage({ id: 'products.adapter' }),
    },
    {
      key: 'panel',
      img: require('@/assets/index_products/panel.png'),
      alt: 'Panel',
      label: intl.formatMessage({ id: 'products.panel' }),
    },
    {
      key: 'wire',
      img: require('@/assets/index_products/wire.png'),
      alt: 'Wire',
      label: intl.formatMessage({ id: 'products.wire' }),
    },
    {
      key: 'other',
      img: require('@/assets/index_products/other.jpg'),
      alt: 'Other',
      label: intl.formatMessage({ id: 'products.other' }),
    },
  ];

  const handleProductClick = (type: string) => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4 text-center">
            {intl.formatMessage({ id: 'products.title' })}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            {intl.formatMessage({ id: 'products.subtitle' })}
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
                <LazyImage src={product.img} alt={product.alt} className="w-full h-full object-cover shadow-md" />
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
