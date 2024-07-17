import React from "react";
import { topProduct } from "../../topProducts";
import { Link } from "react-router-dom";
import styles from "./Slider.module.css";

type SliderProps = {
  product: topProduct;
};

const Slider = ({ product }: SliderProps) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <section className={styles.textContainer}>
          <h1>TOP OFFRE !</h1>
          <h2>{product.title}</h2>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.oldPrice}>
            {(product.oldPrice / 100).toFixed(2)}€
          </p>
          <p className={styles.newPrice}>
            {(product.newPrice / 100).toFixed(2)}€ ( -
            {((product.newPrice / product.oldPrice) * 100).toFixed(0)}%)
          </p>
          <button>
            <Link to={`/top-product/${product.id}`}>Achetez maintenant</Link>
          </button>
        </section>
        <section className={styles.imgContainer}>
          <img src={product.img} alt={product.title} />
        </section>
      </div>
    </div>
  );
};

export default Slider;
