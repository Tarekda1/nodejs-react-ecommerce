import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
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

export { productListReducer };
