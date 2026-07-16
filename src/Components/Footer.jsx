import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <h3>LUXE SCENT</h3>
          <p>Premium perfumes crafted for elegance, confidence, and unforgettable moments. Experience the art of luxury fragrances.</p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/collecation">Collections</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} LUXE SCENT. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
