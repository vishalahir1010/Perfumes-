import React from 'react'

export default function Bestsellers() {
  return (
    <div>
      
<section className="hero">

<div className="overlay"></div>

<div className="hero-content">
<h1>Best Sellers</h1>
<p>Our Most Loved Fragrances</p>
</div>

</section>

<section className="products">

<h2>Top Selling Perfumes</h2>

<div className="product-grid">

<div className="card">
<img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800"/>
<div className="card-content">
<span className="badge">BEST SELLER</span>
<h3>Royal Oud</h3>
<div className="rating">★★★★★</div>
<p className="price">₹3,499</p>
<a href="product.html" className="btn">View Product</a>
</div>
</div>

<div className="card">
<img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"/>
<div className="card-content">
<span className="badge">BEST SELLER</span>
<h3>Black Gold</h3>
<div className="rating">★★★★★</div>
<p className="price">₹2,999</p>
<a href="product.html" className="btn">View Product</a>
</div>
</div>

<div className="card">
<img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800"/>
<div className="card-content">
<span className="badge">BEST SELLER</span>
<h3>Amber Night</h3>
<div className="rating">★★★★★</div>
<p className="price">₹3,799</p>
<a href="product.html" className="btn">View Product</a>
</div>
</div>

<div className="card">
<img src="https://cdn.shopify.com/s/files/1/1163/9680/products/personalisedluxuryperfumebottle.jpg?v=1675661106"/>
<div className="card-content">
<span className="badge">BEST SELLER</span>
<h3>Ocean Fresh</h3>
<div className="rating">★★★★★</div>
<p className="price">₹2,699</p>
<a href="product.html" className="btn">View Product</a>
</div>
</div>

</div>

</section>
    </div>
  )
}
