import React from 'react';
import { FiMapPin, FiMail } from 'react-icons/fi';

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
      <section className="section-padding" style={{ background: 'var(--primary)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '20px' }}>Our Branches</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Serving clients across India with dedicated physical offices in major hubs.
          </p>
        </div>
      </section>

      {/* Branches List */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: 1000 }}>
          <h2 style={{ 
            fontSize: 'clamp(24px, 4vw, 36px)', 
            fontWeight: 800, 
            color: 'var(--primary)', 
            marginBottom: '48px',
            borderBottom: '4px solid var(--secondary)',
            display: 'inline-block',
            paddingBottom: '8px'
          }}>Our Network</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
            {branches.map((b, i) => (
              <div key={i} className="card-hover" style={{
                padding: 'clamp(20px, 4vw, 30px)',
                borderLeft: '4px solid var(--secondary)',
                background: 'var(--bg-light)',
                borderRadius: '0 8px 8px 0',
              }}>
                <h3 style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>{b.city}</h3>
                <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>{b.address}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--secondary)', fontWeight: 600 }}>
                  <FiMail /> {b.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="section-padding" style={{ background: 'var(--bg-light)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <FiMapPin size={48} style={{ color: 'var(--secondary)', marginBottom: '24px' }} />
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 28px)', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px' }}>Need assistance?</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            Contact our nearest branch or reach out to our admin office in Varanasi for centralized support.
          </p>
          <a href="mailto:admin.vns@jbcindia.in" style={{ 
            padding: '16px 40px', 
            background: 'var(--primary)', 
            color: '#fff', 
            borderRadius: '4px', 
            textDecoration: 'none', 
            fontWeight: 700,
            display: 'inline-block',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => e.target.style.background = 'var(--secondary)'}
          onMouseLeave={e => e.target.style.background = 'var(--primary)'}
          >
            Contact Admin Office
          </a>
        </div>
      </section>
    </div>
  );
};

export default OurBranches;

