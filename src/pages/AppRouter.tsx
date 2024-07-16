import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import Products from "./Products/Products";
import SingleProduct from "./SingleProduct/SingleProduct";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
