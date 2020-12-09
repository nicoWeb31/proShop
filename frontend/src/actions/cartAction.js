import axios from 'axios';

import {
    CART_ADD_ITEMS,
    CART_REMOVE_ITEMS,
    CART_SAVE_SHIPPING_ADRESS,
} from '../constants/cartConstants';

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
            qty,
        },
    });
    //storage du pannier
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEMS,
        payload: id,
    });

    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
    );
};

export const saveShippingAdress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADRESS,
        payload: data,
    });

    localStorage.setItem('cartItems', JSON.stringify(data));
};
