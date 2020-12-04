import {
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants.js';

import axios from 'axios';

export const listPoducts = () => async (dispatch) => {
    try {
        //on dispatch la request pour le loading par exemple
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get('/api/products');
        console.log("🚀 ~ file: productsAction.js ~ line 19 ~ listPoducts ~ data", data)
        //on dispatch les datas.. stop loading and display the data
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: PRODUCT_LIST_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
