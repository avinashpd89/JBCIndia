import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section style={{
      position: 'relative',
      minHeight: '80vh',
      background: 'linear-gradient(rgba(10, 37, 64, 0.9), rgba(10, 37, 64, 0.9)), url("https://images.unsplash.com/photo-1454165833767-027ffea1023d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            borderLeft: '4px solid #0056b3'
          }}>
            Established since 5 November 1996
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Strategic Financial Solutions with <span style={{ color: '#00a8ff' }}>Integrity & Excellence</span>
          </h1>
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '40px',
            maxWidth: '650px'
          }}>
            M/s Jaiswal Brajesh & Co. is a multi-disciplinary professional firm of Chartered Accountants, delivering assurance, taxation, and advisory services with absolute independence and technical excellence.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/services" style={{
              padding: '16px 32px',
              background: '#0056b3',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '4px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => e.target.style.background = '#004494'}
            onMouseLeave={e => e.target.style.background = '#0056b3'}
            >
              Explore Our Services
            </Link>
            <Link to="/contact" style={{
              padding: '16px 32px',
              border: '2px solid #fff',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '4px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.color = '#0a2540'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        background: 'rgba(0, 168, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '40px',
        borderTopLeftRadius: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '40px',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }} className="hidden-mobile">
        <div>
          <div style={{ fontSize: '32px', fontWeight: 800 }}>28+</div>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.7 }}>Years Experience</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 800 }}>6+</div>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.7 }}>Physical Branches</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 800 }}>PAN</div>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.7 }}>India Presence</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
