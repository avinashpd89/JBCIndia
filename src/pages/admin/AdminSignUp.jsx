import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      await api.post('/auth/signup', {
        email: formData.email,
        password: formData.password
      });
      toast.success('Signup successful! Please check your email for verification code.');
      setIsVerifying(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/verify-otp', {
        email: formData.email,
        code: otp
      });
      toast.success('Email verified successfully! You can now log in.');
      navigate('/admin/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f7f6' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--primary)', fontWeight: 800 }}>
          {isVerifying ? 'Verify Email' : 'Admin Signup'}
        </h2>

        {!isVerifying ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px',
                background: 'var(--secondary)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ textAlign: 'center', color: '#666' }}>Enter the 6-digit code sent to <strong>{formData.email}</strong></p>
            <input
              type="text"
              placeholder="Verification Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px',
                background: 'var(--secondary)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
            <button
              type="button"
              onClick={() => setIsVerifying(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Go back to signup
            </button>
          </form>
        )}

        {!isVerifying && (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
            Already have an account? <Link to="/admin/login" style={{ color: 'var(--secondary)', fontWeight: 700 }}>Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminSignUp;
