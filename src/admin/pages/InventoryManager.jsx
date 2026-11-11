import React, { useState, useEffect } from 'react';
import { Boxes, AlertTriangle, RefreshCw, Plus, Edit3, CheckCircle2, Search } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function InventoryManager() {
  const { showToast } = useAdmin();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Adjust Modal
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState(0);
  const [adjustReason, setAdjustReason] = useState('Restock Shipment Received');

  const loadInventory = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getInventory();
      setInventory(res.inventory || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const openAdjustModal = (item) => {
    setSelectedProduct(item);
    setNewStock(item.stock);
    setAdjustReason('Restock Shipment Received');
    setAdjustModalOpen(true);
  };

  const handleAdjustStock = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    try {
      await adminApi.adjustStock(selectedProduct.id, Number(newStock), adjustReason);
      showToast(`Stock updated for ${selectedProduct.name} to ${newStock} units`, 'success');
      setAdjustModalOpen(false);
      loadInventory();
    } catch (err) {
      showToast(err.message || 'Failed to adjust stock', 'danger');
    }
  };

  const filtered = inventory.filter(i => {
    const matchesSearch = !searchTerm ||
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (i.brand && i.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (i.sku && i.sku.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const lowStockCount = inventory.filter(i => i.status === 'Low Stock').length;
  const outOfStockCount = inventory.filter(i => i.status === 'Out of Stock').length;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Inventory & Stock Control</h1>
          <p>Real-time stock monitoring, replenishment audit & warehouse sync</p>
        </div>
        <button className="admin-secondary-btn" onClick={loadInventory}>
          <RefreshCw size={15} /> Refresh Stock
        </button>
      </div>

      {/* Stock Health Badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '22px' }}>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total SKUs Monitored</div>
          <div className="admin-stat-val">{inventory.length}</div>
          <div className="admin-stat-sub">Active supplement items</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Low Stock Watchlist</div>
          <div className="admin-stat-val" style={{ color: lowStockCount > 0 ? '#F59E0B' : '#10B981' }}>{lowStockCount}</div>
          <div className="admin-stat-sub">Stock below threshold</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Out of Stock Items</div>
          <div className="admin-stat-val" style={{ color: outOfStockCount > 0 ? '#FF6B72' : '#10B981' }}>{outOfStockCount}</div>
          <div className="admin-stat-sub">Needs immediate restock</div>
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
              placeholder="Search by supplement or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          </div>

          <select 
            className="admin-select-field"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Inventory ({inventory.length})</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Supplement Name</th>
                <th>SKU</th>
                <th>Brand</th>
                <th>Current Units</th>
                <th>Threshold</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>
                    <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{item.name}</strong>
                  </td>
                  <td>
                    <code>{item.sku}</code>
                  </td>
                  <td>{item.brand}</td>
                  <td>
                    <strong style={{ 
                      fontSize: '1rem',
                      color: item.stock === 0 ? '#FF6B72' : (item.stock <= item.lowStockThreshold ? '#F59E0B' : '#10B981')
                    }}>
                      {item.stock} units
                    </strong>
                  </td>
                  <td style={{ color: '#888' }}>{item.lowStockThreshold} units</td>
                  <td>
                    <span className={`admin-badge ${item.stock === 0 ? 'danger' : (item.stock <= item.lowStockThreshold ? 'warning' : 'success')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="admin-secondary-btn" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      onClick={() => openAdjustModal(item)}
                    >
                      <Edit3 size={13} /> Adjust Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {adjustModalOpen && selectedProduct && (
        <div className="admin-modal-backdrop" onClick={() => setAdjustModalOpen(false)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Adjust Inventory: {selectedProduct.name}</h3>
            </div>
            <form onSubmit={handleAdjustStock}>
              <div className="admin-modal-body">
                <div style={{ background: '#0a0a0a', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>Current Stock Level:</div>
                  <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 900 }}>{selectedProduct.stock} units</div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">New Stock Count</label>
                  <input
                    type="number"
                    min="0"
                    required
                    className="admin-text-input"
                    style={{ paddingLeft: '14px', fontSize: '1.2rem', fontWeight: 800 }}
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Adjustment Reason</label>
                  <select
                    className="admin-select-field"
                    style={{ width: '100%', height: '44px' }}
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value)}
                  >
                    <option value="Restock Shipment Received">Restock Shipment Received</option>
                    <option value="Damage / Quality Rejection">Damage / Quality Rejection</option>
                    <option value="Customer Return Restocked">Customer Return Restocked</option>
                    <option value="Manual Inventory Audit Correction">Manual Inventory Audit Correction</option>
                  </select>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-secondary-btn" onClick={() => setAdjustModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Confirm Stock Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

