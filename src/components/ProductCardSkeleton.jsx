import React from 'react';

function ProductCardSkeleton() {
  return (
    <div className="card skeleton-card">
      <div className="card-image skeleton" />
      <div className="card-body">
        <div className="card-price-row skeleton skeleton-text" style={{ width: '40%', height: '24px' }} />
        <div className="card-status skeleton skeleton-text" style={{ width: '60%', height: '14px', marginTop: '12px' }} />
        <div className="card-name skeleton skeleton-text" style={{ width: '80%', height: '16px', marginTop: '12px' }} />
      </div>
      <div className="card-footer">
        <div className="add-btn skeleton" style={{ border: 'none', background: 'var(--surface2)' }} />
        <div className="wish-btn skeleton" style={{ border: 'none', background: 'var(--surface2)' }} />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
