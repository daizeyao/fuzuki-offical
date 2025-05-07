import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Products from './components/Products';
import FAQ from './components/FAQ';
import Footer from '@/components/Footer';
import './index.css';

function IndexPage() {

  return (
    <>
      <Hero />
      <Products />
      <About />
      <Features />
      <Services />
      <FAQ />
      <Footer />
    </>
  );
}

export default IndexPage;