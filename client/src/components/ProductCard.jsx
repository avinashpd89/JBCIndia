import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductCard = ({ product = {} }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      toast.success('Added to cart!');
    } catch {
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const {
    _id = '',
    name = 'Premium Jewelry',
    price = 0,
    image = '',
    category = '',
    rating = 4.5,
    reviews = 0,
  } = product;

  return (
    <Link to={`/products/${_id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 16, overflow: 'hidden',
          background: '#fff',
          boxShadow: hovered
            ? '0 20px 48px rgba(0,0,0,0.12)'
            : '0 4px 16px rgba(0,0,0,0.06)',
          border: `1.5px solid ${hovered ? '#f59e0b' : '#f5f5f5'}`,
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          height: '100%',
        }}
      >
        {/* Image */}
        <div style={{
          position: 'relative', height: 260,
          background: 'linear-gradient(135deg, #fef9ee, #fef3c7)',
          overflow: 'hidden',
        }}>
          {image ? (
            <img
              src={image}
              alt={name}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.4s ease',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <div style={{ fontSize: 52, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}>💍</div>
              <span style={{ fontSize: 12, color: '#a16207', fontWeight: 500, letterSpacing: 1 }}>FINE JEWELRY</span>
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div style={{
              position: 'absolute', top: 12, left: 12,
              background: 'linear-gradient(135deg, #92400e, #d97706)',
              color: '#fff', fontSize: 11, fontWeight: 700,
              padding: '4px 12px', borderRadius: 100,
              letterSpacing: 0.5,
            }}>
              {category}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            position: 'absolute', top: 12, right: 12,
            display: 'flex', flexDirection: 'column', gap: 8,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(12px)',
            transition: 'all 0.3s ease',
          }}>
            <button
              onClick={handleToggleFavorite}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#fff', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                color: isFavorite ? '#ef4444' : '#6b7280',
                transition: 'all 0.2s',
              }}
            >
              <FiHeart size={16} fill={isFavorite ? '#ef4444' : 'none'} />
            </button>
            <button
              onClick={e => e.preventDefault()}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#fff', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.12)', color: '#6b7280',
              }}
            >
              <FiEye size={16} />
            </button>
          </div>

          {/* Sale badge */}
          {price > 0 && (
            <div style={{
              position: 'absolute', bottom: 12, left: 12,
              background: '#dc2626', color: '#fff',
              fontSize: 10, fontWeight: 700, padding: '3px 10px',
              borderRadius: 100, letterSpacing: 0.5,
            }}>
              20% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '16px 18px 18px' }}>
          {/* Name */}
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 16, fontWeight: 600, color: '#1f2937',
            marginBottom: 8, lineHeight: 1.4,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {name}
          </h3>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 1 }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{
                  fontSize: 13,
                  color: i < Math.floor(rating) ? '#f59e0b' : '#d1d5db',
                }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>({reviews})</span>
          </div>

          {/* Price Row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 700,
              color: '#92400e',
            }}>₹{price.toLocaleString('en-IN')}</span>
            {price > 0 && (
              <span style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'line-through' }}>
                ₹{Math.round(price * 1.25).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            style={{
              width: '100%', padding: '11px 0', borderRadius: 10,
              border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 13, fontWeight: 600, letterSpacing: 0.3,
              background: hovered
                ? 'linear-gradient(135deg, #92400e, #d97706)'
                : '#fef3c7',
              color: hovered ? '#fff' : '#92400e',
              transition: 'all 0.3s ease',
              opacity: isLoading ? 0.6 : 1,
              boxShadow: hovered ? '0 4px 16px rgba(180,100,0,0.3)' : 'none',
            }}
          >
            <FiShoppingCart size={15} />
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
