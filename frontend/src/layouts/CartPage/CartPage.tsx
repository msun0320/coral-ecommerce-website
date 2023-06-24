import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import CartItemModel from "../../models/CartItemModel";

export const CartPage = () => {
  const [httpError, setHttpError] = useState(null);

  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [isLoadingCartItems, setIsLoadingCartItems] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (localStorage.getItem("token")) {
        const url = `http://localhost:8080/api/cartItems`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
        const cartItemsResponse = await fetch(url, requestOptions);
        if (!cartItemsResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const cartItemsResponseJson = await cartItemsResponse.json();

        let subtotal = 0;

        for (const key in cartItemsResponseJson) {
          subtotal +=
            cartItemsResponseJson[key].product.price *
            cartItemsResponseJson[key].quantity;
        }

        setTotal(subtotal);
        setCartItems(cartItemsResponseJson);
      }
      setIsLoadingCartItems(false);
    };
    fetchCartItems().catch((error: any) => {
      setIsLoadingCartItems(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, []);

  if (isLoadingCartItems) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function deleteCartItem(cartItemId: number) {
    const url = `http://localhost:8080/api/cartItems/${cartItemId}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          {cartItems.map((cartItem) => (
            <div key={cartItem.id}>
              {cartItem.product?.img ? (
                <img src={cartItem.product?.img} alt={cartItem.product?.name} />
              ) : (
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt="Adicolor Classics Joggers"
                />
              )}
              <h5>{cartItem.product?.name}</h5>
              <p>${cartItem.product?.price}</p>
              <p>{cartItem.quantity}</p>
              <button
                onClick={() => deleteCartItem(cartItem.id)}
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
