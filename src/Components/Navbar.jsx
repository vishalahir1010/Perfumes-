import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/style.css";
import { useContext } from 'react'
import { ThemContext } from '../Pages/ThemContext';
import "../App.css"
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";


export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemContext);

const navigate = useNavigate();

const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

const userName =
currentUser?.name?.split(" ")[0];

const [search,setSearch]=useState("");

function logout(){
localStorage.removeItem("currentUser");
navigate("/");
window.location.reload();
}

return (

<nav className="navbar">
 
<div className="logo" style={{color:"#e7b92b" }}>
LUXE SCENT
</div>

<ul className="nav-links">

<li><NavLink to="/">Home</NavLink></li>

<li><NavLink to="/shop">Shop</NavLink></li>

<li><NavLink to="/Collecation">Collections</NavLink></li>

<li><NavLink to="/newarrivals">New Arrivals</NavLink></li>

<li><NavLink to="/bestsellers">Best Sellers</NavLink></li>

<li><NavLink to="/about">About</NavLink></li>

<li><NavLink to="/contact">Contact</NavLink></li>

</ul>

<div className="nav-right">

<div className="search-container">

<input
type="text"
placeholder="Search Perfume..."
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
/>

</div>
<button style={{border:"none", backgroundColor:"#03152f", color:"white", borderRadius:"50%", fontSize:"25px", width:"50px", height:"50px"}} onClick={toggleTheme}>{theme === "light" ? <IoMoon /> : <IoSunny />} </button>


<NavLink to="/cart">
<i className="fa-solid fa-cart-shopping"></i>
</NavLink>

{
currentUser ? (

<div className="user-dropdown">

<button className="login-btn">
{userName}
</button>

<div className="user-menu">

<NavLink to="/profile">
Profile
</NavLink>

<NavLink to="/orders">
Orders
</NavLink>

<button
className="logout"
onClick={logout}
>
Logout
</button>

</div>

</div>

):(

<NavLink
to="/login"
className="login-btn"
>
Login
</NavLink>

)

}

</div>

</nav>

);
}