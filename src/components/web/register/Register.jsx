import React, { useState } from 'react';
import Input from '../../pages/Input.jsx';
import { useFormik } from 'formik';
import{registerSchema} from '../validation/Validate.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import './Register.css'
function Register() {

  let [errorBack,setErrorBack]=useState('');

  const initialValues={
    userName: '',
    email: '',
    password: '',
    image:''
  };

  const handleFieldChange= (event)=>{
    
    formik.setFieldValue('image',event.target.files[0]);
  }


  const onSubmit=async users => {
    
    
    setErrorBack('');
    console.log(errorBack);
    

    const formData = new FormData();
    formData.append('userName',users.userName);  
    formData.append('email',users.email);      
    formData.append('password',users.password);    
    formData.append('image',users.image);  

    try{

    const {data} = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`,formData)


  if(data.message=='success'){

    formik.resetForm();

    toast.success('account created successfully, please verify your email to login', {
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    
  }
}catch(error){
  
  setErrorBack(error.response.data.message, () => {
    // This callback is executed after the state is updated
    console.log(errorBack);
  });
  
}

};

  const formik = useFormik({
    initialValues,//shortcut of : initialValues:initialValues,
    onSubmit,  //shortcut of : onSubmit:onSubmit,
    validationSchema:registerSchema,
  });

  const inputs = [
    {
      class:"fadeIn second",//css 

      id: 'name',
      type: 'Text',
      name: 'userName',
      title: 'user name',
      value: formik.values.userName,
    },
    {
      class:`fadeIn third  ${errorBack ? 'error-input' : ''}`, //css

      id: 'email',
      type: 'email',
      name: 'email',
      title: 'user email',
      value: formik.values.email,
    },
    {
      class:"fadeIn fourth",//css

      id: 'password',
      type: 'password',
      name: 'password',
      title: 'user password',
      value: formik.values.password,
    },
    {
      class:"fadeIn fifth",//css

      id: 'image',
      type: 'file',
      name: 'image',
      title: 'user image',
      onChange: handleFieldChange
    },
  ];


  const renderInputs = inputs.map((input, index) => (
    <Input
      errors={formik.errors}
      onblur={formik.handleBlur}
      onchange={input.onChange || formik.handleChange}
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
      {/*this is the inputs before css and its work
      
      
      <div className='container'>
        
        <h2 className='text-center'>Create Account</h2>

        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {renderInputs}
          <input type="submit" disabled={!formik.isValid} value="Submit" />
        </form>

      </div>


  */}


 <div className="wrapper fadeInDown register-form">
  <div id="formContent" className="">
    {/* Tabs Titles */}
    {/* Icon */}
    <div className="text-center m-4 fadeIn first ">
      <h2 className='text-center '>Sign UP</h2>
    </div>
    {/* Login Form */}
    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
    {renderInputs}
    {errorBack&&<p className='text text-danger text-center mt-3'>{errorBack}</p>}
      <div className="text-center m-3"><input type="submit" className="fadeIn sixth" disabled={!formik.isValid} value="Submit" /></div>

    </form>
    
  </div>
</div>

    </>
  );
}

export default Register;

