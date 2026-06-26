import React, { useEffect, useState } from "react";
import "../assets/Style.css";
import { NavLink } from "react-router-dom";

export default function Cart() {

const [cart,setCart]=useState([]);

useEffect(()=>{

const data=
JSON.parse(
localStorage.getItem("cart")
)||[];

setCart(data);

},[]);


// REMOVE PRODUCT

const removeItem=(index)=>{

let updated=[...cart];

updated.splice(index,1);

setCart(updated);

localStorage.setItem(
"cart",
JSON.stringify(updated)
);

};


// TOTAL

const total=
cart.reduce(
(sum,item)=>
sum+Number(item.price),
0
);


return(

<div className="cart-page">

<h1 className="cart-title">

My Cart

</h1>

{

cart.length===0 ?

(

<div className="empty">

🛒 Your Cart Is Empty

</div>

)

:

(

<>

<div className="cart-grid">

{

cart.map((item,index)=>(

<div
className="cart-card"
key={index}
>

<img
src={item.image}
alt={item.name}
/>

<div className="cart-content">

<h3>

{item.name}

</h3>

<p>

₹{item.price}

</p>

<button

className="remove-btn"

onClick={()=>
removeItem(index)
}

>

Remove

</button>

</div>

</div>

))

}

</div>


<div className="total-box">

<div className="total">

Total : ₹{total}

</div>

<button
className="checkout"
>

<NavLink to="/Checkout">Checkout</NavLink>

</button>

</div>

</>

)

}

</div>

);

}