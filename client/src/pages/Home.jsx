import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiBriefcase,
  FiFileText,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import Hero from "../components/Hero";
import InformationGallery from "../components/InformationGallery";

const services = [
  {
    icon: <FiFileText size={24} />,
    title: "Taxation",
    description: "Strategic advice for effective tax management and compliance with the latest regulations.",
    path: "/services/taxation",
  },
  {
    icon: <FiBriefcase size={24} />,
    title: "Company Incorporation",
    description: "Streamlined process for establishing your business legally and advisory on corporate structures.",
    path: "/services/incorporation",
  },
  {
    icon: <FiTrendingUp size={24} />,
    title: "Financial Reporting",
    description: "Accurate reports to support informed business decisions and ensure transparency.",
    path: "/services/accounting",
  },
  {
    icon: <FiShield size={24} />,
    title: "Auditing & Assurance",
    description: "Delivering independent and high-quality auditing services to maintain financial integrity.",
    path: "/services/auditing",
  },
];

const leaders = [
  {
    name: "CA Brajesh Kumar Jaiswal",
    role: "Managing Partner",
    year: "1996",
    quals: "FCA, DISA (ICAI), FAFD",
  },
  {
    name: "CA Ruby Bansal",
    role: "Senior Partner",
    year: "2002",
    quals: "FCA, DISA (ICAI)",
  },
  {
    name: "CA Prakash Tolani",
    role: "Senior Partner",
    year: "2002",
    quals: "FCA, DISA (ICAI), DIRM(ICAI)",
  },
  {
    name: "CA Uday Jayaswal",
    role: "Senior Partner",
    year: "2004",
    quals: "FCA, DISA (ICAI)",
  },
];

const Home = () => {
  return (
    <div style={{ background: "#fff" }}>
      <Hero />

      {/* About Section */}
      <section className="section-padding" style={{ background: "var(--bg-light)" }}>
        <div className="container responsive-grid" style={{ alignItems: "center" }}>
          <div>
            <h2 style={{ 
              fontSize: "clamp(28px, 4vw, 36px)", 
              fontWeight: 800, 
              color: "var(--primary)", 
              marginBottom: "24px" 
            }}>
              Nearly Three Decades of{" "}
              <span style={{ color: "var(--secondary)" }}>Professional Excellence</span>
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "24px" }}>
              M/s Jaiswal Brajesh & Co., Chartered Accountants, established on 5 November 1996, is a multi-disciplinary professional firm registered with the Institute of Chartered Accountants of India (ICAI).
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "32px" }}>
              With a commitment to integrity, independence, and technical excellence, we provide statutory audit, tax advisory, regulatory compliance, and financial consultancy services across multiple states in India.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "40px" }}>
              <div style={{ padding: "24px", background: "#fff", borderRadius: "8px", borderLeft: "4px solid var(--secondary)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                <h4 style={{ fontWeight: 700, marginBottom: "8px", color: "var(--primary)" }}>Vision</h4>
                <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>To be a trusted partner in our clients' financial journey by delivering excellence.</p>
              </div>
              <div style={{ padding: "24px", background: "#fff", borderRadius: "8px", borderLeft: "4px solid var(--secondary)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                <h4 style={{ fontWeight: 700, marginBottom: "8px", color: "var(--primary)" }}>Mission</h4>
                <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>To provide high-quality, timely, and ethical chartered accountancy services.</p>
              </div>
            </div>
            <Link to="/about" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--secondary)", fontWeight: 700, textDecoration: "none" }}>
              Read More About Our Firm <FiArrowRight />
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Office"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            />
            <div className="hidden-mobile" style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              background: "var(--secondary)",
              color: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,86,179,0.3)",
              zIndex: 5
            }}>
              <div style={{ fontSize: "36px", fontWeight: 800 }}>Pan-India</div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>Presence & Services</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, color: "var(--primary)", marginBottom: "16px" }}>Our Services</h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
              The firm endeavours to address client requirements through a coordinated and holistic professional framework.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {services.map((s, i) => (
              <div key={i} className="card-hover" style={{ padding: "40px", background: "#fff", borderRadius: "12px", border: "1px solid #eee" }}>
                <div style={{ color: "var(--secondary)", marginBottom: "24px" }}>{s.icon}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", color: "var(--primary)" }}>{s.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>{s.description}</p>
                <Link to={s.path} style={{ color: "var(--secondary)", fontWeight: 700, textDecoration: "none", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>
                  Learn More <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Link to="/services" style={{ padding: "14px 40px", border: "2px solid var(--secondary)", color: "var(--secondary)", borderRadius: "4px", textDecoration: "none", fontWeight: 700, transition: "all 0.3s" }}
              onMouseEnter={e => { e.target.style.background = "var(--secondary)"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--secondary)"; }}>
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="section-padding" style={{ background: "var(--primary)", color: "#fff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "24px", display: "flex", justifyContent: "center" }}>
            <div style={{ color: "var(--accent)", fontSize: "clamp(40px, 10vw, 56px)" }}>
              <FiMapPin />
            </div>
          </div>
          <h2 style={{ fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 800, marginBottom: "20px" }}>Our Physical Presence</h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", opacity: 0.8, maxWidth: "800px", margin: "0 auto 40px", lineHeight: 1.6 }}>
            Maintaining physical branch offices in Bihar, Uttar Pradesh, Delhi, Chhattisgarh, and Jharkhand to serve you better.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/our-branches" style={{ 
              padding: "clamp(14px, 2.5vw, 18px) clamp(24px, 5vw, 48px)", 
              background: "var(--accent)", 
              color: "#fff", 
              borderRadius: "4px", 
              textDecoration: "none", 
              fontWeight: 700, 
              transition: "all 0.3s",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              lineHeight: 1.2,
              minWidth: "fit-content",
              maxWidth: "100%"
            }}
            onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.1)"}
            onMouseLeave={e => e.currentTarget.style.filter = "none"}>
              Find a Branch Near You
            </Link>
          </div>
        </div>
      </section>



      {/* Leaders Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, color: "var(--primary)", marginBottom: "16px" }}>Our Leaders</h2>
            <p style={{ color: "var(--text-muted)" }}>Guided by experienced professionals with deep industry knowledge.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {leaders.map((l, i) => (
              <div key={i} className="card-hover" style={{ textAlign: "center", padding: "40px 30px", background: "var(--bg-light)", borderRadius: "12px" }}>
                <div style={{ width: "100px", height: "100px", background: "var(--primary)", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <FiUsers size={40} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--primary)", marginBottom: "4px" }}>{l.name}</h3>
                <div style={{ fontSize: "13px", color: "var(--secondary)", fontWeight: 600, marginBottom: "12px" }}>{l.role} (Since {l.year})</div>
                <div style={{ fontSize: "12px", color: "#888" }}>{l.quals}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InformationGallery />
    </div>
  );
};

export default Home;

