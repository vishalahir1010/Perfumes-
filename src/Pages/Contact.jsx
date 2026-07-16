import React from "react";
import "../styles/Contact.css";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! Our Luxe Scent concierge team will get back to you shortly.");
    e.target.reset();
  };

  return (
    <>
      <section className="contact-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p className="contact-intro">
            Have questions about our artisanal blends or need help selecting your signature scent? 
            Reach out to our fragrance concierge team.
          </p>

          <div className="info-item">
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <h4>Our House</h4>
              <p>Ahmedabad, Gujarat, India</p>
            </div>
          </div>

          <div className="info-item">
            <i className="fa-solid fa-phone"></i>
            <div>
              <h4>Concierge Phone</h4>
              <p>+91 9876543210</p>
            </div>
          </div>

          <div className="info-item">
            <i className="fa-solid fa-envelope"></i>
            <div>
              <h4>Electronic Mail</h4>
              <p>support@luxescent.com</p>
            </div>
          </div>

          {/* Social Media Connect */}
          <div className="social-connect">
            <h4>Connect With Us</h4>
            <div className="social-icons-row">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-pinterest"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-x-twitter"></i></a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              required
            />
            <textarea
              rows="6"
              placeholder="Your Message"
              required
            ></textarea>
            <button type="submit" className="contact-submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}