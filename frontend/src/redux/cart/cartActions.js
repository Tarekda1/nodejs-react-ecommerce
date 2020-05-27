import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  CART_ADD_ITEM,
} from "./types";

import axios from "axios";

export const cartDetails = () => async (dispatch) => {
  try {
    dispatch({ type: CART_LIST_REQUEST });
    const { data } = await axios.get("/api/cart");
    dispatch({ type: CART_LIST_SUCCESS, payload: data.cartDetails });
  } catch (error) {
    dispatch({ type: CART_LIST_FAIL, payload: error.message });
  }
};
