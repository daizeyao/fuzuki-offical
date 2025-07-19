import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ALIYUN_OSS_URL, PRODUCTS_DIR } from '@/constants';
import { productsData, Product } from '@/constants/productsData';
import Footer from '@/components/Footer';
import { useIntl } from 'umi';

const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = React.Children.count(children);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child) => (
            <div className="w-full flex-shrink-0">{child}</div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800/30 hover:bg-gray-800/50 rounded-full p-2.5"
      >
        <i className="fas fa-chevron-left text-white text-lg" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800/30 hover:bg-gray-800/50 rounded-full p-2.5"
      >
        <i className="fas fa-chevron-right text-white text-lg" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 px-4">
        {React.Children.map(children, (_, index) => (
          <button
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-800/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

function ProductsItemPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [searchParams] = useSearchParams();
  const pid = searchParams.get('pid');
  const intl = useIntl();

  useEffect(() => {
    if (pid) {
      const allProducts = Object.values(productsData).flat();
      const foundProduct = allProducts.find((item) => item.pid === pid);
      setProduct(foundProduct || null);
    }
  }, [pid]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-800 dark:text-white">
          {intl.formatMessage({ id: 'productsItem.notFound' })}
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="relative bg-light dark:bg-gray-800 py-[12vh] flex items-center overflow-hidden">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <Carousel>
                {product.show.map((image, index) => (
                  <img
                    key={index}
                    src={`${ALIYUN_OSS_URL}${PRODUCTS_DIR}/${product.type}/${product.name}/show/${image}`}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md aspect-square"
                  />
                ))}
              </Carousel>
            </div>
            <div className="w-full md:w-1/4">
              <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6 leading-tight break-words">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product.detail.title}
              </p>
              <a
                className="btn"
                href={product.detail.taobao_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage({ id: 'productsItem.taobaoLink' })}
              </a>
            </div>
            <div className="w-full md:w-1/4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {intl.formatMessage({ id: 'productsItem.specsTitle' })}
                </h2>
                <div
                  className="text-base text-gray-500 dark:text-gray-400 space-y-4 leading-7"
                  dangerouslySetInnerHTML={{ __html: product.detail.description }}
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {intl.formatMessage({ id: 'productsItem.downloadTitle' })}
            </h2>
            <ul className="space-y-2">
              {product.diagram.map((link, index) => (
                <li key={index}>
                  <a
                    href={`${ALIYUN_OSS_URL}${PRODUCTS_DIR}/${product.type}/${product.name}/diagram/${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {intl.formatMessage({ id: 'productsItem.attachment' }, { index: index + 1, name: link })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductsItemPage;
