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
      <section className="section-padding" style={{ background: 'var(--primary)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '20px' }}>Our Leadership Team</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Guided by experienced professionals committed to the highest standards of integrity and technical excellence.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: 1000, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>Visionary Partners</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '48px' }}>
            Our leadership team comprises seasoned Chartered Accountants with diverse specializations. Together, they steer the firm towards its mission of delivering high-quality, timely, and ethical professional services across India.
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {partners.map((p, i) => (
              <div key={i} className="card-hover" style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '16px',
                padding: 'clamp(24px, 4vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{ width: '100px', height: '100px', background: 'var(--bg-light)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', fontSize: '36px' }}>
                  <FiUsers />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{p.name}</h3>
                <div style={{ fontSize: '14px', color: 'var(--secondary)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.role}</div>
                <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>{p.quals} | Since {p.year}</div>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{p.experience}</p>
                <div style={{ marginTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <div style={{ padding: '6px 12px', background: 'var(--bg-light)', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: 'var(--primary)' }}>Statutory Audit</div>
                  <div style={{ padding: '6px 12px', background: 'var(--bg-light)', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: 'var(--primary)' }}>Taxation</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container" style={{ maxWidth: 1000, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 800, color: 'var(--primary)', marginBottom: '48px' }}>Our Collective Strength</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            <div className="card-hover" style={{ padding: '30px', background: '#fff', borderRadius: '12px' }}>
              <FiAward size={40} style={{ color: 'var(--secondary)', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>15+</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Professional Partners</p>
            </div>
            <div className="card-hover" style={{ padding: '30px', background: '#fff', borderRadius: '12px' }}>
              <FiCheckCircle size={40} style={{ color: 'var(--secondary)', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>100+</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Support Staff & Articles</p>
            </div>
            <div className="card-hover" style={{ padding: '30px', background: '#fff', borderRadius: '12px' }}>
              <FiUsers size={40} style={{ color: 'var(--secondary)', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>25+</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurLeaders;

