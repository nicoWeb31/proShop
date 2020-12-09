import {
    CART_ADD_ITEMS,
    CART_REMOVE_ITEMS,
    CART_SAVE_SHIPPING_ADRESS,
    CART_SAVE_PAYMEMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (
    state = { cartItems: [], shippingAdress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEMS:
            const item = action.payload;
            console.log(
                '🚀 ~ file: cartReducer.js ~ line 8 ~ cartReducer ~ item',
                item
            );
            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case CART_REMOVE_ITEMS:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.product !== action.payload
                ),
            };

        case CART_SAVE_SHIPPING_ADRESS:
            return {
                ...state,
                shippingAdress: action.payload,
            };

        case CART_SAVE_PAYMEMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };

        default:
            return state;
    }
};
