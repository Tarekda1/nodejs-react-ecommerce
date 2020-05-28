import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartDetails, removeFromCart } from "../redux/cart/cartActions";
import { listProducts } from "../redux/products/productsActions";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, loading, error } = cart;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartDetails());
    return () => {};
  }, []);

  const deleteProductHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkout = (e) => {};

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="mainWrapper">
          <div className="cart-wrapper">
            <h3 className="pageHeader">Shopping Cart</h3>
            <div className="cart-outer">
              {cartItems.length > 0 ? (
                <>
                  <div className="cart-list">
                    <ul>
                      {cartItems.map((cartItem) => (
                        <li key={cartItem.productId}>
                          <div className="cart-item">
                            <div className="cart-image">
                              <img src={cartItem.image} alt={cartItem.name} />
                            </div>
                            <div className="cart-item-details">
                              <div>
                                <h4>{cartItem.name}</h4>
                              </div>
                              <div>
                                <b>
                                  <span className="qty">Qty:</span>
                                </b>
                                <select
                                  value={cartItem.qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(cartItem.countInStock).keys()].map(
                                    (v, i) => {
                                      return (
                                        <option key={i + 1}>{i + 1}</option>
                                      );
                                    }
                                  )}
                                </select>
                                <button
                                  type="button"
                                  className="buttonDelete"
                                  onClick={deleteProductHandler}
                                >
                                  Delete
                                </button>
                              </div>
                              <div>$ {cartItem.price}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="checkout-action">
                    <div className="inner">
                      <ul>
                        <li>
                          <div>
                            <b>Total Items:</b> (
                            {cartItems.reduce((a, c) => a + c.qty, 0)})
                          </div>
                          <div>
                            <b>Price:</b>{" "}
                            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            $
                          </div>
                        </li>
                        <li>
                          {cartItems.length > 0 && (
                            <button onClick={checkout} className="primary">
                              Checkout
                            </button>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  Cart is empty <Link to="/">Go to Shopping</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
