import React, { useState, useEffect } from 'react';
import { FiUsers, FiAward, FiCheckCircle, FiX } from 'react-icons/fi';
import api from '../services/api';

const LeaderImage = ({ src, alt, size }) => {
  const [error, setError] = useState(false);
  if (!src || src.trim() === '' || error) {
    return <FiUsers size={size * 0.4} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      onError={() => setError(true)}
    />
  );
};

/* ─── Leader Profile Modal ──────────────────────────────────────────── */
const LeaderModal = ({ leader, onClose }) => {
  if (!leader) return null;

  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <>
      <style>{`
        .lm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: lm-fade-in 0.2s ease;
        }
        @keyframes lm-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .lm-box {
          background: #fff;
          width: 100%;
          max-width: 860px;
          height: 86vh;
          max-height: 640px;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          position: relative;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.45);
          animation: lm-slide-up 0.25s ease;
        }
        @keyframes lm-slide-up {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* ── Left photo panel ── */
        .lm-photo {
          width: 38%;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lm-photo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          display: block;
        }
        .lm-photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #1e293b, #0f172a);
          color: rgba(255, 255, 255, 0.25);
        }

        /* ── Right text panel ── */
        .lm-content {
          flex: 1;
          overflow-y: auto;
          padding: 44px 40px 36px;
        }
        .lm-role {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: var(--secondary, #c08b3a);
          margin-bottom: 10px;
        }
        .lm-name {
          font-size: clamp(22px, 2.8vw, 30px);
          font-weight: 800;
          color: var(--primary, #1a365d);
          margin: 0 0 6px;
          line-height: 1.2;
        }
        .lm-meta {
          font-size: 14px;
          color: #888;
          margin-bottom: 28px;
        }
        .lm-divider {
          border: none;
          border-top: 1px solid #ebebeb;
          margin: 0 0 24px;
        }
        .lm-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--primary, #1a365d);
          margin-bottom: 10px;
        }
        .lm-text {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.9;
          margin-bottom: 28px;
        }
        .lm-close-btn {
          display: inline-block;
          margin-top: 4px;
          padding: 11px 28px;
          background: var(--primary, #1a365d);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.18s;
        }
        .lm-close-btn:hover { opacity: 0.82; }

        /* ── Close X button ── */
        .lm-x {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(0, 0, 0, 0.28);
          border: none;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          z-index: 10;
          transition: background 0.18s;
        }
        .lm-x:hover { background: rgba(0, 0, 0, 0.52); }

        /* ── Mobile ── */
        @media (max-width: 620px) {
          .lm-box {
            flex-direction: column;
            height: 95vh;
            max-height: unset;
            border-radius: 16px;
          }
          .lm-photo {
            width: 100%;
            height: 260px;
            flex-shrink: 0;
          }
          .lm-content {
            padding: 24px 20px 28px;
          }
          .lm-x {
            top: 10px;
            right: 10px;
          }
        }
      `}</style>

      <div className="lm-overlay" onClick={onClose}>
        <div className="lm-box" onClick={(e) => e.stopPropagation()}>

          {/* Close × */}
          <button className="lm-x" onClick={onClose} aria-label="Close">
            <FiX size={18} />
          </button>

          {/* Left — full-height photo */}
          <div className="lm-photo">
            {leader.image ? (
              <img src={leader.image} alt={leader.name} />
            ) : (
              <div className="lm-photo-placeholder">
                <FiUsers size={80} />
              </div>
            )}
          </div>

          {/* Right — scrollable bio */}
          <div className="lm-content">
            <div className="lm-role">{leader.role}</div>
            <h2 className="lm-name">{leader.name}</h2>
            <div className="lm-meta">
              {[leader.quals, leader.year ? `Since ${leader.year}` : ''].filter(Boolean).join(' | ')}
            </div>

            <hr className="lm-divider" />

            {leader.about && (
              <>
                <div className="lm-section-label">About</div>
                <p className="lm-text">{leader.about}</p>
              </>
            )}



            <button className="lm-close-btn" onClick={onClose}>
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─── Main Page ─────────────────────────────────────────────────────── */
const OurLeaders = () => {
  const [leaders, setLeaders] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLeaders(); }, []);

  const fetchLeaders = async () => {
    try {
      const response = await api.get('/leaders');
      setLeaders(response.data);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff' }}>

      {/* Page Header */}
      <section className="section-padding" style={{ background: 'var(--primary)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '20px' }}>
            Our Leadership Team
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Guided by experienced professionals committed to the highest standards of integrity and technical excellence.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: 1000, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>
            Visionary Partners
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '48px' }}>
            Our leadership team comprises seasoned Chartered Accountants with diverse specializations.
            Together, they steer the firm towards its mission of delivering high-quality, timely, and ethical
            professional services across India.
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {leaders.length > 0 ? leaders.map((p, i) => (
              <div
                key={p.id || i}
                className="card-hover"
                onClick={() => setSelectedLeader(p)}
                style={{
                  background: '#fff',
                  border: '1px solid #eee',
                  borderRadius: '16px',
                  padding: 'clamp(24px, 4vw, 40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: '100px', height: '100px',
                  background: 'var(--bg-light)', color: 'var(--secondary)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '24px',
                  fontSize: '36px', overflow: 'hidden',
                }}>
                  <LeaderImage src={p.image} alt={p.name} size={100} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{p.name}</h3>
                <div style={{ fontSize: '14px', color: 'var(--secondary)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.role}</div>
                <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>{p.quals} | Since {p.year}</div>

                <div style={{ marginTop: '24px', color: 'var(--secondary)', fontWeight: 700, fontSize: '14px' }}>
                  View Full Profile →
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: '#888' }}>
                {loading ? 'Loading leaders...' : 'No leaders found. Please add them from the admin dashboard.'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Collective Strength */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container" style={{ maxWidth: 1000, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 800, color: 'var(--primary)', marginBottom: '48px' }}>
            Our Collective Strength
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {[
              { icon: <FiAward size={40} />, num: '10+', label: 'Professional Partners' },
              { icon: <FiCheckCircle size={40} />, num: '30+', label: 'Support Staff & Articles' },
              { icon: <FiUsers size={40} />, num: '25+', label: 'Years of Excellence' },
            ].map((item, i) => (
              <div key={i} className="card-hover" style={{ padding: '30px', background: '#fff', borderRadius: '12px' }}>
                <div style={{ color: 'var(--secondary)', marginBottom: '16px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>{item.num}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <LeaderModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />
    </div>
  );
};

export default OurLeaders;
