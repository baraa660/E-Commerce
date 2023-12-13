import axios from "axios";
import { createContext} from "react";
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
                    autoClose: false,
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
            console.log(error);
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

    return <cartcontext.Provider value={{addToCartContext,getCardContext,removeItemContext}}>
        {children}
    </cartcontext.Provider>
}