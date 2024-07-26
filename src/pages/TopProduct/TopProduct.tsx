import { useParams } from "react-router-dom";
import styles from "./TopProduct.module.css";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import cartSlice, { addCartItem, CartProduct } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const TopProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();

  const topProducts = useCartSelector((state) => state.topProduct.topProducts);

  const product = topProducts.find((topProduct) => topProduct._id === id);

  const dispatch = useCartDispatch();

  const handleAddToCart = (item: CartProduct) => {
    console.log("Product to add", item);
    dispatch(addCartItem(item));
    toast.success("Ajouté dans le panier", {
      autoClose: 1500,
    });
  };

  if (product) {
    const substractedPrice = product.oldPrice - product.newPrice;

    return (
      <main className={styles.main}>
        <div className={styles.head}>
          <h1>TOP OFFRE: PROFITEZ DES REMISES EXCEPTIONNELLES!</h1>
        </div>
        <div className={styles.productContent}>
          <div className={styles.imgContainer}>
            <p className={styles.promo}>
              -{((substractedPrice / product.oldPrice) * 100).toFixed(0)}%
            </p>
            <img src={product.img} />
          </div>
          <div className={styles.infos}>
            <p className={styles.stock}>PROMO</p>
            <h1>{product.title}</h1>
            <p>Ancien prix: {(product.oldPrice / 100).toFixed(2)}€</p>
            <p>
              Nouveau prix:{" "}
              <span className={styles.newPrice}>
                {(product.newPrice / 100).toFixed(2)}€
              </span>
            </p>
            <p className={styles.desc}>Description: {product.description}</p>
            <button
              className={styles.cartButton}
              onClick={() =>
                handleAddToCart({
                  productId: product._id,
                  img: product.img,
                  title: product.title,
                  price: product.newPrice,
                  quantity: 1,
                })
              }
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </main>
    );
  } else {
    return <h1>No data</h1>;
  }
};

export default TopProduct;
