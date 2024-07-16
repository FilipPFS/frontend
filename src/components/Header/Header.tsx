import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useCartSelector } from "../../store/hooks";

const Header = () => {
  const connected = false;

  const cart = useCartSelector((state) => state.cart.items);

  const cartSum = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <h1>Salouen</h1>
      </Link>
      <nav className={styles.navigation}>
        <Link to={"/products"}>Produits</Link>
        {connected ? (
          <Link to={"account"} className={styles.account}>
            Mon Compte
          </Link>
        ) : (
          <Link to={"signIn"} className={styles.account}>
            Connexion
          </Link>
        )}
        <div className={styles.cartBlock}>
          <Link to={"/cart"}>
            <FaShoppingCart className={styles.cartIcon} />
          </Link>
          <span>{cartSum}</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
