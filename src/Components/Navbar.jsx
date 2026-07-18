import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { ThemContext } from '../Pages/ThemContext';
import "../App.css"
import { 
  IoSunny, 
  IoMoon, 
  IoSparklesOutline, 
  IoPricetagOutline, 
  IoListOutline 
} from "react-icons/io5";
import { data } from "../assets/Perfumes.js";


export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemContext);
    const navigate = useNavigate();

    // Lazy initialization of currentUser state
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("currentUser"));
        } catch (e) {
            return null;
        }
    });

    // Memoize userName to prevent recalculation on every render
    const userName = useMemo(() => {
        if (!currentUser) return "";
        return currentUser.name ? currentUser.name.split(" ")[0] : currentUser.email.split("@")[0];
    }, [currentUser]);

    const [search, setSearch] = useState("");
    const [isNavActive, setIsNavActive] = useState(false);
    
    const [showDesktopSuggestions, setShowDesktopSuggestions] = useState(false);
    const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
    const desktopSearchRef = useRef(null);
    const mobileSearchRef = useRef(null);

    // Close suggestions dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)) {
                setShowDesktopSuggestions(false);
            }
            if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
                setShowMobileSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Autocomplete suggestions based on search state
    const suggestions = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return { products: [], brands: [], categories: [] };

        const products = data.filter(item => 
            item.name && item.name.toLowerCase().includes(query)
        ).slice(0, 5);

        const brands = [...new Set(data
            .filter(item => item.brand && item.brand.toLowerCase().includes(query))
            .map(item => item.brand)
        )].slice(0, 3);

        const categories = ["Men", "Women", "Luxury", "Unisex"].filter(cat => 
            cat.toLowerCase().includes(query)
        );

        return { products, brands, categories };
    }, [search]);

    const hasSuggestions = suggestions.products.length > 0 || suggestions.brands.length > 0 || suggestions.categories.length > 0;

    const handleSelectProduct = (productName) => {
        setSearch(productName);
        setShowDesktopSuggestions(false);
        setShowMobileSuggestions(false);
        navigate(`/shop?search=${encodeURIComponent(productName)}`);
    };

    const handleSelectBrand = (brandName) => {
        setSearch(brandName);
        setShowDesktopSuggestions(false);
        setShowMobileSuggestions(false);
        navigate(`/shop?search=${encodeURIComponent(brandName)}`);
    };

    const handleSelectCategory = (categoryName) => {
        setSearch("");
        setShowDesktopSuggestions(false);
        setShowMobileSuggestions(false);
        navigate(`/shop?category=${categoryName.toLowerCase()}`);
    };

    // Lazy initialization of cart count state
    const [cartCount, setCartCount] = useState(() => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart"));
            return cart ? cart.length : 0;
        } catch (e) {
            return 0;
        }
    });

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
                <li className="mobile-search" ref={mobileSearchRef}>
                    <form onSubmit={(e) => { e.preventDefault(); triggerSearch(search); }}>
                        <input 
                            type="text" 
                            placeholder="Search Perfume..." 
                            value={search} 
                            onChange={(e) => {
                                setSearch(e.target.value);
                                if (e.target.value.trim()) setShowMobileSuggestions(true);
                                else setShowMobileSuggestions(false);
                            }}
                            onFocus={() => {
                                if (search.trim()) setShowMobileSuggestions(true);
                            }}
                        />
                    </form>
                    {showMobileSuggestions && hasSuggestions && (
                        <div className="suggestions-dropdown-navbar mobile-dropdown">
                            {suggestions.products.length > 0 && (
                                <div className="suggestions-group-navbar">
                                    <div className="suggestions-group-title-navbar">
                                        <IoSparklesOutline /> Products
                                    </div>
                                    {suggestions.products.map(item => (
                                        <div 
                                            key={item.id} 
                                            className="suggestion-item-navbar product-item-navbar"
                                            onClick={() => handleSelectProduct(item.name)}
                                        >
                                            <img src={item.image} alt={item.name} className="suggestion-img-navbar" />
                                            <div className="suggestion-info-navbar">
                                                <span className="suggestion-name-navbar">{item.name}</span>
                                                <span className="suggestion-brand-navbar">{item.brand}</span>
                                            </div>
                                            <span className="suggestion-price-navbar">₹{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {suggestions.brands.length > 0 && (
                                <div className="suggestions-group-navbar">
                                    <div className="suggestions-group-title-navbar">
                                        <IoPricetagOutline /> Brands
                                    </div>
                                    {suggestions.brands.map(brand => (
                                        <div 
                                            key={brand} 
                                            className="suggestion-item-navbar text-item-navbar"
                                            onClick={() => handleSelectBrand(brand)}
                                        >
                                            <span>{brand}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {suggestions.categories.length > 0 && (
                                <div className="suggestions-group-navbar">
                                    <div className="suggestions-group-title-navbar">
                                        <IoListOutline /> Categories
                                    </div>
                                    {suggestions.categories.map(cat => (
                                        <div 
                                            key={cat} 
                                            className="suggestion-item-navbar text-item-navbar"
                                            onClick={() => handleSelectCategory(cat)}
                                        >
                                            <span>{cat} Perfumes</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
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
                <div className="search-container desktop-only" ref={desktopSearchRef}>
                    <form onSubmit={(e) => { e.preventDefault(); triggerSearch(search); }}>
                        <input 
                            type="text" 
                            placeholder="Search Perfume..." 
                            value={search} 
                            onChange={(e) => {
                                setSearch(e.target.value);
                                if (e.target.value.trim()) setShowDesktopSuggestions(true);
                                else setShowDesktopSuggestions(false);
                            }}
                            onFocus={() => {
                                if (search.trim()) setShowDesktopSuggestions(true);
                            }}
                        />
                    </form>
                    {showDesktopSuggestions && hasSuggestions && (
                        <div className="suggestions-dropdown-navbar">
                            {suggestions.products.length > 0 && (
                                <div className="suggestions-group-navbar">
                                    <div className="suggestions-group-title-navbar">
                                        <IoSparklesOutline /> Products
                                    </div>
                                    {suggestions.products.map(item => (
                                        <div 
                                            key={item.id} 
                                            className="suggestion-item-navbar product-item-navbar"
                                            onClick={() => handleSelectProduct(item.name)}
                                        >
                                            <img src={item.image} alt={item.name} className="suggestion-img-navbar" />
                                            <div className="suggestion-info-navbar">
                                                <span className="suggestion-name-navbar">{item.name}</span>
                                                <span className="suggestion-brand-navbar">{item.brand}</span>
                                            </div>
                                            <span className="suggestion-price-navbar">₹{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {suggestions.brands.length > 0 && (
                                <div className="suggestions-group-navbar">
                                    <div className="suggestions-group-title-navbar">
                                        <IoPricetagOutline /> Brands
                                    </div>
                                    {suggestions.brands.map(brand => (
                                        <div 
                                            key={brand} 
                                            className="suggestion-item-navbar text-item-navbar"
                                            onClick={() => handleSelectBrand(brand)}
                                        >
                                            <span>{brand}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {suggestions.categories.length > 0 && (
                                <div className="suggestions-group-navbar">
                                    <div className="suggestions-group-title-navbar">
                                        <IoListOutline /> Categories
                                    </div>
                                    {suggestions.categories.map(cat => (
                                        <div 
                                            key={cat} 
                                            className="suggestion-item-navbar text-item-navbar"
                                            onClick={() => handleSelectCategory(cat)}
                                        >
                                            <span>{cat} Perfumes</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

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