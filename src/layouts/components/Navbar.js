import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../../components/ThemeToggle';
import PDFModal from '../../components/PDFModal';
import { TAOBAO_URL, NAV_ITEMS, PRODUCT_SAMPLE_PDF } from '@/constants';
import { SelectLang, useIntl } from 'umi';

const logoImg = require('@/assets/logo.webp');

const Navbar = ({ toggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const delayTimeout = useRef(null);
  const intl = useIntl();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = (dropdown) => {
    if (delayTimeout.current) {
      clearTimeout(delayTimeout.current);
    }
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    delayTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = PRODUCT_SAMPLE_PDF;
    link.setAttribute('download', 'FUZUKI综合产品样本2026.pdf');
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowPDFModal(false);
  };

  const handleCatalogClick = (e) => {
    e.preventDefault();
    setShowPDFModal(true);
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-gray-900 shadow-md py-4' : 'bg-transparent py-6'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={logoImg} alt="Logo" className="w-10 h-auto" />
            <h1 className="text-3xl font-bold text-black dark:text-white">Fuzuki</h1>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              item.special ? (
                <button
                  key={item.label}
                  onClick={handleCatalogClick}
                  className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors font-semibold"
                >
                  {intl.formatMessage({ id: item.label })}
                </button>
              ) : (
                <div
                  key={item.label}
                  className="group relative w-[6rem] text-center"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors"
                  >
                    {intl.formatMessage({ id: item.label })}
                  </a>
                  <AnimatePresence>
                    {openDropdown === item.label && item.dropdown && (
                      <motion.div
                        className="absolute w-[8rem] left-[-1rem] mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
                          >
                            {intl.formatMessage({ id: subItem.label })}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <SelectLang />
            <div className="hidden lg:block">
              <a className="btn" href={TAOBAO_URL} target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({ id: 'navbar.orderNow' })}
              </a>
            </div>

            <button
              className="lg:hidden text-primary dark:text-white"
              onClick={toggle}
              aria-label={intl.formatMessage({ id: 'navbar.menu' })}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <PDFModal
        isOpen={showPDFModal}
        onClose={() => setShowPDFModal(false)}
        onConfirm={handleDownloadPDF}
        title={intl.formatMessage({ id: 'modal.title' })}
        description={intl.formatMessage({ id: 'modal.description' })}
      />
    </>
  );
};

export default Navbar;
