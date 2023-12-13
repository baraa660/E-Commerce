import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loader from '../../Loader.jsx';
import axios from 'axios';

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
        {data.length ? data.map((product)=>
        <div className='product' key={product._id}>
            <img src={product.mainImage.secure_url} alt="" />
            <h2>{product.name}</h2>
            <Link to={`/product/${product._id}`}> details</Link>
        </div>
        ):<h2>NO Products</h2>}
      
    </div>
  )
}

export default CategoriesDetails
