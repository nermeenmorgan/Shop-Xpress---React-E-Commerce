import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
export default function Navbar ({userData}) {
  const {numOfCartItems} = useContext(cartContext)
 return  <>
  
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
    <div className='container'>
    <a to="/">
 <img src={logo} alt="logo"/>
    </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="collapsibleNavId">
    {userData?
    <ul className="navbar-nav me-auto mt-2 mt-lg-0 ">
      <li className="nav-item active">
        <a className="nav-link" to="/">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <Link className="nav-link px-2 position-relative" to="cart">
        <i className='fas fa-shopping-bag fa-lg'></i> 
        <span className='badge position-absolute top-0 end-0 bg-main text-white '>
        {numOfCartItems}
        </span>
       </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="products">Products</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="categories">Categories</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="brands">Brands</Link>
      </li>
    </ul>
    :null}
    <ul className="navbar-nav ms-auto">
    <li className='nav-item d-flex align-items-center'>
<i className='fab mx-2 fa-facebook'></i>
<i className='fab mx-2 fa-twitter'></i>
<i className='fab mx-2 fa-instagram'></i>
<i className='fab mx-2 fa-tiktok'></i>
<i className='fab mx-2 fa-linkedin'></i>
<i className='fab mx-2 fa-youtube'></i>
    </li>

    {!userData?
    <>

      <li className="nav-item active">
        <Link className="nav-link" to="login">Login<span className="sr-only">(current)</span></Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="register">Register</Link>
      </li>
    </>:
 <li className="nav-item">
        <Link className="nav-link" to="#">Logout</Link>
      </li>}
     
     
    </ul>

  </div>
  </div>
</nav>
  </>
}



