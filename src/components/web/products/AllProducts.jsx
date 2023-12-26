import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../Loader.jsx'
import { useFormik } from 'formik';
import { priceSchema,searchSchema } from '../validation/Validate.js';

import StarRating from './StarRating';

import styles from './AllProducts.module.css';

export default function AllProducts() {

  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate= useNavigate();
  const currentUrl = window.location.search;
  const searchParams = new URLSearchParams(currentUrl);
  let initialPage = searchParams.get('page');
  const initialLimit = searchParams.get('limit');
  const initialSort = searchParams.get('sort');
  const initialMinValue = searchParams.get('minvalue');
  const initialMaxValue = searchParams.get('maxvalue');
  const initialSearch = searchParams.get('search');
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sort, setSort] = useState(initialSort);
  const [minValue, setMinValue] = useState(initialMinValue);
  const [maxValue, setMaxValue] = useState(initialMaxValue);
  const [search, setSearch] = useState(initialSearch);

  const initialValues = {
    minPrice: "",
    maxPrice: ""
  };

  const initialValues2 = {
    search: ""
  };

  const onSubmit= users => {
    // Get the current query parameters
    const currentParams = new URLSearchParams(window.location.search);
    // Update the 'limit' parameter
    currentParams.set('minvalue', users.minPrice);
    currentParams.set('maxvalue', users.maxPrice);
    // Build the new URL with updated query parameters
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    // Use the navigate function to update the URL
    navigate(newUrl);

  }
  const onSubmit2= users => {
    const currentParams = new URLSearchParams(window.location.search);
    // Update the 'limit' parameter
    currentParams.set('search', users.search);
    // Build the new URL with updated query parameters
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    // Use the navigate function to update the URL
    navigate(newUrl);
  }

  const formik = useFormik({
    initialValues,//shortcut of : initialValues:initialValues,
    onSubmit,  //shortcut of : onSubmit:onSubmit,
    validationSchema:priceSchema,
  });

  const formik2 = useFormik({
    initialValues:initialValues2,//shortcut of : initialValues:initialValues,
    onSubmit:onSubmit2,  //shortcut of : onSubmit:onSubmit,
    validationSchema:searchSchema,
  });

  const handleAllProducts=()=>{
    getAllProducts();
  }

    

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}
      ${limit ? `&limit=${limit}`:''} ${sort ? `&sort=${sort}`:''}${minValue ? `&price[gte]=${minValue}`:''} 
      ${maxValue ? `&price[lte]=${maxValue}`:''}${search ? `&search=${search}`:''}`);


      setData(response.data.products);
      
      setTotal(response.data.total)
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [limit,page,sort,minValue,maxValue,search]);

   useEffect(() => {
    // Update component state when the URL changes
   const currentUrl = window.location.search;
  const searchParams = new URLSearchParams(currentUrl);
    setPage(searchParams.get('page'));
    setLimit(searchParams.get('limit'));
    setSort(searchParams.get('sort'));
    setMinValue(searchParams.get('minvalue'));
    setMaxValue(searchParams.get('maxvalue'));
    setSearch((searchParams.get('search')));
  }, [limit,page,sort,currentUrl,minValue,maxValue,search]);

    if(isLoading){
      return <Loader/>
    }


    const handleNumOfElements=(value)=>{
      // Get the current query parameters
      const currentParams = new URLSearchParams(window.location.search);
      // Update the 'limit' parameter
      currentParams.set('limit', value);
      // Build the new URL with updated query parameters
      const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

      // Use the navigate function to update the URL
      navigate(newUrl);
      
      
  }

  const handlePagination =(value)=>{
    const currentParams = new URLSearchParams(window.location.search);
    // Update the 'limit' parameter
    currentParams.set('page', value);
    // Build the new URL with updated query parameters
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    
    // Use the navigate function to update the URL
    navigate(newUrl);
    
    

  }

  const nextPage =()=>{

    //to check if im in the last page so i can't go next 
    let totalPages=null;
    if(limit){
       totalPages = Math.ceil(total / limit);
    }
    else{
       totalPages = Math.ceil(total / 4);
    }
    if(page>=totalPages){
    } else{
      const currentParams = new URLSearchParams(window.location.search);
    // Update the 'page' parameter
    let nextPage=parseInt(page?page:1)+1;
    currentParams.set('page', nextPage);
    // Build the new URL with updated query parameters
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    
    // Use the navigate function to update the URL
    navigate(newUrl);
    }
  }

  const previousPage=()=>{
    //to check if iam in the first page so i can't go previous 
    if(page<=1){

    } else{
      const currentParams = new URLSearchParams(window.location.search);
    // Update the 'page' parameter
    let prevPage=parseInt(page?page:1)-1;
    currentParams.set('page', prevPage);
    // Build the new URL with updated query parameters
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    
    // Use the navigate function to update the URL
    navigate(newUrl);
    }
  }

  const handleSort=(value)=>{
    // Get the current query parameters
    const currentParams = new URLSearchParams(window.location.search);
    // Update the 'limit' parameter
    currentParams.set('sort', value);
    // Build the new URL with updated query parameters
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    // Use the navigate function to update the URL
    navigate(newUrl);
}


  const renderPagenaionLinks = () => {
    let totalPages=null;
    if(limit){
       totalPages = Math.ceil(total / limit);
    }
    else{
       totalPages = Math.ceil(total / 4);
    }
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <li key={i} className="page-item">
          <Link
            className="page-link"
            onClick={() => handlePagination(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return links;
  };

  const resetinputs =()=>{
    navigate('')
  }

  return (
    <div className="products">
      <div className={styles.displaySortContainer}>
      <div>
      <div className='text-center'>Display</div>
      <select
  onChange={(event) => handleNumOfElements(event.target.value)}
  name="numOfElements"
  id="numOfElements"
  style={{
    padding: '5px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s ease-in-out',
  }}
>
  <option value="">default</option>
  <option value="4">4</option>
  <option value="2">2</option>
</select>


      </div>

      <div>
      <div className='text-center'>Sort By</div>
      <select onChange={() => handleSort(event.target.value)} name="sort" id="sort"
      style={{
        padding: '5px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'border-color 0.3s ease-in-out',
      }}>
        <option value="">default</option>
        <option value="price">price</option>
        <option value="-price">-price</option>
        <option value="-name">-name</option>
        <option value="name">name</option>
        <option value="discount">discount</option>
        <option value="-discount">-discount</option>
      </select>
      </div>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <input
          className={`${styles.input} ${styles.ms3} ${styles.w25}`}
          placeholder="min price"
          type="text"
          name="minPrice"
          id="minPrice"
          value={formik.values.minPrice}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className={`${styles.ms4} ${styles.textAlignStart}`}>
          {formik.touched && formik.errors.minPrice && (
            <p className={`${styles.text} ${styles.textDanger}`}>{"Number!"}</p>
          )}
        </div>
        <input
          className={`${styles.input} ${styles.ms3} ${styles.w25}`}
          placeholder="max price"
          type="text"
          name="maxPrice"
          id="maxPrice"
          value={formik.values.maxPrice}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className={`${styles.ms4} ${styles.textAlignStart}`}>
          {formik.touched && formik.errors.maxPrice && (
            <p className={`${styles.text} ${styles.textDanger}`}>{"Number!"}</p>
          )}
        </div>
        <div className={`${styles.py10} ${styles.px40}`}>
        <button type="submit" className="btn btn-info">Go</button>
        </div>
      </form>

      <button onClick={resetinputs} className={styles.button}>reset all inputs</button>

      <form onSubmit={formik2.handleSubmit} className={styles.form}>
        <input
          className={`${styles.search} ${styles.input} ${styles.ms3} ${styles.w25}`}
          placeholder="search"
          type="text"
          name="search"
          id="search"
          value={formik2.values.search}
          onBlur={formik2.handleBlur}
          onChange={formik2.handleChange}
        />
        <div className={`${styles.ms4} ${styles.textAlignStart}`}>
          {formik2.touched && formik2.errors.search && (
            <p className={`${styles.text} ${styles.textDanger}`}>{"string!"}</p>
          )}
        </div>

        <div className={`${styles.py10} ${styles.px40}`}>
          <button type='submit' className='btn btn-outline-info'>Search</button>
          
        </div>
      </form>
    </div>


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
      <nav className='d-flex justify-content-center' aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <Link className="page-link" onClick={previousPage} >
              Previous
            </Link>
          </li>
          {renderPagenaionLinks()}
          <li className="page-item">
            <Link className="page-link"  onClick={nextPage}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
