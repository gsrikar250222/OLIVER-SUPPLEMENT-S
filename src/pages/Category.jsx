import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { ChevronRight, ShieldCheck, ArrowRight, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function Category() {
  const { slug } = useParams();

  // Normalize slug and handle alias routes
  const normalizedSlug = useMemo(() => {
    if (slug === 'bcaa-eaa') return 'amino-acids';
    if (slug === 'isolate') return 'whey-isolate';
    if (slug === 'vitamins') return 'vitamins-minerals';
    if (slug === 'omega-3') return 'fish-oil-omega-3';
    return slug;
  }, [slug]);

  const category = useMemo(() => {
    return CATEGORIES.find(c => c.slug === normalizedSlug || c.id === normalizedSlug) || {
      id: normalizedSlug,
      name: normalizedSlug.replace(/-/g, ' ').toUpperCase(),
      slug: normalizedSlug,
      description: 'Elite certified sports nutrition supplements engineered for peak athletic output.',
      banner: '/assets/products/01_whey_protein_gold_standard.jpg'
    };
  }, [normalizedSlug]);

  const [sort, setSort] = useState('popularity');
  const [selectedBrand, setSelectedBrand] = useState('all');

  // Category products
  const categoryProducts = useMemo(() => {
    let prods = PRODUCTS.filter(p => {
      if (normalizedSlug === 'amino-acids' || normalizedSlug === 'bcaa-eaa') {
        return p.categorySlug === 'amino-acids';
      }
      if (normalizedSlug === 'electrolytes') {
        return p.categorySlug === 'electrolytes' || p.categorySlug === 'pre-workout' || p.categorySlug === 'amino-acids';
      }
      if (normalizedSlug === 'health-wellness') {
        return p.categorySlug === 'health-wellness' || p.categorySlug === 'vitamins-minerals' || p.categorySlug === 'fish-oil-omega-3';
      }
      return p.categorySlug === normalizedSlug || p.category.toLowerCase().includes(normalizedSlug.replace(/-/g, ' '));
    });

    // Fallback if category has few items
    if (prods.length === 0) {
      prods = PRODUCTS.slice(0, 8);
    }

    if (selectedBrand !== 'all') {
      prods = prods.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (sort === 'price-low') prods.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') prods.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') prods.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sort === 'bestseller') prods.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    else prods.sort((a, b) => ((b.rating || 0) * (b.reviews || 0)) - ((a.rating || 0) * (a.reviews || 0)));

    return prods;
  }, [normalizedSlug, sort, selectedBrand]);

  // Brands present in this category
  const categoryBrands = useMemo(() => {
    const set = new Set();
    categoryProducts.forEach(p => set.add(p.brand));
    return Array.from(set);
  }, [categoryProducts]);

  return (
    <div className="category-page-wrapper">
      {/* Category Hero Banner */}
      <div className="category-hero">
        <div className="category-hero-bg-wrap">
          <img 
            src={category.banner} 
            alt={category.name} 
            className="category-banner-bg" 
          />
          <div className="category-hero-overlay"></div>
        </div>

        <div className="container category-hero-content">
          <nav className="breadcrumbs light">
            <Link to="/">Home</Link>
            <span>&gt;</span>
            <Link to="/shop">Supplements</Link>
            <span>&gt;</span>
            <span className="current">{category.name}</span>
          </nav>

          <span className="category-pre-badge">
            <Sparkles size={14} /> 100% AUTHENTIC SPORTS NUTRITION
          </span>
          <h1 className="category-title">{category.name}</h1>
          <p className="category-desc">{category.description}</p>
        </div>
      </div>

      <div className="container section-pad">
        {/* Filter & Sort Bar */}
        <div className="category-controls-bar">
          <div className="category-counts-info">
            Showing <strong>{categoryProducts.length}</strong> certified supplements
          </div>

          <div className="category-filters-right">
            {/* Brand Filter */}
            {categoryBrands.length > 1 && (
              <div className="control-item">
                <label>BRAND:</label>
                <select 
                  value={selectedBrand} 
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="all">All Brands</option>
                  {categoryBrands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort Dropdown */}
            <div className="control-item">
              <label>SORT:</label>
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                className="sort-dropdown"
              >
                <option value="popularity">Popularity</option>
                <option value="bestseller">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid mt-30">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Other Categories Links */}
        <div className="other-categories-bar mt-60">
          <h3>EXPLORE MORE SPORTS NUTRITION DIVISIONS</h3>
          <div className="other-cats-chips">
            {CATEGORIES.filter(c => c.slug !== normalizedSlug).slice(0, 8).map(c => (
              <Link key={c.id} to={`/category/${c.slug}`} className="other-cat-chip">
                <span>{c.name}</span> <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
