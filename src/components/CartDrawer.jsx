import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, selectTotalCount, selectTotalPrice } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { formatPrice } from '../utils/format';
import { useModalLock } from '../hooks/useModalLock';

function CartDrawer() {
  const { cartOpen, setCartOpen } = useUIStore();
  const { items, removeItem, updateQty } = useCartStore();
  const totalCount = useCartStore(selectTotalCount);
  const totalPrice = useCartStore(selectTotalPrice);
  const navigate = useNavigate();

  useModalLock(cartOpen, () => setCartOpen(false));

  return (
    <>
      <div
        className={`cart-overlay${cartOpen ? ' cart-overlay--visible' : ''}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
        style={{ pointerEvents: cartOpen ? 'auto' : 'none' }}
      />
      <div
        className={`cart-drawer${cartOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal={cartOpen}
        aria-label="Корзина"
        style={{ pointerEvents: cartOpen ? 'auto' : 'none' }}
      >
        <div className="cart-header">
          <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Закрыть корзину">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Назад
          </button>
          <h3>Корзина ({totalCount})</h3>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">Ваша корзина пуста</div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.imageUrl} alt={item.product.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4>{item.product.name}</h4>
                  <div className="cart-item-price">{formatPrice(item.product.priceCurrent)}</div>

                  <div className="cart-qty">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      aria-label="Уменьшить количество"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      aria-label="Увеличить количество"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(item.product.id)}
                  aria-label={`Удалить ${item.product.name}`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Итого:</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <button
              className="banner-btn"
              style={{ width: '100%', background: 'var(--accent)', color: '#0e0e0e' }}
              onClick={() => { setCartOpen(false); navigate('/checkout'); }}
            >
              Оформить заказ →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
