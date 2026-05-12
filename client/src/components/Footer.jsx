import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi';
import logo from '../assets/Logo.avif';

const Footer = () => {
  return (
    <footer style={{ background: '#0a2540', color: '#fff', paddingTop: '80px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '48px', marginBottom: '60px' }} className="footer-grid">
          
          {/* Firm Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <img 
                src={logo} 
                alt="Logo" 
                style={{ height: '40px', width: 'auto', background: '#fff', padding: '4px', borderRadius: '4px' }} 
              />
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.7, marginBottom: '24px' }}>
              A professionally managed firm of Chartered Accountants established in 1996, delivering assurance, taxation, and advisory services with integrity and technical excellence.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ color: '#fff', opacity: 0.6 }}><FiLinkedin size={20} /></a>
              <a href="#" style={{ color: '#fff', opacity: 0.6 }}><FiTwitter size={20} /></a>
              <a href="#" style={{ color: '#fff', opacity: 0.6 }}><FiFacebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/about" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '14px' }}>Firm Overview</Link></li>
              <li><Link to="/services" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '14px' }}>Our Services</Link></li>
              <li><Link to="/resources" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '14px' }}>Resources</Link></li>
              <li><Link to="/career" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '14px' }}>Career</Link></li>
              <li><Link to="/contact" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '14px' }}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/services/auditing" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '14px' }}>Auditing & Assurance</Link></li>
              <li><Link to="/services/taxation" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '14px' }}>Taxation</Link></li>
              <li><Link to="/services/incorporation" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '14px' }}>Company Incorporation</Link></li>
              <li><Link to="/services/accounting" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '14px' }}>Financial Reporting</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Contact Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <FiMapPin size={20} style={{ color: '#00a8ff', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Admin Office (Varanasi)</div>
                  <div style={{ fontSize: '13px', opacity: 0.7 }}>13, Sidhhartha Complex, Sigra-mehmoorganj road, Varanasi (U.P.) - 221010</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <FiMapPin size={20} style={{ color: '#00a8ff', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Head Office (Patna)</div>
                  <div style={{ fontSize: '13px', opacity: 0.7 }}>Flat no. 402, 4th Floor, Nagina Complex, Behind A.N. college, Shivpuri, Patna - 800023</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <FiMail size={16} style={{ color: '#00a8ff' }} />
                <span style={{ fontSize: '13px', opacity: 0.7 }}>admin.vns@jbcindia.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ fontSize: '13px', opacity: 0.5 }}>
            © 2025 Jaiswal Brajesh & Co. All rights reserved. Registered with ICAI.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/privacy" style={{ fontSize: '13px', opacity: 0.5, color: '#fff', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ fontSize: '13px', opacity: 0.5, color: '#fff', textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="/disclaimer" style={{ fontSize: '13px', opacity: 0.5, color: '#fff', textDecoration: 'none' }}>Disclaimer</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 576px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
