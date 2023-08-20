import React, { useState } from 'react';
// import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Register () {
  // const [dob, setDob] = useState('')
  const navigate = useNavigate()
  const [errorMsg, seterrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let validation = yup.object({
    name: yup.string().required('Name is required').min(5, "Name must be more than 5 characters").max(20, "Name must be less than 20 characters"),
    email: yup.string().required('Email is required').email('Example: exa@gmail.com'),
    phone: yup.string().required('Phone number is required').matches(/^(010|011|012|015)[0-9]{8}/, "Number must be Egyptian number"),
    password: yup.string().required('Password is required').matches(/^[A-Za-z0-9-_.]{5,15}/, 'Password must be letters or numbers from 10 to 15 '),
    // rePassword: yup.string().required('RePassword is required').oneOf([yup.ref("password", "Password doesn't match")]),
    rePassword: yup.string().required('RePassword is required').oneOf([yup.ref("password")], "Password doesn't match"),

})
 
  async function handleRegister(values){
    setIsLoading(true)
    axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
        .then((res) => {
            if (res.data.message === "success") {
                setIsLoading(false)
                navigate("/login")
            }
        })
        .catch((err) => {
            setIsLoading(false)
            seterrorMsg(err.response.data.message)
        })}
  let formik = useFormik({
  initialValues:{
   name:"",
   phone:"",
   password:"",
   rePassword:"",
   email:""
    },
    validation,
  onSubmit: handleRegister
  })
  return <div className='w-75  mx-auto py-4'>
    <Helmet>
                <title>Registration</title>
            </Helmet>
  <h1>Register Now</h1>
  <form onSubmit={formik.handleSubmit}>
  <div className='d-block w-100'>
    {errorMsg ? <div className="alert p-2 alert-danger text-center">{errorMsg}</div> : null}
  </div>
    <label htmlFor='name'>Name</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' type="name" name='name' id="name" value={formik.values.name} onChange={formik.handleChange}></input>
{formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div>:null  }


    <label htmlFor='name'>Email Address</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' type="email" name='email' id="email" value={formik.values.email} onChange={formik.handleChange}></input>
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:null  }


    <label htmlFor='phone'>Phone Number</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' type="tel" name='phone' id="phone" value={formik.values.phone} onChange={formik.handleChange}></input>
    {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div>:null  }

    {/* <div className='d-block w-100'>
                                <label htmlFor='dob' >Date Of Birth</label>
                                <input className='form-control mb-2 form-input' type="date" name='dob' id='dob' onChange={(e) => setDob(e.target.value)} />
                            </div> */}

    <label htmlFor='name'>password</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' type="password" name='password' id="password" value={formik.values.password} onChange={formik.handleChange}></input>
    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:null  }

    <label htmlFor='name'>Re-enter your password</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' type="password" name='rePassword' id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange}></input>
    {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:null  }

    {isLoading ? <button type='button' className='btn btn-success w-100 mt-3'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)}  type="submit" className="btn btn-success w-100 mt-3">Submit</button>}
  </form>
  </div>
}
