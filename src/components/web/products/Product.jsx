import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loader from '../../Loader.jsx';
import axios from 'axios';

import { cartcontext } from '../context/Cart.jsx';


function Product() {
    const{productId}=useParams();
    const{addToCartContext}=useContext(cartcontext);

    const getproduct = async ()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)

        return data.product
    }

    const {data, isLoading}= useQuery('product', getproduct)

    if(isLoading){
        return <Loader/>
    }

    const addToCart = async(productId)=>{
      const res = await addToCartContext(productId);
      
    }

      
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          {data.subImages.map((img, index) => (
            <React.Fragment key={index}>
              <div className='m-5'><img src={img.secure_url} alt="" /></div>
            </React.Fragment>
          ))}
        </div>
        
        <div className="col-lg-8">
          <h2>{data.name}</h2>
          <p>{data.price}</p>
          <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product
