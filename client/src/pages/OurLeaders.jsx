import React, { useState, useEffect } from 'react';
import { FiUsers, FiAward, FiCheckCircle, FiX } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

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

const OurLeaders = () => {
  const [leaders, setLeaders] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const response = await api.get('/leaders');
      setLeaders(response.data);
    } catch (error) {
      console.error('Error fetching leaders:', error);
      // Fallback to initial data if needed, or just show error
    } finally {
      setLoading(false);
    }
  };

  const LeaderModal = ({ leader, onClose }) => {
    if (!leader) return null;
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }} onClick={onClose}>
        <div style={{
          background: '#fff',
          width: '100%',
          maxWidth: '800px',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row'
        }} onClick={e => e.stopPropagation()}>
          <button onClick={onClose} style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f4f7f6',
            border: 'none',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
            zIndex: 10
          }}><FiX size={24} /></button>
          
          <div style={{
            flex: '1',
            background: 'var(--bg-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}>
            {leader.image ? (
              <LeaderImage src={leader.image} alt={leader.name} size={200} />
            ) : (
              <div style={{ width: '200px', height: '200px', background: '#ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px', color: '#888' }}>
                <FiUsers />
              </div>
            )}
          </div>
          
          <div style={{ flex: '1.5', padding: '40px' }}>
            <div style={{ color: 'var(--secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', marginBottom: '12px' }}>{leader.role}</div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{leader.name}</h2>
            <div style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>{leader.quals} | Since {leader.year}</div>
            
            <div style={{ borderTop: '1px solid #eee', paddingTop: '24px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary)' }}>About Leader</h4>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '24px' }}>{leader.about || "No details provided."}</p>
              <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary)' }}>Professional Experience</h4>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.8 }}>{leader.experience}</p>
            </div>
            
            <button 
              onClick={onClose}
              style={{
                marginTop: '32px',
                padding: '12px 30px',
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >Close Profile</button>
          </div>
        </div>
      </div>
    );
  };

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
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '100px', height: '100px', background: 'var(--bg-light)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', fontSize: '36px', overflow: 'hidden' }}>
                  <LeaderImage src={p.image} alt={p.name} size={100} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{p.name}</h3>
                <div style={{ fontSize: '14px', color: 'var(--secondary)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.role}</div>
                <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>{p.quals} | Since {p.year}</div>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
                  {p.experience?.length > 120 ? p.experience.substring(0, 120) + '...' : p.experience}
                </p>
                <div style={{ marginTop: '24px', color: 'var(--secondary)', fontWeight: 700, fontSize: '14px' }}>View Full Profile →</div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: '#888' }}>
                {loading ? 'Loading leaders...' : 'No leaders found. Please add them from the admin dashboard.'}
              </div>
            )}
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

      <LeaderModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />
    </div>
  );
};

export default OurLeaders;
