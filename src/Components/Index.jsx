import React from 'react'
import "../styles/Index.css"
import { NavLink, useNavigate } from 'react-router-dom'

const Index = () => {
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for joining our Elite Club! Exclusive updates will be sent to your email.");
    e.target.reset();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="h-hero">
        <div className="overlay"></div>
        <div className="h-hero-content">
          <h4>Luxury Collection 2026</h4>
          <h1>Discover The Art Of Fragrance</h1>
          <p>
            Premium perfumes crafted for elegance,
            confidence and unforgettable moments.
          </p>
          <NavLink to="/shop" className="btn">Shop now</NavLink>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="categories">
        <h2>Shop By Category</h2>
        <div className="cat-grid">
          <NavLink to="/Shop?category=men" className="cat-card cat-men">
            <span>Men Perfume</span>
          </NavLink>
          <NavLink to="/Shop?category=women" className="cat-card cat-women">
            <span>Women Perfume</span>
          </NavLink>
          <NavLink to="/Shop?category=luxury" className="cat-card cat-luxury">
            <span>Luxury Perfume</span>
          </NavLink>
          <NavLink to="/Shop?category=unisex" className="cat-card cat-unisex">
            <span>Unisex Perfume</span>
          </NavLink>
        </div>
      </section>

      {/* Brand Standards / Features Section */}
      <section className="features-section">
        <h2>The LUXE SCENT Standard</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <h3>Artisanal Notes</h3>
            <p>Every bottle is a blend of hand-selected rare essences from Grasse, France.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-clock"></i>
            <h3>24H Sillage</h3>
            <p>Our fragrances feature long-lasting longevity, leaving an unforgettable trail.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-leaf"></i>
            <h3>Sustainable Luxury</h3>
            <p>100% natural ingredients, cruelty-free, and housed in eco-friendly crystal glass.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800" alt="Luxury Gold" />
            <h3>Luxury Gold</h3>
            <p className="price">₹2,999</p>
            <button onClick={() => addToCart('Luxury Gold', 2999, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800')}>
              Add To Cart
            </button>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800" alt="Royal Oud" />
            <h3>Royal Oud</h3>
            <p className="price">₹3,499</p>
            <button onClick={() => addToCart('Royal Oud', 3499, 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800')}>
              Add To Cart
            </button>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800" alt="Night Essence" />
            <h3>Night Essence</h3>
            <p className="price">₹2,799</p>
            <button onClick={() => addToCart('Night Essence', 2799, 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800')}>
              Add To Cart
            </button>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800" alt="Golden Musk" />
            <h3>Golden Musk</h3>
            <p className="price">₹3,999</p>
            <button onClick={() => addToCart('Golden Musk', 3999, 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800')}>
              Add To Cart
            </button>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="offer">
        <h2>Get 20% OFF</h2>
        <p>On Your First Order</p>
        <NavLink to="/shop" className="btn">Shop now</NavLink>
      </section>

      {/* Customer Reviews */}
      <section className="reviews">
        <h2>Customer Reviews</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="rating">★★★★★</div>
            <p>
              "Amazing fragrance and long lasting quality.
              Highly recommended!"
            </p>
            <h4>- Rahul Sharma</h4>
          </div>

          <div className="review-card">
            <div className="rating">★★★★★</div>
            <p>
              "The champagne gold bottle looks so luxurious on my vanity, 
              and the scent is divine. Got so many compliments."
            </p>
            <h4>- Sneha Patel</h4>
          </div>

          <div className="review-card">
            <div className="rating">★★★★★</div>
            <p>
              "Super fast delivery. The scent is rich and perfect 
              for evening wear. Will buy the luxury gift sets next."
            </p>
            <h4>- Vikram Malhotra</h4>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-box">
          <h2>Join The Elite Club</h2>
          <p>Subscribe to receive access to exclusive private sales, new arrivals, and luxury updates.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input type="email" placeholder="Your Email Address" required />
            <button type="submit" className="btn">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Index
