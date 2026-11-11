import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit3, Trash2, X, AlertTriangle } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function CategoriesManager() {
  const { showToast } = useAdmin();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    banner: '/assets/products/01_whey_protein_gold_standard.jpg'
  });

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCategories();
      setCategories(res.categories || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      banner: '/assets/products/01_whey_protein_gold_standard.jpg'
    });
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || '',
      slug: cat.slug || '',
      description: cat.description || '',
      banner: cat.banner || ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const payload = { ...formData, slug };

      if (editingCategory) {
        await adminApi.updateCategory(editingCategory.id || editingCategory.slug, payload);
        showToast(`Updated category: ${payload.name}`, 'success');
      } else {
        await adminApi.createCategory(payload);
        showToast(`Created category: ${payload.name}`, 'success');
      }
      setModalOpen(false);
      loadCategories();
    } catch (err) {
      showToast(err.message || 'Failed to save category', 'danger');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      const res = await adminApi.deleteCategory(id);
      if (res.success) {
        showToast(`Category ${name} deleted`, 'info');
        loadCategories();
      }
    } catch (err) {
      showToast(err.message || 'Deletion blocked', 'danger');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Supplement Categories</h1>
          <p>Manage {categories.length} sports nutrition categories, banners & URL slugs</p>
        </div>
        <button className="admin-primary-btn" onClick={openCreateModal}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id || c.slug}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', background: '#222', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layers size={16} color="#E50914" />
                      </div>
                      <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{c.name}</strong>
                    </div>
                  </td>
                  <td>
                    <code>/category/{c.slug}</code>
                  </td>
                  <td style={{ color: '#aaa', fontSize: '0.82rem', maxWidth: '400px' }}>
                    {c.description}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-icon-btn" onClick={() => openEditModal(c)} title="Edit Category">
                        <Edit3 size={15} />
                      </button>
                      <button className="admin-icon-btn delete" onClick={() => handleDelete(c.id || c.slug, c.name)} title="Delete">
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
                {editingCategory ? `Edit: ${editingCategory.name}` : 'Create Category'}
              </h3>
              <button className="admin-icon-btn" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Category Name</label>
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
                  <label className="admin-form-label">URL Slug</label>
                  <input
                    type="text"
                    className="admin-text-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="e.g. whey-protein"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Description</label>
                  <textarea
                    className="admin-textarea"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Banner Image URL</label>
                  <input
                    type="text"
                    className="admin-text-input"
                    style={{ paddingLeft: '14px' }}
                    value={formData.banner}
                    onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-secondary-btn" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

