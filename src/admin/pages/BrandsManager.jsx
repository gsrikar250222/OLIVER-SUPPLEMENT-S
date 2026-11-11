import React, { useState, useEffect } from 'react';
import { Award, Plus, Edit3, Trash2, X, Star } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function BrandsManager() {
  const { showToast } = useAdmin();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    logo: '/assets/brands/optimum-nutrition.svg',
    banner: '/assets/products/01_whey_protein_gold_standard.jpg',
    description: '',
    featured: true
  });

  const loadBrands = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getBrands();
      setBrands(res.brands || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const openCreateModal = () => {
    setEditingBrand(null);
    setFormData({
      name: '',
      tag: 'Certified Partner',
      logo: '/assets/brands/optimum-nutrition.svg',
      banner: '/assets/products/01_whey_protein_gold_standard.jpg',
      description: '',
      featured: true
    });
    setModalOpen(true);
  };

  const openEditModal = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name || '',
      tag: brand.tag || '',
      logo: brand.logo || brand.img || '',
      banner: brand.banner || '',
      description: brand.description || '',
      featured: brand.featured ?? true
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingBrand) {
        await adminApi.updateBrand(editingBrand.id || editingBrand.name, formData);
        showToast(`Updated brand: ${formData.name}`, 'success');
      } else {
        await adminApi.createBrand(formData);
        showToast(`Created brand: ${formData.name}`, 'success');
      }
      setModalOpen(false);
      loadBrands();
    } catch (err) {
      showToast(err.message || 'Failed to save brand', 'danger');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove brand "${name}"?`)) return;
    try {
      await adminApi.deleteBrand(id);
      showToast(`Removed brand: ${name}`, 'info');
      loadBrands();
    } catch (err) {
      showToast(err.message || 'Failed to delete brand', 'danger');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Certified Nutrition Brands</h1>
          <p>Manage {brands.length} authorized supplement manufacturers & importer partners</p>
        </div>
        <button className="admin-primary-btn" onClick={openCreateModal}>
          <Plus size={16} /> Add Partner Brand
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Brand Name</th>
                <th>Tagline</th>
                <th>Logo</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b.id || b.name}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', background: '#222', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award size={16} color="#E50914" />
                      </div>
                      <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{b.name}</strong>
                    </div>
                  </td>
                  <td style={{ color: '#aaa', fontSize: '0.82rem' }}>{b.tag || 'Certified Partner'}</td>
                  <td>
                    <code>{b.logo || b.img}</code>
                  </td>
                  <td>
                    <span className="admin-badge success">
                      <Star size={11} fill="#10B981" /> Featured Partner
                    </span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-icon-btn" onClick={() => openEditModal(b)} title="Edit Brand">
                        <Edit3 size={15} />
                      </button>
                      <button className="admin-icon-btn delete" onClick={() => handleDelete(b.id || b.name, b.name)} title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingBrand ? `Edit: ${editingBrand.name}` : 'Add Brand'}
              </h3>
              <button className="admin-icon-btn" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Brand Name</label>
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
                  <label className="admin-form-label">Tagline / Subheading</label>
                  <input
                    type="text"
                    className="admin-text-input"
                    style={{ paddingLeft: '14px' }}
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Brand Logo Asset URL</label>
                  <input
                    type="text"
                    className="admin-text-input"
                    style={{ paddingLeft: '14px' }}
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-secondary-btn" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

