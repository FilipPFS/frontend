import { useState } from "react";
import styles from "./DashNewProduct.module.css";
import { useCartDispatch } from "../../../store/hooks";
import { addProduct } from "../../../features/productSlice";
import FormProduct from "../../../components/FormProduct/FormProduct";

const DashNewProduct = () => {
  return (
    <div className={styles.container}>
      <h2>Ajouter un produit</h2>
      <FormProduct />
    </div>
  );
};

export default DashNewProduct;
