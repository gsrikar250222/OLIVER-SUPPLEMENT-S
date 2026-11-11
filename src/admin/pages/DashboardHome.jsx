import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  AlertTriangle, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  RefreshCw,
  Eye
} from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, invRes, logsRes] = await Promise.all([
        adminApi.getDashboardStats().catch(() => ({ stats: {} })),
        adminApi.getOrders().catch(() => ({ orders: [] })),
        adminApi.getInventory().catch(() => ({ inventory: [] })),
        adminApi.getActivityLogs().catch(() => ({ logs: [] }))
      ]);

      setStats(statsRes.stats || {});
      setRecentOrders((ordersRes.orders || []).slice(0, 6));
      setLowStockItems((invRes.inventory || []).filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').slice(0, 5));
      setRecentLogs((logsRes.logs || []).slice(0, 6));
    } catch (e) {
      console.error('Error loading dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalSales = stats?.totalSales || 0;
  const todaySales = stats?.todaySales || 0;
  const totalOrders = stats?.totalOrders || 0;
  const lowStockCount = stats?.lowStockCount || lowStockItems.length || 0;
  const totalProducts = stats?.totalProducts || 65;
  const totalCustomers = stats?.totalCustomers || 0;

  // 14-day sales trend for SVG chart
  const trend = stats?.salesTrend || [];
  const maxRevenue = Math.max(...trend.map(t => t.revenue || 0), 10000);

  return (
    <div className="admin-page-container">
      {/* Page Title */}
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Master Dashboard Overview</h1>
          <p>Real-time analytics, sales metrics, fulfillment status & stock health</p>
        </div>
        <div className="admin-action-btn-row">
          <button className="admin-secondary-btn" onClick={loadData} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
            <span>Refresh Metrics</span>
          </button>
          <Link to="/admin/homepage" className="admin-primary-btn">
            <span>Manage Homepage</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Total Revenue</span>
            <div className="admin-stat-icon green">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="admin-stat-val">₹{totalSales.toLocaleString('en-IN')}</div>
          <div className="admin-stat-sub">Lifetime confirmed gross sales</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Today's Sales</span>
            <div className="admin-stat-icon red">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="admin-stat-val">₹{todaySales.toLocaleString('en-IN')}</div>
          <div className="admin-stat-sub">Orders placed today</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Total Orders</span>
            <div className="admin-stat-icon blue">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="admin-stat-val">{totalOrders}</div>
          <div className="admin-stat-sub">{stats?.pendingOrders || 0} pending dispatch</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Active Supplements</span>
            <div className="admin-stat-icon blue">
              <Package size={18} />
            </div>
          </div>
          <div className="admin-stat-val">{totalProducts}</div>
          <div className="admin-stat-sub">Across 12 categories</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Low Stock Alerts</span>
            <div className="admin-stat-icon amber">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="admin-stat-val" style={{ color: lowStockCount > 0 ? '#F59E0B' : '#fff' }}>
            {lowStockCount}
          </div>
          <div className="admin-stat-sub">Requires replenishment</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Registered Lifters</span>
            <div className="admin-stat-icon green">
              <Users size={18} />
            </div>
          </div>
          <div className="admin-stat-val">{totalCustomers}</div>
          <div className="admin-stat-sub">Active athlete accounts</div>
        </div>
      </div>

      {/* Interactive 14-Day Sales Trend Chart (SVG) */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">14-Day Sales & Revenue Velocity</h2>
          <span style={{ fontSize: '0.8rem', color: '#888' }}>Database verified records</span>
        </div>
        <div style={{ padding: '24px 20px' }}>
          {trend.length > 0 ? (
            <div style={{ width: '100%', height: '220px', position: 'relative' }}>
              <svg width="100%" height="180" viewBox="0 0 1000 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E50914" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#E50914" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal lines */}
                <line x1="0" y1="40" x2="1000" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                <line x1="0" y1="90" x2="1000" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                <line x1="0" y1="140" x2="1000" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />

                {/* Area Polygon */}
                {(() => {
                  const points = trend.map((t, idx) => {
                    const x = (idx / (trend.length - 1)) * 1000;
                    const y = 160 - ((t.revenue || 0) / maxRevenue) * 140;
                    return `${x},${y}`;
                  }).join(' ');

                  const areaPoints = `0,180 ${points} 1000,180`;
                  return (
                    <>
                      <polygon points={areaPoints} fill="url(#salesGrad)" />
                      <polyline points={points} fill="none" stroke="#E50914" strokeWidth="3" />
                    </>
                  );
                })()}

                {/* Circle data points */}
                {trend.map((t, idx) => {
                  const x = (idx / (trend.length - 1)) * 1000;
                  const y = 160 - ((t.revenue || 0) / maxRevenue) * 140;
                  return (
                    <circle 
                      key={idx} 
                      cx={x} 
                      cy={y} 
                      r="4" 
                      fill="#FFFFFF" 
                      stroke="#E50914" 
                      strokeWidth="2" 
                    />
                  );
                })}
              </svg>

              {/* X-axis labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.72rem', color: '#777' }}>
                {trend.map((t, idx) => (
                  <span key={idx}>{t.date}</span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              No historical transactions recorded yet. New sales will plot here automatically.
            </div>
          )}
        </div>
      </div>

      {/* Grid of Recent Orders and Low Stock alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '22px' }}>
        {/* Recent Orders */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Store Orders</h2>
            <Link to="/admin/orders" className="admin-secondary-btn" style={{ fontSize: '0.75rem', padding: '5px 12px' }}>
              View All Orders &rarr;
            </Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map(o => (
                    <tr key={o.id}>
                      <td>
                        <strong style={{ color: '#fff' }}>{o.id}</strong>
                      </td>
                      <td>
                        <div>{o.customer?.name || 'Customer'}</div>
                        <small style={{ color: '#777' }}>{o.paymentMethod}</small>
                      </td>
                      <td>
                        <strong style={{ color: '#10B981' }}>
                          ₹{(o.pricing?.total || o.total || 0).toLocaleString('en-IN')}
                        </strong>
                      </td>
                      <td>
                        <span className={`admin-badge ${o.status === 'Delivered' ? 'success' : (o.status === 'Order Placed' ? 'info' : 'warning')}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#666', padding: '24px' }}>
                      No orders placed yet. Place an order on the storefront to test!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Low Stock Watchlist</h2>
            <Link to="/admin/inventory" className="admin-secondary-btn" style={{ fontSize: '0.75rem', padding: '5px 12px' }}>
              Manage Stock &rarr;
            </Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Supplement</th>
                  <th>Brand</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.length > 0 ? (
                  lowStockItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <strong style={{ color: '#fff' }}>{item.name}</strong>
                      </td>
                      <td>{item.brand}</td>
                      <td>
                        <strong style={{ color: item.stock === 0 ? '#FF6B72' : '#FBBF24' }}>
                          {item.stock} units
                        </strong>
                      </td>
                      <td>
                        <span className={`admin-badge ${item.stock === 0 ? 'danger' : 'warning'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#10B981', padding: '24px' }}>
                      <CheckCircle2 size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                      All supplement inventory levels are healthy!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Admin Activity Log */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Recent Administrative Audit Trail</h2>
          <Link to="/admin/activity-logs" className="admin-secondary-btn" style={{ fontSize: '0.75rem', padding: '5px 12px' }}>
            View Full Log &rarr;
          </Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Administrator</th>
                <th>Action</th>
                <th>Target Module</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.length > 0 ? (
                recentLogs.map(log => (
                  <tr key={log.id}>
                    <td style={{ color: '#888', whiteSpace: 'nowrap' }}>
                      <Clock size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                      {new Date(log.timestamp).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <strong style={{ color: '#fff' }}>{log.adminName}</strong>
                    </td>
                    <td>{log.action}</td>
                    <td>
                      <span className="admin-badge neutral">{log.targetEntity}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                    Activity events are recorded on all create, update and delete actions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
