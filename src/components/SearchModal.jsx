import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { api } from '../services/api.js';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
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
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      const res = await api.getProducts({ search: query.trim(), limit: 8 });
      setResults(res);
      setSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleCategoryPill = (catSlug) => {
    onClose();
    navigate(`/category/${catSlug}`);
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={22} className="search-header-icon" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search hoodies, oversized tees, compression, joggers..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-main-input"
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
          />
          {query && (
            <button className="clear-search-btn" onClick={() => setQuery('')}>
              <X size={18} />
            </button>
          )}
          <button className="close-modal-btn" onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </div>

        {/* Quick Categories Bar */}
        {!query && (
          <div className="search-suggestions-wrap">
            <span className="suggestions-label">POPULAR VAULT SEARCHES:</span>
            <div className="search-pills-list">
              <button onClick={() => setQuery('Oversized')}>Oversized Tees</button>
              <button onClick={() => setQuery('Compression')}>Compression</button>
              <button onClick={() => setQuery('Aesthetic Zip-Up')}>Aesthetic Zip-Up</button>
              <button onClick={() => setQuery('Joggers')}>Cargo Joggers</button>
              <button onClick={() => setQuery('Sports Bra')}>Sports Bra</button>
              <button onClick={() => setQuery('Backpack')}>Backpack</button>
            </div>
          </div>
        )}

        {/* Live Results List */}
        <div className="search-results-container">
          {searching ? (
            <div className="search-loading">Searching the Repvault catalog...</div>
          ) : results.length > 0 ? (
            <div className="search-results-grid">
              {results.map(product => (
                <div 
                  key={product.id} 
                  className="search-result-item"
                  onClick={() => handleSelect(product.id)}
                >
                  <img 
                    src={`/${product.primaryImage.replace(/^\//, '')}`} 
                    alt={product.name} 
                    className="search-item-thumb" 
                  />
                  <div className="search-item-info">
                    <span className="search-item-cat">{product.categoryName}</span>
                    <h4 className="search-item-title">{product.name}</h4>
                    <div className="search-item-prices">
                      <span className="search-item-price">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice && (
                        <span className="search-item-orig">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                  <ArrowRight size={18} className="search-item-arrow" />
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="search-no-results">
              <p>No products found matching "<strong>{query}</strong>"</p>
              <span>Try checking your spelling or search for "tee", "hoodie", or "shorts".</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

