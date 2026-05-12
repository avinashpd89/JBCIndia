import React from 'react';
import { FiUsers, FiAward, FiCheckCircle } from 'react-icons/fi';

const partners = [
  { name: 'CA Brajesh Kumar Jaiswal', role: 'Managing Partner', year: '1996', quals: 'FCA, DISA (ICAI), FAFD', experience: 'Founder of the firm with 28+ years of expertise in statutory audit and financial consultancy.' },
  { name: 'CA Ruby Bansal', role: 'Senior Partner', year: '2002', quals: 'FCA, DISA (ICAI)', experience: 'Expert in direct taxation and regulatory compliance with over two decades of professional practice.' },
  { name: 'CA Prakash Tolani', role: 'Senior Partner', year: '2002', quals: 'FCA, DISA (ICAI), DIRM(ICAI)', experience: 'Specializes in risk management and internal audits for corporate and non-corporate entities.' },
  { name: 'CA Uday Jayaswal', role: 'Senior Partner', year: '2004', quals: 'FCA, DISA (ICAI)', experience: 'Extensive experience in bank audits, company law matters, and financial reporting.' },
  { name: 'CA Awdhesh Kumar Jaiswal', role: 'Senior Partner', year: '2005', quals: 'FCA', experience: 'Dedicated to project financing and financial advisory for diverse industrial sectors.' },
  { name: 'CA Sneha Agrawal', role: 'Senior Partner', year: '2008', quals: 'FCA', experience: 'Expertise in GST compliance, indirect tax advisory, and representation services.' },
  { name: 'CA Sanjeev Kumar', role: 'Senior Partner', year: '2010', quals: 'FCA', experience: 'Specializes in corporate taxation and international tax planning.' },
  { name: 'CA Kishan Kumar Jaiswal', role: 'Partner (Delhi In-Charge)', year: '2012', quals: 'FCA', experience: 'Leading the Delhi operations with focus on start-up advisory and compliance.' }
];

const OurLeaders = () => {
  return (
    <div style={{ background: '#fff' }}>
      {/* Page Header */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>Our Leadership Team</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Guided by experienced professionals committed to the highest standards of integrity and technical excellence.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0a2540', marginBottom: '24px' }}>Visionary Partners</h2>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.8, marginBottom: '48px' }}>
            Our leadership team comprises seasoned Chartered Accountants with diverse specializations. Together, they steer the firm towards its mission of delivering high-quality, timely, and ethical professional services across India.
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {partners.map((p, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '16px',
                padding: '40px',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#0056b3'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#eee'; }}
              >
                <div style={{ width: '120px', height: '120px', background: '#f0f7ff', color: '#0056b3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', fontSize: '40px' }}>
                  <FiUsers />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0a2540', marginBottom: '8px' }}>{p.name}</h3>
                <div style={{ fontSize: '14px', color: '#0056b3', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.role}</div>
                <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>{p.quals} | Since {p.year}</div>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6, flex: 1 }}>{p.experience}</p>
                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                  <div style={{ padding: '6px 12px', background: '#f8f9fa', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: '#555' }}>Statutory Audit</div>
                  <div style={{ padding: '6px 12px', background: '#f8f9fa', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: '#555' }}>Taxation</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section style={{ padding: '100px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0a2540', marginBottom: '48px' }}>Our Collective Strength</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            <div>
              <FiAward size={40} style={{ color: '#0056b3', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>15+</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Professional Partners</p>
            </div>
            <div>
              <FiCheckCircle size={40} style={{ color: '#0056b3', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>100+</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Support Staff & Articles</p>
            </div>
            <div>
              <FiUsers size={40} style={{ color: '#0056b3', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>25+</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurLeaders;
