import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Carousel = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl: string = "http://localhost:8080/api/products";

      const url: string = `${baseUrl}?page=0&size=8`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.products;

      const loadedProducts: ProductModel[] = [];

      for (const key in responseData) {
        loadedProducts.push({
          id: responseData[key].id,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
          category: responseData[key].category,
          img: responseData[key].img,
          inventory: responseData[key].inventory,
        });
      }

      setProducts(loadedProducts);
      setIsLoading(false);
    };
    fetchProducts().catch((error: any) => {
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
    <div className="py-3 py-md-5">
      <div className="container">
        <div className="carousel-title mb-4 mb-md-5">
          <h2 className="text-center">Featured Products</h2>
        </div>
        {/* Mobile */}
        <div
          id="carouselMobile"
          className="carousel carousel-dark slide d-lg-none"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="card-group d-flex rounded-0">
                {products.slice(0, 2).map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
            <div className="carousel-item">
              <div className="card-group d-flex">
                {products.slice(2, 4).map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
            <div className="carousel-item">
              <div className="card-group d-flex">
                {products.slice(4, 6).map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
            <div className="carousel-item">
              <div className="card-group d-flex">
                {products.slice(6, 8).map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselMobile"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselMobile"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Desktop */}
        <div
          id="carouselDesktop"
          className="carousel carousel-dark slide d-none d-lg-block"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="card-group">
                {products.slice(0, 4).map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
            <div className="carousel-item">
              <div className="card-group">
                {products.slice(4, 8).map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselDesktop"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselDesktop"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
