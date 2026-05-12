import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiMail, FiPhone } from 'react-icons/fi';
import logo from '../assets/Logo.avif';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      subLinks: [
        // { name: 'About Us', path: '/about' },
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
        background: '#0a2540',
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
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
          
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img 
              src={logo} 
              alt="Jaiswal Brajesh & Co. Logo" 
              style={{ height: '60px', width: 'auto', display: 'block' }} 
            />
            {/* <div className="hidden-mobile">
              <div style={{ fontSize: 20, fontWeight: 700, color: '#0a2540', lineHeight: 1.1 }}>
                Jaiswal Brajesh & Co.
              </div>
              <div style={{ fontSize: 11, color: '#666', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 2 }}>
                Chartered Accountants
              </div>
            </div> */}
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
                    color: isActive(link.path) ? '#0056b3' : '#333',
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
            onClick={() => setIsOpen(!isOpen)}
            className="show-mobile"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: 'none',
              cursor: 'pointer',
              display: 'none'
            }}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div style={{
            background: '#fff',
            borderTop: '1px solid #eee',
            padding: '20px 0',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    fontSize: 16,
                    fontWeight: 600,
                    color: isActive(link.path) ? '#0056b3' : '#333',
                    textDecoration: 'none'
                  }}
                >
                  {link.name}
                </Link>
                {link.subLinks && (
                  <div style={{ paddingLeft: 20 }}>
                    {link.subLinks.map(sub => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        style={{
                          display: 'block',
                          padding: '8px 20px',
                          fontSize: 14,
                          color: '#666',
                          textDecoration: 'none'
                        }}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 992px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
