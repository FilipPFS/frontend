import { useCartDispatch, useCartSelector } from "../../../store/hooks";
import { deleteProduct } from "../../../features/productSlice";
import styles from "./DashProducts.module.css";

type Props = {};

const DashProducts = (props: Props) => {
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
              <h4>{product.title}</h4>
              <button className={styles.btn}>Modifier</button>
              <button
                onClick={() => handleDelete(product._id)}
                className={styles.btn}
              >
                Supprimer
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DashProducts;
