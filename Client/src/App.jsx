import React, { useContext } from 'react'
import AppContext from './Context/AppContext'
import ShowProduct from './component/product/ShowProduct'
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom"  
import ProductDetail from './component/product/ProductDetail'
import Navebar from './component/Navebar'
import SearchProduct from './component/product/SearchProduct'
import Register from './component/user/Register'
import { ToastContainer } from 'react-toastify';
import Login from './component/user/Login'
import Profile from './component/user/Profile'
import Cart from './component/Cart'





function App() {
  // const {} = useContext(AppContext)
  return (
   
   <Router>
    <Navebar/>
    <ToastContainer />
  <Routes>
    <Route path="/" element={<ShowProduct/>}/>
    <Route path="/product/:id" element={<ProductDetail/>}/>
    <Route path="/product/search/:term" element={<SearchProduct/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/cart" element={<Cart/>}/>
  </Routes>
   </Router>
  )
}

export default App