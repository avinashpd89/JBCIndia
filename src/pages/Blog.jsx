import React from 'react';
import { FiFileText, FiClock, FiArrowRight, FiInfo } from 'react-icons/fi';

const resources = [
  {
    title: 'Understanding GST Compliance for Small Businesses',
    date: 'May 2025',
    category: 'Taxation',
    summary: 'A comprehensive guide to GST registration, filing, and common pitfalls for SMEs in India.'
  },
  {
    title: 'Key Changes in Union Budget 2024-25',
    date: 'April 2025',
    category: 'Budget Update',
    summary: 'Detailed analysis of the impact of the latest budget on individual and corporate taxation.'
  },
  {
    title: 'Company Incorporation: Step-by-Step Guide',
    date: 'March 2025',
    category: 'Corporate Law',
    summary: 'Everything you need to know about setting up a private limited company in India.'
  },
  {
    title: 'Internal Audit: Improving Operational Efficiency',
    date: 'February 2025',
    category: 'Auditing',
    summary: 'How regular internal audits can help identify bottlenecks and improve your bottom line.'
  }
];

const Blog = () => {
  return (
    <div style={{ background: '#fff' }}>
      {/* Page Header */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>Information Gallery</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Stay updated with the latest in taxation, auditing, and financial regulations.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {resources.map((r, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#0056b3'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#eee'; }}
              >
                <div style={{ padding: '30px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#0056b3', background: '#e3f2fd', padding: '4px 10px', borderRadius: '4px' }}>
                      {r.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FiClock size={14} /> {r.date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a2540', marginBottom: '16px', lineHeight: 1.4 }}>{r.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>{r.summary}</p>
                </div>
                <div style={{ padding: '20px 30px', borderTop: '1px solid #eee', background: '#fcfcfc' }}>
                  <a href="#" style={{ color: '#0056b3', fontWeight: 700, textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Read Full Article <FiArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter / Ask Section */}
          <div style={{ 
            marginTop: '80px', 
            padding: '60px', 
            background: '#f8f9fa', 
            borderRadius: '16px', 
            textAlign: 'center',
            border: '1px solid #eee'
          }}>
            <FiInfo size={40} style={{ color: '#0056b3', marginBottom: '20px' }} />
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0a2540', marginBottom: '16px' }}>Ask our experts</h2>
            <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto 32px' }}>
              Have specific questions about taxation or compliance? Our team of professional Chartered Accountants is here to help.
            </p>
            <button style={{ padding: '16px 40px', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
              Submit a Query
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Blog;
