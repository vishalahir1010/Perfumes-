import React, { useEffect, useState } from "react";
import { data } from "../assets/Perfumes.js";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Shop.css";

export default function Shop() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams(search);
    const categoryParam = queryParams.get("category");
    const searchParam = queryParams.get("search");
    
    setTimeout(() => {
      let filtered = data;
      if (categoryParam) {
        filtered = data.filter(item => item.category && item.category.toLowerCase() === categoryParam.toLowerCase());
      }
      if (searchParam) {
        filtered = filtered.filter(item => 
          (item.name && item.name.toLowerCase().includes(searchParam.toLowerCase())) ||
          (item.description && item.description.toLowerCase().includes(searchParam.toLowerCase())) ||
          (item.brand && item.brand.toLowerCase().includes(searchParam.toLowerCase()))
        );
      }
      setProduct(filtered);
      setLoading(false);
    }, 500);
  }, [search]);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: Date.now() + Math.random(),
      name: item.name,
      price: item.price,
      image: item.image
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(item.name + " Added To Cart");
    navigate("/cart");
  };

  const queryParams = new URLSearchParams(search);
  const categoryParam = queryParams.get("category");
  const searchParam = queryParams.get("search");

  const hasFilter = categoryParam || searchParam;

  // Grouped perfumes for default view
  const menPerfumes = product.filter(p => p.category?.toLowerCase() === "men");
  const womenPerfumes = product.filter(p => p.category?.toLowerCase() === "women");
  const luxuryPerfumes = product.filter(p => p.category?.toLowerCase() === "luxury");
  const unisexPerfumes = product.filter(p => p.category?.toLowerCase() === "unisex");

  return (
    <>
      <section className="shop-banner">
        <h1>Shop Perfumes</h1>
      </section>

      <section className="products">
        {/* Category Filter Pills */}
        <div className="filter-nav">
          <button 
            className={`filter-btn ${(!categoryParam && !searchParam) ? 'active' : ''}`}
            onClick={() => navigate("/shop")}
          >
            All Perfumes
          </button>
          <button 
            className={`filter-btn ${categoryParam?.toLowerCase() === 'men' ? 'active' : ''}`}
            onClick={() => navigate("/shop?category=men")}
          >
            Men Perfumes
          </button>
          <button 
            className={`filter-btn ${categoryParam?.toLowerCase() === 'women' ? 'active' : ''}`}
            onClick={() => navigate("/shop?category=women")}
          >
            Women Perfumes
          </button>
          <button 
            className={`filter-btn ${categoryParam?.toLowerCase() === 'luxury' ? 'active' : ''}`}
            onClick={() => navigate("/shop?category=luxury")}
          >
            Luxury Perfumes
          </button>
          <button 
            className={`filter-btn ${categoryParam?.toLowerCase() === 'unisex' ? 'active' : ''}`}
            onClick={() => navigate("/shop?category=unisex")}
          >
            Unisex Perfumes
          </button>
        </div>

        {loading ? (
          <div className="premium-loader">
            <div className="spinner"></div>
            <div className="loading-text">LUXE SCENT</div>
          </div>
        ) : hasFilter ? (
          <>
            <h2>
              {categoryParam ? `${categoryParam.toUpperCase()} Collection` : `Search Results for "${searchParam}"`}
            </h2>
            {product.length === 0 ? (
              <p style={{ color: "var(--text-secondary)", fontSize: "18px", margin: "40px 0" }}>No perfumes found matching your query.</p>
            ) : (
              <div className="product-grid">
                {product.map((e) => (
                  <div key={e.id} className="card">
                    <img src={e.image} alt={e.name} />
                    <div className="card-content">
                      <h3>{e.name}</h3>
                      <div className="price">₹{e.price}</div>
                      <button className="btn" onClick={() => addToCart(e)}>Add To Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Men's Collection */}
            {menPerfumes.length > 0 && (
              <div className="category-section" style={{ marginBottom: "60px" }}>
                <h2 style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "10px", marginBottom: "30px" }}>Men's Collection</h2>
                <div className="product-grid">
                  {menPerfumes.map((e) => (
                    <div key={e.id} className="card">
                      <img src={e.image} alt={e.name} />
                      <div className="card-content">
                        <h3>{e.name}</h3>
                        <div className="price">₹{e.price}</div>
                        <button className="btn" onClick={() => addToCart(e)}>Add To Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Women's Collection */}
            {womenPerfumes.length > 0 && (
              <div className="category-section" style={{ marginBottom: "60px" }}>
                <h2 style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "10px", marginBottom: "30px" }}>Women's Collection</h2>
                <div className="product-grid">
                  {womenPerfumes.map((e) => (
                    <div key={e.id} className="card">
                      <img src={e.image} alt={e.name} />
                      <div className="card-content">
                        <h3>{e.name}</h3>
                        <div className="price">₹{e.price}</div>
                        <button className="btn" onClick={() => addToCart(e)}>Add To Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Luxury Collection */}
            {luxuryPerfumes.length > 0 && (
              <div className="category-section" style={{ marginBottom: "60px" }}>
                <h2 style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "10px", marginBottom: "30px" }}>Luxury Collection</h2>
                <div className="product-grid">
                  {luxuryPerfumes.map((e) => (
                    <div key={e.id} className="card">
                      <img src={e.image} alt={e.name} />
                      <div className="card-content">
                        <h3>{e.name}</h3>
                        <div className="price">₹{e.price}</div>
                        <button className="btn" onClick={() => addToCart(e)}>Add To Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unisex Collection */}
            {unisexPerfumes.length > 0 && (
              <div className="category-section" style={{ marginBottom: "60px" }}>
                <h2 style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "10px", marginBottom: "30px" }}>Unisex Collection</h2>
                <div className="product-grid">
                  {unisexPerfumes.map((e) => (
                    <div key={e.id} className="card">
                      <img src={e.image} alt={e.name} />
                      <div className="card-content">
                        <h3>{e.name}</h3>
                        <div className="price">₹{e.price}</div>
                        <button className="btn" onClick={() => addToCart(e)}>Add To Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}