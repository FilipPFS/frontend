import React from "react";
import { type UserCommands } from "../../pages/Account/Account";
import { CartProduct } from "../../features/cartSlice";
import styles from "./Commands.module.css";

type Props = UserCommands;

const Commands = ({ _id, email, userId, products, amount }: Props) => {
  const groupedProducts = products.reduce((acc: CartProduct[], product) => {
    const existingProduct = acc.find(
      (item) => item.productId === product.productId
    );

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
      existingProduct.price += product.price;
    } else {
      acc.push({ ...product });
    }

    return acc;
  }, [] as CartProduct[]);

  return (
    <div className={styles.container}>
      <h5>Commande n°{_id}</h5>
      <div className={styles.firstChild}>
        <div className={styles.infoContainer}>
          <section className={styles.infoElement}>
            <span>User ID</span>
            <span className={styles.infoInput}>{userId}</span>
          </section>
          <section className={styles.infoElement}>
            <span>Email</span>
            <span className={styles.infoInput}>{email}</span>
          </section>
        </div>
        <div className={styles.productContainer}>
          <div>
            {groupedProducts.map((product) => {
              return (
                <div className={styles.productBlock}>
                  <div className={styles.imgContainer}>
                    <img src={product.img} />
                  </div>
                  <div className={styles.productInfos}>
                    <span className={styles.productTitle}>{product.title}</span>
                    <span>x {product.quantity}</span>
                    <span className={styles.productInfoInput}>
                      {(product.price / 100).toFixed(2)}€
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <span className={styles.amount}>
            Total: {(amount / 100).toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
};

export default Commands;
