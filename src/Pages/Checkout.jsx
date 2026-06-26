import React, { useState } from "react";


export default function Checkout() {

const [payment,setPayment]=
useState("UPI");

return(

<div className="checkout-page">

<div className="checkout-left">

<h1>
Checkout
</h1>

<div className="checkout-card">

<h3>
Shipping Address
</h3>

<input
type="text"
placeholder="Full Name"
/>

<input
type="tel"
placeholder="Phone Number"
/>

<input
type="text"
placeholder="City"
/>

<textarea
placeholder="Full Address"
/>

</div>


<div className="checkout-card">

<h3>
Payment Method
</h3>

<label>

<input
type="radio"
checked={
payment==="UPI"
}
onChange={()=>
setPayment("UPI")
}
/>

UPI

</label>

<label>

<input
type="radio"
checked={
payment==="CARD"
}
onChange={()=>
setPayment("CARD")
}
/>

Card

</label>

<label>

<input
type="radio"
checked={
payment==="COD"
}
onChange={()=>
setPayment("COD")
}
/>

Cash On Delivery

</label>

</div>

</div>


<div className="checkout-right">

<div className="summary-card">

<h2>
Order Summary
</h2>

<div className="summary-row">

<span>
Premium Perfume
</span>

<span>
₹2499
</span>

</div>

<div className="summary-row">

<span>
Shipping
</span>

<span>
FREE
</span>

</div>

<hr/>

<div className="summary-total">

₹2499

</div>

<button>

Place Order

</button>

</div>

</div>

</div>

);

}