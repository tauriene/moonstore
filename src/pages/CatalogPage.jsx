import React from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>MOONSTORE — Авторская флористика и доставка цветов в Москве</title>
        <meta name="description" content="Купить премиальные букеты, монобукеты и авторские композиции с доставкой по Москве от 60 минут." />
      </Helmet>
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
