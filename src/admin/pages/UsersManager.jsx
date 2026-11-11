import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, Trash2, Edit3, X, Shield, Lock } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function UsersManager() {
  const { showToast, adminUser } = useAdmin();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Product Manager',
    status: 'active'
  });

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers();
      setUsers(res.users || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'Product Manager',
      status: 'active'
    });
    setModalOpen(true);
  };

  const openEditModal = (u) => {
    setEditingUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      password: '',
      role: u.role,
      status: u.status
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await adminApi.updateUser(editingUser.id, formData);
        showToast(`Updated staff: ${formData.name}`, 'success');
      } else {
        await adminApi.createUser(formData);
        showToast(`Created staff account: ${formData.email}`, 'success');
      }
      setModalOpen(false);
      loadUsers();
    } catch (err) {
      showToast(err.message || 'Failed to save staff user', 'danger');
    }
  };

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Are you sure you want to remove staff account "${email}"?`)) return;
    try {
      await adminApi.deleteUser(id);
      showToast(`Removed staff user: ${email}`, 'info');
      loadUsers();
    } catch (err) {
      showToast(err.message || 'Failed to delete user', 'danger');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Admin Users & Staff Roles</h1>
          <p>Super Admin control center for managing staff permissions and role assignments</p>
        </div>
        <button className="admin-primary-btn" onClick={openCreateModal}>
          <Plus size={16} /> Add Staff Account
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Email Address</th>
                <th>Role Permission</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="admin-user-avatar" style={{ width: '32px', height: '32px' }}>
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{u.name}</strong>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`admin-badge ${u.role === 'Super Admin' ? 'danger' : 'info'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-badge ${u.status === 'active' ? 'success' : 'neutral'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ color: '#888', fontSize: '0.8rem' }}>
                    {u.lastLogin ? new Date(u.lastLogin).toLocaleString('en-IN') : 'Never'}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-icon-btn" onClick={() => openEditModal(u)} title="Edit Staff">
                        <Edit3 size={15} />
                      </button>
                      {u.id !== adminUser?.id && (
                        <button className="admin-icon-btn delete" onClick={() => handleDelete(u.id, u.email)} title="Delete Staff">
                          <Trash2 size={15} />
                        </button>
                      )}
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
                {editingUser ? `Edit Staff: ${editingUser.name}` : 'Create Staff Administrator'}
              </h3>
              <button className="admin-icon-btn" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Full Name</label>
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
                  <label className="admin-form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    className="admin-text-input"
                    style={{ paddingLeft: '14px' }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">
                    {editingUser ? 'Password (leave blank to keep unchanged)' : 'Initial Password'}
                  </label>
                  <input
                    type="password"
                    required={!editingUser}
                    className="admin-text-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Staff Role & Permissions</label>
                  <select
                    className="admin-select-field"
                    style={{ width: '100%', height: '44px' }}
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="Super Admin">Super Admin (Full access to all 25 modules)</option>
                    <option value="Product Manager">Product Manager (Products, categories, brands, inventory)</option>
                    <option value="Content Manager">Content Manager (Homepage, hero, banners, pages, media)</option>
                    <option value="Order Manager">Order Manager (Orders, fulfillment, customers, tracking)</option>
                    <option value="Customer Support">Customer Support (Orders view, inquiries, reviews)</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Account Status</label>
                  <select
                    className="admin-select-field"
                    style={{ width: '100%', height: '44px' }}
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-secondary-btn" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save Staff User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

