import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';
import Loader from '../../Loader.jsx';
import styles from './profile.module.css'

export default function UserContact() {
    let {userData , Loading} = useContext(UserContext);
    if(Loading){
        return <Loader/>
      }
  return (
    <div>
      <p>Email: {userData?.email}</p>
      <p>Role: {userData.role}</p>
      <p>Status: {userData.status}</p>
      <p>confirmEmail: {userData.confirmEmail?<span className="text-primary">Confirmed</span> : <span className="text-danger">Not Confirmed</span>}</p>
    </div>
  )
}
