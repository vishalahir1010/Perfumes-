import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

export default function Checkout() {
  const [payment, setPayment] = useState("UPI");
  const [cart, setCart] = useState([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  
  // Promo code states
  const [promoInput, setPromoInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);

    // Pre-fill shipping info from currentUser profile if logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setFullName(currentUser.name || "");
      setPhone(currentUser.phone || "");
      setCity(currentUser.city || "");
      setAddress(currentUser.address || "");
    }
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const discountAmount = Math.round(subtotal * discount);
  const finalTotal = subtotal - discountAmount;

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoInput.toUpperCase() === "LUXE20") {
      setDiscount(0.20);
      setAppliedPromo("LUXE20");
      alert("Success! 20% discount has been applied to your order.");
    } else {
      alert("Invalid promo code. Try 'LUXE20' for a special discount.");
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add perfumes to checkout.");
      return;
    }
    if (!fullName || !phone || !city || !address) {
      alert("Please fill in all shipping details.");
      return;
    }

    // Save order
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const email = currentUser ? currentUser.email : "guest@luxescent.com";
    
    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: finalTotal,
      discount: discountAmount,
      payment: payment,
      shipping: { fullName, phone, city, address },
      email: email
    };

    let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    allOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(allOrders));

    alert("Order Placed Successfully! Thank you for choosing LUXE SCENT.");
    localStorage.removeItem("cart");
    navigate("/profile");
    window.location.reload();
  };

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h1>Secure Checkout</h1>
        
        <div className="checkout-card">
          <h3><i className="fa-solid fa-truck" style={{ color: "var(--accent-gold)", marginRight: "10px" }}></i> Shipping Address</h3>
          <div className="shipping-fields">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="checkout-card">
          <h3><i className="fa-solid fa-credit-card" style={{ color: "var(--accent-gold)", marginRight: "10px" }}></i> Payment Method</h3>
          <div className="payment-options">
            <div 
              className={`payment-option-card ${payment === "UPI" ? "active" : ""}`}
              onClick={() => setPayment("UPI")}
            >
              <i className="fa-solid fa-mobile-screen-button"></i>
              <div className="payment-option-info">
                <span>UPI Payments</span>
                <small>Pay instantly via Google Pay, PhonePe or Paytm</small>
              </div>
            </div>
            
            <div 
              className={`payment-option-card ${payment === "CARD" ? "active" : ""}`}
              onClick={() => setPayment("CARD")}
            >
              <i className="fa-solid fa-credit-card"></i>
              <div className="payment-option-info">
                <span>Credit / Debit Card</span>
                <small>Secure payments with Visa, Mastercard or RuPay</small>
              </div>
            </div>
            
            <div 
              className={`payment-option-card ${payment === "COD" ? "active" : ""}`}
              onClick={() => setPayment("COD")}
            >
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <div className="payment-option-info">
                <span>Cash On Delivery (COD)</span>
                <small>Pay by cash or card upon package arrival</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-right">
        <div className="summary-card">
          <h2>Order Summary</h2>
          
          <div className="checkout-items-list">
            {cart.map((item, index) => (
              <div className="checkout-item-row" key={index}>
                <img src={item.image} alt={item.name} className="checkout-item-thumb" />
                <div className="checkout-item-info">
                  <span className="checkout-item-name">{item.name}</span>
                  <span className="checkout-item-price">₹{item.price.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <p style={{ color: "var(--text-secondary)", marginBottom: "20px", textAlign: "center" }}>
                Your cart is empty.
              </p>
            )}
          </div>

          <form onSubmit={applyPromo} className="promo-box">
            <input 
              type="text" 
              placeholder="Promo Code (LUXE20)" 
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              disabled={!!appliedPromo}
            />
            <button type="submit" disabled={!!appliedPromo}>
              {appliedPromo ? "Applied" : "Apply"}
            </button>
          </form>

          <div className="summary-pricing">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {discountAmount > 0 && (
              <div className="summary-row" style={{ color: "#2e7d32" }}>
                <span>Discount (20%)</span>
                <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: "var(--accent-gold)", fontWeight: "600" }}>FREE</span>
            </div>
            <hr style={{ borderColor: "var(--border-color)", margin: "15px 0" }} />
            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{finalTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Complete Secure Order
          </button>
          
          <div className="secure-badge">
            <i className="fa-solid fa-lock"></i>
            <span>SSL Secured & 256-bit Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}