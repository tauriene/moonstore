import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import { useFilterStore } from '../store/filterStore';

const PER_PAGE = 8;

function ProductsGrid() {
  const filtered = useFilteredProducts();
  const resetFilters = useFilterStore(state => state.reset);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fake loading effect when filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // 400ms fake loading
    return () => clearTimeout(timer);
  }, [filtered]);

  const visible = filtered.slice(0, page * PER_PAGE);

  if (filtered.length === 0 && !loading) {
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
        {loading
          ? Array.from({ length: Math.min(filtered.length || PER_PAGE, PER_PAGE) }).map((_, i) => (
              <ProductCardSkeleton key={`skel-${i}`} />
            ))
          : visible.map((p) => (
              <ProductCard key={p.id} product={p} featured={!!p.featured} />
            ))
        }
      </div>
      {!loading && visible.length < filtered.length && (
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

