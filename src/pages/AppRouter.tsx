import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import Products from "./Products/Products";
import SingleProduct from "./SingleProduct/SingleProduct";
import TopProduct from "./TopProduct/TopProduct";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/top-product/:id" element={<TopProduct />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
