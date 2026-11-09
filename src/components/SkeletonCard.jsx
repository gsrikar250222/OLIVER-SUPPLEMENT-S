import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="product-card skeleton-card">
      <div className="skeleton-image skeleton-pulse"></div>
      <div className="skeleton-info">
        <div className="skeleton-line skeleton-cat skeleton-pulse"></div>
        <div className="skeleton-line skeleton-title skeleton-pulse"></div>
        <div className="skeleton-line skeleton-price skeleton-pulse"></div>
      </div>
    </div>
  );
}

