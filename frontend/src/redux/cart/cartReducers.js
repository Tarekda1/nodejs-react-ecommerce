import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
} from "./types";

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case CART_LIST_REQUEST:
      return { loading: true };
    case CART_LIST_SUCCESS:
      return { ...state, loading: false, cartItems: payload };
    case CART_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const cartAddReducer = (state = { response: 0 }, { type, payload }) => {
  switch (type) {
    case CART_ADD_REQUEST:
      return { addloading: true };
    case CART_ADD_SUCCESS:
      return { ...state, addloading: false, response: payload };
    case CART_ADD_FAIL:
      return { ...state, addloading: false, error: payload };
    default:
      return state;
  }
};
