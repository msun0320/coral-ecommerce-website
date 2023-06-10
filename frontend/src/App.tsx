import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { ProductsPage } from "./layouts/ProductsPage/ProductsPage";
import { ProductPage } from "./layouts/ProductPage/ProductPage";

export const App = () => {
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
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/product/:productId">
            <ProductPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
