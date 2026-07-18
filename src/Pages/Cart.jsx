import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (index) => {
    let updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="cart-page">
      <h1 className="cart-title">My Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-card">
          <i className="fa-solid fa-cart-shopping"></i>
          <h2>Your Cart is Empty</h2>
          <p>Explore our premium fragrance collection and find your perfect scent.</p>
          <button onClick={() => navigate("/shop")} className="empty-cart-btn">
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="cart-container">
          {/* Left Column: Cart Items List */}
          <div className="cart-grid">
            {cart.map((item, index) => (
              <div className="cart-card" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="cart-info-col">
                  <span className="brand">Luxe Scent House</span>
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price.toLocaleString("en-IN")}</p>
                </div>
                <button 
                  className="cart-remove-btn" 
                  onClick={() => removeItem(index)}
                  title="Remove Item"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Right Column: Checkout Summary Card */}
          <div className="cart-summary-sidebar">
            <div className="cart-summary-card">
              <h2>Order Summary</h2>
              
              <div className="cart-summary-row">
                <span>Items Count</span>
                <span>{cart.length}</span>
              </div>
              
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span style={{ color: "var(--accent-gold)", fontWeight: "600" }}>FREE</span>
              </div>
              
              <div className="cart-summary-row">
                <span>Estimated Tax</span>
                <span>Calculated at checkout</span>
              </div>

              <hr style={{ borderColor: "var(--border-color)", margin: "20px 0" }} />

              <div className="cart-summary-total">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <button 
                className="cart-checkout-btn" 
                onClick={() => navigate("/checkout")}>
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}