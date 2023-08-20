import React from 'react';

import styles from './ProtectedRoute.module.css';
import { Navigate, NavigationType } from 'react-router-dom';

export default function ProtectedRoute ({children}) {
 
  if(localStorage.getItem('userToken' == null)){
    
    return <Navigate to={'/login'} />
  }else{
    return children;
  }
 
}


