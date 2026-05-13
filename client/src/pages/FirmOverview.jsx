import React from 'react';
import { FiFileText, FiInfo, FiCheckCircle, FiMapPin, FiUsers } from 'react-icons/fi';

const FirmOverview = () => {
  const firmData = [
    { label: 'Constitution', value: 'Partnership Firm of Chartered Accountants' },
    { label: 'Date of Establishment', value: '5th November, 1996' },
    { label: 'ICAI Firm Registration Number (FRN)', value: '07915C (ICAI/CIRC)' },
    { label: 'C&AG Empanelment Number', value: 'CR1358' },
    { label: 'RBI Unique Code Number', value: '333222' },
    { label: 'Category (Audit Empanelment)', value: 'Category – 1' },
    { label: 'Permanent Account Number (PAN)', value: 'AADFJ7086L' }
  ];

  const gstNumbers = [
    { state: 'Bihar (Patna)', no: '10AADFJ7086L1Z8' },
    { state: 'Uttar Pradesh', no: '09AADFJ7086L1ZR' },
    { state: 'Chhattisgarh', no: '22AADFJ7086L1Z3' },
    { state: 'Jharkhand', no: '20AADFJ7086L1Z7' },
    { state: 'Delhi', no: '07AADFJ7086L1ZV' }
  ];

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <section className="section-padding" style={{ background: 'var(--primary)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 800, marginBottom: '20px' }}>Firm Overview</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Technical Details & Regulatory Registrations of M/s Jaiswal Brajesh & Co.
          </p>
        </div>
      </section>

      {/* Overview Table */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="card-hover" style={{ 
            background: 'var(--bg-light)', 
            padding: 'clamp(20px, 4vw, 40px)', 
            borderRadius: '16px', 
            border: '1px solid #eee',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiInfo style={{ color: 'var(--secondary)' }} /> Basic Information
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Name of the Firm</div>
                <div style={{ fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: 700, color: 'var(--secondary)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>M/s Jaiswal Brajesh & Co., Chartered Accountants</div>
              </div>
              
              {firmData.map((item, i) => (
                <div key={i} style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '12px', 
                  paddingBottom: '16px', 
                  borderBottom: '1px solid #eee' 
                }}>
                  <div style={{ fontSize: '15px', color: '#555', fontWeight: 600 }}>{item.label}:</div>
                  <div style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: 500, fontStyle: 'italic' }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* GST Section */}
            <div style={{ marginTop: '48px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiFileText style={{ color: 'var(--secondary)' }} /> GST Registration Numbers
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {gstNumbers.map((gst, i) => (
                  <div key={i} style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #eef', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '13px', color: '#888', fontWeight: 600 }}>{gst.state}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)' }}>{gst.no}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Count */}
            <div style={{ marginTop: '48px', padding: '30px', background: 'var(--primary)', borderRadius: '12px', color: '#fff', textAlign: 'center' }}>
              <FiUsers size={32} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
              <div style={{ fontSize: '18px', fontWeight: 700 }}>Number of Partners</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent)' }}>12 Partners (FCA / ACA)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Summary */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="responsive-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div className="card-hover" style={{ background: 'var(--bg-light)', padding: '32px', borderRadius: '12px', border: '1px solid #eee' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiMapPin style={{ color: 'var(--secondary)' }} /> Head Office
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Flat No. 402, 4th Floor, Nagina Complex, Behind AN College, Shivpuri, Patna – 800001 (Bihar)
              </p>
            </div>
            <div className="card-hover" style={{ background: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #eee' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiCheckCircle style={{ color: '#28a745' }} /> Branch Presence
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['New Delhi', 'Varanasi', 'Raipur', 'Prayagraj', 'Lucknow', 'Ranchi', 'Nalanda'].map((city, i) => (
                  <span key={i} style={{ padding: '6px 12px', background: 'var(--bg-light)', borderRadius: '20px', fontSize: '13px', color: 'var(--text-muted)', border: '1px solid #eee' }}>{city}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FirmOverview;

