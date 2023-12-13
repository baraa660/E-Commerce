import React, { useContext, useEffect } from 'react'

import { RouterProvider } from 'react-router-dom'


import { CartContextProvider } from './components/web/context/Cart.jsx';

import UserContextProvider, { UserContext } from './components/web/context/User.jsx';

import {router} from './layouts/Routes.jsx'


export default function App() {

    let {setUserToken} = useContext(UserContext);

    useEffect(() => {
        // Use useEffect to run the code only after the initial render
        const storedToken = localStorage.getItem('userToken');
        
        if (storedToken !== null) {
          setUserToken(storedToken);
        }
      }, []); // Empty dependency array ensures the effect runs only once


    return (
      <div>
        
          <CartContextProvider>
            <RouterProvider router={router} />
          </CartContextProvider>
        
      </div>
    );
}

