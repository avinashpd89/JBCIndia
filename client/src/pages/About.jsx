import React from 'react';
import { FiAward, FiShield, FiCheckCircle, FiUsers, FiTrendingUp } from 'react-icons/fi';

const About = () => {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Page Header */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>About Our Firm</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Professional Excellence & Integrity since 1996.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '42px', 
              fontWeight: 800, 
              color: '#0056b3', 
              marginBottom: '32px',
              fontFamily: "'Playfair Display', serif",
              textDecoration: 'underline',
              textUnderlineOffset: '12px'
            }}>
              Your Trusted CA Firm in India
            </h2>
          </div>

          <div style={{ fontSize: '18px', lineHeight: 1.8, color: '#333', textAlign: 'justify' }}>
            <p style={{ marginBottom: '32px' }}>
              <strong>M/s Jaiswal Brajesh & Co., Chartered Accountants</strong> is a well-established partnership firm of Chartered Accountants, in continuous professional practice since <strong>5th November 1996</strong>. The firm is registered with the Institute of Chartered Accountants of India (ICAI) bearing <strong>FRN 07915C</strong> and operates in full compliance with the Chartered Accountants Act, 1949, the ICAI Regulations, and the ICAI Code of Ethics, 2019.
            </p>

            <p style={{ marginBottom: '32px' }}>
              With its <em>Head Office at Patna (Bihar)</em> and a strong presence through branch offices across Delhi, Uttar Pradesh, Chhattisgarh, Jharkhand, Bihar, and other key locations, the firm provides comprehensive professional services on a pan-India basis.
            </p>

            <p style={{ marginBottom: '32px' }}>
              The firm is empanelled with the <strong>Comptroller & Auditor General of India (C&AG)</strong> and holds a valid <strong>RBI Unique Code</strong>, enabling it to undertake statutory audits of banks, cooperative institutions, and other regulated entities, in accordance with applicable laws and regulatory guidelines.
            </p>

            <p style={{ marginBottom: '60px' }}>
              Backed by a team of <strong>12 partners</strong>, qualified Chartered Accountants, semi-qualified professionals, article clerks, and experienced support staff, the firm delivers services in the areas of statutory audit, internal audit, tax audit, GST audit and advisory, compliance management, and certification assignments, with a strong emphasis on professional integrity, regulatory compliance, and client-centric solutions.
            </p>
          </div>

          {/* Key Highlights Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginTop: '60px' }}>
            <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center', borderTop: '4px solid #0056b3' }}>
              <FiShield size={32} style={{ color: '#0056b3', marginBottom: '16px' }} />
              <h4 style={{ fontWeight: 700, color: '#0a2540', marginBottom: '8px' }}>C&AG Empanelled</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>Authorized for Government & Public Sector Audits</p>
            </div>
            <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center', borderTop: '4px solid #0056b3' }}>
              <FiAward size={32} style={{ color: '#0056b3', marginBottom: '16px' }} />
              <h4 style={{ fontWeight: 700, color: '#0a2540', marginBottom: '8px' }}>RBI Unique Code</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>Specialized in Banking & Financial Audits</p>
            </div>
            <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center', borderTop: '4px solid #0056b3' }}>
              <FiUsers size={32} style={{ color: '#0056b3', marginBottom: '16px' }} />
              <h4 style={{ fontWeight: 700, color: '#0a2540', marginBottom: '8px' }}>12 Partners</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>Expert Team of Professional Chartered Accountants</p>
            </div>
            <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center', borderTop: '4px solid #0056b3' }}>
              <FiTrendingUp size={32} style={{ color: '#0056b3', marginBottom: '16px' }} />
              <h4 style={{ fontWeight: 700, color: '#0a2540', marginBottom: '8px' }}>Est. 1996</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>Nearly 30 Years of Professional Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision/Mission Section */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }} className="responsive-grid">
          <div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '24px', color: '#00a8ff' }}>Our Core Values</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <li style={{ display: 'flex', gap: '16px' }}><FiCheckCircle size={20} /> Professional Integrity & Independence</li>
              <li style={{ display: 'flex', gap: '16px' }}><FiCheckCircle size={20} /> Regulatory Compliance & Ethical Conduct</li>
              <li style={{ display: 'flex', gap: '16px' }}><FiCheckCircle size={20} /> Client-Centric & Solution-Oriented Approach</li>
              <li style={{ display: 'flex', gap: '16px' }}><FiCheckCircle size={20} /> Technical Excellence & Continuous Innovation</li>
            </ul>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '40px' }}>
            <p style={{ fontSize: '20px', fontStyle: 'italic', textAlign: 'center', opacity: 0.9 }}>
              "Commitment to providing comprehensive professional services with absolute integrity and technical brilliance."
            </p>
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

export default About;
