import { Product, products } from "../../products";
import { useParams } from "react-router-dom";
import styles from "./SingleProduct.module.css";
import { useDispatch } from "react-redux";
import { useCartDispatch } from "../../store/hooks";
import cartSlice, { CartProduct } from "../../features/cartSlice";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams();

  const dispatch = useCartDispatch();

  const singleProduct = products.find((product) => product.id === id);

  const handleAddToCart = (singleProduct: CartProduct) => {
    dispatch(cartSlice.actions.addToCart(singleProduct));
    toast.success("Ajouté dans le panier", {
      autoClose: 1500,
    });
  };

  if (singleProduct) {
    return (
      <main className={styles.main}>
        <div className={styles.imgContainer}>
          <img src={singleProduct.img} />
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
                id: singleProduct.id,
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
