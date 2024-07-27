import { FaShieldAlt } from "react-icons/fa";
import styles from "./DashHeader.module.css";
import { UserType } from "../../Account/Account";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  user: UserType | undefined;
};

const DashHeader = ({ user }: Props) => {
  return (
    <section className={styles.container}>
      <div>
        <span>
          <FaShieldAlt /> Admin
        </span>
        <h2>{user?.firstName}</h2>
      </div>
      <nav className={styles.navigation}>
        <Link to={"/dashboard/products"}>Products</Link>
        <Link to={"/dashboard/top-offers"}>Top Offers</Link>
        <Link to={"/dashboard/users"}>Users</Link>
        <Link to={"/dashboard/new-product"}>Add product</Link>
      </nav>
    </section>
  );
};

export default DashHeader;
