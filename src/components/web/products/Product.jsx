import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loader from '../../Loader.jsx';
import axios from 'axios';

import { cartcontext } from '../context/Cart.jsx';

import styles from './Product.module.css';
import moment from 'moment';
import StarRating from './StarRating.jsx';
import ReactStars from "react-rating-stars-component";
import { useFormik } from 'formik';
import { addReviewSchema } from '../validation/Validate.js';
import { toast } from "react-toastify";

function Product() {

  let [errorBack,setErrorBack]=useState('');
  const token = localStorage.getItem("userToken");
  const initialValues = {
    comment: "",
    rating:0,
  };

  const onSubmit= async review => {
    setErrorBack('');
    console.log(review)
    try{
      const token = localStorage.getItem("userToken");
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,review,
      {headers:{Authorization:`Tariq__${token}`}})

      if(data.message=='success'){
        toast.success('Comment submitted successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
    }
     
  }catch(error){
    
      // This callback is executed after the state is updated
      
      setErrorBack(error.response.data.message, () => {
        // This callback is executed after the state is updated
        console.log(errorBack);
      });
    
  }
  }

  const formik = useFormik({
    initialValues,//shortcut of : initialValues:initialValues,
    onSubmit,  //shortcut of : onSubmit:onSubmit,
    validationSchema:addReviewSchema,
  });

    const{productId}=useParams();
    const{addToCartContext, getCardContext}=useContext(cartcontext);

    const getproduct = async ()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)

        return data.product
    }

    const {data, isLoading,}= useQuery('product', getproduct)
    
    const getCard = async () => {
      const res = getCardContext();
      
      return res;
    };
  
    const { refetch} = useQuery("cart", getCard);
    //i used getCardContext and useQuery with it just to call refetch after add to cart
    // because after add to cart the cart count in navbar doesnt change fast so i added refetch to 
    //make it change fast  

    if(isLoading){
        return <Loader/>
    }

    const addToCart = async(productId)=>{
      res = await addToCartContext(productId)
      .then(() => refetch())
    .catch(error => console.error('Error removing Item:', error));
    }

    const dateFromNow =(createdAt)=>{

      const createdAtDate = new Date(createdAt);
      const relativeTime = moment(createdAtDate).fromNow();

      return relativeTime
    }

    const ratingChanged = (newRating) => {
      console.log(newRating);
    };
      
  return (
    <div className=''>
      <div className={styles['product-details']}>
    <div className={styles['left-content']}>
      {/* Display main product image */}
      
<div className={styles['images']}>
      {/* Display additional product images */}
      {data.subImages && data.subImages.length > 0 && (
        <div className={styles['sub-images']}>
          {data.subImages.map((image, index) => (
            <img
              key={index}
              src={image.secure_url}
              alt={`Additional Image ${index + 1}`}
            />
          ))}
        </div>
      )}

{data.mainImage && (
        <img
          src={data.mainImage.secure_url}
          alt={data.name}
          className={styles['main-image']}
        />
      )}
      </div>
      {/* Display product reviews */}
  {data.reviews.length > 0 && (
        <div className={styles['reviews-container']}>
          <p className='mb-4'><b>Product Reviews: </b></p>
          
            {data.reviews.map((review, index) => (
              <div className={styles['review-card']} key={index}>
                <div className='d-flex gap-2'>
                  <div className={styles['commenter-img']}>
                    <img className='rounded-circle w-100' src={review.createdBy.image.secure_url} alt="commenter image" />
                  </div>
                  <div>
                  <div className={styles['commenter-details']}>
                    <div className='d-flex justify-content-between'>
                      <b className='me-4'>{review.createdBy.userName}</b>
                      <div className='mt-1'>
                      <StarRating avgRating={review.rating} />
                      </div>
                      </div>
                    <p>{review.comment}</p>
                  </div >
                  <p className={styles['comment-date']}>{dateFromNow(review.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          
        </div>
      )}
      
      
    </div>

    <div className={styles['right-content']}>
      <div className={styles['header']}>
      <h1>{data.name}</h1>
      <p><span className=' pe-2 border-right border-secondary'>{data.number_sellers} sells </span>{data.stock} in stock</p>
      </div>

      <div className={styles['description']}>
      {data.discount > 0 ? (
            <div className='d-flex gap-2'>
              <strong>Price: </strong>
              <p className={styles['product-price']}><del>${data.price}</del></p>
              <p className={styles['product-final-price']}>${data.finalPrice}</p>
            </div>
          ) : (
            <div className='d-flex gap-2'>
              <strong>Price: </strong>
              <p className={styles['product-final-price']}>${data.finalPrice}</p>
            </div>
          )}
      <p> <strong>description: </strong> {data.description}</p>

      {token?<button className='btn btn-success mt-3' onClick={()=>addToCart(data._id)}>Add To Cart</button>:<></>}

      </div>

      {token?<div className={styles.formContainer}>
      <form onSubmit={formik.handleSubmit}>

        <div className={styles.starsContainer}>
          <label className={styles.label} htmlFor="rating">
            Rating:
          </label>
          <ReactStars
            
            name="rating"
            count={5}
            size={24}
            activeColor="#ffd700"
            value={formik.values.rating}
            onChange={(newRating) => formik.setFieldValue('rating', newRating)}
          />
          <div className={`${styles.ms4} ${styles.textAlignStart}`}>
          {formik.errors.rating && (
            <p className="text text-danger">{formik.errors.rating}</p>
          )}
        </div>
        </div>

        <div>
          <label className={styles.label} htmlFor="comment">
            Comment:
          </label>
          <textarea
            id="comment"
            type="text"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
          />
          <div className={`${styles.ms4} ${styles.textAlignStart}`}>
          {formik.errors.comment && (
            <p className="text text-danger">{formik.errors.comment}</p>
          )}
        </div>
        </div>
        {errorBack&&<p className='text text-danger text-center mt-1'>{errorBack}</p>}
        <button type="submit">Submit Review</button>
      </form>
    </div>:<></>}
      
    </div>
    
  </div>


    </div>
  );
}

export default Product

// <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)}>Add To Cart</button>