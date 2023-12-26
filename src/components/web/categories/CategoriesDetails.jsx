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
    <div className={styles['products']}>
        {data.length ? (
         <div className={styles['product-list']}>
         {data.map((product) => (
      <div key={product._id} className={styles['product-card']}>
        {product.discount > 0 ? <div className={styles['discount-icon']}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width={45} height={45} viewBox="0 0 256 256" xmlSpace="preserve">
  <defs>
  </defs>
  <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1}} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
    <polygon points="45,9 58.91,2.2 66.16,15.88 81.41,18.55 79.24,33.88 90,45 79.24,56.13 81.41,71.45 66.16,74.13 58.91,87.8 45,81 31.09,87.8 23.84,74.13 8.59,71.45 10.76,56.13 0,45 10.76,33.88 8.59,18.55 23.84,15.88 31.09,2.2 " style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(224,40,40)', fillRule: 'nonzero', opacity: 1}} transform="  matrix(1 0 0 1 0 0) " />
    <path d="M 34.355 43.199 c -4.621 0 -8.379 -3.759 -8.379 -8.379 c 0 -4.62 3.759 -8.379 8.379 -8.379 c 4.62 0 8.379 3.759 8.379 8.379 C 42.734 39.44 38.976 43.199 34.355 43.199 z M 34.355 30.441 c -2.415 0 -4.379 1.964 -4.379 4.379 c 0 2.415 1.964 4.379 4.379 4.379 c 2.415 0 4.379 -1.964 4.379 -4.379 C 38.734 32.405 36.77 30.441 34.355 30.441 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
    <rect x="22.55" y={43} rx={0} ry={0} width="44.91" height={4} style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1}} transform=" matrix(0.6753 -0.7375 0.7375 0.6753 -18.5781 47.8016) " />
    <path d="M 54.715 63.56 c -4.62 0 -8.379 -3.759 -8.379 -8.38 c 0 -4.62 3.759 -8.379 8.379 -8.379 c 4.621 0 8.38 3.759 8.38 8.379 C 63.095 59.801 59.336 63.56 54.715 63.56 z M 54.715 50.801 c -2.414 0 -4.379 1.965 -4.379 4.379 c 0 2.415 1.965 4.38 4.379 4.38 c 2.415 0 4.38 -1.965 4.38 -4.38 C 59.095 52.766 57.13 50.801 54.715 50.801 z" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
  </g>
</svg>
        </div> : <></>}
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
