import {
  FaBolt,
  FaBox,
  FaClipboardList,
  FaCube,
  FaPlus,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";
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
      <div className={styles.user}>
        <div className={styles.adminBlock}>
          <FaShieldAlt />
          <span>Admin</span>
        </div>
        <h2>{user?.firstName}</h2>
      </div>
      <nav className={styles.navigation}>
        <Link to={"/dashboard/products"} className={styles.link}>
          <FaCube />
          Produits
        </Link>
        <Link to={"/dashboard/top-offers"} className={styles.link}>
          <FaBolt />
          Top Offres
        </Link>
        <Link to={"/dashboard/commands"} className={styles.link}>
          <FaClipboardList />
          Commandes
        </Link>
        <Link to={"/dashboard/users"} className={styles.link}>
          <FaUser />
          Utilisateurs
        </Link>
        <Link to={"/dashboard/new-product"} className={styles.link}>
          <FaPlus />
          Ajouter un produit
        </Link>
      </nav>
    </section>
  );
};

export default DashHeader;
