import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Download, 
  Upload, 
  X, 
  Check, 
  AlertCircle,
  Eye,
  Star,
  Layers
} from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function ProductsManager() {
  const { showToast } = useAdmin();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeFormTab, setActiveFormTab] = useState('basic');

  // Form State
  const initialForm = {
    name: '',
    sku: '',
    brand: 'Optimum Nutrition',
    category: 'whey-protein',
    categoryName: 'Whey Protein',
    price: 2999,
    mrp: 3999,
    discount: 25,
    stock: 50,
    lowStockThreshold: 10,
    status: 'published',
    badge: 'BESTSELLER',
    image: '/assets/products/01_whey_protein_gold_standard.jpg',
    gallery: [],
    shortDesc: '',
    description: '',
    // Supplement Facts
    servingSize: '1 Scoop (30.4 g)',
    totalServings: '74 Servings',
    proteinPerServing: '24g',
    bcaaPerServing: '5.5g',
    glutamine: '4g',
    calories: '120 kcal',
    proteinType: '100% Whey Protein (Isolate Primary)',
    ingredients: 'Protein Blend (Whey Protein Isolates, Whey Protein Concentrate, Whey Peptides), Cocoa, Natural and Artificial Flavors, Lecithin, Salt, Sucralose.',
    allergens: 'Contains Milk and Soy ingredients.',
    suggestedUse: 'Add 1 scoop to 180-240ml of cold water or milk. Shake for 30 seconds until fully dissolved. Consume 30-60 minutes post-workout.',
    flavors: ['Double Rich Chocolate', 'Vanilla Ice Cream', 'Delicious Strawberry'],
    weights: ['1 kg (2.2 lbs)', '2.27 kg (5 lbs)', '4.54 kg (10 lbs)'],
    tags: ['Whey', 'Muscle Building', 'Recovery']
  };

  const [formData, setFormData] = useState(initialForm);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        adminApi.getProducts().catch(() => ({ products: [] })),
        adminApi.getCategories().catch(() => ({ categories: [] })),
        adminApi.getBrands().catch(() => ({ brands: [] }))
      ]);
      setProducts(prodRes.products || []);
      setCategories(catRes.categories || []);
      setBrands(brandRes.brands || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      ...initialForm,
      sku: `OLV-${Date.now().toString().slice(-6)}`
    });
    setActiveFormTab('basic');
    setModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      ...initialForm,
      ...prod,
      flavors: prod.flavors || (prod.flavor ? [prod.flavor] : initialForm.flavors),
      weights: prod.weights || (prod.size ? [prod.size] : initialForm.weights)
    });
    setActiveFormTab('basic');
    setModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      // Calculate discount automatically
      const calculatedDiscount = formData.mrp > formData.price 
        ? Math.round(((formData.mrp - formData.price) / formData.mrp) * 100)
        : 0;

      const payload = {
        ...formData,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        discount: calculatedDiscount,
        stock: Number(formData.stock),
        lowStockThreshold: Number(formData.lowStockThreshold || 10)
      };

      if (editingProduct) {
        await adminApi.updateProduct(editingProduct.id, payload);
        showToast(`Updated product: ${payload.name}`, 'success');
      } else {
        await adminApi.createProduct(payload);
        showToast(`Created supplement product: ${payload.name}`, 'success');
      }
      setModalOpen(false);
      loadAll();
    } catch (err) {
      showToast(err.message || 'Failed to save product', 'danger');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    try {
      await adminApi.deleteProduct(id);
      showToast(`Deleted ${name}`, 'info');
      loadAll();
    } catch (err) {
      showToast(err.message || 'Failed to delete product', 'danger');
    }
  };

  // CSV Export
  const exportCsv = () => {
    const headers = ['ID', 'Name', 'SKU', 'Brand', 'Category', 'Price', 'MRP', 'Stock', 'Status'];
    const rows = products.map(p => [
      p.id,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      p.sku || '',
      p.brand || '',
      p.categoryName || p.category || '',
      p.price || 0,
      p.mrp || 0,
      p.stock || 0,
      p.status || 'published'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `oliver_supplements_catalog_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering
  const filteredProducts = products.filter(p => {
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || 
      p.category === selectedCategory || 
      p.categorySlug === selectedCategory;

    const matchesBrand = selectedBrand === 'all' || 
      (p.brand && p.brand.toLowerCase() === selectedBrand.toLowerCase());

    const matchesStatus = statusFilter === 'all' || 
      p.status === statusFilter;

    return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
  });

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Product Catalog Management</h1>
          <p>Manage {products.length} sports nutrition products, pricing, stock levels & supplement facts</p>
        </div>
        <div className="admin-action-btn-row">
          <button className="admin-secondary-btn" onClick={exportCsv}>
            <Download size={15} /> Export CSV
          </button>
          <button className="admin-primary-btn" onClick={openCreateModal}>
            <Plus size={16} /> Add Supplement
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ padding: '16px 20px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <input
              type="text"
              className="admin-search-field"
              style={{ width: '100%', paddingLeft: '34px' }}
              placeholder="Search by title, SKU or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          </div>

          <select 
            className="admin-select-field"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map(c => (
              <option key={c.id || c.slug} value={c.slug || c.id}>{c.name}</option>
            ))}
          </select>

          <select 
            className="admin-select-field"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="all">All Brands ({brands.length})</option>
            {brands.map(b => (
              <option key={b.name} value={b.name}>{b.name}</option>
            ))}
          </select>

          <select 
            className="admin-select-field"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name & SKU</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price & MRP</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td style={{ width: '60px' }}>
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#0a0a0a', borderRadius: '6px', border: '1px solid #222' }} 
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#777' }}>SKU: {p.sku || p.id}</div>
                    </td>
                    <td>
                      <span className="admin-badge neutral">{p.categoryName || p.category}</span>
                    </td>
                    <td>{p.brand}</td>
                    <td>
                      <div style={{ color: '#fff', fontWeight: 800 }}>₹{(p.price || 0).toLocaleString('en-IN')}</div>
                      {p.mrp > p.price && (
                        <div style={{ fontSize: '0.72rem', color: '#777', textDecoration: 'line-through' }}>
                          ₹{p.mrp.toLocaleString('en-IN')} ({p.discount}% OFF)
                        </div>
                      )}
                    </td>
                    <td>
                      <strong style={{ color: (p.stock || 0) <= (p.lowStockThreshold || 10) ? '#F59E0B' : '#10B981' }}>
                        {p.stock || 0} units
                      </strong>
                    </td>
                    <td>
                      <span className={`admin-badge ${p.status === 'published' ? 'success' : 'neutral'}`}>
                        {p.status || 'published'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button 
                          className="admin-icon-btn" 
                          onClick={() => openEditModal(p)}
                          title="Edit Supplement"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="admin-icon-btn delete" 
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#777' }}>
                    No products match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-container large" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Supplement Product'}
              </h3>
              <button className="admin-icon-btn" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Form Sub-Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: '#0a0a0a', padding: '10px 24px', borderBottom: '1px solid #222' }}>
              {['basic', 'nutrition', 'variants', 'media'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveFormTab(t)}
                  style={{
                    background: activeFormTab === t ? '#222' : 'transparent',
                    color: activeFormTab === t ? '#fff' : '#888',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveProduct}>
              <div className="admin-modal-body">
                {/* TAB 1: BASIC DETAILS */}
                {activeFormTab === 'basic' && (
                  <div className="admin-form-grid">
                    <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="admin-form-label">Product Title</label>
                      <input
                        type="text"
                        required
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">SKU</label>
                      <input
                        type="text"
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Brand</label>
                      <select
                        className="admin-select-field"
                        style={{ width: '100%', height: '44px' }}
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      >
                        {brands.map(b => (
                          <option key={b.name} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Category</label>
                      <select
                        className="admin-select-field"
                        style={{ width: '100%', height: '44px' }}
                        value={formData.category}
                        onChange={(e) => {
                          const catObj = categories.find(c => (c.slug || c.id) === e.target.value);
                          setFormData({ 
                            ...formData, 
                            category: e.target.value,
                            categorySlug: e.target.value,
                            categoryName: catObj ? catObj.name : e.target.value 
                          });
                        }}
                      >
                        {categories.map(c => (
                          <option key={c.id || c.slug} value={c.slug || c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Product Status</label>
                      <select
                        className="admin-select-field"
                        style={{ width: '100%', height: '44px' }}
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="published">Published (Visible on storefront)</option>
                        <option value="unpublished">Unpublished (Hidden from storefront)</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Selling Price (₹)</label>
                      <input
                        type="number"
                        required
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Original MRP (₹)</label>
                      <input
                        type="number"
                        required
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.mrp}
                        onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Current Stock Count</label>
                      <input
                        type="number"
                        required
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Low Stock Threshold</label>
                      <input
                        type="number"
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.lowStockThreshold}
                        onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="admin-form-label">Detailed Supplement Description</label>
                      <textarea
                        className="admin-textarea"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: NUTRITION & SUPPLEMENT FACTS */}
                {activeFormTab === 'nutrition' && (
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Protein Per Serving (e.g., 24g)</label>
                      <input
                        type="text"
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.proteinPerServing}
                        onChange={(e) => setFormData({ ...formData, proteinPerServing: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">BCAAs Per Serving (e.g., 5.5g)</label>
                      <input
                        type="text"
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.bcaaPerServing}
                        onChange={(e) => setFormData({ ...formData, bcaaPerServing: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Serving Size</label>
                      <input
                        type="text"
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.servingSize}
                        onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Total Servings Per Tub</label>
                      <input
                        type="text"
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.totalServings}
                        onChange={(e) => setFormData({ ...formData, totalServings: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="admin-form-label">Ingredients</label>
                      <textarea
                        className="admin-textarea"
                        value={formData.ingredients}
                        onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="admin-form-label">Allergen Information</label>
                      <input
                        type="text"
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.allergens}
                        onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="admin-form-label">Suggested Usage & Timing</label>
                      <textarea
                        className="admin-textarea"
                        value={formData.suggestedUse}
                        onChange={(e) => setFormData({ ...formData, suggestedUse: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: VARIANTS */}
                {activeFormTab === 'variants' && (
                  <div>
                    <div style={{ marginBottom: '16px' }}>
                      <label className="admin-form-label">Flavors (comma separated)</label>
                      <input
                        type="text"
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.flavors?.join(', ') || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          flavors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        })}
                      />
                      <small style={{ color: '#777' }}>Example: Double Rich Chocolate, Vanilla, Cookies & Cream</small>
                    </div>

                    <div>
                      <label className="admin-form-label">Weights & Sizes (comma separated)</label>
                      <input
                        type="text"
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.weights?.join(', ') || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          weights: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        })}
                      />
                      <small style={{ color: '#777' }}>Example: 1 kg (2.2 lbs), 2 kg (4.4 lbs), 2.27 kg (5 lbs)</small>
                    </div>
                  </div>
                )}

                {/* TAB 4: MEDIA */}
                {activeFormTab === 'media' && (
                  <div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Primary Product Image URL</label>
                      <input
                        type="text"
                        required
                        className="admin-text-input"
                        style={{ paddingLeft: '14px' }}
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                      {formData.image && (
                        <div style={{ marginTop: '12px', background: '#0a0a0a', padding: '12px', borderRadius: '8px', display: 'inline-block' }}>
                          <img src={formData.image} alt="Preview" style={{ height: '90px', objectFit: 'contain' }} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-secondary-btn" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
