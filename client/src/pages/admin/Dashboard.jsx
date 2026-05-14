import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiMapPin, FiBookOpen, FiBriefcase, FiImage, FiLogOut } from 'react-icons/fi';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('leaders');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'leaders' ? '/leaders' : 
                       activeTab === 'branches' ? '/branches' : 
                       activeTab === 'blogs' ? '/blogs' : 
                       activeTab === 'careers' ? '/careers' : '/gallery';
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const endpoint = activeTab === 'leaders' ? `/leaders/${id}` : 
                       activeTab === 'branches' ? `/branches/${id}` : 
                       activeTab === 'blogs' ? `/blogs/${id}` : 
                       activeTab === 'careers' ? `/careers/${id}` : `/gallery/${id}`;
      await api.delete(endpoint);
      toast.success('Deleted successfully');
      setDeleteConfirmId(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to delete');
      setDeleteConfirmId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = activeTab === 'leaders' ? '/leaders' : 
                       activeTab === 'branches' ? '/branches' : 
                       activeTab === 'blogs' ? '/blogs' : 
                       activeTab === 'careers' ? '/careers' : '/gallery';
      
      if (editingItem) {
        await api.put(`${endpoint}/${editingItem.id}`, formData);
        toast.success('Updated successfully');
      } else {
        await api.post(endpoint, formData);
        toast.success('Added successfully');
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append('image', file);

    setUploadingImage(true);
    try {
      const response = await api.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, image: response.data.imageUrl });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const renderImageUpload = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '14px', fontWeight: 600, color: '#555' }}>Upload Image</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          disabled={uploadingImage}
          style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
        />
        {uploadingImage && <span style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '14px' }}>Uploading...</span>}
      </div>
      {formData.image && (
        <div style={{ marginTop: '8px' }}>
          <img src={formData.image} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} />
        </div>
      )}
    </div>
  );

  const renderFormFields = () => {
    switch (activeTab) {
      case 'leaders':
        return (
          <>
            <input type="text" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <input type="text" placeholder="Role" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} required />
            <input type="text" placeholder="Year (Since)" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} required />
            <input type="text" placeholder="Qualifications" value={formData.quals || ''} onChange={e => setFormData({...formData, quals: e.target.value})} required />
            <textarea placeholder="Experience" value={formData.experience || ''} onChange={e => setFormData({...formData, experience: e.target.value})} required />
            <textarea placeholder="About Leader" value={formData.about || ''} onChange={e => setFormData({...formData, about: e.target.value})} required />
            {renderImageUpload()}
          </>
        );
      case 'branches':
        return (
          <>
            <input type="text" placeholder="City" value={formData.city || ''} onChange={e => setFormData({...formData, city: e.target.value})} required />
            <textarea placeholder="Address" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} required />
            <input type="email" placeholder="Email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </>
        );
      case 'blogs':
        return (
          <>
            <input type="text" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <input type="text" placeholder="Date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} required />
            <textarea placeholder="Content" value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} required />
            {renderImageUpload()}
          </>
        );
      case 'careers':
        return (
          <>
            <input type="text" placeholder="Job Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <input type="text" placeholder="Type (Full-time/Internship)" value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})} required />
            <input type="text" placeholder="Experience" value={formData.experience || ''} onChange={e => setFormData({...formData, experience: e.target.value})} required />
            <input type="text" placeholder="Location" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} required />
            <textarea placeholder="Description" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} required />
          </>
        );
      case 'gallery':
        return (
          <>
            {renderImageUpload()}
            <input type="text" placeholder="Title/Caption" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
          </>
        );
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f6' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', background: 'var(--primary)', color: '#fff', padding: '40px 0' }}>
        <h2 style={{ padding: '0 30px', marginBottom: '40px', fontWeight: 800 }}>Admin Panel</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { id: 'leaders', label: 'Our Leaders', icon: <FiUsers /> },
            { id: 'branches', label: 'Our Branches', icon: <FiMapPin /> },
            { id: 'blogs', label: 'Blogs', icon: <FiBookOpen /> },
            { id: 'careers', label: 'Careers', icon: <FiBriefcase /> },
            { id: 'gallery', label: 'Gallery', icon: <FiImage /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 30px',
                background: activeTab === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                color: '#fff',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
          <button 
            onClick={handleLogout}
            style={{ marginTop: 'auto', padding: '16px 30px', background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700 }}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)' }}>
            Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <button
            onClick={() => handleOpenModal()}
            style={{
              padding: '12px 24px',
              background: 'var(--secondary)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiPlus /> Add New
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                <tr>
                  <th style={{ padding: '16px 24px', textAlign: 'left' }}>Information</th>
                  <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{item.name || item.title || item.city || 'Untitled'}</div>
                      <div style={{ fontSize: '13px', color: '#888' }}>{item.role || item.email || item.type || item.image?.substring(0, 50) + '...'}</div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button onClick={() => handleOpenModal(item)} style={{ marginRight: '12px', color: '#0056b3', border: 'none', background: 'none', cursor: 'pointer' }}><FiEdit2 /></button>
                      <button onClick={() => setDeleteConfirmId(item.id)} style={{ color: '#ff4d4d', border: 'none', background: 'none', cursor: 'pointer' }}><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr><td colSpan="2" style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No data found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', padding: 'clamp(20px, 5vw, 40px)', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 800 }}>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {renderFormFields()}
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--secondary)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>Save</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', padding: 'clamp(20px, 5vw, 30px)', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 800 }}>Confirm Deletion</h3>
            <p style={{ marginBottom: '24px', color: '#555' }}>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => handleDelete(deleteConfirmId)} style={{ padding: '10px 24px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>OK</button>
              <button onClick={() => setDeleteConfirmId(null)} style={{ padding: '10px 24px', background: '#eee', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          borderRadius: 6px;
          outline: none;
        }
        textarea { height: 100px; resize: vertical; }
      `}</style>
    </div>
  );
};

export default Dashboard;
