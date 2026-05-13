import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section style={{
      position: 'relative',
      minHeight: 'clamp(600px, 100vh, 1000px)',
      background: 'linear-gradient(rgba(10, 37, 64, 0.8), rgba(10, 37, 64, 0.9)), url("https://images.unsplash.com/photo-1454165833767-027ffea1023d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      overflow: 'hidden',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="hero-content" style={{ maxWidth: '850px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: 'clamp(12px, 2vw, 14px)',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            borderLeft: '4px solid var(--secondary)',
            backdropFilter: 'blur(4px)'
          }}>
            Established since 5 November 1996
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Strategic Financial Solutions with <span style={{ color: 'var(--accent)' }}>Integrity & Excellence</span>
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2.5vw, 19px)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '40px',
            maxWidth: '650px'
          }}>
            M/s Jaiswal Brajesh & Co. is a multi-disciplinary professional firm of Chartered Accountants, delivering assurance, taxation, and advisory services with absolute independence and technical excellence.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/services" style={{
              padding: 'clamp(12px, 2vw, 16px) clamp(24px, 3vw, 32px)',
              background: 'var(--secondary)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '4px',
              transition: 'all 0.3s',
              textAlign: 'center',
              flex: '0 1 auto'
            }}>
              Explore Our Services
            </Link>
            <Link to="/contact" style={{
              padding: 'clamp(12px, 2vw, 16px) clamp(24px, 3vw, 32px)',
              border: '2px solid #fff',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '4px',
              transition: 'all 0.3s',
              textAlign: 'center',
              flex: '0 1 auto'
            }}>
              Contact Us
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="hero-stats" style={{
          marginTop: 'clamp(40px, 8vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'clamp(16px, 3vw, 30px)',
          maxWidth: '700px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: 'clamp(20px, 4vw, 30px)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'fadeInUp 0.8s ease-out forwards'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: 'var(--accent)' }}>28+</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.7, fontWeight: 700, letterSpacing: '1px' }}>Years Experience</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: 'var(--accent)' }}>8+</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.7, fontWeight: 700, letterSpacing: '1px' }}>Physical Branches</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: 'var(--accent)' }}>PAN</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.7, fontWeight: 700, letterSpacing: '1px' }}>India Presence</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero-content {
            text-align: center;
            margin: 0 auto;
          }
          .hero-content p {
            margin: 0 auto 32px;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-stats {
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (min-width: 993px) {
          .hero-stats {
            position: absolute;
            bottom: 0;
            right: 0;
            margin-top: 0;
            border-top-left-radius: 40px;
            border-bottom-right-radius: 0;
            border-right: none;
            border-bottom: none;
            padding: 40px 60px;
            width: auto;
            min-width: 550px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;


