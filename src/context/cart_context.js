import { useReducer, useContext , createContext, useEffect } from 'react';
import reducer from "../reducer/cartReducer"

const CartContext = createContext();

const CartProvider = ({children}) =>{

    const getLocalCartData = () =>{
        let localCartData = localStorage.getItem("ShopCart")
        // if( localCartData=== []){
        //     return [];
        // }
        // else{
        //     return JSON.parse( localCartData)
        // }
        const parsedData = JSON.parse(localCartData);
        if(!Array.isArray(parsedData)) return [];
        return parsedData;
    }
    const initialState = {
        // cart : [],
        cart : getLocalCartData(),
        total_item : "",
        total_price : "",
        shipping_fee : 5000,
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const addToCart = (id, color, amount, product) =>{
        dispatch({type : "ADD_TO_CART", payload :{id, color, amount, product} })
    }

    //to increment and decrement
    const setDecrease = (id) =>{
        dispatch({ type : "SET_DECREMENT", payload : id});
    }

    const setIncrease = (id) =>{
        dispatch({ type : "SET_INCREMENT", payload : id});
    }

    const removeItem = (id) =>{
        dispatch({type : "REMOVE_ITEM", payload : id});
    }

    //to clear the cart
    const clearCart = () =>{
        dispatch({type : "CLEAR_CART"});
    }

    // to add the data in local storage 
    useEffect(() =>{
        // dispatch({type : "CART_TOTAL_ITEM"});
        // dispatch({ type : "CART_TOTAL_PRICE"});
        dispatch({type : "CART_ITEM_PRICE_TOTAL"});
        localStorage.setItem("ShopCart", JSON.stringify(state.cart))
    }, [state.cart])

    return (
        <CartContext.Provider value = {{...state , addToCart, removeItem, clearCart, setDecrease, setIncrease}}>
            {children}
        </CartContext.Provider>
    )
};

const useCartContext = () =>{
    return useContext(CartContext);
}
export {CartProvider, useCartContext};