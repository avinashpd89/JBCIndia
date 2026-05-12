import React from 'react';
import { FiBriefcase, FiSend, FiCheckCircle, FiBookOpen } from 'react-icons/fi';

const openings = [
  {
    title: 'Chartered Accountant (Qualified)',
    type: 'Full-Time',
    experience: '0-3 Years',
    location: 'Patna / Varanasi',
    description: 'Looking for young and dynamic CAs with expertise in Statutory Audit and Income Tax compliance.'
  },
  {
    title: 'Audit Manager',
    type: 'Full-Time',
    experience: '5+ Years',
    location: 'New Delhi / Lucknow',
    description: 'Senior role requiring deep knowledge of Ind AS, Company Law, and management audits.'
  },
  {
    title: 'Article Assistants',
    type: 'Internship',
    experience: 'IPCC Qualified',
    location: 'All Branches',
    description: 'Opportunities for CA students to gain diverse experience in Auditing, Taxation, and ROC matters.'
  },
  {
    title: 'Accountant',
    type: 'Full-Time',
    experience: '2-5 Years',
    location: 'Raipur / Ranchi',
    description: 'Expertise in Tally Prime, GST returns, and day-to-day bookkeeping is required.'
  }
];

const Career = () => {
  return (
    <div style={{ background: '#fff' }}>
      {/* Page Header */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>Join Our Team</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Build your career with one of North India's most respected Chartered Accountancy firms.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="responsive-grid">
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0a2540', marginBottom: '32px' }}>Why Jaiswal Brajesh & Co?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FiCheckCircle size={24} style={{ color: '#0056b3', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>Diverse Exposure</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Work across multiple industries including manufacturing, banking, and social sectors.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FiCheckCircle size={24} style={{ color: '#0056b3', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>Mentorship</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Direct interaction with senior partners with decades of professional wisdom.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FiCheckCircle size={24} style={{ color: '#0056b3', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>Work-Life Balance</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>A professional yet supportive environment that values individual growth and well-being.</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: '#f8f9fa', padding: '50px', borderRadius: '16px', textAlign: 'center' }}>
            <FiBookOpen size={64} style={{ color: '#0056b3', marginBottom: '24px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0a2540', marginBottom: '16px' }}>Article Internship</h3>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7, marginBottom: '32px' }}>
              We offer exceptional training for CA students. Our articleship program is designed to provide hands-on experience in complex auditing and taxation matters, preparing you for a successful professional life.
            </p>
            <button style={{ padding: '14px 40px', border: '2px solid #0056b3', color: '#0056b3', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
              Learn About Training
            </button>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0a2540', marginBottom: '48px', textAlign: 'center' }}>Current Openings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {openings.map((job, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '12px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ background: '#e3f2fd', color: '#0056b3', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>{job.type}</div>
                  <FiBriefcase style={{ color: '#ddd' }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0a2540' }}>{job.title}</h3>
                <div style={{ fontSize: '13px', color: '#888' }}>Exp: {job.experience} | {job.location}</div>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, flex: 1 }}>{job.description}</p>
                <button style={{ padding: '12px', background: '#0a2540', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Apply Now <FiSend size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Drop */}
      <section style={{ padding: '100px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px' }}>Can't find a suitable role?</h2>
          <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '40px', lineHeight: 1.6 }}>
            Send us your resume anyway. We are always on the lookout for talented professionals to join our growing team.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="mailto:career@jbcindia.in" style={{ padding: '16px 40px', background: '#fff', color: '#0a2540', borderRadius: '4px', textDecoration: 'none', fontWeight: 700 }}>
              Email Resume
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
};

export default Career;
