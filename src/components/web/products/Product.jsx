import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loader from '../../Loader.jsx';
import axios from 'axios';

import { cartcontext } from '../context/Cart.jsx';


function Product() {
    const{productId}=useParams();
    const{addToCartContext, getCardContext}=useContext(cartcontext);

    const getproduct = async ()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)

        return data.product
    }

    const {data, isLoading}= useQuery('product', getproduct)
    
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
