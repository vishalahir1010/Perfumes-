import React from 'react'
import "../assets/style.css"
import "../assets/script.js"
import { NavLink } from 'react-router-dom'


const Index = () => {
 
   

  return (
   <>
   



<section className="h-hero">

<div className="overlay"></div>

<div className="h-hero-content">

<h4>Luxury Collection 2026</h4>

<h1>Discover The Art Of Fragrance</h1>

<p>
Premium perfumes crafted for elegance,
confidence and unforgettable moments.
</p>

<button className='btn'>
  <NavLink to="/Shop" style={{textDecoration:"none", color:"black"}}>Shop now
  </NavLink>
</button>

</div>

</section>


<section className="categories">

<h2>Shop By Category</h2>

<div className="cat-grid">

<a href="shop.html?category=men" className="cat-card">
Men Perfume
</a>

<a href="shop.html?category=women" className="cat-card">
Women Perfume
</a>

<a href="shop.html?category=luxury" className="cat-card">
Luxury Perfume
</a>

<a href="shop.html?category=gift" className="cat-card">
Gift Sets
</a>

</div>

</section>



<section className="featured">

<h2>Featured Products</h2>

<div className="product-grid">

<div className="card">

<img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"/>

<h3>Luxury Gold</h3>

<p>₹2,999</p>

<button onclick="addToCart('Luxury Gold',2999)">
Add To Cart
</button>

</div>

<div className="card">

<img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800"/>

<h3>Royal Oud</h3>

<p>₹3,499</p>

<button onclick="addToCart('Royal Oud',3499)">
Add To Cart
</button>

</div>

<div className="card">

<img src="https://www.en-vols.com/wp-content/uploads/afmm/2022/10/dior-sauvage.webp"/>

<h3>Night Essence</h3>

<p>₹2,799</p>

<button onclick="addToCart('Night Essence',2799)">
Add To Cart
</button>

</div>

</div>

</section>



<section className="offer">

<h2>Get 20% OFF</h2>

<p>On Your First Order</p>

<button className='btn'>
  <NavLink to="/Shop" style={{textDecoration:"none", color:"black"}}>Shop now
  </NavLink>
</button>

</section>



<section className="reviews">

<h2>Customer Reviews</h2>

<div className="review-card">

⭐⭐⭐⭐⭐

<p>
Amazing fragrance and long lasting quality.
Highly recommended.
</p>

<h4>- Rahul Sharma</h4>

</div>

</section>



   </>
  )
}

export default Index
