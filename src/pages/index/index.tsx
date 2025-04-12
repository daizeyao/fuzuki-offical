import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from '@/components/Footer';
import './index.css';

function IndexPage() {

  return (
    <>
      <Hero />
      <About />
      <Features />
      <Services />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}

export default IndexPage;