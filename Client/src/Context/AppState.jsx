import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import axios from 'axios';
import { ToastContainer, toast ,Bounce   } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

const AppState = (props) => {
  const url = "http://localhost:1000/api";

  const[products , setproducts]=useState([]);
  const[token , setToken]=useState([]);
  const[isAuthenticated , setIsAuthenticated]=useState(false);
  const [filteredData , SetFilteredData] = useState([]);
  const [user , setUser]=useState();
  const [cart ,setCart]=useState([]);
  const [reload ,setReload]=useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // To handle cookies and credentials
        });
        // Log the entire response to check structure
        // console.log(api.data.products);
        setproducts(api.data.products);
        SetFilteredData(api.data.products);
        userProfile();
      } catch (error) {
        // Log any error in the console
        console.error("Error fetching products:", error);
      }
    };
    // Call the fetchProduct function
    fetchProduct();
    AddToCart();
    userProfile();
    userCart();
  }, [token ,reload]); // useEffect with empty dependency array to run once

  useEffect(() => {
    let lstoken = localStorage.getItem('token');
    if(lstoken){
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  },[]);

  // register user

  const RegisterUser= async (name ,email ,password) => {
    try {
      const api = await axios.post(`${url}/user/register`,{name ,email ,password} ,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // To handle cookies and credentials 
      });
      // alert(api.data.message);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      return api.data;
      // Log the entire response to check structure
      console.log("user register " ,api);
     
    } catch (error) {
      // Log any error in the console
      console.error("Error fetching products:", error);
    }
  };
  // useEffect with empty dependency array to run once
  const LoginUser= async (email ,password) => {
    try {
      const api = await axios.post(`${url}/user/login`,{email ,password} ,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // To handle cookies and credentials 
      });
      // alert(api.data.message);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      
      // Log the entire response to check structure
      // console.log("user login " ,api.data);
      setToken(api.data.token);
      setIsAuthenticated(true);
      // setReload(!reload)
      localStorage.setItem("token" , api.data.token);
      return api.data;
    } catch (error) {
      // Log any error in the console
      console.error("Error fetching products:", error);
    }
  };
  // logout user
  const Logout = async ()=>{
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem('token');
    toast.success("Logout Successfully.....!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  }
  //User profile
  const userProfile= async () => {
    try {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Auth":token
        },
        withCredentials: true, // To handle cookies and credentials
      });
      // Log the entire response to check structure
      // console.log("user profile" , api.data.User);
      setUser(api.data.User);
      // setReload(!reload)
    } catch (error) {
      // Log any error in the console
      console.error("Error fetching products:", error);
    }
  };
  //add to cart
  const AddToCart = async (productId, title, price, qty, imgsrc) => {
    try {
      const api = await axios.post(`${url}/cart/add`,{productId, title, price, qty, imgsrc}, {
        headers: {
          "Content-Type": "application/json",
          Auth:token
        },
        withCredentials: true, // To handle cookies and credentials
      });
      setReload(!reload);
      // Log the entire response to check structure
      console.log("My cart" , api);
      setCart(api.data.cart.items);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    } catch (error) { 
      // Log any error in the console
      console.error("Error fetching products:", error);
    }
  };
  //user cart
  const userCart = async () => {
    try {
      const api = await axios.get(`${url}/cart/user`, {
        headers: {
          "Content-Type": "application/json",
          Auth:token
        },
        withCredentials: true, // To handle cookies and credentials
      });
    //  console.log("user cart" , api.data.cart);
      //   });
    } catch (error) { 
      // Log any error in the console
      console.error("Error fetching products:", error);
    }
  };
  //remove qty--
  const decreaseQty = async ( productId, qty) => {
    try {
      const api = await axios.post(`${url}/cart/--qty`,{ productId, qty}, {
        headers: {
          "Content-Type": "application/json",
          Auth:token
        },
        withCredentials: true, // To handle cookies and credentials
      });
      setReload(!reload);
     console.log("decrease qty" , api );
      //   });
    } catch (error) { 
      // Log any error in the console
      console.error("Error fetching products:", error);
    }
  };






  return (
    <AppContext.Provider value={{ products , RegisterUser , LoginUser ,url ,token, isAuthenticated , setIsAuthenticated ,filteredData , SetFilteredData ,Logout ,user,AddToCart, cart ,decreaseQty}}>
      {props.children}
    </AppContext.Provider> 
  );
};

export default AppState;
 