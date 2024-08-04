import { Link } from "react-router-dom";
import styles from "./PaySucces.module.css";
import { FaDollarSign } from "react-icons/fa";

type Props = {};

const PaySucces = (props: Props) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <span className={styles.iconBlock}>
          <FaDollarSign className={styles.icon} />
        </span>
        <h2>Payement accepté</h2>
        <p>Merci pour votre paiement.</p>
        <Link to={"/"}>
          <button className={styles.btn}>Continuer vos achats</button>
        </Link>
      </div>
    </main>
  );
};

export default PaySucces;
