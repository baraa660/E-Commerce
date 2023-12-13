import React, { useContext, useState } from 'react';
import Input from '../../pages/Input.jsx';
import { useFormik } from 'formik';
import{loginSchema} from '../validation/Validate.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
function Login() {

  let {setUserToken} = useContext(UserContext);

    const navigate = useNavigate();

  let [errorBack,setErrorBack]=useState('');

  const initialValues={
    email: '',
    password: '',
  };

  const onSubmit=async users => {
    
    
    setErrorBack('');
    
    try{

    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,users)

    

    if(data.message=='success'){
        localStorage.setItem("userToken",data.token);
        
        setUserToken(data.token);
        

        toast.success('Login Successfully', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            navigate("/");
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
    validationSchema:loginSchema,
  });

  const inputs = [
    
    {
      class:`fadeIn second  `, //css

      id: 'email',
      type: 'email',
      name: 'email',
      title: 'user email',
      value: formik.values.email,
    },
    {
      class:"fadeIn third",//css

      id: 'password',
      type: 'password',
      name: 'password',
      title: 'user password',
      value: formik.values.password,
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
      <h2 className='text-center '>Log In</h2>
    </div>
    {/* Login Form */}
    <form onSubmit={formik.handleSubmit} >
    {renderInputs}
    {errorBack&&<p className='text text-danger text-center mt-3'>{errorBack}</p>}
    <div className="text-center m-3"><input type="submit" className="fadeIn fourth" disabled={!formik.isValid} value="Login" /></div>

    </form>

    <div className='m-4 '><Link className='text-primary' to='/sendcode'>Forgot password?</Link></div>
    
  </div>
</div>

    </>
  );
}

export default Login;

