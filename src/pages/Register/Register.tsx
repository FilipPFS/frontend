import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useState } from "react";
import axios from "axios";

type DataForm = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
};

const Register = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState<DataForm>({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      if (response.status === 201) {
        navigate("/sign-up");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          switch (err.response.status) {
            case 400:
              setErrorMsg("Tous les champs sont obligatoires.");
              setTimeout(() => {
                setErrorMsg("");
              }, 3000);
              break;
            case 401:
              setErrorMsg(
                "Erreur survenue lors de la création du compte. Ressayez ultérieurement."
              );
              setTimeout(() => {
                setErrorMsg("");
              }, 3000);
              break;
            default:
              setErrorMsg("Une erreur inattendue est survenue.");
              setTimeout(() => {
                setErrorMsg("");
              }, 3000);
          }
        } else if (err.request) {
          setErrorMsg("Une erreur de réseau est survenue. Veuillez réessayer.");
          setTimeout(() => {
            setErrorMsg("");
          }, 3000);
        } else {
          setErrorMsg("Une erreur inconnue est survenue.");
          setTimeout(() => {
            setErrorMsg("");
          }, 3000);
        }
      } else {
        setErrorMsg("Une erreur inconnue est survenue.");
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }

      console.error(err);
    }
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleForm}>
        <h1>Inscription</h1>
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          placeholder="Nom"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="firstName" className={styles.theLabel}>
          Prénom
        </label>
        <input
          type="text"
          placeholder="Prénom"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="email" className={styles.theLabel}>
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label className={styles.theLabel}>Mot de passe</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className={styles.formBtn} type="submit">
          S'inscrire
        </button>
        <span>
          Vous avez un compte? <Link to={"/sign-up"}>Connectez-vous</Link>
        </span>
      </form>
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </main>
  );
};

export default Register;
