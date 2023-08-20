import React from 'react';
import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout ({userData}) {
  return <>
  <div className='pt-5'>
  <Navbar userData={userData}/>
   <div className='container '>
<Outlet></Outlet>
   </div>
   <Footer/>
  </div>
  

  </>
}
