import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Index.css";
import "../styles/Shop.css";
import { showToast } from "../utils/toast.js";

export default function Bestsellers() {
  const navigate = useNavigate();

  const addToCart = (name, price, image) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: Date.now() + Math.random(),
      name: name,
      price: price,
      image: image
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(name + " Added To Cart");
    navigate("/cart");
  };

  return (
    <div>
      <section className="co-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Best Sellers</h1>
          <p>Our Most Loved Fragrances</p>
        </div>
      </section>

      <section className="products">
        <h2>Top Selling Perfumes</h2>
        <div className="product-grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800" alt="Royal Oud" loading="lazy" />
            <div className="card-content">
              <span className="badge">BEST SELLER</span>
              <h3>Royal Oud</h3>
              <div className="rating">★★★★★</div>
              <p className="price">₹3,499</p>
              <button className="btn" onClick={() => addToCart('Royal Oud', 3499, 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800" alt="Black Gold" loading="lazy" />
            <div className="card-content">
              <span className="badge">BEST SELLER</span>
              <h3>Black Gold</h3>
              <div className="rating">★★★★★</div>
              <p className="price">₹2,999</p>
              <button className="btn" onClick={() => addToCart('Black Gold', 2999, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800" alt="Amber Night" loading="lazy" />
            <div className="card-content">
              <span className="badge">BEST SELLER</span>
              <h3>Amber Night</h3>
              <div className="rating">★★★★★</div>
              <p className="price">₹3,799</p>
              <button className="btn" onClick={() => addToCart('Amber Night', 3799, 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1619994403073-2cec4b86eb4c?w=800" alt="Ocean Fresh" loading="lazy" />
            <div className="card-content">
              <span className="badge">BEST SELLER</span>
              <h3>Ocean Fresh</h3>
              <div className="rating">★★★★★</div>
              <p className="price">₹2,699</p>
              <button className="btn" onClick={() => addToCart('Ocean Fresh', 2699, 'https://images.unsplash.com/photo-1619994403073-2cec4b86eb4c?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
