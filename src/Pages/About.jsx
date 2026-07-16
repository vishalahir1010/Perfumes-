import React from 'react'
import "../styles/About.css";

export default function About() {
  return (
    <div>
      <section className="about-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>About Luxe Scent</h1>
          <p>Luxury Fragrances Crafted For Elegance</p>
        </div>
      </section>

      <section className="about-section">
        <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1000" alt="Our Story" />
        <div className="about-text">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Our Story</h2>
          <p>
            Luxe Scent was founded with a passion for creating unforgettable fragrances.
            Our perfumes are crafted using premium ingredients and inspired by elegance,
            confidence, and timeless luxury.
          </p>
          <p>
            We believe that every fragrance tells a story. Our mission is to help people
            express their personality through unique, masterfully blended, and long-lasting scents.
          </p>
        </div>
      </section>

      <section className="features">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "40px" }}>Why Choose Us</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <i className="fa-solid fa-gem"></i>
            <h3>Premium Quality</h3>
            <p>Made with high-end luxury ingredients sourced globally to ensure high longevity.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-truck"></i>
            <h3>Fast Delivery</h3>
            <p>Express and secured door-to-door delivery with priority package safety.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-award"></i>
            <h3>Trusted Brand</h3>
            <p>Hundreds of thousands of positive reviews from loyal fragrance collectors globally.</p>
          </div>
        </div>
      </section>

      <section className="team">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "40px" }}>Our Master Perfumers</h2>
        <div className="team-grid">
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80" alt="Vishal Ahir" />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: "600" }}>Vishal Ahir</h3>
            <p style={{ color: "var(--accent-gold)", fontWeight: "600", textTransform: "uppercase", fontSize: "11px", letterSpacing: "1px", marginTop: "4px" }}>Founder & CEO</p>
          </div>

          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80" alt="Rahul Sharma" />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: "600" }}>Rahul Sharma</h3>
            <p style={{ color: "var(--accent-gold)", fontWeight: "600", textTransform: "uppercase", fontSize: "11px", letterSpacing: "1px", marginTop: "4px" }}>Master Perfumer</p>
          </div>

          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=80" alt="Priya Patel" />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: "600" }}>Priya Patel</h3>
            <p style={{ color: "var(--accent-gold)", fontWeight: "600", textTransform: "uppercase", fontSize: "11px", letterSpacing: "1px", marginTop: "4px" }}>Scent Director</p>
          </div>
        </div>
      </section>
    </div>
  )
}
