import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPrice } from '../utils/format';
import { useModalLock } from '../hooks/useModalLock';

function ProductModal() {
  const { modalProduct: product, closeModal } = useUIStore();
  const { addItem } = useCartStore();
  const { toggle, isLiked } = useWishlistStore();
  const navigate = useNavigate();

  useModalLock(!!product, closeModal);

  if (!product) return null;

  const liked = isLiked(product.id);

  const handleAdd = () => {
    addItem(product);
    closeModal();
  };

  const handleMore = () => {
    closeModal();
    navigate(`/product/${product.slug}`);
  };

  return (
    <>
      <div className="modal-overlay" onClick={closeModal} aria-hidden="true" />
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        <button className="modal-close" onClick={closeModal} aria-label="Закрыть" autoFocus>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="modal-body">
          <div className="modal-img-wrapper">
            <img src={product.imageUrl} alt={product.name} className="modal-img" />
          </div>
          <div className="modal-info">
            <h2>{product.name}</h2>
            <div className="modal-price-row">
              <span className="price-current">{formatPrice(product.priceCurrent)}</span>
              {product.priceOld && <span className="price-old">{formatPrice(product.priceOld)}</span>}
            </div>
            <div className="card-status" style={{ marginBottom: '16px' }}>
              <span className="status-dot"></span>
              <span className="status-text">{product.status}</span>
            </div>

            <p className="modal-desc">{product.description}</p>

            <div className="modal-meta">
              <p><strong>Состав:</strong> {product.composition}</p>
              <p><strong>Размер:</strong> {product.size}</p>
            </div>

            <div className="modal-actions">
              <button
                className="add-btn"
                style={{ opacity: 1, transform: 'none', padding: '14px 0' }}
                onClick={handleAdd}
              >
                В корзину
              </button>
              <button
                className={`wish-btn${liked ? ' liked' : ''}`}
                style={{ opacity: 1, transform: 'none', width: '44px', height: '44px' }}
                onClick={() => toggle(product.id)}
                aria-label={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
            <button className="banner-btn" style={{ width: '100%', marginTop: '12px' }} onClick={handleMore}>
              Подробнее о товаре
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;
