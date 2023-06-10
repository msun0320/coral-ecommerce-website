import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { SpinnerLoading } from "../HomePage/Utils/SpinnerLoading";
import { StarsReview } from "../HomePage/Utils/StarsReview";

export const ProductPage = () => {
  const [product, setProduct] = useState<ProductModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const productId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      const baseUrl: string = `http://localhost:8080/api/products/${productId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const loadedProduct: ProductModel = {
        id: responseJson.id,
        title: responseJson.title,
        price: responseJson.price,
        description: responseJson.description,
        quantity: responseJson.quantity,
        category: responseJson.category,
        img: responseJson.img,
      };

      setProduct(loadedProduct);
      setIsLoading(false);
    };
    fetchProduct().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="py-3">
      <div className="container-fluid row">
        <div className="col-md-6">
          {product?.img ? (
            <img
              className="w-100"
              src={product?.img}
              alt={product?.description}
            />
          ) : (
            <img
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              alt="Adicolor Classics Joggers"
            />
          )}
        </div>
        <div className="my-4 col-md-6 ps-md-3">
          <h5 className="text-secondary">{product?.category}</h5>
          <h2>{product?.title}</h2>
          <StarsReview rating={3.5} size={32} />
          <p>
            <strong>${product?.price}</strong> + Free Shipping{" "}
            {product?.quantity && product?.quantity > 0 ? (
              <span className="text-success ms-3">In Stock</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </p>
          <p>{product?.description}</p>
          <form className="row g-3">
            <div className="col-auto">
              <input
                type="number"
                className="form-control rounded-0"
                id="quantity"
                value="1"
                min="1"
                max={product?.quantity}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn">
                Add to Cart
              </button>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn">
                Go to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
