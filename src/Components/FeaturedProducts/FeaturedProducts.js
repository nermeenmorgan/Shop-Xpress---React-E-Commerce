import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import ProductDetails from '../ProductDetails/ProductDetails';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import  toast  from 'react-hot-toast';
export default function FeaturedProducts () {
  const {addToCart, setNumOfCartItems}= useContext(cartContext);
 async function addProduct (productId){
   let response= await addToCart(productId)
   console.log(response)
   
if(response.data.status==="success"){
  setNumOfCartItems(response.data.numOfCartItems)
  toast(response.data.message)}
  }
  const [isLoading, setisLoading] = useState(false)

  const [products, setProducts] = useState([])
  
 async function getProducts(){
  setisLoading(true)
  let data= await (await axios.get("https://route-ecommerce.onrender.com/api/v1/products")).data
  setProducts(data.data)
  console.log("dataaaaaaaaaaaaaaaaaaaaa")
  console.log(data.data)
  setisLoading(false)
}

// let { data } = await axios.get("https://route-ecommerce.onrender.com/api/v1/categories");
// // let {data}=  axios.get("https://route-ecommerce.onrender.com/api/v1/categories");
// setCatogories(data);

useEffect(()=>

{ 
   getProducts() ;
  // getCategories();
} ,[])
 return <>
 <h2 className='text-center'> Featured Products</h2>
   {isLoading?
  <div className='text-center'>
   <i className='fas fa-spin fa-3x fa-spinner text-main'></i>
  </div>
  : 
 <div className='row'>
{products && products.map((product)=> <div key={product._id} className='col-md-2'>
<div className='product cursor-pointer px-2 py-3'>
<Link to={`/products/${product._id}`} >
<img  className='w-100' src={product.imageCover}/>
<span className='text-main fw-bold font-sm'>{product.category.name}</span>
  <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
  <div className='d-flex justify-content-between'>
    <span className='text-muted'>{product.price} EGP</span>
    <span>
      <i className='fas fa-star rating-color'></i>
      {product.ratingsAverage}
    </span>
  </div>
</Link>
  <button onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100'>+ Add</button>
</div>



</div>)}
 </div>}
  </>
}
