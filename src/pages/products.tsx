import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Products from '@/components/Products';
import Footer from '@/components/Footer';
import './index.css';


function ProductsPage() {
  return (
    <>
      <Products />
      <Footer />
    </>
  );
};

export default ProductsPage;
