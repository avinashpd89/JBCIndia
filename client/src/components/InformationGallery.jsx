import React from "react";
import paperCutout from "../assets/Papercutout.avif";

const InformationGallery = () => {
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
        <div 
          className="card-hover"
          style={{ 
            position: "relative", 
            borderRadius: "20px", 
            overflow: "hidden", 
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)" 
          }}
        >
          <img 
            src={paperCutout} 
            alt="Information Gallery" 
            style={{ 
              width: "100%", 
              height: "auto", 
              display: "block",
              transition: "transform 0.5s ease"
            }} 
          />
        </div>
      </div>
    </section>
  );
};

export default InformationGallery;

