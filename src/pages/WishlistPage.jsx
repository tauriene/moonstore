import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';
import { formatPrice } from '../utils/format';

function WishlistPage() {
  const navigate = useNavigate();
  const { ids, toggle } = useWishlistStore();
  const { addItem } = useCartStore();

  const wishlistProducts = products.filter(p => ids.includes(p.id));

  const totalValue = wishlistProducts.reduce((sum, p) => sum + p.priceCurrent, 0);

  const handleAddAll = () => {
    wishlistProducts.forEach(p => addItem(p));
  };

  return (
    <>
      <Header />
      <div className="wishlist-page">
        <div className="wishlist-header">
          <div>
            <button className="wishlist-back" onClick={() => navigate('/')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              В каталог
            </button>
            <h1>Избранное</h1>
            {wishlistProducts.length > 0 && (
              <p className="wishlist-subtitle">
                {wishlistProducts.length} {plural(wishlistProducts.length, 'букет', 'букета', 'букетов')} · {formatPrice(totalValue)}
              </p>
            )}
          </div>
          {wishlistProducts.length > 0 && (
            <button className="banner-btn" onClick={handleAddAll}>
              Добавить все в корзину
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h2>Здесь пока пусто</h2>
            <p>Добавляйте понравившиеся букеты, нажимая на сердечко на карточке товара.</p>
            <button className="banner-btn" onClick={() => navigate('/')} style={{ marginTop: '24px' }}>
              Перейти в каталог
            </button>
          </div>
        ) : (
          <>
            <div className="products-grid wishlist-grid">
              {wishlistProducts.map(p => (
                <WishlistCard
                  key={p.id}
                  product={p}
                  onRemove={() => toggle(p.id)}
                  onAdd={() => addItem(p)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

// Специальная карточка для избранного с кнопкой "Удалить"
function WishlistCard({ product, onRemove, onAdd }) {
  const navigate = useNavigate();
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="wishlist-card" onClick={() => navigate(`/product/${product.slug}`)}>
      <div className="wishlist-card-img">
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        {product.discount && (
          <span className="card-badge badge-sale">−{product.discount}%</span>
        )}
        <button
          className="wishlist-remove-btn"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          aria-label="Удалить из избранного"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="wishlist-card-body">
        <p className="card-name">{product.name}</p>
        <div className="wishlist-card-price-row">
          <span className="price-current">{formatPrice(product.priceCurrent)}</span>
          {product.priceOld && <span className="price-old">{formatPrice(product.priceOld)}</span>}
        </div>
        <button
          className="add-btn wishlist-add-btn"
          style={added ? { background: 'var(--green)', opacity: 1, transform: 'none' } : { opacity: 1, transform: 'none' }}
          onClick={handleAdd}
        >
          {added ? '✓ Добавлено' : 'В корзину'}
        </button>
      </div>
    </div>
  );
}

// Склонение числительных
function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

export default WishlistPage;
