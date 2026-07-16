import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Index from './Components/Index'
import Shop from './Pages/Shop'
import Footer from './Components/Footer'
import Collecation from './Pages/Collecation'
import Login from './Pages/Login'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'  
import Newarrivals from './Pages/Newarrivals'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Bestsellers from './Pages/Bestsellers'
import Signup from './Pages/Signup'
import { useContext } from 'react'
import { ThemContext } from './Pages/ThemContext'
import "./App.css"
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import Profile from './Pages/Profile'


function App() {
  const [count, setCount] = useState(0)
  


  return (
    <>
    <BrowserRouter>
    <Navbar/>
    
   <Routes>

    <Route path="/" element={<Index/>}></Route>
    <Route path="/shop" element={<Shop/>}></Route>
    <Route path="/collecation" element={<Collecation/>}></Route>
    <Route path="/newarrivals" element={<Newarrivals/>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/bestsellers" element={<Bestsellers/>}></Route>
    <Route path="/contact" element={<Contact/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/checkout" element={<Checkout/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/orders" element={<Profile/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
    </>
  )
}

export default App
