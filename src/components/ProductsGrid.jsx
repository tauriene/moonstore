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
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  // Fake loading effect when filters change
  useEffect(() => {
    setLoadingFilters(true);
    setPage(1); // Reset page on filter change
    const timer = setTimeout(() => {
      setLoadingFilters(false);
    }, 400); // 400ms fake loading
    return () => clearTimeout(timer);
  }, [filtered]);

  const visible = filtered.slice(0, page * PER_PAGE);

  const handleLoadMore = () => {
    setLoadingPage(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoadingPage(false);
    }, 400);
  };

  if (filtered.length === 0 && !loadingFilters) {
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
        {loadingFilters
          ? Array.from({ length: Math.min(filtered.length || PER_PAGE, PER_PAGE) }).map((_, i) => (
              <ProductCardSkeleton key={`skel-filter-${i}`} />
            ))
          : (
            <>
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} featured={!!p.featured} />
              ))}
              {loadingPage && Array.from({ length: Math.min(filtered.length - visible.length, PER_PAGE) }).map((_, i) => (
                <ProductCardSkeleton key={`skel-page-${i}`} />
              ))}
            </>
          )
        }
      </div>
      {!loadingFilters && visible.length < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            className="banner-btn" 
            onClick={handleLoadMore}
            disabled={loadingPage}
            style={{ opacity: loadingPage ? 0.7 : 1 }}
          >
            {loadingPage ? 'Загрузка...' : `Загрузить ещё (${filtered.length - visible.length})`}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsGrid;

