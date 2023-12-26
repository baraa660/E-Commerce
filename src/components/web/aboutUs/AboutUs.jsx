import React from 'react';
import styles from './AboutUs.module.css'; // Import your CSS module

const AboutUs = () => {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.aboutUsContent}>
      <h2 className='mb-5'>Welcome to B-Shop</h2>
        <p>
          At B-Shop, we're not just a store; we're a destination for discovery and innovation. Our journey began in the vibrant year of 2023, where a group of passionate individuals came together to redefine the shopping experience.
        </p>
        <p>
          B-Shop is more than just a marketplace; it's a celebration of curated collections, cutting-edge designs.
        </p>
        
        <p>
          From fashion-forward apparel to must-have accessories, B-Shop is your go-to destination for elevating your lifestyle.
        </p>
        <p>
          Thank you for choosing B-Shop.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;