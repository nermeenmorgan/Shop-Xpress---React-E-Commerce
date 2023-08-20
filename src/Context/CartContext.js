import axios from "axios";
import {  createContext, useEffect, useState } from "react";

export let cartContext  = createContext();
export function CartContextProvider({children}){
    const [cartId, setCartId] = useState(null)
    const [numOfCartItems, setNumOfCartItems] = useState(0)
   async function getCart  (){
let response = await getLoggedUserCart()
if(response?.data?.status==='success'){
    setCartId(response.data.data._id)
    setNumOfCartItems(response.data.numOfCartItems)
}
    }
    useEffect(()=>{
getCart()
    },[])
    let headersobj = 
    {token: localStorage.getItem('userToken')}
  async function addToCart  (x){
  return await  axios.post('https://route-ecommerce.onrender.com/api/v1/cart',{
                
                  productId:x
        }, {
            headers: headersobj
        }).then((response)=>response)
        .catch((error)=>error)
    }
   async function getLoggedUserCart() {
        try {
          const response = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', {
            headers: headersobj
          });
       
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      
   async   function removeItem  (productId){
        return  await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
                  headers: headersobj
              }).then((response)=>response)
              .catch((error)=>error)
          }
  
   async function updateProductCount  (productId, count){
        return await  axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, 
        {
            count:count
        },
        {
                  headers: headersobj
              }).then((response)=>response)
              .catch((error)=>error)
          }
          async function onlinePayment  ( shippingAddress, cartId){
            return await  axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, 
            {
                shippingAddress: shippingAddress
            },
            {
                      headers: headersobj
                  }).then((response)=>response)
                  .catch((error)=>error)
              }
              async function cashOnDeliveryPayment  ( shippingAddress){
                return await  axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/`, 
                {
                    shippingAddress: shippingAddress
                },
                {
                          headers: headersobj
                      }).then((response)=>response)
                      .catch((error)=>error)
                  }
        async  function clearCart (){
            return  await  axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`, 
            {
                      headers: headersobj
                  }).then((response)=>response)
                  .catch((error)=>error)
              }
    const exchangedData = {
        removeItem,
        addToCart,
        getLoggedUserCart,
        updateProductCount,
        clearCart,
        onlinePayment,
        numOfCartItems,
        cartId,
        setNumOfCartItems
    }
    
    return <cartContext.Provider value={exchangedData} >
{children}
    </cartContext.Provider>
}