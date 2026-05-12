import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      await api.post('/contact', formData);
      toast.success('Your query has been submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px', background: '#0a2540', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>Contact Us</h1>
          <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: 1.6 }}>
            Professional assistance for all your financial and regulatory needs.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px' }} className="responsive-grid">
          
          {/* Contact Form */}
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0a2540', marginBottom: '32px' }}>Ask Our Experts</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#333', display: 'block', marginBottom: '8px' }}>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' }} placeholder="John Doe" />
                </div>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#333', display: 'block', marginBottom: '8px' }}>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' }} placeholder="john@example.com" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#333', display: 'block', marginBottom: '8px' }}>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' }} placeholder="+91 0000 000 000" />
                </div>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#333', display: 'block', marginBottom: '8px' }}>Subject *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' }} placeholder="Taxation Query" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#333', display: 'block', marginBottom: '8px' }}>Message *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="6" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none', resize: 'none' }} placeholder="How can we help you today?"></textarea>
              </div>
              <button type="submit" disabled={loading} style={{ 
                padding: '16px', 
                background: '#0056b3', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                fontWeight: 700, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: loading ? 0.7 : 1
              }}>
                {loading ? 'Submitting...' : <><FiSend /> Submit Query</>}
              </button>
            </form>
          </div>

          {/* Office Info */}
          <div>
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0a2540', marginBottom: '32px' }}>Our Offices</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Varanasi */}
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#e3f2fd', color: '#0056b3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0a2540', marginBottom: '8px' }}>Admin Office (Varanasi)</h3>
                    <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>
                      13, Sidhhartha Complex, Sigra-mehmoorganj road, Varanasi (U.P.) - 221010
                    </p>
                  </div>
                </div>

                {/* Patna */}
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#e3f2fd', color: '#0056b3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0a2540', marginBottom: '8px' }}>Head Office (Patna)</h3>
                    <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>
                      Flat no. 402, 4th Floor, Nagina Complex, Behind A.N. college, Shivpuri, Boring Road, Patna (Bihar) - 800023
                    </p>
                  </div>
                </div>

                {/* Contact Links */}
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#e3f2fd', color: '#0056b3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0a2540', marginBottom: '8px' }}>Phone & Support</h3>
                    <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>
                      +91-542-2224444<br />
                      +91-612-2525555
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#e3f2fd', color: '#0056b3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0a2540', marginBottom: '8px' }}>Email</h3>
                    <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>
                      admin.vns@jbcindia.in<br />
                      ho.patna@jbcindia.in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#0a2540', padding: '30px', borderRadius: '12px', color: '#fff' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Business Hours</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', opacity: 0.8 }}>
                <span>Mon - Fri:</span>
                <span>10:00 AM - 7:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', opacity: 0.8 }}>
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', opacity: 0.8 }}>
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
