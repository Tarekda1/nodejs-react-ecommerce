import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
} from "./types";

import axios from "axios";

export const cartDetails = () => async (dispatch) => {
  try {
    dispatch({ type: CART_LIST_REQUEST });
    const { data } = await axios.get("/api/cart");
    console.log(JSON.stringify(data));
    dispatch({ type: CART_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CART_LIST_FAIL, payload: error.message });
  }
};

export const addToCart = (productId, qty) => async (dispatch) => {
  try {
    dispatch({ type: CART_ADD_REQUEST });
    const response = await axios.post("/api/cart", {
      productId,
      qty,
    });
    dispatch({ type: CART_ADD_SUCCESS, payload: response.data.response });
  } catch (error) {
    dispatch({ type: CART_ADD_FAIL, payload: error.message });
  }
};

export const removeFromCart = (productId) => async (dispatch) => {};
