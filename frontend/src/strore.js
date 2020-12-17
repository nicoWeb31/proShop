import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; //for devtools

//_____________________reducer_______________________________________________
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productEditReducer,
    ProductCreateReviewReducer,
    ProductTopRatedReducer
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/usersReducers';
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderOwnListReducer,
    orderGetAllReducer,
    orderDeliveredReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete:productDeleteReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderOwnList: orderOwnListReducer,
    orderGetAll:orderGetAllReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate:userUpdateReducer,
    productCreate:productCreateReducer,
    productEdit:productEditReducer,
    orderDelivered:orderDeliveredReducer,
    ProductCreateReview:ProductCreateReviewReducer,
    ProductTopRated:ProductTopRatedReducer
});

//storage state initial with data in storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;
const shippingAdressFromStorage = localStorage.getItem('shippingAdress')
    ? JSON.parse(localStorage.getItem('shippingAdress'))
    : {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAdress: shippingAdressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
