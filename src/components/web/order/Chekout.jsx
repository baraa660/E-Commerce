import React, { useContext, useState } from 'react';
import Input from '../../pages/Input.jsx';
import { useQuery } from 'react-query';
import { cartcontext } from '../context/Cart.jsx';

import Loader from '../../Loader.jsx';
import { useNavigate } from 'react-router-dom';
import { CheckoutSchemaSchema } from '../validation/Validate.js';

import  styles  from './Checkout.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';


const Checkout = () => {

    let [errorBack,setErrorBack]=useState('');
    const navigate = useNavigate();

  const { getCardContext } = useContext(cartcontext);

  const initialValues={
    couponName: '',
    address: '',
    phone:''
  };

  const onSubmit=async users => {

    setErrorBack('');
    if(data.count==0){
        setErrorBack('The Cart is Empty');
    }
    else{
        try{
            const token = localStorage.getItem("userToken");
            
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/order`,
            users,
            {
                headers: {
                  Authorization: `Tariq__${token}`,
                  
                },
              }
            )
        
            if(data.message=='success'){    
        
                toast.success('order successfully submitted', {
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
    }
    


};

  const formik = useFormik({
    initialValues,//shortcut of : initialValues:initialValues,
    onSubmit,  //shortcut of : onSubmit:onSubmit,
    validationSchema:CheckoutSchemaSchema,
  });

  const inputs = [
    {
      class:'w-50',
      id: 'couponName',
      type: 'Text',
      name: 'couponName',
      title: 'Coupon Code',
      value: formik.values.email,
    },
    { 
      id: 'address',
      type: 'Text',
      name: 'address',
      title: 'Address',
      value: formik.values.address,
    },
    {
        id: 'phone',
        type: 'Text',
        name: 'phone',
        title: 'Phone',
        value: formik.values.phone,
      },
  ];

  const getCard = async () => {
    const res = getCardContext();

    return res;
  };

  const { data, isLoading } = useQuery("cart", getCard);

  if(isLoading){
    return <Loader/>
  }


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

  // Function to calculate the total price for a product
  const calculateTotalPrice = (quantity, price) => {
    return quantity * price;
  };

  // Function to calculate the total order price for all products in the cart
  const calculateTotalOrderPrice = () => {
    return data.products.reduce((total, product) => {
      return total + calculateTotalPrice(product.quantity, product.details.price);
    }, 0);
  };

  return (
    <div className={styles['checkout-container']}>
      <h2>Checkout Summary:</h2>
      {data.products.map((product, index) => (
        <div key={index} className={styles['product-details']}>
          <h3>{product.details.name}</h3>
          <p>Quantity: {product.quantity}</p>
          <p>Price per Unit: ${product.details.price}</p>
          <p>Total Price: ${calculateTotalPrice(product.quantity, product.details.price)}</p>
        </div>
      ))}
      <hr />
      <div className={styles['total-order']}>
        <p>Total Order Price: ${calculateTotalOrderPrice()}</p>
      </div>
      <div className={styles['input-container']}>
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        <p className='ms-4 mt-2 text-secondary'>HAVE A COUPON ?</p>
      {renderInputs}
      {errorBack&&<p className='text text-danger ms-5 mt-3'>{errorBack}</p>}
      <button type='submit' className={`mt-3 ${styles['proceed-button']}`}>Proceed to Payment</button>
        </form>
        
      </div>
      
    </div>
  );
};

export default Checkout;