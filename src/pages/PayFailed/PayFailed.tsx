import { Link } from "react-router-dom";
import styles from "./PayFailed.module.css";
import { FaTimes } from "react-icons/fa";

type Props = {};

const PayFailed = (props: Props) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <span className={styles.iconBlock}>
          <FaTimes className={styles.icon} />
        </span>
        <h2>Payement échoué</h2>
        <p>Votre paiement a échoué.</p>
        <Link to={"/"}>
          <button className={styles.btn}>Revenir à l'accueil</button>
        </Link>
      </div>
    </main>
  );
};

export default PayFailed;
