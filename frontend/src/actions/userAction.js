import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
} from '../constants/userConstant';
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
