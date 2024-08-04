import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import Products from "./Products/Products";
import SingleProduct from "./SingleProduct/SingleProduct";
import TopProduct from "./TopProduct/TopProduct";
import SingUp from "./SingUp/SingUp";
import Register from "./Register/Register";
import Footer from "../components/Footer/Footer";
import Dashboard from "./Dashboard/Dashboard";
import Account from "./Account/Account";
import { useCartDispatch, useCartSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";
import { fetchCartItems } from "../features/cartSlice";
import { fetchTopProducts } from "../features/topProductSlice";
import DashUsers from "./Dashboard/DashUsers/DashUsers";
import PaySucces from "./PaySucces/PaySucces";
import PayFailed from "./PayFailed/PayFailed";

const AppRouter = () => {
  const dispatch = useCartDispatch();
  const status = useCartSelector((state: RootState) => state.products.status);
  const error = useCartSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCartItems());
      dispatch(fetchTopProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/top-product/:id" element={<TopProduct />} />
        <Route path="/sign-up" element={<SingUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/success" element={<PaySucces />} />
        <Route path="/fail" element={<PayFailed />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
