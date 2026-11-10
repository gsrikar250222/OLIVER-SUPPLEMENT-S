import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, ShieldCheck, Flame, Zap } from 'lucide-react';
import { searchProducts } from '../data/products.js';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(() => {
      const hits = searchProducts(query.trim());
      setResults(hits);
      setSearching(false);
    }, 120);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    onClose();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={22} className="search-header-icon" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search Whey Protein, Creatine, Pre-Workout, Optimum Nutrition, Isolate..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-main-input"
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && query.trim()) {
                handleViewAll(e);
              }
            }}
          />
          {query && (
            <button className="clear-search-btn" onClick={() => setQuery('')} aria-label="Clear Search">
              <X size={18} />
            </button>
          )}
          <button className="close-modal-btn" onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="search-suggestions-wrap">
            <span className="suggestions-label">POPULAR SUPPLEMENT SEARCHES:</span>
            <div className="search-pills-list">
              <button type="button" onClick={() => setQuery('Gold Standard')}>Gold Standard Whey</button>
              <button type="button" onClick={() => setQuery('Creatine')}>Creatine Monohydrate</button>
              <button type="button" onClick={() => setQuery('ISO-100')}>ISO-100 Hydrolyzed</button>
              <button type="button" onClick={() => setQuery('Pre-Workout')}>High-Stim Pre-Workout</button>
              <button type="button" onClick={() => setQuery('Mass Gainer')}>Anabolic Mass Gainer</button>
              <button type="button" onClick={() => setQuery('Fish Oil')}>Triple Strength Omega-3</button>
              <button type="button" onClick={() => setQuery('Multivitamin')}>Daily Multivitamin</button>
              <button type="button" onClick={() => setQuery('BCAA')}>BCAA 2:1:1</button>
            </div>
          </div>
        )}

        {/* Live Results List */}
        <div className="search-results-container">
          {searching ? (
            <div className="search-loading">Searching Oliver Sports Nutrition catalogue...</div>
          ) : query && results.length === 0 ? (
            <div className="search-no-results">
              <p>No supplements found for "<strong>{query}</strong>"</p>
              <p className="no-res-hint">Check spelling or try searching for <em>Whey</em>, <em>Creatine</em>, <em>MuscleTech</em>, or <em>Pre-Workout</em>.</p>
            </div>
          ) : (
            <div className="search-hits-list">
              {results.slice(0, 8).map((product) => (
                <div 
                  key={product.id} 
                  className="search-hit-item"
                  onClick={() => handleSelect(product.id)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="search-hit-thumb" 
                  />
                  <div className="search-hit-details">
                    <span className="search-hit-brand">{product.brand}</span>
                    <h4 className="search-hit-title">{product.name}</h4>
                    <div className="search-hit-meta">
                      <span className="search-hit-cat">{product.category}</span>
                      <span className="search-hit-weight">{product.size}</span>
                      {product.flavor && <span className="search-hit-flavor">&bull; {product.flavor}</span>}
                    </div>
                  </div>
                  <div className="search-hit-price-area">
                    <span className="search-hit-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.mrp && product.mrp > product.price && (
                      <span className="search-hit-discount">{product.discount}% OFF</span>
                    )}
                  </div>
                </div>
              ))}

              {results.length > 8 && (
                <div className="search-see-all-wrap">
                  <button className="btn-secondary see-all-search-btn" onClick={handleViewAll}>
                    View All {results.length} Supplement Matches <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
