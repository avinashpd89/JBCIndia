import React from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const branches = [
  {
    city: 'Head Office – Patna (Bihar)',
    address: 'Flat No. 402, 4th Floor, Nagina Complex, Behind AN College, Shivpuri, Patna – 800023',
    email: 'ho.patna@jbcindia.in'
  },
  {
    city: 'New Delhi',
    address: 'F-10 Shiv Tower, 401, Vijay Block, Laxminagar, East Delhi – 110092',
    email: 'delhi.office@jbcindia.in'
  },
  {
    city: 'Varanasi (U.P.)',
    address: 'D-59/92, AJ-13, Siddhartha Complex, Sigra–Mahmoorganj Road, Varanasi – 221010',
    email: 'admin.vns@jbcindia.in'
  },
  {
    city: 'Raipur (C.G.)',
    address: 'Plot No. 48, Bangali Para, Behind Sai Mandir, Dubey Colony, Mova, Raipur – 492001',
    email: 'raipur.office@jbcindia.in'
  },
  {
    city: 'Prayagraj (Allahabad, U.P.)',
    address: '539/342, Salig Ganj Road, Mutthiganj Road, Prayagraj – 211003',
    email: 'prayagraj.office@jbcindia.in'
  },
  {
    city: 'Lucknow (U.P.)',
    address: '201, 2nd Floor, J.K. Tower, Lalbagh, Lucknow – 226001',
    email: 'lucknow.office@jbcindia.in'
  },
  {
    city: 'Ranchi (Jharkhand)',
    address: 'Suite No. 203, 2nd Floor, Commerce House, Sharda Babu Lane, Line Tank, Ranchi – 834001',
    email: 'ranchi.office@jbcindia.in'
  },
  {
    city: 'Nalanda (Bihar)',
    address: 'Kargil chowk, Rana Bigha near Bank of India - Pachauri branch, Bihar Sharif, Nalanda - 803101',
    email: 'nalanda.office@jbcindia.in'
  }
];

const OurBranches = () => {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>Our Branches</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Serving clients across India with dedicated physical offices in major hubs.
          </p>
        </div>
      </section>

      {/* Branches List */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 800, 
            color: '#0a2540', 
            marginBottom: '48px',
            borderBottom: '4px solid #0056b3',
            display: 'inline-block',
            paddingBottom: '8px'
          }}>Our Network:</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '40px' }}>
            {branches.map((b, i) => (
              <div key={i} style={{
                padding: '30px',
                borderLeft: '4px solid #0056b3',
                background: '#f8f9fa',
                borderRadius: '0 8px 8px 0',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f0f7ff'; e.currentTarget.style.transform = 'translateX(10px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0a2540', marginBottom: '12px' }}>{b.city}:</h3>
                <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.6, marginBottom: '16px' }}>{b.address}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#0056b3', fontWeight: 600 }}>
                  <FiMail /> {b.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section style={{ padding: '80px 24px', background: '#f8f9fa', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <FiMapPin size={48} style={{ color: '#0056b3', marginBottom: '24px' }} />
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0a2540', marginBottom: '20px' }}>Need assistance?</h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
            Contact our nearest branch or reach out to our admin office in Varanasi for centralized support.
          </p>
          <a href="mailto:admin.vns@jbcindia.in" style={{ 
            padding: '16px 40px', 
            background: '#0a2540', 
            color: '#fff', 
            borderRadius: '4px', 
            textDecoration: 'none', 
            fontWeight: 700,
            display: 'inline-block'
          }}>
            Contact Admin Office
          </a>
        </div>
      </section>
    </div>
  );
};

export default OurBranches;
