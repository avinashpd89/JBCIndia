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
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '20px' }}>Firm Overview</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Technical Details & Regulatory Registrations of M/s Jaiswal Brajesh & Co.
          </p>
        </div>
      </section>

      {/* Overview Table */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '40px', 
            borderRadius: '16px', 
            border: '1px solid #eee',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0a2540', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiInfo style={{ color: '#0056b3' }} /> Basic Information
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                <div style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Name of the Firm</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#0056b3', textDecoration: 'underline' }}>M/s Jaiswal Brajesh & Co., Chartered Accountants</div>
              </div>
              
              {firmData.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                  <div style={{ fontSize: '15px', color: '#555', fontWeight: 600 }}>{item.label}:</div>
                  <div style={{ fontSize: '15px', color: '#0a2540', fontWeight: 500, fontStyle: 'italic' }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* GST Section */}
            <div style={{ marginTop: '48px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0a2540', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiFileText style={{ color: '#0056b3' }} /> GST Registration Numbers
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {gstNumbers.map((gst, i) => (
                  <div key={i} style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #eef' }}>
                    <div style={{ fontSize: '13px', color: '#888', fontWeight: 600 }}>{gst.state}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0056b3' }}>{gst.no}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Count */}
            <div style={{ marginTop: '48px', padding: '24px', background: '#0a2540', borderRadius: '12px', color: '#fff', textAlign: 'center' }}>
              <FiUsers size={32} style={{ color: '#00a8ff', marginBottom: '12px' }} />
              <div style={{ fontSize: '18px', fontWeight: 700 }}>Number of Partners</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#00a8ff' }}>12 Partners (FCA / ACA)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Summary */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="responsive-grid">
            <div style={{ background: '#f0f7ff', padding: '32px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0a2540', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiMapPin style={{ color: '#0056b3' }} /> Head Office
              </h3>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.6 }}>
                Flat No. 402, 4th Floor, Nagina Complex, Behind AN College, Shivpuri, Patna – 800001 (Bihar)
              </p>
            </div>
            <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #eee' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0a2540', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiCheckCircle style={{ color: '#28a745' }} /> Branch Presence
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['New Delhi', 'Varanasi', 'Raipur', 'Prayagraj', 'Lucknow', 'Ranchi', 'Nalanda'].map((city, i) => (
                  <span key={i} style={{ padding: '6px 12px', background: '#f8f9fa', borderRadius: '20px', fontSize: '13px', color: '#555' }}>{city}</span>
                ))}
              </div>
            </div>
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

export default FirmOverview;
