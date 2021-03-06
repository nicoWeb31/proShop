import {
    PRODUCT_CREATE_REVIEW_FAILURE,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_EDIT_FAILURE,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_PRODUCT_TOP_FAILURE,
    PRODUCT_PRODUCT_TOP_REQUEST,
    PRODUCT_PRODUCT_TOP_SUCCESS,
} from '../constants/productConstants.js';

import {
    PRODUCT_DETAILS_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILURE,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_FAILURE,
    PRODUCT_CREATE_SUCCESS
} from '../constants/productConstants.js';

import axios from 'axios';

export const listPoducts = (keyword='',pageNumber ='') => async (dispatch) => {
    try {
        //on dispatch la request pour le loading par exemple
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        console.log(
            '🚀 ~ file: productsAction.js ~ line 19 ~ listPoducts ~ data',
            data
        );
        //on dispatch les datas.. stop loading and display the data
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
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

export const productsDetails = (id) => async (dispatch) => {
    try {
        //on dispatch la request pour le loading par exemple
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);

        //on dispatch les datas.. stop loading and display the data
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: PRODUCT_DETAILS_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.delete(`/api/products/${id}`, config);

        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: PRODUCT_DELETE_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const createProduct = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.post(`/api/products`,{},config);

        dispatch({ type: PRODUCT_CREATE_SUCCESS,payload: data.product});
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: PRODUCT_CREATE_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};



export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: PRODUCT_EDIT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.patch(`/api/products/${product._id}`,product,config);

        dispatch({ type: PRODUCT_EDIT_SUCCESS,payload: data.product});
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: PRODUCT_EDIT_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createReviewProduct = (productId,review) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.post(`/api/products/${productId}/review`,review,config);

        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS});
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const listTopPoducts = () => async (dispatch) => {
    try {
        
        dispatch({ type: PRODUCT_PRODUCT_TOP_REQUEST });
        const { data } = await axios.get(`/api/products/top`);
        console.log("🚀 ~ file: productsAction.js ~ line 196 ~ listTopPoducts ~ data", data)

        dispatch({ type: PRODUCT_PRODUCT_TOP_SUCCESS, payload: data.topProduct });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: PRODUCT_PRODUCT_TOP_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};