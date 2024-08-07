import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import DashHeader from "./DashHeader/DashHeader";
import { UserType } from "../Account/Account";
import axios, { AxiosResponse } from "axios";
import { Link, Route, Routes } from "react-router-dom";
import DashUsers from "./DashUsers/DashUsers";
import DashProducts from "./DashProducts/DashProducts";
import DashNewProduct from "./DashNewProduct/DashNewProduct";
import DashTopOffers from "./DashTopOffers/DashTopOffers";
import DashSingleProduct from "./DashSingleProduct/DashSingleProduct";
import DashCommands from "./DashCommands/DashCommands";

const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const admin = localStorage.getItem("admin");

  const [user, setUser] = useState<UserType>();

  const getUser = async () => {
    try {
      const response: AxiosResponse<UserType> = await axios.get(
        `http://localhost:5000/api/user/${userId}`
      );
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!admin) {
    return (
      <main>
        This page doesn't exist. Go back <Link to={"/"}>home</Link>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <DashHeader user={user} />
      <Routes>
        <Route path="/" element={<DashProducts />} />
        <Route path="/users" element={<DashUsers />} />
        <Route path="/commands" element={<DashCommands />} />
        <Route path="/products" element={<DashProducts />} />
        <Route path="/new-product" element={<DashNewProduct />} />
        <Route path="/top-offers" element={<DashTopOffers />} />
        <Route path="/product/:id" element={<DashSingleProduct />} />
      </Routes>
    </main>
  );
};

export default Dashboard;
