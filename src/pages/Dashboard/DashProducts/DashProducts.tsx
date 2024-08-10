import { useCartDispatch, useCartSelector } from "../../../store/hooks";
import { deleteProduct } from "../../../features/productSlice";
import styles from "./DashProducts.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type Props = {};

const DashProducts = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const products = useCartSelector((state) => state.products.products);
  const dispatch = useCartDispatch();

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className={styles.container}>
      <h2>All Products</h2>
      <section className={styles.allProducts}>
        {products.map((product) => {
          return (
            <div key={product._id} className={styles.productBlock}>
              <img
                src={product.img}
                alt="no avatar"
                className={styles.productImg}
              />
              <h4 className={styles.productTitle}>{product.title}</h4>
              <Link
                to={`/dashboard/product/${product._id}`}
                className={styles.btnLink}
              >
                <button className={styles.btn}>Modifier</button>
              </Link>
              <Link
                to={`/dashboard/product/${product._id}`}
                className={styles.iconLink}
              >
                <button className={styles.iconBtn}>
                  <FaEdit className={styles.icon} />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className={styles.btn}
              >
                Supprimer
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className={styles.iconBtn}
              >
                <FaTrash className={styles.icon} />
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DashProducts;
