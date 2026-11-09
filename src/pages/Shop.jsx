import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { CATEGORIES } from '../data/products.js';
import ProductGrid from '../components/ProductGrid.jsx';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialGender = searchParams.get('gender') || 'all';
  const initialSort = searchParams.get('sort') || 'bestseller';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync state if query params change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const gen = searchParams.get('gender') || 'all';
    const srt = searchParams.get('sort') || 'bestseller';
    setSelectedCategory(cat);
    setSelectedGender(gen);
    setSelectedSort(srt);
  }, [searchParams]);

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      const res = await api.getProducts({
        category: selectedCategory,
        gender: selectedGender,
        sort: selectedSort
      });

      let filtered = res;

      // Filter by size if selected
      if (selectedSize !== 'all') {
        filtered = filtered.filter(p => p.sizes && p.sizes.includes(selectedSize));
      }

      // Filter by price range
      if (priceRange === 'under-1000') {
        filtered = filtered.filter(p => p.price < 1000);
      } else if (priceRange === '1000-1500') {
        filtered = filtered.filter(p => p.price >= 1000 && p.price <= 1500);
      } else if (priceRange === '1500-2000') {
        filtered = filtered.filter(p => p.price > 1500 && p.price <= 2000);
      } else if (priceRange === 'above-2000') {
        filtered = filtered.filter(p => p.price > 2000);
      }

      setProducts(filtered);
      setLoading(false);
    }
    fetchFiltered();
  }, [selectedCategory, selectedGender, selectedSort, selectedSize, priceRange]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (catId === 'all') next.delete('category');
      else next.set('category', catId);
      return next;
    });
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (gender === 'all') next.delete('gender');
      else next.set('gender', gender);
      return next;
    });
  };

  const handleSortChange = (sortVal) => {
    setSelectedSort(sortVal);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('sort', sortVal);
      return next;
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('all');
    setSelectedSort('bestseller');
    setSelectedSize('all');
    setPriceRange('all');
    setSearchParams({});
  };

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);
  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (selectedGender !== 'all' ? 1 : 0) + 
    (selectedSize !== 'all' ? 1 : 0) + 
    (priceRange !== 'all' ? 1 : 0);

  return (
    <div className="shop-page container section-pad">
      {/* Breadcrumb Header */}
      <div className="shop-header">
        <nav className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Catalog</Link>
          {activeCategoryObj && (
            <>
              <span>/</span>
              <span className="current">{activeCategoryObj.name}</span>
            </>
          )}
        </nav>

        <div className="shop-title-row">
          <div>
            <h1 className="shop-title">
              {activeCategoryObj ? activeCategoryObj.name : "ALL ATHLETIC GEAR"}
            </h1>
            <p className="shop-subtitle">
              {activeCategoryObj 
                ? activeCategoryObj.description 
                : "Engineered high-density fabrics, structured silhouettes, and anatomical cutlines."
              }
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            className="mobile-filter-btn" 
            onClick={() => setMobileFilterOpen(true)}
          >
            <SlidersHorizontal size={18} />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="shop-layout">
        {/* Backdrop for Mobile Sidebar */}
        {mobileFilterOpen && (
          <div 
            className="drawer-backdrop" 
            onClick={() => setMobileFilterOpen(false)}
          />
        )}

        {/* Filter Sidebar */}
        <aside className={`shop-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header-mobile">
            <span className="sidebar-title">REFINE RESULTS</span>
            <button 
              className="close-sidebar-btn" 
              onClick={() => setMobileFilterOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {activeFiltersCount > 0 && (
            <div className="clear-filters-box">
              <span>{activeFiltersCount} filter(s) active</span>
              <button onClick={clearAllFilters} className="clear-all-btn">
                Clear All
              </button>
            </div>
          )}

          {/* Category Filter */}
          <div className="filter-group">
            <h4 className="filter-group-title">CATEGORIES</h4>
            <div className="filter-options-list">
              <label className="filter-radio-label">
                <input 
                  type="radio" 
                  name="category" 
                  checked={selectedCategory === 'all'} 
                  onChange={() => handleCategoryChange('all')}
                />
                <span className="radio-custom"></span>
                <span>All Categories (80)</span>
              </label>
              {CATEGORIES.map(cat => (
                <label key={cat.id} className="filter-radio-label">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === cat.id} 
                    onChange={() => handleCategoryChange(cat.id)}
                  />
                  <span className="radio-custom"></span>
                  <span>{cat.name} ({cat.itemCount})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="filter-group">
            <h4 className="filter-group-title">GENDER / DIVISION</h4>
            <div className="filter-options-list">
              {[
                { label: 'All Divisions', value: 'all' },
                { label: "Men's Gear", value: 'men' },
                { label: "Women's Activewear", value: 'women' },
                { label: "Unisex / Gear", value: 'unisex' }
              ].map(item => (
                <label key={item.value} className="filter-radio-label">
                  <input 
                    type="radio" 
                    name="gender" 
                    checked={selectedGender === item.value} 
                    onChange={() => handleGenderChange(item.value)}
                  />
                  <span className="radio-custom"></span>
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="filter-group">
            <h4 className="filter-group-title">AVAILABLE SIZES</h4>
            <div className="size-filter-grid">
              {['all', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button 
                  key={size}
                  className={`size-filter-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size === 'all' ? 'ANY' : size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4 className="filter-group-title">PRICE RANGE</h4>
            <div className="filter-options-list">
              {[
                { label: 'All Prices', value: 'all' },
                { label: 'Under ₹1,000', value: 'under-1000' },
                { label: '₹1,000 – ₹1,500', value: '1000-1500' },
                { label: '₹1,500 – ₹2,000', value: '1500-2000' },
                { label: 'Above ₹2,000', value: 'above-2000' }
              ].map(item => (
                <label key={item.value} className="filter-radio-label">
                  <input 
                    type="radio" 
                    name="priceRange" 
                    checked={priceRange === item.value} 
                    onChange={() => setPriceRange(item.value)}
                  />
                  <span className="radio-custom"></span>
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {mobileFilterOpen && (
            <button 
              className="btn btn-primary full-width mt-20"
              onClick={() => setMobileFilterOpen(false)}
            >
              APPLY FILTERS ({products.length} PRODUCTS)
            </button>
          )}
        </aside>

        {/* Products Grid Area */}
        <main className="shop-main">
          {/* Top Bar with Count & Sort */}
          <div className="shop-top-controls">
            <span className="product-count-label">
              Showing <strong>{products.length}</strong> items
            </span>

            <div className="sort-wrapper">
              <label htmlFor="sort-select">SORT BY:</label>
              <select 
                id="sort-select" 
                value={selectedSort} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="sort-dropdown"
              >
                <option value="bestseller">Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="active-chips-strip">
              {selectedCategory !== 'all' && (
                <span className="filter-chip">
                  Category: {activeCategoryObj?.name}
                  <button onClick={() => handleCategoryChange('all')}><X size={14} /></button>
                </span>
              )}
              {selectedGender !== 'all' && (
                <span className="filter-chip">
                  Division: {selectedGender}
                  <button onClick={() => handleGenderChange('all')}><X size={14} /></button>
                </span>
              )}
              {selectedSize !== 'all' && (
                <span className="filter-chip">
                  Size: {selectedSize}
                  <button onClick={() => setSelectedSize('all')}><X size={14} /></button>
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="filter-chip">
                  Price: {priceRange}
                  <button onClick={() => setPriceRange('all')}><X size={14} /></button>
                </span>
              )}
              <button className="clear-chips-btn" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>
          )}

          {/* Grid */}
          <ProductGrid products={products} loading={loading} count={8} />
        </main>
      </div>
    </div>
  );
}

