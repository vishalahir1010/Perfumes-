import React from 'react'

export default function Newarrivals() {
  return (
    <div>
      <section className="hero">

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
    <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"/>
    <div className="card-content">
    <span className="badge">NEW</span>
    <h3>Royal Essence</h3>
    <p className="price">₹2,999</p>
    <a href="product.html" className="btn">View Product</a>
    </div>
    </div>

    <div className="card">
    <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800"/>
    <div className="card-content">
    <span className="badge">NEW</span>
    <h3>Midnight Oud</h3>
    <p className="price">₹3,499</p>
    <a href="product.html" className="btn">View Product</a>
    </div>
    </div>

    <div className="card">
    <img src="https://images.unsplash.com/photo-1619994403073-2cec4b86eb4c?w=800"/>
    <div className="card-content">
    <span className="badge">NEW</span>
    <h3>Ocean Fresh</h3>
    <p className="price">₹2,499</p>
    <a href="product.html" className="btn">View Product</a>
    </div>
    </div>

    <div className="card">
    <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800"/>
    <div className="card-content">
    <span className="badge">NEW</span>
    <h3>Golden Musk</h3>
    <p className="price">₹3,999</p>
    <a href="product.html" className="btn">View Product</a>
    </div>
    </div>

    </div>

    </section>

    </div>
  )
}
