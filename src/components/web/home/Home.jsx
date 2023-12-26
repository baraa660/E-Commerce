import React from 'react'
import Categories from '../categories/Categories.jsx'
import  styles  from './Home.module.css';
import AboutUs from '../aboutUs/AboutUs.jsx';

export default function Home() {
  return (
    <div className={styles["home"]}>
      <AboutUs/>
      <Categories/>
    </div>
  )
}
