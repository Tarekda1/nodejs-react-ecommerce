import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartDetails } from "../redux/cart/cartActions";
import { listProducts } from "../redux/products/productsActions";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, loading, error } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartDetails());
    return () => {};
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="mainWrapper">
          {cartItems.map((i) => {
            return <div>{i._id}</div>;
          })}
        </div>
      )}
    </div>
  );
};
