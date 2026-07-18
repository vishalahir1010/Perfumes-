import React, { useEffect, useState, useMemo, useRef } from "react";
import { data } from "../assets/Perfumes.js";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Shop.css";
import { 
  IoSearchOutline, 
  IoCloseOutline, 
  IoChevronDownOutline, 
  IoSparklesOutline, 
  IoPricetagOutline, 
  IoListOutline 
} from "react-icons/io5";
import { showToast } from "../utils/toast.js";

export default function Shop() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { search } = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all"); // 'all' | 'name' | 'brand' | 'description'
  const [sortBy, setSortBy] = useState("default"); // 'default' | 'price-asc' | 'price-desc' | 'rating-desc'
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  const categoryParam = queryParams.get("category");
  const searchParam = queryParams.get("search");

  // Sync search input value with search parameter in the URL
  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }
  }, [searchParam]);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      let filtered = data;
      if (categoryParam) {
        filtered = data.filter(item => item.category && item.category.toLowerCase() === categoryParam.toLowerCase());
      }
      if (searchParam) {
        filtered = filtered.filter(item => {
          const query = searchParam.toLowerCase().trim();
          const nameMatch = item.name && item.name.toLowerCase().includes(query);
          const brandMatch = item.brand && item.brand.toLowerCase().includes(query);
          const descMatch = item.description && item.description.toLowerCase().includes(query);
          
          if (searchField === "name") return nameMatch;
          if (searchField === "brand") return brandMatch;
          if (searchField === "description") return descMatch;
          return nameMatch || brandMatch || descMatch;
        });
      }

      // Apply sorting
      if (sortBy === "price-asc") {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating-desc") {
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
      }

      setProduct(filtered);
      setLoading(false);
    }, 500);
  }, [search, searchField, sortBy]);

  // Suggestions computation based on searchQuery
  const suggestions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
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
  }, [searchQuery]);

  const hasSuggestions = suggestions.products.length > 0 || suggestions.brands.length > 0 || suggestions.categories.length > 0;

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    const params = new URLSearchParams(search);
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    navigate(`/shop?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    const params = new URLSearchParams(search);
    params.delete("search");
    navigate(`/shop?${params.toString()}`);
  };

  const handleSelectProduct = (productName) => {
    setSearchQuery(productName);
    setShowSuggestions(false);
    const params = new URLSearchParams(search);
    params.set("search", productName);
    navigate(`/shop?${params.toString()}`);
  };

  const handleSelectBrand = (brandName) => {
    setSearchQuery(brandName);
    setShowSuggestions(false);
    const params = new URLSearchParams(search);
    params.set("search", brandName);
    navigate(`/shop?${params.toString()}`);
  };

  const handleSelectCategory = (categoryName) => {
    setSearchQuery("");
    setShowSuggestions(false);
    navigate(`/shop?category=${categoryName.toLowerCase()}`);
  };

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: Date.now() + Math.random(),
      name: item.name,
      price: item.price,
      image: item.image
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(item.name + " Added To Cart");
    navigate("/cart");
  };

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
        {/* Search Bar Container */}
        <div className="search-bar-section">
          <div className="search-container-shop" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="search-form-shop">
              <div className="search-input-wrapper-shop">
                <IoSearchOutline className="search-icon-shop" />
                <input
                  type="text"
                  placeholder="Search by perfume, brand, or category..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="search-input-shop"
                />
                {searchQuery && (
                  <button type="button" className="clear-btn-shop" onClick={handleClearSearch} aria-label="Clear search">
                    <IoCloseOutline />
                  </button>
                )}
              </div>
              
              {showSuggestions && hasSuggestions && (
                <div className="suggestions-dropdown-shop">
                  {suggestions.products.length > 0 && (
                    <div className="suggestions-group-shop">
                      <div className="suggestions-group-title-shop">
                        <IoSparklesOutline /> Products
                      </div>
                      {suggestions.products.map(item => (
                        <div 
                          key={item.id} 
                          className="suggestion-item-shop product-item-shop"
                          onClick={() => handleSelectProduct(item.name)}
                        >
                          <img src={item.image} alt={item.name} className="suggestion-img-shop" />
                          <div className="suggestion-info-shop">
                            <span className="suggestion-name-shop">{item.name}</span>
                            <span className="suggestion-brand-shop">{item.brand}</span>
                          </div>
                          <span className="suggestion-price-shop">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {suggestions.brands.length > 0 && (
                    <div className="suggestions-group-shop">
                      <div className="suggestions-group-title-shop">
                        <IoPricetagOutline /> Brands
                      </div>
                      {suggestions.brands.map(brand => (
                        <div 
                          key={brand} 
                          className="suggestion-item-shop text-item-shop"
                          onClick={() => handleSelectBrand(brand)}
                        >
                          <span>{brand}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {suggestions.categories.length > 0 && (
                    <div className="suggestions-group-shop">
                      <div className="suggestions-group-title-shop">
                        <IoListOutline /> Categories
                      </div>
                      {suggestions.categories.map(cat => (
                        <div 
                          key={cat} 
                          className="suggestion-item-shop text-item-shop"
                          onClick={() => handleSelectCategory(cat)}
                        >
                          <span>{cat} Perfumes</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Options Row */}
          <div className="search-options-row">
            <div className="option-select-container">
              <label htmlFor="search-field-select">Search In</label>
              <div className="select-custom-wrapper">
                <select
                  id="search-field-select"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  className="premium-select-shop"
                >
                  <option value="all">All Fields</option>
                  <option value="name">Product Name</option>
                  <option value="brand">Brand</option>
                  <option value="description">Description</option>
                </select>
                <IoChevronDownOutline className="select-arrow-icon" />
              </div>
            </div>

            <div className="option-select-container">
              <label htmlFor="sort-by-select">Sort By</label>
              <div className="select-custom-wrapper">
                <select
                  id="sort-by-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="premium-select-shop"
                >
                  <option value="default">Default Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating: High to Low</option>
                </select>
                <IoChevronDownOutline className="select-arrow-icon" />
              </div>
            </div>
          </div>
        </div>

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
                    <img src={e.image} alt={e.name} loading="lazy" />
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
                      <img src={e.image} alt={e.name} loading="lazy" />
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
                      <img src={e.image} alt={e.name} loading="lazy" />
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
                      <img src={e.image} alt={e.name} loading="lazy" />
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
                      <img src={e.image} alt={e.name} loading="lazy" />
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