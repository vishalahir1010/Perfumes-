function addToWishlist(name, price, image){

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    let product = {
        name:name,
        price:price,
        image:image
    };

    let exists = wishlist.find(
        item => item.name === name
    );

    if(!exists){

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert("Added To Wishlist ❤️");

    }else{

        alert("Already In Wishlist");

    }

}
// =========================
// CURRENT USER
// =========================

let currentUser =
JSON.parse(localStorage.getItem("currentUser"));

// =========================
// ACCOUNT AREA
// =========================

document.addEventListener("DOMContentLoaded",()=>{

const accountArea =
document.getElementById("accountArea");

if(accountArea){

if(currentUser){

accountArea.innerHTML =

`
<div class="user-dropdown">

<a href="#" class="login-btn">
<i class="fa-regular fa-user"></i>
${currentUser.name}
<i class="fa-solid fa-angle-down"></i>
</a>

<div class="user-menu">

<a href="profile.html">
My Profile
</a>

<a href="orders.html">
My Orders
</a>

<a href="wishlist.html">
Wishlist
</a>

<a href="track-order.html">
Track Order
</a>

<a href="#" onclick="logout()">
Logout
</a>

</div>

</div>
`;

}else{

accountArea.innerHTML =

`
<a href="login.html" class="login-btn">
<i class="fa-regular fa-user"></i>
Login
</a>
`;

}

}

updateCartCount();

});


// =========================
// REGISTER USER
// =========================

function registerUser(){

let name =
document.getElementById("name").value;

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;

let confirmPassword =
document.getElementById("confirmPassword").value;

if(
name==="" ||
email==="" ||
password==="" ||
confirmPassword===""){
alert("Please fill all fields");
return;
}

if(password!==confirmPassword){
alert("Passwords do not match");
return;
}

let users =
JSON.parse(localStorage.getItem("users")) || [];

let userExists =
users.find(user => user.email===email);

if(userExists){
alert("Email already exists");
return;
}

let newUser = {
name:name,
email:email,
password:password,
role:"user"
};

users.push(newUser);

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Account Created Successfully");

window.location.href="login.html";

}


// =========================
// LOGIN USER
// =========================

function loginUser(){

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;

let users =
JSON.parse(localStorage.getItem("users")) || [];

let user =
users.find(
u =>
u.email===email &&
u.password===password
);

if(user){

localStorage.setItem(
"currentUser",
JSON.stringify(user)
);

alert("Login Successful");

window.location.href="index.html";

}else{

alert("Invalid Email or Password");

}

}


// =========================
// LOGOUT
// =========================

function logout(){

localStorage.removeItem("currentUser");

alert("Logged Out");

window.location.href="login.html";

}


// =========================
// ADD TO CART
// =========================

function addToCart(name,price,image=""){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name:name,
price:price,
image:image,
qty:1
});

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

alert(name + " Added To Cart");

}


// =========================
// CART COUNT
// =========================

function updateCartCount(){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let cartCount =
document.getElementById("cartCount");

if(cartCount){

cartCount.innerText =
cart.length;

}

}






// =========================
// REMOVE WISHLIST
// =========================

function removeWishlist(index){

let wishlist =
JSON.parse(
localStorage.getItem("wishlist")
) || [];

wishlist.splice(index,1);

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

location.reload();

}


// =========================
// REMOVE CART
// =========================

function removeCart(index){

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

location.reload();

}


// =========================
// SEARCH
// =========================

function searchProducts() {

let search =
document.getElementById("searchInput")
.value
.toLowerCase();

let products =
document.querySelectorAll("#productGrid .card");

products.forEach(product => {

let name =
product.querySelector("h3")
.innerText
.toLowerCase();

if(name.includes(search)){

product.style.display = "block";

}else{

product.style.display = "none";

}

});

}


// =========================
// ADMIN CHECK
// =========================

function isAdmin(){

let currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);

if(
currentUser &&
currentUser.role==="admin"
){
return true;
}

return false;

}


// api fatch

// fetch("data/perfumes.json")
// .then(res => res.json())
// .then(products => {

// let grid =
// document.getElementById("productGrid");

// grid.innerHTML = "";

// products.forEach(product => {

// grid.innerHTML += `

// <div class="card">

// <img src="${product.image}" alt="${product.name}">

// <div class="card-content">

// <h3>${product.name}</h3>

// <p class="price">₹${product.price}</p>

// <button onclick="addToCart(
// '${product.name}',
// ${product.price},
// '${product.image}'
// )">
// Add To Cart
// </button>

// </div>

// </div>

// `;

// });

// });