import { useReducer, useContext , createContext, useEffect } from 'react';
import reducer from "../reducer/cartReducer"

const CartContext = createContext();

const CartProvider = ({children}) =>{

    const getLocalCartData = () =>{
        let localCartData = localStorage.getItem("ShopCart")
        if( localCartData=== []){
            return [];
        }
        else{
            return JSON.parse( localCartData)
        }

    }
    const initialState = {
        // cart : [],
        cart : getLocalCartData(),
        total_item : "",
        total_amount : "",
        shipping_fee : 50000,
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const addToCart = (id, color, amount, product) =>{
        dispatch({type : "ADD_TO_CART", payload :{id, color, amount, product} })
    }

    const removeItem = (id) =>{
        dispatch({type : "REMOVE_ITEM", payload : id})
    }

    // to add the data in local storage 
    useEffect(() =>{
        localStorage.setItem("ShopCart", JSON.stringify(state.cart))
    }, [state.cart])

    return <CartContext.Provider value = {{...state , addToCart, removeItem}}>{children}</CartContext.Provider>
};

const useCartContext = () =>{
    return useContext(CartContext);
}
export {CartProvider, useCartContext};