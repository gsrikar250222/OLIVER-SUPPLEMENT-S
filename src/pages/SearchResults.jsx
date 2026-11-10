import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS, searchProducts } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { Search, ShieldCheck, ArrowRight } from 'lucide-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query.trim());
  }, [query]);

  return (
    <div className="search-results-page container section-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <Link to="/shop">Shop</Link>
        <span>&gt;</span>
        <span className="current">Search: "{query}"</span>
      </nav>

      <div className="search-page-header">
        <div className="search-icon-bubble">
          <Search size={28} />
        </div>
        <div>
          <h1 className="search-page-title">
            SEARCH RESULTS FOR <span className="highlight-query">"{query}"</span>
          </h1>
          <p className="search-page-subtitle">
            Found <strong>{results.length}</strong> matching sports nutrition supplements in our authentic catalogue
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="search-empty-box mt-40">
          <ShieldCheck size={52} className="empty-icon-shield" />
          <h3>NO SUPPLEMENTS MATCHED "{query}"</h3>
          <p>We couldn't find exact matches for your search. Try searching by generic category or brand:</p>
          <div className="search-fallback-pills mt-20">
            <Link to="/category/whey-protein" className="fallback-pill">Whey Protein</Link>
            <Link to="/category/whey-isolate" className="fallback-pill">Whey Isolate</Link>
            <Link to="/category/creatine" className="fallback-pill">Creatine</Link>
            <Link to="/category/pre-workout" className="fallback-pill">Pre-Workout</Link>
            <Link to="/category/mass-gainers" className="fallback-pill">Mass Gainers</Link>
            <Link to="/category/vitamins-minerals" className="fallback-pill">Multivitamins</Link>
          </div>
          <Link to="/shop" className="btn-primary mt-30">
            BROWSE COMPLETE CATALOGUE &rarr;
          </Link>
        </div>
      ) : (
        <div className="products-grid mt-30">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

