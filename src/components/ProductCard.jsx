import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPrice } from '../utils/format';
import { BsLightningFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

// Иконка сердца — компонент для переиспользования
const HeartIcon = ({ filled, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SUCCESS_COLOR = 'var(--green, #4a9e6e)';
const SUCCESS_TIMEOUT = 1800;

function ProductCard({ product, featured = false }) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { toggle, isLiked } = useWishlistStore();
  const { openModal } = useUIStore();

  const liked = isLiked(product.id);

  const [btnText, setBtnText] = useState('В корзину');
  const [btnAdded, setBtnAdded] = useState(false);

  const handleAdd = useCallback((e) => {
    e.stopPropagation();
    addItem(product);
    toast.success('Добавлено в корзину');
    setBtnText('✓ Добавлено');
    setBtnAdded(true);
    setTimeout(() => {
      setBtnText('В корзину');
      setBtnAdded(false);
    }, SUCCESS_TIMEOUT);
  }, [addItem, product]);

  const handleWish = useCallback((e) => {
    e.stopPropagation();
    toggle(product.id);
    if (!liked) {
      toast.success('Добавлено в избранное');
    }
  }, [toggle, product.id, liked]);

  const handleClick = useCallback(() => {
    openModal(product);
  }, [openModal, product]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(product);
    }
  };

  return (
    <div
      className={`card${featured ? ' featured' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Открыть ${product.name}`}
    >
      <div className="card-image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="placeholder" aria-hidden="true" />
        )}

        {product.discount && (
          <span className="card-badge badge-sale">−{product.discount}%</span>
        )}
        {product.tags.includes('hit') && (
          <span
            className="card-badge badge-hit"
            style={{ left: product.discount ? 'auto' : '12px', right: product.discount ? '12px' : 'auto' }}
          >
            Хит
          </span>
        )}
        {product.tags.includes('new') && (
          <span className="card-badge badge-new">Новинка</span>
        )}
        {product.tags.includes('premium') && (
          <span className="card-badge" style={{ background: '#2a2a2a', color: '#c8a97e', left: '12px' }}>Premium</span>
        )}
        {product.tags.includes('express') && (
          <span className="badge-express" aria-label="Экспресс-доставка"><BsLightningFill /></span>
        )}
      </div>

      <div className="card-body">
        <div className="card-price-row">
          <span className="price-current">{formatPrice(product.priceCurrent)}</span>
          {product.priceOld && <span className="price-old">{formatPrice(product.priceOld)}</span>}
        </div>
        <div className="card-status">
          <span className="status-dot"></span>
          <span className="status-text">{product.status}</span>
        </div>
        <p className="card-name">{product.name}</p>
      </div>

      <div className="card-footer">
        <button
          className="add-btn"
          style={btnAdded ? { background: SUCCESS_COLOR } : undefined}
          onClick={handleAdd}
          aria-label={`${btnText} ${product.name}`}
        >
          {btnText}
        </button>
        <button
          className={`wish-btn${liked ? ' liked' : ''}`}
          onClick={handleWish}
          aria-label={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <HeartIcon filled={liked} />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
