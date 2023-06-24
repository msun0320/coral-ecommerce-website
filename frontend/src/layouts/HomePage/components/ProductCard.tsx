import React from "react";
import ProductModel from "../../../models/ProductModel";
import { Link } from "react-router-dom";

export const ProductCard: React.FC<{ product: ProductModel }> = (props) => {
  return (
    <Link
      to={`/product/${props.product.id}`}
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
          src="images/products/adicolor-classics-joggers.png"
          className="card-img-top rounded-0"
          alt="Adicolor Classics Joggers"
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
