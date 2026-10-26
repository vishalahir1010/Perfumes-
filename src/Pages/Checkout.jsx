import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";
import { showToast } from "../utils/toast.js";

const createOrderId = () => `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

export default function Checkout() {
  const [payment, setPayment] = useState("UPI");
  const [currentUser] = useState(() => JSON.parse(localStorage.getItem("currentUser")));
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [city, setCity] = useState(currentUser?.city || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [placedOrder, setPlacedOrder] = useState(null);
  
  // Promo code states
  const [promoInput, setPromoInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState("");

  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const discountAmount = Math.round(subtotal * discount);
  const finalTotal = subtotal - discountAmount;

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoInput.toUpperCase() === "LUXE20") {
      setDiscount(0.20);
      setAppliedPromo("LUXE20");
      showToast("Success! 20% discount has been applied to your order.", "success");
    } else {
      showToast("Invalid promo code. Try 'LUXE20' for a special discount.", "error");
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty. Please add perfumes to checkout.", "error");
      return;
    }
    if (![fullName, phone, city, address].every((value) => value.trim())) {
      showToast("Please fill in all shipping details.", "error");
      return;
    }

    // Save order
    const email = currentUser?.email || null;
    
    const newOrder = {
      id: createOrderId(),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: finalTotal,
      discount: discountAmount,
      payment: payment,
      shipping: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        address: address.trim()
      },
      email: email
    };

    let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    allOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(allOrders));

    showToast("Order placed successfully! Thank you for choosing LUXE SCENT.", "success");
    localStorage.removeItem("cart");
    setCart([]);
    setPlacedOrder(newOrder);
  };

  return (
    <div className="checkout-page">
      {placedOrder ? (
        <section className="order-confirmation" aria-live="polite">
          <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
          <h1>Thank you for your order</h1>
          <p>Your order has been recorded successfully.</p>
          <dl className="order-confirmation-details">
            <div>
              <dt>Order number</dt>
              <dd>{placedOrder.id}</dd>
            </div>
            <div>
              <dt>Order total</dt>
              <dd>₹{placedOrder.total.toLocaleString("en-IN")}</dd>
            </div>
          </dl>
          <p className="order-confirmation-note">
            {placedOrder.email
              ? "You can find this order in your account's order history."
              : "Keep your order number for your records. Order details are saved in this browser."}
          </p>
          <button
            className="place-order-btn"
            onClick={() => navigate(placedOrder.email ? "/orders" : "/shop")}
          >
            {placedOrder.email ? "View Order History" : "Continue Shopping"}
          </button>
        </section>
      ) : (
        <>
      <div className="checkout-left">
        <h1>Checkout</h1>
        
        <div className="checkout-card">
          <h3><i className="fa-solid fa-truck" style={{ color: "var(--accent-gold)", marginRight: "10px" }}></i> Shipping Address</h3>
          <div className="shipping-fields">
            <label htmlFor="checkout-full-name">Full Name</label>
            <input
              id="checkout-full-name"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label htmlFor="checkout-phone">Phone Number</label>
            <input
              id="checkout-phone"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="checkout-city">City</label>
            <input
              id="checkout-city"
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="checkout-address">Full Address</label>
            <textarea
              id="checkout-address"
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="checkout-card">
          <h3><i className="fa-solid fa-credit-card" style={{ color: "var(--accent-gold)", marginRight: "10px" }}></i> Payment Method</h3>
          <fieldset className="payment-options" aria-label="Payment method">
            <label
              htmlFor="payment-upi"
              className={`payment-option-card ${payment === "UPI" ? "active" : ""}`}
            >
              <input
                id="payment-upi"
                className="payment-option-radio"
                type="radio"
                name="payment"
                value="UPI"
                checked={payment === "UPI"}
                onChange={() => setPayment("UPI")}
              />
              <i className="fa-solid fa-mobile-screen-button"></i>
              <div className="payment-option-info">
                <span>UPI Payments</span>
                <small>Selected for this demo order; no payment is processed.</small>
              </div>
            </label>
            
            <label
              htmlFor="payment-card"
              className={`payment-option-card ${payment === "CARD" ? "active" : ""}`}
            >
              <input
                id="payment-card"
                className="payment-option-radio"
                type="radio"
                name="payment"
                value="CARD"
                checked={payment === "CARD"}
                onChange={() => setPayment("CARD")}
              />
              <i className="fa-solid fa-credit-card"></i>
              <div className="payment-option-info">
                <span>Credit / Debit Card</span>
                <small>Selected for this demo order; no payment is processed.</small>
              </div>
            </label>
            
            <label
              htmlFor="payment-cod"
              className={`payment-option-card ${payment === "COD" ? "active" : ""}`}
            >
              <input
                id="payment-cod"
                className="payment-option-radio"
                type="radio"
                name="payment"
                value="COD"
                checked={payment === "COD"}
                onChange={() => setPayment("COD")}
              />
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <div className="payment-option-info">
                <span>Cash On Delivery (COD)</span>
                <small>Selected for this demo order; no payment is processed.</small>
              </div>
            </label>
          </fieldset>
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
            Place Demo Order
          </button>
          
          <div className="checkout-disclaimer">
            <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
            <span>Demo checkout: no payment is processed.</span>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}