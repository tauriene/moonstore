import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import { useFilterStore } from '../store/filterStore';

const PER_PAGE = 8;

function ProductsGrid() {
  const filtered = useFilteredProducts();
  const resetFilters = useFilterStore(state => state.reset);
  const [page, setPage] = useState(1);

  const visible = filtered.slice(0, page * PER_PAGE);

  if (filtered.length === 0) {
    return (
      <div className="grid-wrapper empty-state">
        <p>К сожалению, по вашим фильтрам ничего не найдено.</p>
        <button className="banner-btn" onClick={resetFilters} style={{ marginTop: '16px' }}>
          Сбросить фильтры
        </button>
      </div>
    );
  }

  return (
    <div className="grid-wrapper">
      <div className="products-grid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {visible.length < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="banner-btn" onClick={() => setPage(prev => prev + 1)}>
            Загрузить ещё ({filtered.length - visible.length})
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsGrid;

