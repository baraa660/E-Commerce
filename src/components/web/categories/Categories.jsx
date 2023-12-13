import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Loader from '../../Loader.jsx';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';

import './Categories.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

export default function Categories() {

  

  const getCategories =async () =>{
    const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=50`)
    
    return data
  }

  const {data,isLoading}=useQuery('webCategories',getCategories);

  if(isLoading){
    return <Loader/>
  }

  

  return (
    <div className='container'>
    <div className='swiper-custom-pagination'></div>
<Swiper
      modules={[Navigation, Pagination,Autoplay]}
      spaceBetween={50}
      slidesPerView={6.5}
      navigation
      loop={true}
      autoplay={{
        delay:3000
      }}
      pagination={{ clickable: true,
      el:'.swiper-custom-pagination' }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data?.categories.length ? data?.categories.map((category)=>
      <SwiperSlide key={category._id}>
        <Link to={`products/category/${category._id}`}>
        <div className='category'>
        <img src={category.image.secure_url} alt="" />
        
        </div>
        </Link>
        </SwiperSlide>

      ):<h2>no category found</h2>
    }
    
    </Swiper>
    </div>
  )
}
