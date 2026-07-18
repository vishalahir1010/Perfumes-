import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Profile.css";
import { showToast } from "../utils/toast.js";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      showToast("Please login to view your profile.", "error");
      navigate("/login");
      return;
    }
    setCurrentUser(user);

    // Load orders
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    // Filter orders for the logged-in user by email
    const userOrders = allOrders.filter(order => order.email === user.email);
    setOrders(userOrders);

    // Mock initial user metadata
    setPhone(user.phone || "9876543210");
    setAddress(user.address || "123, Luxury Residency");
    setCity(user.city || "Mumbai");
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === "/orders") {
      setTimeout(() => {
        const element = document.getElementById("orders-section-id");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, [location, currentUser]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      phone: phone,
      address: address,
      city: city
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    // Sync changes with global users list in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
      users[index] = {
        ...users[index],
        phone: phone,
        address: address,
        city: city
      };
      localStorage.setItem("users", JSON.stringify(users));
    }

    showToast("Profile Updated Successfully!", "success");
  };

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="profile-page-wrapper">
      <section className="about-hero profile-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>My Profile</h1>
          <p>Welcome back, {currentUser.name}</p>
        </div>
      </section>

      <div className="profile-container">
        
        {/* Left Side: Profile Details Form */}
        <div className="profile-sidebar">
          <div className="profile-sidebar-card">
            <h2>Account Details</h2>
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="profile-form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={currentUser.name} 
                  disabled 
                  className="profile-input disabled"
                />
              </div>

              <div className="profile-form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={currentUser.email} 
                  disabled 
                  className="profile-input disabled"
                />
              </div>

              <div className="profile-form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  className="profile-input"
                />
              </div>

              <div className="profile-form-group">
                <label>City</label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  required 
                  className="profile-input"
                />
              </div>

              <div className="profile-form-group">
                <label>Delivery Address</label>
                <textarea 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  required 
                  rows="3"
                  className="profile-textarea"
                />
              </div>

              <button type="submit" className="profile-submit-btn">
                Update Profile
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Order History */}
        <div id="orders-section-id" className="profile-orders">
          <h2>Order History</h2>
          
          {orders.length === 0 ? (
            <div className="empty-orders-card">
              <i className="fa-solid fa-box-open"></i>
              <p>You have not placed any orders yet.</p>
              <button onClick={() => navigate("/shop")} className="empty-orders-btn">
                Shop Our Fragrances
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item-card">
                  
                  {/* Order Card Header */}
                  <div className="order-header">
                    <div>
                      <span className="order-meta-label">Order Date</span>
                      <span className="order-meta-value">{order.date}</span>
                    </div>
                    <div>
                      <span className="order-meta-label">Order ID</span>
                      <span className="order-meta-value">{order.id}</span>
                    </div>
                    <div>
                      <span className="order-meta-label">Payment Mode</span>
                      <span className="order-meta-value">{order.payment}</span>
                    </div>
                    <div>
                      <span className="order-meta-label">Total Paid</span>
                      <span className="order-meta-value total-paid">₹{order.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Order Card Body: Items List */}
                  <div className="order-body">
                    <div className="order-products-list">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-product-row">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="order-product-thumb"
                          />
                          <div className="order-product-info">
                            <h4>{item.name}</h4>
                            <span className="order-product-price">₹{item.price.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-shipping-details">
                      <div>
                        <span className="order-meta-label">Ship To</span>
                        <span className="shipping-recipient">{order.shipping.fullName}</span>
                        <span className="shipping-recipient-phone">{order.shipping.phone}</span>
                      </div>
                      <div>
                        <span className="order-meta-label">Shipping Address</span>
                        <span className="shipping-address-text">{order.shipping.address}, {order.shipping.city}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
