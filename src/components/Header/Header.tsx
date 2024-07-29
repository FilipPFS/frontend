import { FaBars, FaShieldAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useCartSelector } from "../../store/hooks";
import { useState } from "react";
import { log } from "console";

const Header = () => {
  const token = localStorage.getItem("token");
  let connected = false;
  const adminString = localStorage.getItem("admin");
  const admin = adminString === "true";

  if (token) {
    connected = true;
  }

  const [open, setOpen] = useState(false);

  const handleMobileNavigation = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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
          <Link to={"sign-up"} className={styles.account}>
            Connexion
          </Link>
        )}
        <div className={styles.cartBlock}>
          <Link to={"/cart"}>
            <FaShoppingCart className={styles.cartIcon} />
          </Link>
          <span>{cartSum}</span>
          {admin && (
            <Link to={"/dashboard"}>
              <FaShieldAlt className={styles.shieldIcon} />
            </Link>
          )}
        </div>
      </nav>
      <div className={styles.mobClick}>
        <FaBars className={styles.mobIcon} onClick={handleMobileNavigation} />
        {open && (
          <nav className={styles.mobNavigation}>
            <Link to={"/products"} onClick={() => setOpen(false)}>
              Produits
            </Link>
            {connected ? (
              <Link to={"account"} onClick={() => setOpen(false)}>
                Mon Compte
              </Link>
            ) : (
              <Link to={"sign-up"} onClick={() => setOpen(false)}>
                Connexion
              </Link>
            )}
            <div className={styles.cartBlock}>
              <div className={styles.cartItem}>
                <Link to={"/cart"} onClick={() => setOpen(false)}>
                  <FaShoppingCart className={styles.cartIcon} />
                </Link>
                <span>{cartSum}</span>
              </div>
              {admin && (
                <Link to={"/dashboard"} onClick={() => setOpen(false)}>
                  <FaShieldAlt className={styles.shieldIcon} />
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
