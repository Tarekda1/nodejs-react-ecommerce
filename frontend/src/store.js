import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {
  productListReducer,
  productReducer,
} from "./redux/products/productReducers";
import { cartReducer, cartAddReducer } from "./redux/cart/cartReducers";
import thunk from "redux-thunk";

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productReducer,
  cart: cartReducer,
  cartAdd: cartAddReducer,
});
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
