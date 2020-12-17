import {
    PRODUCT_CREATE_REVIEW_FAILURE,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_EDIT_FAILURE,
    PRODUCT_EDIT_RESET,
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
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILURE,
    PRODUCT_CREATE_RESET,
    PRODUCT_EDIT_REQUEST,
} from '../constants/productConstants.js';

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: [],
            };

        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages:action.payload.pages,
                page:action.payload.page
            };
        case PRODUCT_LIST_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export const productDetailsReducer = (
    state = { product: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
        case PRODUCT_DETAILS_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true,
            };

        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case PRODUCT_DELETE_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true,
            };

        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload,
            };
        case PRODUCT_CREATE_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }
        case PRODUCT_CREATE_RESET:
            return {};
        default: {
            return state;
        }
    }
};

export const productEditReducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
            return {
                loading: true,
            };

        case PRODUCT_EDIT_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload,
            };
        case PRODUCT_EDIT_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }
        case PRODUCT_EDIT_RESET:
            return {product:{}};
        default: {
            return state;
        }
    }
};


export const ProductCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true,
            };

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case PRODUCT_CREATE_REVIEW_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {product:{}};
        default: {
            return state;
        }
    }
};



export const ProductTopRatedReducer = (state = {productsTop: []}, action) => {
    switch (action.type) {
        case PRODUCT_PRODUCT_TOP_REQUEST:
            return {
                loading: true,
            };

        case PRODUCT_PRODUCT_TOP_SUCCESS:
            return {
                loading: false,
                productsTop: action.payload,
            };
        case PRODUCT_PRODUCT_TOP_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
