import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import HeroStrip from '../components/HeroStrip';
import Filters from '../components/Filters';
import EditorialBanner from '../components/EditorialBanner';
import Toolbar from '../components/Toolbar';
import ProductsGrid from '../components/ProductsGrid';
import Footer from '../components/Footer';

function CatalogPage() {
  return (
    <>
      <Header />
      <Nav />
      <HeroStrip />
      <Filters />
      <EditorialBanner />
      <Toolbar />
      <ProductsGrid />
      <Footer />
    </>
  );
}

export default CatalogPage;
