import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import Navbar from './Components/Navbar/Navbar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import About from './Components/About/About';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/NotFound/NotFound';
import Checkout from './Components/Checkout/Checkout';
import MainSlider from './Components/MainSlider/MainSlider';
import toast, { Toaster } from 'react-hot-toast';
import { Offline, Online } from "react-detect-offline";

import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import axios from 'axios';
import { CounterContextProvider } from './Context/CounterContext';
import { CartContextProvider } from './Context/CartContext';


function App() {


  const [products, setProducts] = useState([])
  async function getProducts(){
   let {data}= await axios.get("https://fakestoreapi.com/products")
   setProducts(data)
 }
  useEffect(()=>
 { getProducts() 
 } ,[])
 



  const [userData, setUserData] = useState(null)
  function saveUserData(){
    let encodedToken= localStorage.getItem('userToken');
    let decodedToken= jwtDecode(encodedToken);
setUserData(decodedToken)
  }
  let routers = createBrowserRouter([
    {path:"", element:<Layout userData={userData}/>, children:[
      {index:true, element:<ProtectedRoute><Home products = {products}/></ProtectedRoute>},
      {path:"products", element: <ProtectedRoute> <Products/> </ProtectedRoute> },
      {path:"cart", element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"checkout", element:<ProtectedRoute><Checkout/></ProtectedRoute>},
      {path:"categories", element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"products/:id", element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"about", element:<About/>},
      {path:"brands", element:<Brands/>},
      {path:"login", element:<Login saveUserData={saveUserData}/>},
      {path:"register", element:<Register/>},
      {path:"*", element:<NotFound/>},
    ]}
  ])
  return (
    <CartContextProvider>
    <Offline><div className='network'>Only shown offline (surprise!)</div></Offline>
      <Toaster/>
    <RouterProvider router={routers}>
      <Layout/>
    </RouterProvider>
    </CartContextProvider>
   
  );
}

export default App;
