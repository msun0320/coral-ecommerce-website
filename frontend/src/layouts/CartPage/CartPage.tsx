import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import CartItemModel from "../../models/CartItemModel";
import EventBus from "../../common/EventBus";

export const CartPage = () => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [httpError, setHttpError] = useState(null);

  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [isLoadingCartItems, setIsLoadingCartItems] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (jwt) {
        const url = `http://localhost:8080/api/cartItems`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
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

      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout", null);
      }
    });
    window.scrollTo(0, 0);
  }, [jwt]);

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
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    window.location.reload();
  }

  return (
    <div className="cart">
      <div className="container-fluid mt-3">
        <h3 className="mb-4">Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((cartItem) => (
              <div className="card mb-3" key={cartItem.id}>
                <div className="row no-gutters">
                  <div className="col-md-4 d-flex">
                    {cartItem.product?.img ? (
                      <img
                        src={cartItem.product?.img}
                        alt={cartItem.product?.name}
                        className="card-img w-auto"
                      />
                    ) : (
                      <img
                        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                        alt="Fjallraven - Foldsack No. 1 Backpack, Fits 15"
                      />
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{cartItem.product?.name}</h5>
                      <p className="card-text">${cartItem.product?.price}</p>
                      <p className="card-text">Quantity: {cartItem.quantity}</p>
                      <button
                        className="btn"
                        onClick={() => deleteCartItem(cartItem.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className="font-weight-bold">Total: ${total}</p>
          </div>
        )}
      </div>
    </div>
  );
};
