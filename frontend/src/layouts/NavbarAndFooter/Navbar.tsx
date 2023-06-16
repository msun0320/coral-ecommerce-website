import { Link, NavLink } from "react-router-dom";
import logo from "./../../logo.svg";
import cart from "./../../assets/images/icon-cart.svg";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  // Cart Items Count State
  const [currentCartItemsCount, setCurrentCartItemsCount] = useState(0);
  const [isLoadingCurrentCartItemsCount, setIsLoadingCurrentCartItemsCount] =
    useState(true);

  useEffect(() => {
    const fetchUserCurrentCartItemsCount = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/cart/secure/count`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const currentCartItemsCountResponse = await fetch(url, requestOptions);
        if (!currentCartItemsCountResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentCartItemsCountResponseJson =
          await currentCartItemsCountResponse.json();
        setCurrentCartItemsCount(currentCartItemsCountResponseJson);
      }
      setIsLoadingCurrentCartItemsCount(false);
    };
    fetchUserCurrentCartItemsCount().catch((error: any) => {
      setIsLoadingCurrentCartItemsCount(false);
      setHttpError(error.message);
    });
  }, [authState]);

  if (!authState || isLoadingCurrentCartItemsCount) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const handleLogout = async () => oktaAuth.signOut();

  console.log(authState);

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
          {!authState.isAuthenticated ? (
            <li className="nav-item">
              <NavLink className="nav-link me-3 me-lg-0" to="/login">
                Sign In
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <button className="nav-link me-3 me-lg-0" onClick={handleLogout}>
                Sign Out
              </button>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              <img src={cart} alt="Shopping cart" /> ({currentCartItemsCount})
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
