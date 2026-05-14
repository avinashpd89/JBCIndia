import React, { useState, useEffect } from 'react';
import { FiExternalLink, FiLink, FiBookOpen, FiX } from 'react-icons/fi';
import api from '../services/api';

const links = [
  { name: 'ICAI Website', url: 'https://www.icai.org' },
  { name: 'ICAI - UDIN', url: 'https://udin.icai.org' },
  { name: 'ICAI - SSP Portal', url: 'https://eservices.icai.org' },
  { name: 'ICAI - CPE Portal', url: 'https://cpe-icai.org' },
  { name: 'ICAI - E-Learnings', url: 'https://learning.icai.org' },
  { name: 'ICAI - Knowledge portal', url: 'https://www.icai.org/post/bos-knowledge-portal' },
  { name: 'ICAI - CA GPT Portal', url: 'https://cagpt.icai.org' },
  { name: 'Income tax portal', url: 'https://www.incometax.gov.in' },
  { name: 'Traces Login Portal', url: 'https://www.tdscpc.gov.in' },
  { name: 'MCA', url: 'https://www.mca.gov.in' },
  { name: 'MCA V3 / LLP Portal', url: 'https://www.mca.gov.in/content/mca/global/en/home.html' },
  { name: 'Reserve Bank of India', url: 'https://www.rbi.org.in' },
  { name: 'CAG Portal', url: 'https://cag.gov.in' },
  { name: 'India code (Legal)', url: 'https://www.indiacode.nic.in' },
  { name: 'GST Login Portal', url: 'https://www.gst.gov.in' },
  { name: 'CBIC Portal', url: 'https://www.cbic.gov.in' },
  { name: 'PD ICAI', url: 'https://pdicai.org/' },
];

const Resources = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>Important Resources</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Quick access to essential regulatory and professional portals.
          </p>
        </div>
      </section>

      {/* Blogs Section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px' }}>
              <FiBookOpen style={{ marginRight: '12px' }} /> Professional Insights & Blogs
            </h2>
            <p style={{ color: '#666' }}>Stay updated with the latest trends and updates in taxation, audit, and finance.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {blogs.length > 0 ? blogs.map((blog, i) => (
              <div key={blog.id || i} style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: 'var(--secondary)', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>{blog.date}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>{blog.title}</h3>
                  <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.6, flex: 1 }}>{blog.excerpt || blog.content?.substring(0, 150) + '...'}</p>
                  <button 
                    onClick={() => setSelectedBlog(blog)}
                    style={{ marginTop: '20px', background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 700, cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  >
                    Read Full Article →
                  </button>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: '#888' }}>
                {loading ? 'Loading blogs...' : 'No blogs available at the moment.'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px', backdropFilter: 'blur(5px)' }}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <button 
              onClick={() => setSelectedBlog(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
            >
              <FiX size={20} />
            </button>
            
            {selectedBlog.image && (
              <div style={{ width: '100%', background: '#f8f9fa', display: 'flex', justifyContent: 'center' }}>
                <img src={selectedBlog.image} alt={selectedBlog.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
              </div>
            )}
            
            <div style={{ padding: 'clamp(20px, 5vw, 40px)' }}>
              <div style={{ color: 'var(--secondary)', fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>{selectedBlog.date || new Date(selectedBlog.createdAt).toLocaleDateString()}</div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px', lineHeight: 1.3 }}>{selectedBlog.title}</h2>
              <div style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explore Section */}
      <section style={{ padding: '80px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              color: '#0056b3', 
              fontWeight: 700, 
              fontSize: '24px',
              marginBottom: '8px'
            }}>
              <FiLink /> Explore Quick Links
            </div>
          </div>

          <div style={{
            background: '#0a2540',
            padding: '60px',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px 48px',
            }}>
              {links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s',
                    padding: '8px 0'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#00a8ff'; e.currentTarget.style.transform = 'translateX(8px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ width: '6px', height: '6px', background: '#00a8ff', borderRadius: '50%' }}></div>
                  <span style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{link.name}</span>
                  <FiExternalLink size={14} style={{ opacity: 0.4 }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
