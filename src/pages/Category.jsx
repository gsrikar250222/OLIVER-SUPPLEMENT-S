import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { CATEGORIES } from '../data/products.js';
import ProductGrid from '../components/ProductGrid.jsx';
import { SlidersHorizontal, ChevronRight } from 'lucide-react';

export default function Category() {
  const { slug } = useParams();
  const category = CATEGORIES.find(c => c.slug === slug || c.id === slug);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('bestseller');

  useEffect(() => {
    async function loadCategoryProducts() {
      setLoading(true);
      const res = await api.getProducts({
        category: slug,
        sort
      });
      setProducts(res);
      setLoading(false);
    }
    loadCategoryProducts();
  }, [slug, sort]);

  return (
    <div className="category-page">
      {/* Category Hero Banner */}
      <div className="category-hero">
        {category?.banner && (
          <img 
            src={`/${category.banner.replace(/^\//, '')}`} 
            alt={category.name} 
            className="category-banner-bg" 
          />
        )}
        <div className="category-hero-overlay">
          <div className="container category-hero-content">
            <nav className="breadcrumbs light">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/shop">Catalog</Link>
              <span>/</span>
              <span className="current">{category?.name || slug}</span>
            </nav>
            <h1 className="category-title">{category ? category.name : slug.toUpperCase()}</h1>
            <p className="category-desc">
              {category?.description || "Architectural performance apparel engineered for the relentless athlete."}
            </p>
          </div>
        </div>
      </div>

      <div className="container section-pad">
        {/* Controls Bar */}
        <div className="shop-top-controls">
          <span className="product-count-label">
            Showing <strong>{products.length}</strong> styles in this collection
          </span>

          <div className="sort-wrapper">
            <label htmlFor="cat-sort">SORT BY:</label>
            <select 
              id="cat-sort" 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
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

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} count={8} />

        {/* Other Categories Links */}
        <div className="other-categories-bar mt-60">
          <h3>EXPLORE MORE DIVISIONS</h3>
          <div className="other-cats-chips">
            {CATEGORIES.filter(c => c.slug !== slug).slice(0, 6).map(c => (
              <Link key={c.id} to={`/category/${c.slug}`} className="other-cat-chip">
                {c.name} <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

