import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useContext } from 'react'
import { ThemContext } from '../Pages/ThemContext';
import "../App.css"
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";


export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemContext);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userName = currentUser ? (currentUser.name ? currentUser.name.split(" ")[0] : currentUser.email.split("@")[0]) : "";
    const [search, setSearch] = useState("");
    const [isNavActive, setIsNavActive] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const getCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(cart.length);
        };
        getCartCount();
        
        // Listen to storage/actions to keep it in sync
        window.addEventListener("storage", getCartCount);
        const interval = setInterval(getCartCount, 1000); // Polling fallback for fast client updates
        
        return () => {
            window.removeEventListener("storage", getCartCount);
            clearInterval(interval);
        };
    }, []);

    function logout(){
        localStorage.removeItem("currentUser");
        navigate("/");
        window.location.reload();
    }

    const closeMenu = () => setIsNavActive(false);

    const triggerSearch = (searchVal) => {
        navigate(`/shop?search=${searchVal}`);
        setIsNavActive(false);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                LUXE SCENT
            </div>

            <ul className={`nav-links ${isNavActive ? 'active' : ''}`}>
                <li className="mobile-search">
                    <form onSubmit={(e) => { e.preventDefault(); triggerSearch(search); }}>
                        <input 
                            type="text" 
                            placeholder="Search Perfume..." 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </li>
                <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                <li><NavLink to="/shop" onClick={closeMenu}>Shop</NavLink></li>
                <li><NavLink to="/collecation" onClick={closeMenu}>Collections</NavLink></li>
                <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
                <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
                
                {currentUser ? (
                    <li className="mobile-user">
                        <span className="mobile-username">Hello, {userName}</span>
                        <div className="mobile-user-links">
                            <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
                            <NavLink to="/orders" onClick={closeMenu}>Orders</NavLink>
                            <button onClick={logout} className="mobile-logout-btn">Logout</button>
                        </div>
                    </li>
                ) : (
                    <li className="mobile-user">
                        <NavLink to="/login" className="login-btn" onClick={closeMenu}>Login</NavLink>
                    </li>
                )}
            </ul>

            <div className="nav-right">
                <form onSubmit={(e) => { e.preventDefault(); triggerSearch(search); }} className="search-container desktop-only">
                    <input 
                        type="text" 
                        placeholder="Search Perfume..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>

                <button className="theme-toggle-btn" onClick={toggleTheme}>
                    {theme === "light" ? <IoMoon /> : <IoSunny />}
                </button>

                <NavLink to="/cart" onClick={closeMenu} className="cart-icon-container">
                    <i className="fa-solid fa-cart-shopping"></i>
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </NavLink>
                 
                <div className="desktop-only">
                    {currentUser ? (
                        <div className="user-dropdown">
                            <button className="login-btn" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                {userName} <i className="fa-solid fa-chevron-down" style={{ fontSize: "10px" }}></i>
                            </button>
                            <div className="user-menu">
                                <NavLink to="/profile" onClick={closeMenu}>
                                    Profile
                                </NavLink>
                                <NavLink to="/orders" onClick={closeMenu}>
                                    Orders
                                </NavLink>
                                <button className="logout" onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <NavLink to="/login" className="login-btn" onClick={closeMenu}>
                            Login
                        </NavLink>
                    )}
                </div>

                <button 
                    className={`hamburger ${isNavActive ? 'open' : ''}`} 
                    onClick={() => setIsNavActive(!isNavActive)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}