import { Link, NavLink } from "react-router-dom";
import logo from "./../../logo.svg";
import cart from "./../../assets/images/icon-cart.svg";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [httpError, setHttpError] = useState(null);

  // Cart Items Count State
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isLoadingCartItemsCount, setIsLoadingCartItemsCount] = useState(true);

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      if (jwt) {
        const url = `http://localhost:8080/api/cartItems/count`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        };
        const cartItemsCountResponse = await fetch(url, requestOptions);
        if (!cartItemsCountResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const cartItemsCountResponseJson = await cartItemsCountResponse.json();
        setCartItemsCount(cartItemsCountResponseJson);
      }
      setIsLoadingCartItemsCount(false);
    };
    fetchCartItemsCount().catch((error: any) => {
      setIsLoadingCartItemsCount(false);
      setHttpError(error.message);
    });
  }, [jwt]);

  if (isLoadingCartItemsCount) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand fs-4" href="#" to="/home">
          CORAL <img src={logo} alt="Coral" />
        </Link>
        <div
          className="collapse navbar-collapse order-1 order-lg-0 text-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav ms-auto d-flex flex-row">
          {!jwt ? (
            <li className="nav-item">
              <NavLink className="nav-link me-3 me-lg-0" to="/login">
                Login
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <button className="nav-link me-3 me-lg-0" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              <img src={cart} alt="Shopping cart" /> ({cartItemsCount})
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
