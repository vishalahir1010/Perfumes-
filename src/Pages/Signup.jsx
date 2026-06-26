import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signup() {

const navigate = useNavigate();

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

const registerUser=()=>{

if(
!name ||
!email ||
!password ||
!confirmPassword
){
alert("Fill all fields");
return;
}

if(password!==confirmPassword){
alert("Password not match");
return;
}

let users=
JSON.parse(
localStorage.getItem("users")
)||[];

let exist=
users.find(
u=>u.email===email
);

if(exist){
alert("Account already exists");
return;
}

users.push({
name,
email,
password
});

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Account Created");

navigate("/login");

};

return(

<div id="vs">

<div className="sign-overlay"></div>

<div className="sign-register-container">

<div className="sign-logo">
LUXE SCENT
</div>

<p className="sign-subtitle">
Create Your Account
</p>

<div className="sign-input-box">
<i className="fa-solid fa-user"></i>

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>
setName(e.target.value)}
/>
</div>

<div className="sign-input-box">
<i className="fa-solid fa-envelope"></i>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(e.target.value)}
/>
</div>

<div className="sign-input-box">
<i className="fa-solid fa-lock"></i>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(e.target.value)}
/>
</div>

<div className="sign-input-box">
<i className="fa-solid fa-shield-halved"></i>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>
setConfirmPassword(e.target.value)}
/>
</div>

<button
className="register-btn"
onClick={registerUser}
>
Create Account
</button>

<div className="login-link">

Already have account?

<NavLink to="/login">
Login
</NavLink>

</div>

</div>

</div>

);

}