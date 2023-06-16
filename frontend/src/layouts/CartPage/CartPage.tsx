import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import CartModel from "../../models/CartModel";

export const CarPage = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  const [cart, setCart] = useState<CartModel[]>([]);
  const [isLoadingUserCart, setIsLoadingUserCart] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUserCart = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/cart/secure`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const cartResponse = await fetch(url, requestOptions);
        if (!cartResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const cartResponseJson = await cartResponse.json();

        let subtotal = 0;

        for (const key in cartResponseJson) {
          subtotal +=
            cartResponseJson[key].product.price *
            cartResponseJson[key].product.quantity;
        }

        setTotal(subtotal);
        setCart(cartResponseJson);
      }
      setIsLoadingUserCart(false);
    };
    fetchUserCart().catch((error: any) => {
      setIsLoadingUserCart(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [authState]);

  if (isLoadingUserCart) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function deleteFromCart(productId: number) {
    const url = `http://localhost:8080/api/cart/secure/delete?productId=${productId}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
  }

  return (
    <div>
      <div className="container-fluid">
        <h3>Cart</h3>
        <div>
          {cart.map((cartItem) => (
            <div key={cartItem.id}>
              {cartItem.product?.img ? (
                <img
                  src={cartItem.product?.img}
                  alt={cartItem.product?.title}
                />
              ) : (
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt="Adicolor Classics Joggers"
                />
              )}
              <h5>{cartItem.product?.title}</h5>
              <p>${cartItem.product?.price}</p>
              <p>{cartItem.product?.quantity}</p>
              <button
                onClick={() => deleteFromCart(cartItem.id)}
                type="submit"
                className="btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div>
          <h4>Cart total</h4>
          <p>
            Total <span>${total}</span>
          </p>
          <Link type="button" className="btn" to={"/checkout"}>
            checkout
          </Link>
        </div>
      </div>
    </div>
  );
};
