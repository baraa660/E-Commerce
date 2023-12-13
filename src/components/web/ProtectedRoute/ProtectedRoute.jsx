import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    let navigate = useNavigate();

    if(localStorage.getItem('userToken')== null){
        return navigate(-1)   // or <Navigate to='/login' />
    }
    
  return children
}

