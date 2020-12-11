import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAIL_RESET,
    USER_LIST_REQUEST,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_RESET
} from '../constants/userConstant';
import {ORDER_OWN_LIST_RESET} from '../constants/orderConstants'
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            `/api/users/login`,
            { email, password },
            config
        );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user,
        });
        localStorage.setItem('userInfo', JSON.stringify(data.user));
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            `/api/users`,
            { name, email, password },
            config
        );
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.user,
        });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user,
        });
        localStorage.setItem('userInfo', JSON.stringify(data.user));
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: USER_DETAIL_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: USER_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`,user, config);
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getAllUserForAdmin = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: USER_LIST_REQUEST });

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users`,config);
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data.users,
        });
    } catch (error) {
        //dispatch des errors
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({type: USER_DETAIL_RESET})
    dispatch({type: ORDER_OWN_LIST_RESET})
    dispatch({type : USER_DETAIL_RESET})

};
