
import { useFormik } from 'formik';
import React, { useState } from 'react'
import Input from '../../pages/Input.jsx';
import { ForgotPasswordSchema} from '../validation/Validate.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate() 

  const initialValues = {
    email: "",
    password: "",
    code: ""
  };

  const onSubmit=async users => {
  
  
    setErrorBack('');
    
    try{

    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,users)

    

    if(data.message=='success'){
        toast.success('password changed!', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            navigate("/login");
    }
   
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
      validationSchema:ForgotPasswordSchema,
    });

    
    const inputs = [
    
        {
          class:`w-25`, //css
    
          id: 'email',
          type: 'email',
          name: 'email',
          title: 'user email',
          value: formik.values.email,
        },
        {
          class:"",//css
    
          id: 'password',
          type: 'password',
          name: 'password',
          title: 'new password',
          value: formik.values.password,
        },
        {
            class:"",//css
      
            id: 'code',
            type: 'Text',
            name: 'code',
            title: 'Enter the 4-digit code ',
            value: formik.values.code,
          },
        
      ];
    
    
      const renderInputs = inputs.map((input, index) => (
        <Input
          errors={formik.errors}
          onblur={formik.handleBlur}
          onchange={formik.handleChange}
          type={input.type}
          id={input.id}
          name={input.name}
          title={input.title}
          key={index}
          value={input.value}
          touched={formik.touched}
          className={input.class}
        />
      ));
    

    




return (
  <>
   <p className='m-4'>we sent a 4-digit code to your email, please check it</p> 

   <form onSubmit={formik.handleSubmit} >

   {renderInputs}

  {errorBack&&<p className='text text-danger ms-5 mt-3'>{errorBack}</p>}
  <div className="py-10 px-40"><input type="submit" className=""  value="Reset Password" /></div>

  </form>
  </>
)
}
