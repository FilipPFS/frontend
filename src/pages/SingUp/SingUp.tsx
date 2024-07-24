import { Link, useNavigate } from "react-router-dom";
import styles from "./SingUp.module.css";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

type SingUpForm = {
  email: string;
  password: string;
};

type ServerResponse = {
  userId: string;
  isAdmin: boolean;
  token: string;
};

const SingUp = () => {
  const [signUpData, setSignUpData] = useState<SingUpForm>({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<ServerResponse> = await axios.post(
        "http://localhost:5000/api/auth/login",
        signUpData
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", JSON.stringify(response.data.isAdmin));
        localStorage.setItem("userId", response.data.userId);
        navigate("/");
        window.location.reload();
      } else {
        setErrorMsg("Une erreur inattendue est survenue.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          switch (err.response.status) {
            case 400:
              setErrorMsg("L'email et le mot de passe sont obligatoires.");
              setTimeout(() => {
                setErrorMsg("");
              }, 3000);
              break;
            case 401:
              setErrorMsg("L'email ou le mot de passe est incorrect.");
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
        <h1>Connexion</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          value={signUpData.email}
          onChange={handleChange}
        />
        <label className={styles.secondLabel}>Mot de passe</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
        />
        <button className={styles.formBtn} type="submit">
          Se connecter
        </button>
        <span>
          Vous n'avez pas de compte?{" "}
          <Link to={"/register"}>Inscrivez-vous.</Link>
        </span>
      </form>

      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </main>
  );
};

export default SingUp;
