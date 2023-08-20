import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Cart () {
//  const [isLoading, setisLoading]=useState(false)

  const [cartDetails, setCartDetails] = useState(null)
let {getLoggedUserCart, removeItem, updateProductCount, clearCart} = useContext(cartContext);

async function getCart (){
 
  let response = await getLoggedUserCart();
  setCartDetails(response?.data)
  if (response?.data?.status ==='success')
{
  console.log("el cart object hhhhhhhhhhhhhhhhhhhh")
  console.log(response)
  setCartDetails(response?.data?.data)


  } else{
    console.log("errrrrr")}
}
async function deleteItem (productId){
 
let response = await removeItem(productId);
 console.log(response)
 setCartDetails(response?.data?.data)
 toast("Product successfully removed")
}
async function clearingCart (){

  let response = await clearCart();
 console.log(response)
 setCartDetails(response?.data?.data)
 toast("Your cart is successfully cleared")
//  setisLoading(true)
}

async function updateCount (productId, count){
 
  let response = await updateProductCount(productId,count);

 setCartDetails(response?.data?.data)
 toast("Product successfully updated")
}


useEffect(()=> {
getCart();
}, [])
 return <>
  <Helmet>
                <title>Cart Details</title>
            </Helmet>
 <div className='bg-main-light p-4 my-4'>
  {!cartDetails?  <div className='text-center'>
   <i className='fas fa-spin fa-3x fa-spinner text-main'></i>
  </div>:
  <div>
    <div>
    <h3>Shop Cart: </h3>
    <button className='btn border-main' onClick={()=>clearingCart()}>Clear cart</button>
    {cartDetails.products.map((product)=><div className='row border-bottom py-2 align-items-center my-2' key={product.product._id}>
    <div className='col-md-1'>
    <img  className='w-100' src={product.product.imageCover}/>
    </div>
    <div className='col-md-11 d-flex justify-content-between'>

    <div>
    <h6>{product.product.title}</h6>
    <h6 className='text-main'>price: {product.price}</h6>
    <button onClick={()=>deleteItem(product.product._id)} className='btn m-0 p-0'> <i className='fa-trash-can fa-regular text-main'></i> Remove</button>
    </div>

<div >
<button onClick={()=>updateCount(product.product._id, product.count+1)} className='btn border-main btn-sm'>+</button>
<span className='mx-2'>{product.count}</span>
<button onClick={()=>updateCount(product.product._id, product.count-1)} className='btn border-main btn-sm'>-</button>
</div>

    </div>

    </div>)}

    </div>
<h5 className='text-main'>Total cart price: {cartDetails.totalCartPrice} EGP</h5>
<button className='btn bg-main'>
  <Link className='text-white' to={'/checkout'}>
Checkout
  </Link>
</button>
  </div> }
</div>

</>
}
