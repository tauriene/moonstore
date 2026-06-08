import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import ChatBubble from './components/ChatBubble';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--accent)',
            color: '#0e0e0e',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '12px 24px',
          },
          success: {
            iconTheme: {
              primary: '#0e0e0e',
              secondary: 'var(--accent)',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CartDrawer />
      <ProductModal />
      <ChatBubble />
    </BrowserRouter>
  );
}

export default App;

