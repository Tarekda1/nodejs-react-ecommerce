import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  CART_ADD_ITEM,
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
