import axios from 'axios';

import { CART_ADD_ITEMS } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    
    dispatch({
        type: CART_ADD_ITEMS,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            countInStock: data.product.countInStock,
            qty
        },
    });
    //storage du pannier
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};