import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';
import Loader from '../../Loader.jsx';
import styles from './profile.module.css'



export default function UserInfo() {
    let {userData , Loading} = useContext(UserContext);
    if(Loading){
        return <Loader/>
      }
  return (
    <div>
      <div><img src={userData?.image.secure_url} alt="Profile" className={styles['profile-image']} /></div>
      <h2>{userData?.userName}</h2>

    </div>
  )
}
