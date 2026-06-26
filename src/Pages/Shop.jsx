import React, { useEffect, useState } from "react";
import { data } from "../assets/Perfumes.js";
import { useNavigate } from "react-router-dom";

export default function Shop() {

const [product,setProduct]=useState([]);
const [loading,setLoading]=useState(true);

const navigate=useNavigate();

useEffect(()=>{

setTimeout(()=>{

setProduct(data);

setLoading(false);

},1000);

},[]);


// ADD TO CART

const addToCart=(item)=>{

let cart=
JSON.parse(
localStorage.getItem("cart")
)||[];

cart.push({
id:item.id,
name:item.name,
price:item.price,
image:item.image
});

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

alert(
item.name +
" Added To Cart"
);

navigate("/cart");

};


return(

<>

<section className="shop-banner">

<h1>
Shop Perfumes
</h1>

</section>


<section className="products">

<h2>
All Perfumes
</h2>

<div
className="product-grid"
>

{

loading ?

(

<h1>
Loading...
</h1>

)

:

(

product.map((e)=>(

<div
key={e.id}
className="s-card"
>

<img
src={e.image}
alt=""
/>

<div
className="s-card-content"
>

<h3>
{e.name}
</h3>

<div className="price">

₹{e.price}

</div>

<button
className="btn"

onClick={()=>
addToCart(e)
}

>

Add To Cart

</button>

</div>

</div>

))

)

}

</div>

</section>

</>

);

}