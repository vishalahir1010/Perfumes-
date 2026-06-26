import React from "react";


export default function Contact() {
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


          <div className="info-item">

            <i className="fa-solid fa-location-dot"></i>

            <div>

              <h4>Address</h4>

              <p>Ahmedabad, Gujarat, India</p>

            </div>

          </div>


          <div className="info-item">

            <i className="fa-solid fa-phone"></i>

            <div>

              <h4>Phone</h4>

              <p>+91 9876543210</p>

            </div>

          </div>


          <div className="info-item">

            <i className="fa-solid fa-envelope"></i>

            <div>

              <h4>Email</h4>

              <p>support@luxescent.com</p>

            </div>

          </div>

        </div>


        <div className="contact-form">

          <h2>Send Message</h2>

          <form>

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
            />

            <textarea
              rows="6"
              placeholder="Your Message"
            ></textarea>

            <button type="submit">

              Send Message

            </button>

          </form>

        </div>

      </section>

    </>
  );
}