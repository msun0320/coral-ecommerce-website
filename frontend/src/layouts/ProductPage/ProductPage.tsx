import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { LeaveAReview } from "../Utils/LeaveAReview";
import ReviewRequestModel from "../../models/ReviewRequestModel";
import CartItemRequestModel from "../../models/CartItemRequestModel";
import { Link, useHistory, useLocation } from "react-router-dom";

export const ProductPage = () => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [product, setProduct] = useState<ProductModel>();
  const [inventory, setInventory] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [reviewLeftCount, setReviewLeftCount] = useState(0);

  const history = useHistory();

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
        name: responseJson.name,
        price: responseJson.price,
        description: responseJson.description,
        category: responseJson.category,
        img: responseJson.img,
      };

      setProduct(loadedProduct);

      // Get inventory
      const url: string = `http://localhost:8080/api/inventories/product/${productId}`;

      const responseInventory = await fetch(url);

      if (!responseInventory.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonInventory = await responseInventory.json();

      setInventory(responseJsonInventory.quantity);

      setIsLoading(false);
    };
    fetchProduct().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchProductReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/product/${productId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews.content;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          user: responseData[key].user,
          createdAt: responseData[key].createdAt,
          rating: responseData[key].rating,
          product: responseData[key].product,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchProductReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, [reviewLeftCount]);

  if (isLoading || isLoadingReview) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function addToCart() {
    const cartItemRequestModel = new CartItemRequestModel(
      Number(productId),
      quantity
    );

    if (!jwt) {
      history.push(`/login`);
      // let localCart = JSON.parse(localStorage.getItem("Cart") || "[]");
      // let existingItem = localCart.find(
      //   (cartItem: { Id: number }) => cartItem.Id === Number(productId)
      // );

      // if (existingItem) {
      //   existingItem.quantity += quantity;
      // } else {
      //   localCart.push(cartItemRequestModel);
      // }

      // localStorage.setItem("cart", JSON.stringify(localCart));
      return;
    }

    const url = "http://localhost:8080/api/cartItems";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemRequestModel),
    };
    const addToCartResponse = await fetch(url, requestOptions);
    if (!addToCartResponse.ok) {
      throw new Error("Something went wrong!");
    }
  }

  function reviewRender() {
    if (jwt) {
      return <LeaveAReview submitReview={submitReview} />;
    }
    return <p>Log in to be able to leave a review.</p>;
  }

  async function submitReview(starInput: number, reviewDescription: string) {
    let productId: number = 0;
    if (product?.id) {
      productId = product.id;
    }

    const reviewRequestModel = new ReviewRequestModel(
      starInput,
      productId,
      reviewDescription
    );
    const url = "http://localhost:8080/api/reviews";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewRequestModel),
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setReviewLeftCount((count) => count + 1);
  }

  return (
    <div className="py-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            {product?.img ? (
              <img className="w-100" src={product?.img} alt={product?.name} />
            ) : (
              <img
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                alt="Adicolor Classics Joggers"
              />
            )}
          </div>
          <div className="my-4 col-md-6 ps-md-3">
            <h5 className="text-secondary">{product?.category}</h5>
            <h2>{product?.name}</h2>
            <StarsReview rating={totalStars} size={32} />
            <p>
              <strong>${product?.price}</strong> + Free Shipping{" "}
              {inventory > 0 ? (
                <span className="text-success ms-3">In Stock</span>
              ) : (
                <span className="text-danger">Out of Stock</span>
              )}
            </p>
            <p>{product?.description}</p>
            <form className="row g-3">
              <div className="col-auto">
                <input
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type="number"
                  className="form-control rounded-0"
                  id="quantity"
                  value={quantity}
                  min={1}
                  max={inventory}
                />
              </div>
              <div className="col-auto">
                <button onClick={addToCart} className="btn">
                  Add to Cart
                </button>
              </div>
              <div className="col-auto">
                <Link to="/cart" className="btn">
                  Go to Cart
                </Link>
              </div>
            </form>
          </div>
        </div>
        <hr />
        {reviewRender()}
        <LatestReviews reviews={reviews} productId={product?.id} />
      </div>
    </div>
  );
};
