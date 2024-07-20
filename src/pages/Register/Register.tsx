import { Link } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleForm}>
        <h1>Inscription</h1>
        <label htmlFor="last-name">Nom</label>
        <input type="text" placeholder="Nom" id="last-name" name="last-name" />
        <label htmlFor="first-name" className={styles.theLabel}>
          Prénom
        </label>
        <input
          type="text"
          placeholder="Prénom"
          id="first-name"
          name="first-name"
        />
        <label htmlFor="email" className={styles.theLabel}>
          Email
        </label>
        <input type="email" placeholder="Email" id="email" name="email" />
        <label className={styles.theLabel}>Mot de passe</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
        />
        <button className={styles.formBtn} type="submit">
          Se connecter
        </button>
        <span>
          Vous avez un compte? <Link to={"/sign-up"}>Connectez-vous</Link>
        </span>
      </form>
    </main>
  );
};

export default Register;
