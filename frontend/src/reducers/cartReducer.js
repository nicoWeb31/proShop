import {CART_ADD_ITEMS,CART_REMOVE_ITEMS} from '../constants/cartConstants';

export const cartReducer = (state ={cartIems:[]} , action)=>{
    switch (action.type) {

        case CART_ADD_ITEMS :
            const item = action.payload;
            const existItem = state.cartIems.find((x)=> x.product === item.product)
            if(existItem){
                return{
                    ...state,
                    cartIems:state.cartIems.map((x)=>
                        x.product === existItem.product ? item : x 
                )}
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        default: return state;
    }
}