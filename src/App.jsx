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


function App() {
  const [count, setCount] = useState(0)
  


  return (
    <>
    <BrowserRouter>
    <Navbar/>
    
   <Routes>

    <Route path="/" element={<Index/>}></Route>
    <Route path="/Shop" element={<Shop/>}></Route>
    <Route path="/Collecation" element={<Collecation/>}></Route>
    <Route path="/Newarrivals" element={<Newarrivals/>}></Route>
    <Route path="/About" element={<About/>}></Route>
    <Route path="/Bestsellers" element={<Bestsellers/>}></Route>
    <Route path="/Contact" element={<Contact/>}></Route>
    <Route path="/Login" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/Cart" element={<Cart/>}/>
    <Route path="/Checkout" element={<Checkout/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
    </>
  )
}

export default App
