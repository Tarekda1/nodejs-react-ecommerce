import React, { useEffect } from "react";
import data from "../data/data";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../redux/products/productsActions";

export const ProductPage = (props) => {
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch;

  useEffect(() => {
    dispatch(detailsProduct(productId));
    return () => {};
  }, []);
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
                    <b>Status:</b> {product.status}
                  </li>
                  <li>
                    <b>Qty:</b>{" "}
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </li>
                  <li>
                    <button className="primary">Add to Cart</button>
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
