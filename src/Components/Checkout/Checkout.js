import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { Form } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default  function Checkout  () {
  const {onlinePayment, cartId} = useContext(cartContext)
async  function handleSubmit (values){
 let response= await onlinePayment (values, cartId);
 if(response?.data?.status==='success'){
  window.location.href= response.data.session.url
 }
 console.log(response)
  }
  let formik = useFormik({
    initialValues:{
      details:"",
      city:"",
      phone:""
    },
    onSubmit:handleSubmit
  })
 return <>
   <Helmet>
                <title>Checkout Details</title>
            </Helmet>
 <h2 className='w-100  mt-5 text-center'>Checkout</h2>
 <div className='w-50 py-5 mx-auto'>

 <form onSubmit={formik.handleSubmit}>
<label htmlFor='details'>details: </label>
<input name='details' type='text' className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange}/>

<label htmlFor='phone'>Phone: </label>
<input name = 'phone' type='tel' className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange}/>

<label htmlFor='city'>City: </label>
<input name='city' type='text' className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange}/>

<button type='submit' className='btn border-main w-100'>Pay</button>
 </form>
 </div>
  </>
}

