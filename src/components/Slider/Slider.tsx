import React, { useEffect } from "react";
import { topProduct, topProducts } from "../../topProducts";
import { Link } from "react-router-dom";
import styles from "./Slider.module.css";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import { slideActions } from "../../features/sliderSlice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Slider = () => {
  const index = useCartSelector((state) => state.slider.currentIndex);
  const dispatch = useCartDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index < topProducts.length - 1) {
        dispatch(slideActions.increment());
      } else {
        dispatch(slideActions.setIndex(0));
      }
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, index]);

  const addIndex = () => {
    if (index < topProducts.length - 1) {
      dispatch(slideActions.increment());
    } else {
      dispatch(slideActions.setIndex(0));
    }
  };

  const removeIndex = () => {
    if (index > 0) {
      dispatch(slideActions.decrement());
    } else {
      dispatch(slideActions.setIndex(topProducts.length - 1));
    }
  };

  const product = topProducts[index];

  const substractedPrice = product.oldPrice - product.newPrice;

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <button onClick={removeIndex} className={styles.buttonLeftIcon}>
          <FaAngleLeft className={styles.leftIcon} />
        </button>
        <section className={styles.textContainer}>
          <h1>TOP OFFRE !</h1>
          <h2>{product.title}</h2>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.oldPrice}>
            {(product.oldPrice / 100).toFixed(2)}€
          </p>
          <p className={styles.newPrice}>
            {(product.newPrice / 100).toFixed(2)}€ ( -
            {((substractedPrice / product.oldPrice) * 100).toFixed(0)}%)
          </p>
          <Link to={`/top-product/${product.id}`} className={styles.btnBuy}>
            <button>Achetez maintenant</button>
          </Link>
        </section>
        <section className={styles.imgContainer}>
          <img src={product.img} alt={product.title} />
        </section>
        <button onClick={addIndex} className={styles.buttonRightIcon}>
          <FaAngleRight className={styles.rightIcon} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
