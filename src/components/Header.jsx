import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, selectTotalCount } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useFilterStore } from '../store/filterStore';
import { useUIStore } from '../store/uiStore';
import { FaTelegramPlane } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const totalCount = useCartStore(selectTotalCount);
  const wishlistCount = useWishlistStore(s => s.ids.length);
  const { search, setSearch } = useFilterStore();
  const setCartOpen = useUIStore(s => s.setCartOpen);

  return (
    <header>
      <button
        className="logo"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
        onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
        aria-label="На главную"
      >
        <span className="logo-name">MOONSTORE</span>
        <span className="logo-sub">Flower Studio</span>
      </button>

      <div className="header-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Найти букет, повод, цветок…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Поиск по каталогу"
        />
      </div>

      <div className="header-actions">
        <div className="header-phone">
          <a href="tel:88005501900">8 800 550 19 00</a>
          <span>Ежедневно · Круглосуточно</span>
        </div>

        <a href="https://t.me/moonstore_bot" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button className="icon-btn" aria-label="Написать в Telegram">
            <FaTelegramPlane size={16} />
          </button>
        </a>

        <button
          className="icon-btn"
          aria-label={`Избранное${wishlistCount > 0 ? `, ${wishlistCount} товара` : ''}`}
          onClick={() => navigate('/wishlist')}
          style={{ position: 'relative' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </button>

        <button
          className="icon-btn"
          aria-label={`Открыть корзину${totalCount > 0 ? `, ${totalCount} товара` : ''}`}
          onClick={() => setCartOpen(true)}
          style={{ position: 'relative' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {totalCount > 0 && <span className="badge">{totalCount}</span>}
        </button>
      </div>
    </header>
  );
}

export default Header;
