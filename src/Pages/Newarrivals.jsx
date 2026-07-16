import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Index.css";
import "../styles/Shop.css";

export default function Newarrivals() {
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
    alert(name + " Added To Cart");
    navigate("/cart");
  };

  return (
    <div>
      <section className="co-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>New Arrivals</h1>
          <p>Discover Our Latest Luxury Fragrances</p>
        </div>
      </section>

      <section className="products">
        <h2>Latest Perfumes</h2>
        <div className="product-grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800" alt="Royal Essence" />
            <div className="card-content">
              <span className="badge">NEW</span>
              <h3>Royal Essence</h3>
              <p className="price">₹2,999</p>
              <button className="btn" onClick={() => addToCart('Royal Essence', 2999, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800" alt="Midnight Oud" />
            <div className="card-content">
              <span className="badge">NEW</span>
              <h3>Midnight Oud</h3>
              <p className="price">₹3,499</p>
              <button className="btn" onClick={() => addToCart('Midnight Oud', 3499, 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1619994403073-2cec4b86eb4c?w=800" alt="Ocean Fresh" />
            <div className="card-content">
              <span className="badge">NEW</span>
              <h3>Ocean Fresh</h3>
              <p className="price">₹2,499</p>
              <button className="btn" onClick={() => addToCart('Ocean Fresh', 2499, 'https://images.unsplash.com/photo-1619994403073-2cec4b86eb4c?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800" alt="Golden Musk" />
            <div className="card-content">
              <span className="badge">NEW</span>
              <h3>Golden Musk</h3>
              <p className="price">₹3,999</p>
              <button className="btn" onClick={() => addToCart('Golden Musk', 3999, 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
