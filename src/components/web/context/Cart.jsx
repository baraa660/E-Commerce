import axios from "axios";
import { createContext, useEffect} from "react";
import { toast } from "react-toastify";

export const cartcontext=createContext(null);

export function CartContextProvider({children}){

    

    const addToCartContext= async(productId)=>{
        try{
            const token = localStorage.getItem("userToken")
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            )
            if(data.message=='success'){
                toast.success('product added Successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }

            return data
        }
        catch(error){
            toast.error('product already added to Cart!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

    }

    const getCardContext = async()=>{
        try{
            const token = localStorage.getItem("userToken");
            const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization:`Tariq__${token}`}}            
            );
                
            return data ;
            }
        catch(error){
            
            console.log(`the error is: ${error}`);

        }
    }

    

    const removeItemContext= async(productId)=>{

        try{
            const token = localStorage.getItem("userToken")
            const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{productId}
            ,{
                headers:{Authorization:`Tariq__${token}`}
            })
            return data
        }
        catch(error){
            console.log(error);
        }

    }

    const increaseQuantityContext= async(productId)=>{
        
        try{
            const token =  localStorage.getItem("userToken");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
            {productId},
            {
                headers:{Authorization:`Tariq__${token}`}
            })

            return data
        }
        catch(error){
            console.log(error);
        }
    }

    const decreaseQuantityContext= async(productId)=>{
        
        try{
            const token =  localStorage.getItem("userToken");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
            {productId},
            {
                headers:{Authorization:`Tariq__${token}`}
            })

            return data
        }
        catch(error){
            console.log(error);
        }
    }

    const clearCartContext= async(productId)=>{
        
        try{
            const token =  localStorage.getItem("userToken");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{},
            {
                headers:{Authorization:`Tariq__${token}`}
            }
            )
            toast.success('Cart Cleared Successully!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return data
        }
        catch(error){
            console.log(error);
        }
    }

    return <cartcontext.Provider value={{addToCartContext,getCardContext,removeItemContext,
    increaseQuantityContext,decreaseQuantityContext,clearCartContext}}>
        {children}
    </cartcontext.Provider>
}