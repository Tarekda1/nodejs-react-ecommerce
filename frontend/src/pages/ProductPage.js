import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../redux/products/productsActions";
import { addToCart } from "../redux/cart/cartActions";

export const ProductPage = (props) => {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const cartAdd = useSelector((state) => state.cartAdd);
  const { product, loading, error } = productDetails;
  const { response, addloading, addError } = cartAdd;
  const dispatch = useDispatch();

  useEffect(() => {
    const productId = props.match.params.id;
    dispatch(detailsProduct(productId));
    return () => {};
  }, []);

  useEffect(() => {
    if (response && response == 1) {
      //update product
      dispatch(detailsProduct(props.match.params.id, true));
    }
    return () => {};
  }, [response]);

  const addToCartHandler = (e) => {
    if (!addloading && response == 1) {
      props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    } else {
      dispatch(addToCart(props.match.params.id, qty));
    }
  };

  return (
    <div>
      <div className="back">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="mainWrapper">
          <div className="product-wrapper">
            <div className="product-image-wrapper">
              <Link to={`/products/${product._id}`}>
                <img
                  className="details-image"
                  src={product.image}
                  alt="product"
                />
              </Link>
            </div>
            <div className="product-details">
              <div className="details-name">
                <h4>{product.name}</h4>
              </div>
              <div className="details-rating">
                {product.rating} Stars <b>({product.numReviews} Reviews)</b>
              </div>
              <div className="details-brand">{product.brand}</div>
              <div className="details-price">Price: {product.price}</div>
              <div className="details-description">
                <b> Description: </b>
                <p>{product.description}</p>
              </div>
            </div>
            <div className="details-action">
              <div className="inner">
                <ul>
                  <li>
                    <b>Price:</b> {product.price}
                  </li>
                  <li>
                    <b>Status:</b>{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </li>
                  <li>
                    <b>Qty:</b>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((v, i) => {
                        return <option key={i + 1}>{i + 1}</option>;
                      })}
                    </select>
                  </li>
                  <li>
                    {product.countInStock > 0 && (
                      <button
                        disabled={addloading}
                        onClick={addToCartHandler}
                        className="primary"
                      >
                        {!loading &&
                        !addloading &&
                        response == 0 &&
                        product.itemInCart === false
                          ? "Add to Cart"
                          : !loading &&
                            addloading &&
                            product.itemInCart === false
                          ? "Adding to Cart..."
                          : !addloading && product.itemInCart === true
                          ? "Go to checkout"
                          : "Add to cart"}
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
