import React, { useState, useEffect } from 'react';
import { FolderOpen, Upload, Copy, Check, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function MediaManager() {
  const { showToast } = useAdmin();
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getMedia();
      setMediaList(res.media || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          setUploading(true);
          await adminApi.uploadMedia(file.name, reader.result, 'general');
          showToast(`Uploaded ${file.name}`, 'success');
          loadMedia();
        } catch (err) {
          showToast('Failed to upload image', 'danger');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const copyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Asset URL copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete media asset "${name}"?`)) return;
    try {
      await adminApi.deleteMedia(id);
      showToast(`Deleted ${name}`, 'info');
      loadMedia();
    } catch (err) {
      showToast('Failed to delete media', 'danger');
    }
  };

  const filtered = mediaList.filter(m => 
    !searchTerm || (m.name && m.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Media Asset Library</h1>
          <p>Centralized image manager for supplement product shots, banners & athlete media</p>
        </div>
        <div>
          <label className="admin-primary-btn" style={{ cursor: 'pointer' }}>
            <Upload size={16} /> <span>{uploading ? 'Uploading...' : 'Upload Media Files'}</span>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleFileUpload} 
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ padding: '14px 20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              className="admin-search-field"
              style={{ width: '100%', paddingLeft: '34px' }}
              placeholder="Search media files by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          </div>
          <span style={{ fontSize: '0.8rem', color: '#888' }}>{filtered.length} Assets Found</span>
        </div>
      </div>

      {/* Media Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '18px' }}>
        {filtered.length > 0 ? (
          filtered.map(item => (
            <div key={item.id} className="admin-card" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
              <div style={{ height: '160px', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img 
                  src={item.url} 
                  alt={item.name} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                />
              </div>
              <div style={{ padding: '12px 14px', borderTop: '1px solid #222' }}>
                <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#777' }}>
                    {item.size ? `${Math.round(item.size / 1024)} KB` : 'Asset'}
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      className="admin-icon-btn" 
                      onClick={() => copyUrl(item.url, item.id)}
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                    </button>
                    <button 
                      className="admin-icon-btn delete" 
                      onClick={() => handleDelete(item.id, item.name)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', color: '#777', background: '#141414', borderRadius: '12px' }}>
            <ImageIcon size={32} style={{ marginBottom: '12px', color: '#444' }} /><br />
            No uploaded media assets yet. Click "Upload Media Files" above to upload images!
          </div>
        )}
      </div>
    </div>
  );
}

