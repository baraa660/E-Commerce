import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export let UserContext = createContext();

 export default function UserContextProvider({children}){

    const [userToken,setUserToken]= useState(null);

    const [userData,setUserData]= useState(null);

    const [Loading,setLoading]= useState(true);

    const getUserData= async ()=>{
        if(userToken){
            const{data} = await axios .get(`${import.meta.env.VITE_API_URL}/user/profile`,
            {headers:{Authorization:`Tariq__${userToken}`}})
            
            setUserData(data.user);

            setLoading(false);
        }
    }

    const getOrdersContext = async()=>{
        try {
          const token = localStorage.getItem("userToken");
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/order`,
            { headers: { Authorization: `Tariq__${token}` } }
          );

          return data;
        } catch (error) {
          console.log(`the error is: ${error}`);
        }
    }

    useEffect(()=>{
        getUserData()  
    },[userToken])
    
    return <UserContext.Provider value={{userToken , setUserToken , userData , setUserData, Loading ,getOrdersContext}}>
        {children}
    </UserContext.Provider>
 }