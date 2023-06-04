import React from "react";
import ProductModel from "../../../models/ProductModel";

export const ProductCard: React.FC<{ product: ProductModel }> = (props) => {
  return (
    <a href="#" className="card border-0 text-decoration-none">
      {props.product.img ? (
        <img
          src={props.product.img}
          className="card-img-top rounded-0"
          alt="Adicolor Classics Joggers"
        />
      ) : (
        <img
          src="images/products/adicolor-classics-joggers.png"
          className="card-img-top rounded-0"
          alt="Adicolor Classics Joggers"
        />
      )}
      <div className="card-body rounded-0">
        <h5 className="card-title fs-6">{props.product.title}</h5>
        <p className="card-text d-flex justify-content-between">
          <small className="text-body-secondary">
            {props.product.category}
          </small>
          <span>{`$${props.product.price}`}</span>
        </p>
      </div>
    </a>
  );
};
