import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.top}>
        <div className={styles.topLinks}>
          <div className={styles.topLinksBlock}>
            <span>SHOP</span>
            <p>Produits</p>
            <p>Promotions</p>
          </div>
          <div className={styles.topLinksBlock}>
            <span>AIDE</span>
            <p>Nous contacter</p>
            <p>FAQ</p>
          </div>
          <div className={styles.topLinksBlock}>
            <span>A PROPOS</span>
            <p>Notre histoire</p>
            <p>Nos missions</p>
            <p>Carrières</p>
          </div>
        </div>
        <div className={styles.topIcons}>
          <FaInstagram className={styles.icon} />
          <FaTwitter className={styles.icon} />
          <FaFacebook className={styles.icon} />
          <FaTiktok className={styles.icon} />
        </div>
      </section>
      <section className={styles.bottom}>
        <span>Salouen 2024: Tous les droits réservés ©</span>
      </section>
    </footer>
  );
};

export default Footer;
