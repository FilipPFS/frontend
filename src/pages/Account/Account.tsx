import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { log } from "console";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { CartProduct } from "../../features/cartSlice";
import Commands from "../../components/Commands/Commands";
import FormAddress from "../../components/FormAddress/FormAddress";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phoneNumber?: string;
  address?: UserAddress;
  cart: [];
};

export type UserAddress = {
  number: number;
  street: string;
  city: string;
  postalCode: string;
};

export type UserCommands = {
  _id: string;
  userId: string;
  email: string;
  products: CartProduct[];
  amount: number;
};

const Account = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserType>();
  const [commands, setCommands] = useState<UserCommands[]>([]);

  const getUserInfo = async () => {
    try {
      const response: AxiosResponse<UserType> = await axios.get(
        `http://localhost:5000/api/user/${userId}`
      );
      setUserInfo(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserCommands = async () => {
    try {
      const response: AxiosResponse<UserCommands[]> = await axios.get(
        `http://localhost:5000/api/commands/${userId}`
      );
      setCommands(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserCommands();
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

  return (
    <main className={styles.main}>
      <section className={styles.settings}>
        <span className={styles.settingsProfile}>
          <FaUser />
          <h3>Mon profil</h3>
        </span>
        <button onClick={signOut}>Deconnexion</button>
      </section>
      <section>
        <span className={styles.title}>Mes informations</span>
        <div className={styles.userInfo}>
          <div className={styles.userBlock}>
            <span>Prénom</span>
            <input type="text" defaultValue={userInfo?.firstName} disabled />
          </div>
          <div className={styles.userBlock}>
            <span>Nom</span>
            <input type="text" defaultValue={userInfo?.lastName} disabled />
          </div>
          <div className={styles.userBlock}>
            <span>Email</span>
            <input type="text" defaultValue={userInfo?.email} disabled />
          </div>
          <div className={styles.userBlock}>
            <span>Numéro de téléhpone</span>
            <input type="text" defaultValue={userInfo?.phoneNumber} disabled />
          </div>
        </div>
      </section>
      <section>
        <FormAddress flexDirection="row" />
      </section>
      <section>
        <span className={styles.title}>Mes commandes</span>
        <div>
          {commands.map((command) => {
            return (
              <Commands
                key={command._id}
                _id={command._id}
                email={command.email}
                userId={command.userId}
                products={command.products}
                amount={command.amount}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Account;
