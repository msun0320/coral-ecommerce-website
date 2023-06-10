import React from "react";
import { Redirect, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { ProductsPage } from "./layouts/ProductsPage/ProductsPage";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/products">
            <ProductsPage />
          </Route>
        </switch>
      </div>
      <Footer />
    </div>
  );
};
