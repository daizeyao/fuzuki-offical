import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TAOBAO_URL, NAV_ITEMS } from '@/constants';
import { useIntl } from 'umi';

const Sidebar = ({ isOpen, toggle }) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const intl = useIntl();

  const handleToggleItem = (label) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
          />

          <motion.div
            className="fixed top-0 right-0 w-[280px] h-full bg-white dark:bg-gray-900 z-50 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-8">
                <div className="text-xl font-bold">
                  <span className="text-secondary">富崎</span>
                  <span className="text-black dark:text-white">Fuzuki</span>
                </div>
                <button
                  className="text-gray-700 dark:text-gray-300 text-2xl focus:outline-none"
                  onClick={toggle}
                  aria-label={intl.formatMessage({ id: 'navbar.menu' })}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <nav>
                <ul className="space-y-4">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.label}>
                      <div
                        className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                        onClick={() => handleToggleItem(item.label)}
                      >
                        {intl.formatMessage({ id: item.label })}
                      </div>
                      <AnimatePresence>
                        {item.dropdown && expandedItem === item.label && (
                          <motion.ul
                            className="mt-2 space-y-2 pl-4"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.dropdown.map((subItem) => (
                              <li key={subItem.label}>
                                <a
                                  href={subItem.href}
                                  className="block py-2 px-4 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                  onClick={toggle}
                                >
                                  {intl.formatMessage({ id: subItem.label })}
                                </a>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10">
                <a
                  className="w-full btn"
                  href={TAOBAO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {intl.formatMessage({ id: 'navbar.orderNow' })}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
