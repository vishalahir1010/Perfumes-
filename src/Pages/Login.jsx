import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Auth.css";


export default function Login() {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();

const handleLogin=()=>{

if(!email || !password){

alert("Please fill all fields");
return;
}
const users=JSON.parse(localStorage.getItem("users"))||[];

const user=users.find(u=>
u.email===email &&
u.password===password
);

if(!user){

alert(
"Account not found. Please Sign Up First"
);

navigate("/signup");

return;

}
localStorage.setItem("currentUser",JSON.stringify(user));

alert("Login Successful");

navigate("/");

window.location.reload();

};

return(

<div id="loginPage">

<div className="login-overlay"></div>

<div className="login-box">

<h1>LUXE SCENT</h1>

<p className="subtitle">
Luxury Fragrance Experience
</p>

<div className="input-box">

<i className="fa-solid fa-envelope"></i>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

</div>


<div className="input-box">

<i className="fa-solid fa-lock"></i>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

</div>

<button
onClick={handleLogin}
className="login-submit">

Login

</button>

<div className="signup">

Don't have account?

<NavLink to="/signup">
Create Account
</NavLink>

</div>

</div>

</div>

);

}