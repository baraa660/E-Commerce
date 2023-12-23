import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loader from '../../Loader.jsx';
import axios from 'axios';

import { cartcontext } from '../context/Cart.jsx';

import styles from './Product.module.css';
import moment from 'moment';
import StarRating from './StarRating.jsx';


function Product() {
    const{productId}=useParams();
    const{addToCartContext, getCardContext}=useContext(cartcontext);

    const getproduct = async ()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)

        return data.product
    }

    const {data, isLoading}= useQuery('product', getproduct)
    console.log(data)
    
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
    

      
  return (
    <div className=''>
      <div className={styles['product-details']}>
    <div className={styles['left-content']}>
      {/* Display main product image */}
      

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

      <button className='btn btn-success mt-3' onClick={()=>addToCart(data._id)}>Add To Cart</button>
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
  </div>
    </div>
  );
}

export default Product

// <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)}>Add To Cart</button>