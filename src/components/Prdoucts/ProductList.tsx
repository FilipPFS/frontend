import { Product } from "../../products";
import styles from "./ProductList.module.css";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import cartSlice, { CartProduct } from "../../features/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  const cart = useCartSelector((state) => state.cart.items);
  const dispatch = useCartDispatch();

  const handleAddToCart = (item: CartProduct) => {
    dispatch(cartSlice.actions.addToCart(item));
    toast.success("Ajouté dans le panier", {
      autoClose: 1500,
    });
  };

  console.log(cart);

  return (
    <div className={styles.parentContainer}>
      <h1>Nos produits</h1>
      <div className={styles.container}>
        {products.map((product) => {
          return (
            <article key={product._id} className={styles.product}>
              <div className={styles.productImg}>
                <Link to={`/product/${product._id}`}>
                  <img src={product.img} alt={product.title} />
                </Link>
                <p className={styles.infoStock}>
                  {product.inStock ? "En stock" : "En rupture de stock"}
                </p>
              </div>
              <div className={styles.infoProduct}>
                <h3>{product.title}</h3>
                <span>{(product.price / 100).toFixed(2)}€</span>
                <button
                  disabled={!product.inStock}
                  onClick={() =>
                    handleAddToCart({
                      productId: product._id,
                      img: product.img,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                    })
                  }
                >
                  Ajouter au panier
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
