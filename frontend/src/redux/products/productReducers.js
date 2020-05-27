import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "./types";

function productListReducer(state = { products: [] }, { type, payload }) {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, products: payload, loading: false };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

function productReducer(state = { product: {} }, { type, payload }) {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, product: payload, loading: false };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}

export { productListReducer, productReducer };
