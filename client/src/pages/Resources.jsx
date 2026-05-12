import React from 'react';
import { FiExternalLink, FiLink } from 'react-icons/fi';

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
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header - Consistent with About/Services */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>Important Resources</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Quick access to essential regulatory and professional portals.
          </p>
        </div>
      </section>

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
              fontFamily: "'Playfair Display', serif",
              marginBottom: '8px'
            }}>
              <FiLink /> Explore
            </div>
            <p style={{ color: '#666', fontStyle: 'italic', fontSize: '16px' }}>Visit important sites from here</p>
          </div>

          <div style={{
            background: '#0a2540', // Keep the professional navy for the link box
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

          <div style={{ 
            marginTop: '60px', 
            padding: '30px', 
            background: '#fff', 
            borderRadius: '12px', 
            border: '1px solid #eee', 
            textAlign: 'center',
            color: '#888',
            fontSize: '14px'
          }}>
            Jaiswal Brajesh & Co. provides these quick links to assist our clients in accessing major regulatory portals. We do not control and are not responsible for the content of these external sites.
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

export default Resources;
