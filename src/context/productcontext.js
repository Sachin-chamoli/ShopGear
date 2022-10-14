import axios from 'axios';
import { useEffect } from 'react';
import { createContext, useContext } from 'react'

    const AppContext = createContext()

    const API = "https://api.pujakaitem.com/api/products";
    const AppProvider = ({children}) =>{

        const getProducts = async (url)=>{
            const res = await axios(url);
            const products = await res.data;
            console.log(products)
        }

        useEffect(()=>{
            getProducts(API);
        }, [])


        return <AppContext.Provider value={{myName :"Sachin"}}>
            {children}
        </AppContext.Provider>
    };

    // custom hook
    const useProductContext = () =>{
        return  useContext(AppContext);
    }
export {AppProvider, AppContext, useProductContext}
