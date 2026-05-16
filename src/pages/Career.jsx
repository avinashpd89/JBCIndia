import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiSend, FiCheckCircle, FiBookOpen } from 'react-icons/fi';
import api from '../services/api';

const Career = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpenings();
  }, []);

  const fetchOpenings = async () => {
    try {
      const response = await api.get('/careers');
      setOpenings(response.data);
    } catch (error) {
      console.error('Error fetching openings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff' }}>
      {/* Page Header */}
      <section className="section-padding" style={{ background: 'var(--primary)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '20px' }}>Join Our Team</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Build your career with one of North India's most respected Chartered Accountancy firms.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding">
        <div className="container responsive-grid" style={{ gap: '80px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 800, color: 'var(--primary)', marginBottom: '32px' }}>Why Jaiswal Brajesh & Co?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FiCheckCircle size={24} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--primary)' }}>Diverse Exposure</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Work across multiple industries including manufacturing, banking, and social sectors.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FiCheckCircle size={24} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--primary)' }}>Mentorship</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Direct interaction with senior partners with decades of professional wisdom.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FiCheckCircle size={24} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--primary)' }}>Work-Life Balance</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>A professional yet supportive environment that values individual growth and well-being.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-hover" style={{ background: 'var(--bg-light)', padding: 'clamp(30px, 5vw, 50px)', borderRadius: '16px', textAlign: 'center' }}>
            <FiBookOpen size={64} style={{ color: 'var(--secondary)', marginBottom: '24px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px' }}>Article Internship</h3>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
              We offer exceptional training for CA students. Our articleship program is designed to provide hands-on experience in complex auditing and taxation matters, preparing you for a successful professional life.
            </p>
            <button style={{ padding: '14px 40px', border: '2px solid var(--secondary)', color: 'var(--secondary)', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', background: 'transparent', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.target.style.background = 'var(--secondary)'; e.target.style.color = '#fff'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--secondary)'; }}>
              Learn About Training
            </button>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 800, color: 'var(--primary)', marginBottom: '48px', textAlign: 'center' }}>Current Openings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {openings.length > 0 ? openings.map((job, i) => (
              <div key={job.id || i} className="card-hover" style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '12px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-light)', color: 'var(--secondary)', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>{job.type}</div>
                  <FiBriefcase style={{ color: '#ddd' }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>{job.title}</h3>
                <div style={{ fontSize: '13px', color: '#888' }}>Exp: {job.experience} | {job.location}</div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{job.description}</p>
                <button style={{ padding: '12px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s' }}
                  onMouseEnter={e => e.target.style.background = 'var(--secondary)'}
                  onMouseLeave={e => e.target.style.background = 'var(--primary)'}>
                  Apply Now <FiSend size={14} />
                </button>
              </div>
            )) : (
              <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: '#888' }}>
                {loading ? 'Loading openings...' : 'No current openings. Send us your resume!'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Resume Drop */}
      <section className="section-padding" style={{ background: 'var(--primary)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 800, marginBottom: '24px' }}>Can't find a suitable role?</h2>
          <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '40px', lineHeight: 1.6 }}>
            Send us your resume anyway. We are always on the lookout for talented professionals to join our growing team.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="mailto:career@jbcindia.in" style={{ padding: '16px 40px', background: 'var(--accent)', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, transition: 'all 0.3s' }}
              onMouseEnter={e => e.target.style.filter = 'brightness(1.1)'}
              onMouseLeave={e => e.target.style.filter = 'none'}>
              Email Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;
