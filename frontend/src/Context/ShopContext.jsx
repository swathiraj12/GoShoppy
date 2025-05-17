import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => {

    const [all_product, setall_product] = useState([]);
    const [cartItems, setcartItems] = useState(getDefaultCart());

    useEffect(() => {
        const fetchAllProducts = async () => {
          try {
            const response = await axios.get('https://goshoppy-backend.onrender.com/getallproduct');
            // Ensure the data is an array
            if (Array.isArray(response.data.getProduct)) {
                setall_product(response.data.getProduct);
            } else {
              console.error('Expected an array but got:', response.data.getProduct);
              setall_product([]);
            }
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchAllProducts();
      }, []);
    
    const addToCart = (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        if(localStorage.getItem('token')) {
            axios.post('https://goshoppy-backend.onrender.com/addtocart',
            {
                itemId:itemId
            },
            {
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error('Error adding to cart:', err);
            });
        }
    };
        
    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(localStorage.getItem('token')) {
            axios.post('https://goshoppy-backend.onrender.com/removefromcart',
            {
                itemId:itemId
            },
            {
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error('Error adding to cart:', err);
            });
        }
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems =()=>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    } 
    const contextvalue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };
    return (
        <ShopContext.Provider value={contextvalue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;