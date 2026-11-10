import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  PRODUCTS, 
  CATEGORIES, 
  BRANDS 
} from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Star, 
  RotateCcw, 
  ShieldCheck, 
  Filter 
} from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';
  const initialSort = searchParams.get('sort') || 'popularity';
  const searchQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedDiscount, setSelectedDiscount] = useState('all');
  const [selectedFlavor, setSelectedFlavor] = useState('all');
  const [selectedWeight, setSelectedWeight] = useState('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedBrand(searchParams.get('brand') || 'all');
    setSelectedSort(searchParams.get('sort') || 'popularity');
  }, [searchParams]);

  // Extract unique flavors & weights for filter lists
  const availableFlavors = useMemo(() => {
    const set = new Set();
    PRODUCTS.forEach(p => {
      if (p.flavors) p.flavors.forEach(f => set.add(f));
      else if (p.flavor) set.add(p.flavor);
    });
    return Array.from(set).slice(0, 10);
  }, []);

  const availableWeights = useMemo(() => {
    const set = new Set();
    PRODUCTS.forEach(p => {
      if (p.weights) p.weights.forEach(w => set.add(w));
      else if (p.size) set.add(p.size);
    });
    return Array.from(set).slice(0, 8);
  }, []);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categorySlug === selectedCategory || p.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Price range
    if (selectedPrice === 'under-1500') {
      result = result.filter(p => p.price < 1500);
    } else if (selectedPrice === '1500-3000') {
      result = result.filter(p => p.price >= 1500 && p.price <= 3000);
    } else if (selectedPrice === '3000-4500') {
      result = result.filter(p => p.price > 3000 && p.price <= 4500);
    } else if (selectedPrice === 'above-4500') {
      result = result.filter(p => p.price > 4500);
    }

    // Rating
    if (selectedRating === '4.8-plus') {
      result = result.filter(p => (p.rating || 5) >= 4.8);
    } else if (selectedRating === '4.5-plus') {
      result = result.filter(p => (p.rating || 5) >= 4.5);
    }

    // Discount
    if (selectedDiscount === '20-plus') {
      result = result.filter(p => (p.discount || 0) >= 20);
    } else if (selectedDiscount === '30-plus') {
      result = result.filter(p => (p.discount || 0) >= 30);
    }

    // Flavor
    if (selectedFlavor !== 'all') {
      result = result.filter(p => (p.flavors && p.flavors.includes(selectedFlavor)) || p.flavor === selectedFlavor);
    }

    // Weight
    if (selectedWeight !== 'all') {
      result = result.filter(p => (p.weights && p.weights.includes(selectedWeight)) || p.size === selectedWeight);
    }

    // Sorting
    if (selectedSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'newest') {
      result.sort((a, b) => (b.id > a.id ? 1 : -1));
    } else if (selectedSort === 'bestseller') {
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (selectedSort === 'discount') {
      result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else {
      // Popularity (default)
      result.sort((a, b) => ((b.rating || 0) * (b.reviews || 0)) - ((a.rating || 0) * (a.reviews || 0)));
    }

    return result;
  }, [
    searchQuery, 
    selectedCategory, 
    selectedBrand, 
    selectedPrice, 
    selectedRating, 
    selectedDiscount, 
    selectedFlavor, 
    selectedWeight, 
    selectedSort
  ]);

  const updateParam = (key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value === 'all' || !value) next.delete(key);
      else next.set(key, value);
      return next;
    });
  };

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    updateParam('category', slug);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    updateParam('brand', brand);
  };

  const handleSortSelect = (sortVal) => {
    setSelectedSort(sortVal);
    updateParam('sort', sortVal);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedPrice('all');
    setSelectedRating('all');
    setSelectedDiscount('all');
    setSelectedFlavor('all');
    setSelectedWeight('all');
    setSelectedSort('popularity');
    setSearchParams({});
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedBrand !== 'all',
    selectedPrice !== 'all',
    selectedRating !== 'all',
    selectedDiscount !== 'all',
    selectedFlavor !== 'all',
    selectedWeight !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="shop-page-wrapper">
      <div className="container">
        {/* Breadcrumb Header */}
        <div className="shop-header-banner">
          <div className="shop-breadcrumbs">
            <Link to="/">Home</Link> &gt; <span>Shop All Supplements</span>
            {selectedCategory !== 'all' && (
              <> &gt; <span className="current-crumb">{selectedCategory}</span></>
            )}
            {selectedBrand !== 'all' && (
              <> &gt; <span className="current-crumb">{selectedBrand}</span></>
            )}
          </div>

          <div className="shop-title-row">
            <div>
              <h1 className="shop-main-title">SPORTS NUTRITION CATALOGUE</h1>
              <p className="shop-sub-title">
                Showing {filteredProducts.length} verified sports supplements &bull; 100% Authentic with Importer Verification
              </p>
            </div>

            {/* Desktop Sort Dropdown */}
            <div className="shop-sort-box">
              <label htmlFor="sort-select">SORT BY:</label>
              <select 
                id="sort-select"
                value={selectedSort} 
                onChange={(e) => handleSortSelect(e.target.value)}
                className="sort-dropdown"
              >
                <option value="popularity">Popularity / Athlete Choice</option>
                <option value="bestseller">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="shop-mobile-action-bar">
            <button 
              className="btn-secondary mobile-filter-trigger"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={16} /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
            <select 
              value={selectedSort} 
              onChange={(e) => handleSortSelect(e.target.value)}
              className="sort-dropdown mobile-sort-select"
            >
              <option value="popularity">Popularity</option>
              <option value="bestseller">Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="active-filters-strip">
            <span className="active-label">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="filter-chip" onClick={() => handleCategorySelect('all')}>
                Category: {selectedCategory} <X size={12} />
              </span>
            )}
            {selectedBrand !== 'all' && (
              <span className="filter-chip" onClick={() => handleBrandSelect('all')}>
                Brand: {selectedBrand} <X size={12} />
              </span>
            )}
            {selectedPrice !== 'all' && (
              <span className="filter-chip" onClick={() => setSelectedPrice('all')}>
                Price: {selectedPrice} <X size={12} />
              </span>
            )}
            {selectedFlavor !== 'all' && (
              <span className="filter-chip" onClick={() => setSelectedFlavor('all')}>
                Flavour: {selectedFlavor} <X size={12} />
              </span>
            )}
            {selectedWeight !== 'all' && (
              <span className="filter-chip" onClick={() => setSelectedWeight('all')}>
                Size: {selectedWeight} <X size={12} />
              </span>
            )}
            <button className="clear-all-filters-btn" onClick={clearAllFilters}>
              Clear All ({activeFiltersCount})
            </button>
          </div>
        )}

        {/* Main 2-Column Layout (Sidebar Filters + Products Grid) */}
        <div className="shop-main-layout">
          {/* Desktop Filter Sidebar */}
          <aside className="shop-filter-sidebar">
            <div className="filter-sidebar-header">
              <h3><Filter size={18} /> FILTER SUPPLEMENTS</h3>
              {activeFiltersCount > 0 && (
                <button className="reset-filter-btn" onClick={clearAllFilters}>Reset</button>
              )}
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h4 className="filter-group-title">CATEGORIES</h4>
              <div className="filter-options-list">
                <button 
                  className={`filter-opt-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategorySelect('all')}
                >
                  All Categories <span className="opt-count">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    className={`filter-opt-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat.slug)}
                  >
                    {cat.name} <span className="opt-count">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="filter-group">
              <h4 className="filter-group-title">CERTIFIED BRANDS</h4>
              <div className="filter-options-list">
                <button 
                  className={`filter-opt-btn ${selectedBrand === 'all' ? 'active' : ''}`}
                  onClick={() => handleBrandSelect('all')}
                >
                  All Brands
                </button>
                {BRANDS.map(brand => (
                  <button 
                    key={brand}
                    className={`filter-opt-btn ${selectedBrand.toLowerCase() === brand.toLowerCase() ? 'active' : ''}`}
                    onClick={() => handleBrandSelect(brand)}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h4 className="filter-group-title">PRICE RANGE (₹)</h4>
              <div className="filter-options-list">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-1500', label: 'Under ₹1,500' },
                  { id: '1500-3000', label: '₹1,500 to ₹3,000' },
                  { id: '3000-4500', label: '₹3,000 to ₹4,500' },
                  { id: 'above-4500', label: 'Above ₹4,500' }
                ].map(p => (
                  <button 
                    key={p.id}
                    className={`filter-opt-btn ${selectedPrice === p.id ? 'active' : ''}`}
                    onClick={() => setSelectedPrice(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="filter-group">
              <h4 className="filter-group-title">ATHLETE RATING</h4>
              <div className="filter-options-list">
                <button 
                  className={`filter-opt-btn ${selectedRating === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedRating('all')}
                >
                  All Ratings
                </button>
                <button 
                  className={`filter-opt-btn ${selectedRating === '4.8-plus' ? 'active' : ''}`}
                  onClick={() => setSelectedRating('4.8-plus')}
                >
                  ★ 4.8 & Above (Top Rated)
                </button>
                <button 
                  className={`filter-opt-btn ${selectedRating === '4.5-plus' ? 'active' : ''}`}
                  onClick={() => setSelectedRating('4.5-plus')}
                >
                  ★ 4.5 & Above
                </button>
              </div>
            </div>

            {/* Minimum Discount */}
            <div className="filter-group">
              <h4 className="filter-group-title">DISCOUNT</h4>
              <div className="filter-options-list">
                <button 
                  className={`filter-opt-btn ${selectedDiscount === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedDiscount('all')}
                >
                  All Discounts
                </button>
                <button 
                  className={`filter-opt-btn ${selectedDiscount === '20-plus' ? 'active' : ''}`}
                  onClick={() => setSelectedDiscount('20-plus')}
                >
                  20% Off or More
                </button>
                <button 
                  className={`filter-opt-btn ${selectedDiscount === '30-plus' ? 'active' : ''}`}
                  onClick={() => setSelectedDiscount('30-plus')}
                >
                  30% Off or More
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="shop-products-main">
            {filteredProducts.length === 0 ? (
              <div className="shop-empty-state">
                <ShieldCheck size={52} className="empty-shield-icon" />
                <h3>NO SUPPLEMENTS MATCH YOUR SELECTION</h3>
                <p>Try clearing some filters or searching for another supplement brand or category.</p>
                <button className="btn-primary" onClick={clearAllFilters}>
                  CLEAR ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Responsive Mobile Filter Drawer */}
      <div 
        className={`drawer-backdrop ${mobileFilterOpen ? 'active' : ''}`}
        onClick={() => setMobileFilterOpen(false)}
      />
      <div className={`mobile-filter-drawer ${mobileFilterOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">FILTERS ({activeFiltersCount})</span>
          <button className="drawer-close-btn" onClick={() => setMobileFilterOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body mobile-filter-body">
          {/* Categories */}
          <div className="mobile-filter-block">
            <h4>Category</h4>
            <div className="mobile-chip-options">
              <button 
                className={`opt-chip ${selectedCategory === 'all' ? 'selected' : ''}`}
                onClick={() => handleCategorySelect('all')}
              >All</button>
              {CATEGORIES.map(c => (
                <button 
                  key={c.id} 
                  className={`opt-chip ${selectedCategory === c.slug ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect(c.slug)}
                >{c.name}</button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mobile-filter-block">
            <h4>Brand</h4>
            <div className="mobile-chip-options">
              <button 
                className={`opt-chip ${selectedBrand === 'all' ? 'selected' : ''}`}
                onClick={() => handleBrandSelect('all')}
              >All</button>
              {BRANDS.map(b => (
                <button 
                  key={b} 
                  className={`opt-chip ${selectedBrand.toLowerCase() === b.toLowerCase() ? 'selected' : ''}`}
                  onClick={() => handleBrandSelect(b)}
                >{b}</button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mobile-filter-block">
            <h4>Price Range</h4>
            <div className="mobile-chip-options">
              <button 
                className={`opt-chip ${selectedPrice === 'all' ? 'selected' : ''}`}
                onClick={() => setSelectedPrice('all')}
              >All</button>
              <button 
                className={`opt-chip ${selectedPrice === 'under-1500' ? 'selected' : ''}`}
                onClick={() => setSelectedPrice('under-1500')}
              >Under ₹1,500</button>
              <button 
                className={`opt-chip ${selectedPrice === '1500-3000' ? 'selected' : ''}`}
                onClick={() => setSelectedPrice('1500-3000')}
              >₹1,500 - ₹3,000</button>
              <button 
                className={`opt-chip ${selectedPrice === '3000-4500' ? 'selected' : ''}`}
                onClick={() => setSelectedPrice('3000-4500')}
              >₹3,000 - ₹4,500</button>
              <button 
                className={`opt-chip ${selectedPrice === 'above-4500' ? 'selected' : ''}`}
                onClick={() => setSelectedPrice('above-4500')}
              >Above ₹4,500</button>
            </div>
          </div>
        </div>

        <div className="drawer-footer mobile-filter-footer">
          <button className="btn-secondary" onClick={clearAllFilters} style={{ flex: 1 }}>
            RESET
          </button>
          <button className="btn-primary" onClick={() => setMobileFilterOpen(false)} style={{ flex: 2 }}>
            SHOW {filteredProducts.length} PRODUCTS
          </button>
        </div>
      </div>
    </div>
  );
}
