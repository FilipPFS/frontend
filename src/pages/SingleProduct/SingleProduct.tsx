import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./SingleProduct.module.css";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import cartSlice, { CartProduct } from "../../features/cartSlice";
import { Product } from "../../products";
import { RootState } from "../../store/store";

const SingleProduct = () => {
  const myProducts = useCartSelector(
    (state: RootState) => state.products.products
  );

  const { id } = useParams<{ id: string }>();
  const dispatch = useCartDispatch();

  const singleProduct = myProducts.find((product) => product._id === id);

  const handleAddToCart = (singleProduct: CartProduct) => {
    dispatch(cartSlice.actions.addToCart(singleProduct));
    toast.success("Ajouté dans le panier", { autoClose: 1500 });
  };

  if (singleProduct) {
    return (
      <main className={styles.main}>
        <div className={styles.imgContainer}>
          <img src={singleProduct.img} alt={singleProduct.title} />
        </div>
        <div className={styles.infos}>
          <p className={styles.stock}>
            {singleProduct.inStock ? "En stock" : "En rupture de stock"}
          </p>
          <h1>{singleProduct.title}</h1>
          <p>Prix: {(singleProduct.price / 100).toFixed(2)}€</p>
          <p className={styles.desc}>
            Description: {singleProduct.description}
          </p>
          <button
            className={styles.cartButton}
            disabled={!singleProduct.inStock}
            onClick={() =>
              handleAddToCart({
                id: singleProduct._id,
                img: singleProduct.img,
                title: singleProduct.title,
                price: singleProduct.price,
                quantity: 1,
              })
            }
          >
            Ajouter au panier
          </button>
        </div>
      </main>
    );
  } else {
    return <h1>No data</h1>;
  }
};

export default SingleProduct;
