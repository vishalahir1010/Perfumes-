import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Collecation.css";

export default function Collecation() {
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
          <h1>Our Collections</h1>
          <p>Explore Premium Fragrance Collections</p>
        </div>
      </section>

      <section className="collection-section">
        <h2>Luxury Collection</h2>
        <div className="product-grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800" alt="Royal Oud" />
            <div className="card-content">
              <h3>Royal Oud</h3>
              <p className="price">₹3,499</p>
              <button className="btn" onClick={() => addToCart('Royal Oud', 3499, 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800" alt="Black Gold" />
            <div className="card-content">
              <h3>Black Gold</h3>
              <p className="price">₹2,999</p>
              <button className="btn" onClick={() => addToCart('Black Gold', 2999, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800" alt="Imperial Gold" />
            <div className="card-content">
              <h3>Imperial Gold</h3>
              <p className="price">₹3,999</p>
              <button className="btn" onClick={() => addToCart('Imperial Gold', 3999, 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800" alt="Majestic Musk" />
            <div className="card-content">
              <h3>Majestic Musk</h3>
              <p className="price">₹4,299</p>
              <button className="btn" onClick={() => addToCart('Majestic Musk', 4299, 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="collection-section">
        <h2>Summer Collection</h2>
        <div className="product-grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1619994403073-2cec4b86eb4c?w=800" alt="Ocean Breeze" />
            <div className="card-content">
              <h3>Ocean Breeze</h3>
              <p className="price">₹2,499</p>
              <button className="btn" onClick={() => addToCart('Ocean Breeze', 2499, 'https://images.unsplash.com/photo-1619994403073-2cec4b86eb4c?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800" alt="Citrus Fresh" />
            <div className="card-content">
              <h3>Citrus Fresh</h3>
              <p className="price">₹2,199</p>
              <button className="btn" onClick={() => addToCart('Citrus Fresh', 2199, 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800" alt="Coconut Cove" />
            <div className="card-content">
              <h3>Coconut Cove</h3>
              <p className="price">₹2,299</p>
              <button className="btn" onClick={() => addToCart('Coconut Cove', 2299, 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800" alt="Tropical Oasis" />
            <div className="card-content">
              <h3>Tropical Oasis</h3>
              <p className="price">₹2,599</p>
              <button className="btn" onClick={() => addToCart('Tropical Oasis', 2599, 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="collection-section">
        <h2>Winter Collection</h2>
        <div className="product-grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800" alt="Amber Night" />
            <div className="card-content">
              <h3>Amber Night</h3>
              <p className="price">₹3,799</p>
              <button className="btn" onClick={() => addToCart('Amber Night', 3799, 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800" alt="Dark Wood" />
            <div className="card-content">
              <h3>Dark Wood</h3>
              <p className="price">₹3,199</p>
              <button className="btn" onClick={() => addToCart('Dark Wood', 3199, 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800" alt="Spiced Vanilla" />
            <div className="card-content">
              <h3>Spiced Vanilla</h3>
              <p className="price">₹3,499</p>
              <button className="btn" onClick={() => addToCart('Spiced Vanilla', 3499, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800" alt="Midnight Forest" />
            <div className="card-content">
              <h3>Midnight Forest</h3>
              <p className="price">₹3,699</p>
              <button className="btn" onClick={() => addToCart('Midnight Forest', 3699, 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="collection-section">
        <h2>Limited Edition</h2>
        <div className="product-grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800" alt="Imperial Musk" />
            <div className="card-content">
              <h3>Imperial Musk</h3>
              <p className="price">₹4,499</p>
              <button className="btn" onClick={() => addToCart('Imperial Musk', 4499, 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=800" alt="Diamond Essence" />
            <div className="card-content">
              <h3>Diamond Essence</h3>
              <p className="price">₹4,999</p>
              <button className="btn" onClick={() => addToCart('Diamond Essence', 4999, 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1610113909978-b7933cc94040?w=800" alt="Royal Saffron" />
            <div className="card-content">
              <h3>Royal Saffron</h3>
              <p className="price">₹5,499</p>
              <button className="btn" onClick={() => addToCart('Royal Saffron', 5499, 'https://images.unsplash.com/photo-1610113909978-b7933cc94040?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800" alt="Golden Elixir" />
            <div className="card-content">
              <h3>Golden Elixir</h3>
              <p className="price">₹5,999</p>
              <button className="btn" onClick={() => addToCart('Golden Elixir', 5999, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800')}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
