import { Link } from "react-router-dom";
import styles from "./SingUp.module.css";

const SingUp = () => {
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleForm}>
        <h1>Connexion</h1>
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" id="email" name="email" />
        <label className={styles.secondLabel}>Mot de passe</label>
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
          Vous n'avez pas de compte?{" "}
          <Link to={"/register"}>Inscrivez-vous.</Link>
        </span>
      </form>
    </main>
  );
};

export default SingUp;
