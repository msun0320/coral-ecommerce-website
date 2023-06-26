import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { RegisterPage } from "./layouts/AuthenticationPages/RegisterPage";
import { LoginPage } from "./layouts/AuthenticationPages/LoginPage";
import { HomePage } from "./layouts/HomePage/HomePage";
import { ProductsPage } from "./layouts/ProductsPage/ProductsPage";
import { ProductPage } from "./layouts/ProductPage/ProductPage";
import { ReviewListPage } from "./layouts/ProductPage/ReviewListPage/ReviewListPage";
import { useEffect } from "react";
import EventBus from "./common/EventBus";
import { CartPage } from "./layouts/CartPage/CartPage";

export const App = () => {
  useEffect(() => {
    EventBus.on("logout", logout);
  }, []);

  useEffect(() => {
    return () => {
      EventBus.remove("logout", logout);
    };
  }, []);

  const logout = () => localStorage.removeItem("jwt");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/products" exact>
            <ProductsPage />
          </Route>
          <Route path="/reviewlist/:productId">
            <ReviewListPage />
          </Route>
          <Route path="/products/:productId">
            <ProductPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
