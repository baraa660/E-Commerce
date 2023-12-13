import React, { useContext, useState } from 'react'
import { UserContext } from '../context/User.jsx';
import './profile.css'

function Profile() {

    let {userData} = useContext(UserContext);

    const [showDetails, setShowDetails] = useState(false);

    

    const handleDetailsClick = () => {
        setShowDetails(!showDetails);
      };
  return (
    <div className="profile-container">
    <img src={userData?.image.secure_url} alt="Profile" className="profile-image" />
    <div className="profile-details">
      <h2>Name: {userData?.userName}</h2>
      <p>Email: {userData?.email}</p>

      {showDetails && (
          <>
            <p>Role: {userData.role}</p>
            <p>Status: {userData.status}</p>
            <p>Account Created At: {new Date(userData.createdAt).toLocaleString()}</p>
            <p>confirmEmail: {userData.confirmEmail?<span className="text-primary">Confirmed</span> : <span className="text-danger">Not Confirmed</span>}</p>
          </>
        )}

        <button className="details-button" onClick={handleDetailsClick}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
    </div>
  </div>
  )
}

export default Profile
