import { useNavigate } from "react-router-dom";
import styles from "./Account.module.css";

const Account = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/");
    window.location.reload();
  };

  return (
    <main>
      Account
      <button onClick={signOut}>Deconnexion</button>
    </main>
  );
};

export default Account;
