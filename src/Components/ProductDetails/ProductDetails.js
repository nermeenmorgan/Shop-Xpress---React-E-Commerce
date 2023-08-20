import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function ProductDetails () {
  const [addToCart]= useContext(cartContext);
  async function addProduct (productId){
    let response= await addToCart(productId)
    console.log(response)
if(response.data.status==="success"){
  
  toast.success(response?.data?.message)
}else{
  toast.error(response?.data?.message)
}

   }
  const [isLoading, setisLoading] = useState(false)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const { id } = useParams();

  const [product, setProduct] = useState([])
  async function getProduct(){
    setisLoading(true)
   let data= await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
   setProduct(data.data.data)
   console.log(data.data.data)
   setisLoading(false)
 }

 useEffect(()=>
 { getProduct()} ,[])
 
  return <>
    <Helmet>
                <title>Product Details</title>
            </Helmet>
  <div className='row align-items-center py-3 justify-content-center align-items-center'>
  {isLoading?
  <div className='text-center'>
   <i className='fas fa-spin fa-3x fa-spinner text-main'></i>
  </div>
  : <>
  <div className='col-md-4'>
<Slider {...settings}>
{product?.images?.map((img)=><img src= {img}/>)}
 </Slider>
  </div>
  <div className='col-md-8'>
    <h3>{ product?.title}</h3>
    <p className='text-muted p-2'>{product?.description }</p>
    <div className='d-flex justify-content-between'>
<span className='text-muted'>{product?.price}EGP</span>
<span><i className='fas fa-star rating-color'></i>
      {product?.ratingsAverage}
    </span>

    </div>
    <button onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100'>+ Add</button>
  </div>
  </>}
 
   
  </div>
  </>
}




