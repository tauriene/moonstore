import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPrice } from '../utils/format';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);
  const { addItem } = useCartStore();
  const { toggle, isLiked } = useWishlistStore();
  
  const [qty, setQty] = useState(1);
  const [btnText, setBtnText] = useState('В корзину');
  const [btnStyle, setBtnStyle] = useState({});

  if (!product) {
    return (
      <>
        <Header />
        <div style={{ padding: '80px 48px', textAlign: 'center' }}>
          <h2>Товар не найден</h2>
          <button className="banner-btn" style={{ marginTop: '20px' }} onClick={() => navigate('/')}>На главную</button>
        </div>
        <Footer />
      </>
    );
  }

  const liked = isLiked(product.id);

  const handleAdd = () => {
    addItem(product, qty);
    toast.success('Добавлено в корзину');
    setBtnText('✓ Добавлено');
    setBtnStyle({ background: 'var(--green, #4a9e6e)' });
    setTimeout(() => {
      setBtnText('В корзину');
      setBtnStyle({});
    }, 1800);
  };

  const handleWish = () => {
    toggle(product.id);
    if (!liked) {
      toast.success('Добавлено в избранное');
    }
  };

  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <Header />
      <div className="product-page">
        <div className="breadcrumbs">
          <span onClick={() => navigate('/')}>Главная</span>
          <span className="separator">/</span>
          <span onClick={() => navigate('/')}>Каталог</span>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-layout">
          <div className="product-gallery">
            <img src={product.imageUrl} alt={product.name} loading="lazy" />
          </div>
          <div className="product-info-panel">
            <h1>{product.name}</h1>
            <div className="modal-price-row" style={{ marginTop: '16px' }}>
              <span className="price-current" style={{ fontSize: '32px' }}>{formatPrice(product.priceCurrent)}</span>
              {product.priceOld && <span className="price-old">{formatPrice(product.priceOld)}</span>}
            </div>
            
            <div className="card-status" style={{ margin: '16px 0 24px' }}>
              <span className="status-dot"></span>
              <span className="status-text">{product.status}</span>
            </div>

            <div className="modal-meta" style={{ marginBottom: '32px' }}>
              <p><strong>Состав:</strong> {product.composition}</p>
              <p><strong>Размер:</strong> {product.size}</p>
              <p style={{ marginTop: '12px' }}>{product.description}</p>
            </div>

            <div className="product-actions">
              <div className="cart-qty" style={{ width: '120px', height: '48px', marginRight: '16px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="add-btn" style={{ opacity: 1, transform: 'none', flex: 1, height: '48px', fontSize: '14px', ...btnStyle }} onClick={handleAdd}>
                {btnText}
              </button>
              <button
                className={`wish-btn${liked ? ' liked' : ''}`}
                style={{ opacity: 1, transform: 'none', width: '48px', height: '48px', marginLeft: '16px' }}
                onClick={handleWish}
                aria-label={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="similar-products">
            <h2>Вам может понравиться</h2>
            <div className="products-grid" style={{ marginTop: '24px' }}>
              {similarProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
