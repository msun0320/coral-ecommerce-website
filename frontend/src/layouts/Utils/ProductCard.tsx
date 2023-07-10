import React from "react";
import ProductModel from "../../models/ProductModel";
import { Link } from "react-router-dom";

export const ProductCard: React.FC<{ product: ProductModel }> = (props) => {
  return (
    <Link
      to={`/products/${props.product.id}`}
      className="card border-0 text-decoration-none"
    >
      {props.product.img ? (
        <img
          src={props.product.img}
          className="card-img-top rounded-0"
          alt={props.product.description}
        />
      ) : (
        <img
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          className="card-img-top rounded-0"
          alt="Fjallraven - Foldsack No. 1 Backpack, Fits 15"
        />
      )}
      <div className="card-body rounded-0">
        <h5 className="card-title fs-6">{props.product.name}</h5>
        <p className="card-text d-flex justify-content-between">
          <small className="text-body-secondary">
            {props.product.category}
          </small>
          <span>${props.product.price}</span>
        </p>
      </div>
    </Link>
  );
};
