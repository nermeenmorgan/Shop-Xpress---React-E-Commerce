import React, { useState } from 'react';
// import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Login ({saveUserData}) {
  // const [dob, setDob] = useState('')
  const navigate = useNavigate()
  const [errorMsg, seterrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let validation = yup.object({
    email: yup.string().required('Email is required').email('Example: exa@gmail.com'),
    password: yup.string().required('Password is required').matches(/^[A-Za-z0-9-_.]{5,15}/, 'Password must be letters or numbers from 10 to 15 '),
})
 
  async function handleLogin(values){
    setIsLoading(true)
    axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
        .then((res) => {
            if (res.data.message === "success") {
              localStorage.setItem('userToken', res.data.token)
              saveUserData();
                setIsLoading(false)
                navigate("/")
            }
        })
        .catch((err) => {
            setIsLoading(false)
            seterrorMsg(err.response.data.message)
        })}
  let formik = useFormik({
  initialValues:{
   password:"",
   email:""
    },
    validation,
  onSubmit: handleLogin
  })
  return <div className='w-75  mx-auto py-4'>
    <Helmet>
                <title>Sign In</title>
            </Helmet>
  <h1>Login Now</h1>
  <form onSubmit={formik.handleSubmit}>
  <div className='d-block w-100'>
    {errorMsg ? <div className="alert p-2 alert-danger text-center">{errorMsg}</div> : null}
  </div>
 

    <label htmlFor='name'>Email Address</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' type="email" name='email' id="email" value={formik.values.email} onChange={formik.handleChange}></input>
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:null  }

    {/* <div className='d-block w-100'>
                                <label htmlFor='dob' >Date Of Birth</label>
                                <input className='form-control mb-2 form-input' type="date" name='dob' id='dob' onChange={(e) => setDob(e.target.value)} />
                            </div> */}

    <label htmlFor='name'>password</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' type="password" name='password' id="password" value={formik.values.password} onChange={formik.handleChange}></input>
    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:null  }


    {isLoading ? <button type='button' className='btn btn-success w-100 mt-3'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)}  type="submit" className="btn btn-success w-100 mt-3">Submit</button>}
  </form>
  </div>
}
