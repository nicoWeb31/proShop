import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';//for devtools

//_____________________reducer_______________________________________________
import {productListReducer, productDetailsReducer } from './reducers/productReducer';
import {cartReducer} from './reducers/cartReducer';
import {userLoginReducer} from './reducers/usersReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
}); 

//storage state initial with data in storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];

const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo:userInfoFromStorage},
};

const middleware = [thunk]
const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;