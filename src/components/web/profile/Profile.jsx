import React, { useContext, useState } from 'react'
import { UserContext } from '../context/User.jsx';
import './Profile.css'
import Loader from '../../Loader.jsx';
import { Link, Outlet } from 'react-router-dom';
import styles from './profile.module.css'



function Profile() {

    let {userData , Loading} = useContext(UserContext);

    const [showDetails, setShowDetails] = useState(false);

    

    const handleDetailsClick = () => {
        setShowDetails(!showDetails);
      };

      if(Loading){
        return <Loader/>
      }



  return (
    <>
      <aside className={styles["profile"]}>
        <div className={styles["ProfileLinks"]}>
          <nav>
            <Link to="info">info</Link>
            <Link to="contact">contact</Link>
            <Link to="orders">orders details</Link>
          </nav>
        </div>

        <div className={styles["userData"]}>
          <Outlet />
        </div>
      </aside>
    </>
  );
}

export default Profile
