import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loader from '../../Loader.jsx';
import axios from 'axios';

import  styles  from './CategoriesDetails.module.css';
import StarRating from '../products/StarRating.jsx';

function CategoriesDetails() {
    const{categoryId}=useParams();

    const getCategoryDetails = async ()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`)

        return data.products
    }

    const {data, isLoading}= useQuery('category details', getCategoryDetails)

    if(isLoading){
        return <Loader/>
    }

      
  return (
    <div className='products'>
        {data.length ? (
         <div className={styles['product-list']}>
         {data.map((product) => (
      <div key={product._id} className={styles['product-card']}>
        <Link to={`/product/${product._id}`} className={styles['product-link']}>
          <div><img src={product.mainImage.secure_url} alt={product.name} className={styles['product-image']} /></div>
          <div><h2 className={styles['product-name']}>{product.name}</h2></div>
        </Link>

        <div className={styles['price-and-rating-container']}>
          {/* Price and Discounted Price */}
          {product.discount > 0 ? (
            <div className='d-flex gap-2'>
              <p className={styles['product-price']}><del>${product.price}</del></p>
              <p className={styles['product-final-price']}>${product.finalPrice}</p>
            </div>
          ) : (
            <p className={styles['product-final-price']}>${product.finalPrice}</p>
          )}

          {/* Star Rating */}
          <div className={styles['star-rating-container']}>
            <StarRating avgRating={product.avgRating} />
          </div>
        </div>
      </div>
    ))}
       </div>
      ) : (
        <h2>NO Products</h2>
      )}
      
    </div>
  )
}

export default CategoriesDetails
