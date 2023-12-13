import { useFormik } from 'formik';
import React, { useState } from 'react'
import Input from '../../pages/Input.jsx';
import { sendCodeSchema } from '../validation/Validate.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function SendCode() {

   const navigate = useNavigate() 

    const initialValues = {
      email: "",
    };

    const onSubmit=async users => {
    
    
      setErrorBack('');
      
      try{
  
      const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,users)
  
      

      navigate("/forgotpassword");
     
  }catch(error){
    setErrorBack(error.response.data.message, () => {
      // This callback is executed after the state is updated
      console.log(errorBack);
    });
  }
  
  };

    let [errorBack,setErrorBack]=useState('');

    const formik = useFormik({
        initialValues,//shortcut of : initialValues:initialValues,

        onSubmit,  //shortcut of : onSubmit:onSubmit,
        validationSchema:sendCodeSchema,
      });

      

      

      




  return (
    <>
     <p>Enter your email, will send a confirmation code to this email</p> 

     <form onSubmit={formik.handleSubmit} >

     <div className=''>
        
        <input className={`ms-3 w-25`} placeholder='user email' type='email' 
        name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
        <div className='ms-4 text-align: start'>{formik.touched&&formik.errors.email&&<p className='text text-danger'>{formik.errors.email}</p>}</div>
      </div>


    {errorBack&&<p className='text text-danger text-center mt-3'>{errorBack}</p>}
    <div className="py-10 px-40"><input type="submit" className=""  value="Send Code" /></div>

    </form>
    </>
  )
}
