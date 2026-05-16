import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import api from "../services/api";

const InformationGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await api.get('/gallery');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.scrollBehavior = 'auto';
    sliderRef.current.style.scrollSnapType = 'none';
  };

  const handleMouseLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    restoreScrollSnap();
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    restoreScrollSnap();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const restoreScrollSnap = () => {
    sliderRef.current.style.scrollBehavior = 'smooth';
    sliderRef.current.style.scrollSnapType = 'x mandatory';
  };

  const scrollByAmount = (direction) => {
    if (sliderRef.current) {
      const amount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({ left: direction * amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 800,
              color: "var(--primary)",
              marginBottom: "16px",
            }}>
            Information Gallery
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            Explore our firm's journey and achievements through our curated gallery.
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          {images.length > 1 && (
            <>
              <button 
                onClick={() => scrollByAmount(-1)}
                style={{ position: 'absolute', left: '2vw', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#fff', border: '1px solid #eee', borderRadius: '50%', padding: '12px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', color: 'var(--primary)' }}
              >
                <FiChevronLeft size={28} />
              </button>
              <button 
                onClick={() => scrollByAmount(1)}
                style={{ position: 'absolute', right: '2vw', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#fff', border: '1px solid #eee', borderRadius: '50%', padding: '12px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', color: 'var(--primary)' }}
              >
                <FiChevronRight size={28} />
              </button>
            </>
          )}

          <div 
            ref={sliderRef}
            className="hide-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ 
              display: 'flex',
              gap: '30px',
              overflowX: 'auto',
              padding: '20px 5vw',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
          {images.map((item, index) => (
            <div 
              key={item.id || index}
              style={{
                flexShrink: 0,
                width: '85vw',
                maxWidth: '1000px',
                height: '70vh',
                maxHeight: '600px',
                minHeight: '400px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                background: '#fff',
                scrollSnapAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img 
                src={item.image} 
                alt={item.title || "Gallery Image"} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
          ))}
          
          {images.length === 0 && !loading && (
            <div style={{ textAlign: 'center', width: '100%', padding: '40px', color: '#888' }}>
              No gallery images found.
            </div>
          )}
          </div>
        </div>
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default InformationGallery;
