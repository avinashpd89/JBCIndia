import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiFileText, FiBriefcase, FiTrendingUp, FiUserCheck, FiGlobe } from 'react-icons/fi';

const allServices = [
  {
    title: 'Auditing & Assurance',
    path: '/services/auditing',
    icon: <FiShield size={32} />,
    description: 'Statutory Audit, Internal Audit, Management Audit, and Stock Audit services ensuring compliance and financial integrity.',
    features: ['Statutory Audit', 'Internal Audit', 'Tax Audit', 'Management Audit']
  },
  {
    title: 'Taxation',
    path: '/services/taxation',
    icon: <FiFileText size={32} />,
    description: 'Strategic tax planning and compliance for Direct and Indirect Taxes including GST, Income Tax, and International Taxation.',
    features: ['Income Tax Return', 'GST Compliance', 'Tax Planning', 'TDS Filings']
  },
  {
    title: 'Company Incorporation',
    path: '/services/incorporation',
    icon: <FiBriefcase size={32} />,
    description: 'End-to-end support for business setup, including registration of Companies, LLPs, Firms, and Trusts.',
    features: ['Company Setup', 'LLP Registration', 'Trademark Filing', 'NGO Registration']
  },
  {
    title: 'Accounting & Bookkeeping',
    path: '/services/accounting',
    icon: <FiTrendingUp size={32} />,
    description: 'Professional accounting services, financial reporting, and MIS reports to keep your business records accurate.',
    features: ['Financial Reporting', 'Tally Accounting', 'Payroll Services', 'MIS Reports']
  },
  {
    title: 'Financial Advisory',
    path: '/services/advisory',
    icon: <FiUserCheck size={32} />,
    description: 'Expert financial consultancy, project reports, and loan syndication to support your business growth.',
    features: ['Project Reports', 'CMA Data', 'Loan Advisory', 'Investment Planning']
  },
  {
    title: 'Regulation & Compliance',
    path: '/services/compliance',
    icon: <FiGlobe size={32} />,
    description: 'Ensuring your business stays compliant with MCA, RBI, FEMA, and other regulatory bodies.',
    features: ['MCA Compliance', 'FEMA Advisory', 'RBI Filings', 'Statutory Returns']
  }
];

const Products = () => {
  return (
    <div style={{ background: '#fff' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>Our Services</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Comprehensive professional solutions for all your auditing, taxation, and financial needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {allServices.map((s, i) => (
              <div 
                key={i} 
                style={{
                  background: '#fff',
                  border: '1px solid #eee',
                  borderRadius: '16px',
                  padding: '50px 40px',
                  transition: 'all 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#0056b3'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#eee'; }}
              >
                <div style={{ width: '64px', height: '64px', background: '#f0f7ff', color: '#0056b3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                  {s.icon}
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0a2540', marginBottom: '20px' }}>{s.title}</h2>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7, marginBottom: '30px' }}>{s.description}</p>
                <div style={{ width: '100%', height: '1px', background: '#f0f0f0', marginBottom: '30px' }}></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
                  {s.features.map(f => (
                    <div key={f} style={{ fontSize: '13px', color: '#555', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '6px', height: '6px', background: '#0056b3', borderRadius: '50%' }}></div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link to={s.path} style={{ marginTop: 'auto', paddingTop: '30px', color: '#0056b3', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px' }}>Need Expert Financial Advice?</h2>
          <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '40px', lineHeight: 1.6 }}>
            Our team of experienced Chartered Accountants is ready to help you navigate through complex financial and regulatory requirements.
          </p>
          <button style={{ padding: '18px 48px', background: '#00a8ff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '16px', cursor: 'pointer' }}>
            Book a Consultation
          </button>
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

export default Products;
