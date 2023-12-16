import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';
import Loader from '../../Loader.jsx';
import { useQuery } from 'react-query';
import styles from './Orders.module.css'; // Import the stylesimport styles from './Orders.module.css'; // Import the styles

export default function Orders() {

    const {getOrdersContext} = useContext(UserContext);

    const getOrders = async () => {
        const res = getOrdersContext();
        
        return res;
      };

      const { data,isLoading} = useQuery("orders", getOrders);

      if(isLoading){
        return <Loader/>
      }
      
  return (
    <div>
      {data.orders.map((order) => (
        <div key={order._id} className={styles['order-container']}>
          <h3>Order Information</h3>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Coupon Name:</strong> {order.couponName}</p>
          <p><strong>Created At:</strong> {order.createdAt}</p>
          <p><strong>Final Price:</strong> {order.finalPrice}</p>
          <p><strong>Payment Type:</strong> {order.paymentType}</p>
          <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
          <p><strong>Products:</strong></p>
          <ol>
            
            {order.products.map((product) => (
              <li key={product._id}>
              <strong>Quantity:</strong> {product.quantity} - 
              <strong> Price:</strong> {product.finalPrice}
            </li>
            ))}
          </ol>
          <button onClick={() => onCancelOrder(order._id)}>Cancel Order</button>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  )
}
