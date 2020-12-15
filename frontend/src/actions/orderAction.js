import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_FAIL,
    // ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_OWN_LIST_FAIL,
    ORDER_OWN_LIST_SUCCESS,
    ORDER_OWN_LIST_REQUEST,
    ORDER_GET_ALL_REQUEST,
    ORDER_GET_ALL_SUCCESS,
    ORDER_GET_ALL_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAIL
} from '../constants/orderConstants';

import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: ORDER_CREATE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/orders`, order, config);
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order,
        });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: ORDER_DETAILS_REQUEST });
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: ORDER_PAY_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config);
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data.order,
        });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const ListOwnOrder = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: ORDER_OWN_LIST_REQUEST });
        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.get(`/api/orders/myorders`, config);
        dispatch({
            type: ORDER_OWN_LIST_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: ORDER_OWN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const getAllOrder = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: ORDER_GET_ALL_REQUEST });
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.get(`/api/orders`, config);
        dispatch({
            type: ORDER_GET_ALL_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: ORDER_GET_ALL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const OrderDelivered = (order) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: ORDER_DELIVERED_REQUEST });
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        await axios.patch(`/api/orders/${order._id}/deliver`,{}, config);
        dispatch({
            type: ORDER_DELIVERED_SUCCESS,
        });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};