import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../../components/ThemeToggle';
import { TAOBAO_URL, NAV_ITEMS } from '@/constants';

const Navbar = ({ toggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const delayTimeout = useRef(null);

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

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-gray-900 shadow-md py-4' : 'bg-transparent py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-secondary">富崎</span>
            <span className="text-black dark:text-white">Fuzuki</span>
          </h1>
          <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">Keep Linked</span>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
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
                {item.label}
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
                        {subItem.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <div className="hidden lg:block">
            <a className="btn" href={TAOBAO_URL} target="_blank" rel="noopener noreferrer">
              立即下单
            </a>
          </div>

          <button
            className="lg:hidden text-primary dark:text-white"
            onClick={toggle}
            aria-label="菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
