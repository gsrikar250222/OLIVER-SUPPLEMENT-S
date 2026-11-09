import React from 'react';
import ProductCard from './ProductCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';

export default function ProductGrid({ products, loading = false, count = 8 }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-catalog-state">
        <p className="empty-title">NO MATCHING VAULT PRODUCTS FOUND</p>
        <p className="empty-desc">Try clearing your filters or exploring our other athletic collections.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

