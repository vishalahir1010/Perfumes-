import React from 'react'
import "../styles/Index.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { data } from "../assets/Perfumes.js"

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

  // Dynamically select 8 famous premium perfumes for the homepage
  const featuredIds = [1, 2, 3, 4, 7, 72, 117, 122];
  const featuredProducts = data.filter(p => featuredIds.includes(p.id));

  return (
    <main className="index-container">
      {/* Hero Section */}
      <section className="h-hero">
        <div className="overlay"></div>
        <div className="h-hero-content">
          <h4>Luxury Collection 2026</h4>
          <h1>Discover The Art Of <span className="text-highlight">Fragrance</span></h1>
          <p>
            Premium perfumes crafted for elegance,
            confidence and unforgettable moments.
          </p>
          <NavLink to="/shop" className="btn btn-hero">
            Shop Now <i className="fa-solid fa-arrow-right"></i>
          </NavLink>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="categories">
        <h2>Shop By Category</h2>
        <p className="section-subtitle">Explore curated scents tailored for every vibe and occasion</p>
        <div className="cat-grid">
          <NavLink to="/Shop?category=men" className="cat-card cat-men">
            <div className="cat-overlay"></div>
            <div className="cat-content">
              <span>Men</span>
              <p>Bold & Masculine</p>
            </div>
          </NavLink>
          <NavLink to="/Shop?category=women" className="cat-card cat-women">
            <div className="cat-overlay"></div>
            <div className="cat-content">
              <span>Women</span>
              <p>Elegant & Floral</p>
            </div>
          </NavLink>
          <NavLink to="/Shop?category=luxury" className="cat-card cat-luxury">
            <div className="cat-overlay"></div>
            <div className="cat-content">
              <span>Luxury</span>
              <p>Exclusive Niche</p>
            </div>
          </NavLink>
          <NavLink to="/Shop?category=unisex" className="cat-card cat-unisex">
            <div className="cat-overlay"></div>
            <div className="cat-content">
              <span>Unisex</span>
              <p>Fresh & Versatile</p>
            </div>
          </NavLink>
        </div>
      </section>

      {/* Brand Standards / Features Section */}
      <section className="features-section">
        <h2>The LUXE SCENT Standard</h2>
        <p className="section-subtitle">Excellence in every bottle we create</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-box">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <h3>Artisanal Notes</h3>
            <p>Every bottle is a blend of hand-selected rare essences from Grasse, France.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">
              <i className="fa-solid fa-clock"></i>
            </div>
            <h3>24H Sillage</h3>
            <p>Our fragrances feature long-lasting longevity, leaving an unforgettable trail.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <h3>Sustainable Luxury</h3>
            <p>100% natural ingredients, cruelty-free, and housed in eco-friendly crystal glass.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Masterpieces</h2>
        <p className="section-subtitle">Indulge in our most celebrated fragrances</p>
        <div className="product-grid">
          {featuredProducts.map((product) => {
            // Render stars based on rating
            const stars = Array.from({ length: 5 }, (_, i) => {
              const starVal = i + 1;
              if (product.rating >= starVal) {
                return <i key={i} className="fa-solid fa-star"></i>;
              } else if (product.rating >= starVal - 0.5) {
                return <i key={i} className="fa-solid fa-star-half-stroke"></i>;
              } else {
                return <i key={i} className="fa-regular fa-star"></i>;
              }
            });

            return (
              <article className="card" key={product.id}>
                <div className="card-image-wrapper">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="category-badge">{product.category}</span>
                </div>
                <div className="card-content">
                  <span className="brand-label">{product.brand}</span>
                  <h3>{product.name}</h3>
                  <div className="card-rating">
                    <span className="stars">{stars}</span>
                    <span className="rating-num">({product.rating})</span>
                  </div>
                  <p className="price">₹{product.price.toLocaleString("en-IN")}</p>
                  <button className="btn-add-cart" onClick={() => addToCart(product.name, product.price, product.image)}>
                    Add To Cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Offer Section */}
      <section className="offer">
        <div className="offer-content">
          <h2>Get 20% OFF</h2>
          <p>On Your First Order. Experience Niche Luxury Today.</p>
          <NavLink to="/shop" className="btn btn-offer">Shop the Collection</NavLink>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews">
        <h2>What Our Clients Say</h2>
        <p className="section-subtitle">Real experiences from our elite fragrance community</p>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="avatar-wrapper">
              <div className="avatar">RS</div>
              <div className="reviewer-info">
                <h4>Rahul Sharma</h4>
                <div className="review-stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
            <p>
              "Amazing fragrance and long lasting quality.
              Highly recommended! Dior Sauvage has become my everyday signature scent."
            </p>
          </div>

          <div className="review-card">
            <div className="avatar-wrapper">
              <div className="avatar">SP</div>
              <div className="reviewer-info">
                <h4>Sneha Patel</h4>
                <div className="review-stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
            <p>
              "The crystal bottle looks so luxurious on my vanity, 
              and the scent is divine. Got so many compliments on my YSL Libre."
            </p>
          </div>

          <div className="review-card">
            <div className="avatar-wrapper">
              <div className="avatar">VM</div>
              <div className="reviewer-info">
                <h4>Vikram Malhotra</h4>
                <div className="review-stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
              </div>
            </div>
            <p>
              "Super fast delivery. The scent of Tom Ford Oud Wood is rich 
              and perfect for evening wear. Will buy the luxury gift sets next."
            </p>
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
            <button type="submit" className="btn btn-newsletter">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Index
