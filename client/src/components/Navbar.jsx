import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiMail, FiPhone } from 'react-icons/fi';
import logo from '../assets/Logo.avif';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      subLinks: [
        { name: 'Firm Overview', path: '/firm-overview' },
        { name: 'Our Leaders', path: '/our-leaders' },
        { name: 'Our Branches', path: '/our-branches' }
      ]
    },
    { 
      name: 'Services', 
      path: '/services',
      subLinks: [
        { name: 'Auditing & Assurance', path: '/services/auditing' },
        { name: 'Accounting & Bookkeeping', path: '/services/accounting' },
        { name: 'Taxation', path: '/services/taxation' },
        { name: 'Company Incorporation', path: '/services/incorporation' },
        { name: 'Financial Advisory', path: '/services/advisory' },
        { name: 'Regulation & Compliance', path: '/services/compliance' }
      ]
    },
    { name: 'Resources', path: '/resources' },
    { name: 'Career', path: '/career' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Top Bar */}
      <div style={{
        background: 'var(--primary)',
        color: '#fff',
        padding: '8px 24px',
        fontSize: '13px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }} className="hidden-mobile">
        <div style={{ display: 'flex', gap: 24 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FiMail size={14} /> admin.vns@jbcindia.in
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FiPhone size={14} /> +91-9532063489
          </span>
        </div>
        <div style={{ letterSpacing: '0.5px' }}>
          Established 1996 | Chartered Accountants
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(255,255,255,0.98)' : '#fff',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.05)',
          padding: '0 24px',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80, padding: 0 }}>
          
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img 
              src={logo} 
              alt="Jaiswal Brajesh & Co. Logo" 
              style={{ height: 'clamp(40px, 8vw, 60px)', width: 'auto', display: 'block' }} 
            />
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                style={{ position: 'relative' }}
                onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  style={{
                    padding: '10px 16px',
                    fontSize: 15,
                    fontWeight: 600,
                    color: isActive(link.path) ? 'var(--secondary)' : '#333',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  {link.name}
                  {link.subLinks && <FiChevronDown size={14} />}
                </Link>

                {/* Dropdown */}
                {link.subLinks && activeDropdown === link.name && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: '#fff',
                    minWidth: '240px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    padding: '12px 0',
                    border: '1px solid #eee'
                  }}>
                    {link.subLinks.map(sub => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        style={{
                          display: 'block',
                          padding: '10px 20px',
                          color: '#444',
                          fontSize: '14px',
                          textDecoration: 'none',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.target.style.background = '#f8f9fa'}
                        onMouseLeave={e => e.target.style.background = 'transparent'}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="show-mobile"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #eee',
              background: '#f8f9fa',
              cursor: 'pointer',
              color: 'var(--primary)'
            }}
          >
            <FiMenu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1001
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-100%',
        width: '85%',
        maxWidth: '350px',
        height: '100vh',
        background: '#fff',
        zIndex: 1002,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
        padding: '80px 0 40px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: '#f8f9fa',
            border: 'none',
            borderRadius: '50%',
            padding: '8px',
            cursor: 'pointer',
            color: 'var(--primary)'
          }}
        >
          <FiX size={24} />
        </button>

        {/* Mobile Nav Links */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {navLinks.map((link) => (
            <div key={link.name} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link
                  to={link.path}
                  style={{
                    flex: 1,
                    padding: '16px 24px',
                    fontSize: 17,
                    fontWeight: 600,
                    color: isActive(link.path) ? 'var(--secondary)' : 'var(--primary)',
                    textDecoration: 'none'
                  }}
                  onClick={() => !link.subLinks && setIsOpen(false)}
                >
                  {link.name}
                </Link>
                {link.subLinks && (
                  <button 
                    onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                    style={{ padding: '16px 24px', background: 'none', border: 'none', color: '#666' }}
                  >
                    <FiChevronDown 
                      size={20} 
                      style={{ 
                        transform: mobileExpanded === link.name ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s'
                      }} 
                    />
                  </button>
                )}
              </div>
              
              {link.subLinks && mobileExpanded === link.name && (
                <div style={{ background: '#f8f9fa', paddingBottom: '8px' }}>
                  {link.subLinks.map(sub => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      style={{
                        display: 'block',
                        padding: '12px 40px',
                        fontSize: 15,
                        color: '#555',
                        textDecoration: 'none'
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Contact Info */}
        <div style={{ marginTop: 'auto', padding: '32px 24px', background: '#f8f9fa' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>Quick Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="mailto:admin.vns@jbcindia.in" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#444', textDecoration: 'none' }}>
              <FiMail style={{ color: 'var(--secondary)' }} /> admin.vns@jbcindia.in
            </a>
            <a href="tel:+919532063489" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#444', textDecoration: 'none' }}>
              <FiPhone style={{ color: 'var(--secondary)' }} /> +91-9532063489
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

