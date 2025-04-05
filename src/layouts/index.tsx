import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'umi';
import styles from './index.less';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
export default function Layout() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 禁止侧边栏打开时的背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    // @ts-ignore
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar toggle={toggle} />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
