import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { log } from "console";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { CartProduct } from "../../features/cartSlice";
import Commands from "../../components/Commands/Commands";

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

type UserAddress = {
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
  const [clicked, setClicked] = useState(false);
  const [edited, setEdited] = useState(false);
  const [formAddress, setFormAddress] = useState<UserAddress>({
    number: 0,
    street: "",
    city: "",
    postalCode: "",
  });
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

  console.log(commands);

  useEffect(() => {
    if (userInfo?.address) {
      setFormAddress({
        number: userInfo.address.number,
        street: userInfo.address.street,
        city: userInfo.address.city,
        postalCode: userInfo.address.postalCode,
      });
    }
  }, [userInfo]);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormAddress({
      ...formAddress,
      [name]: value,
    });
  };

  const editAddress = () => {
    setClicked((prevClicked) => !prevClicked);
  };

  const submitEditAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/update-adress/${userId}`,
        formAddress
      );

      setClicked(false);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const submitAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/set-adress/${userId}`,
        formAddress
      );

      setClicked(false);
      getUserInfo();
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  console.log(formAddress);

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
        <div className={styles.blockEdit}>
          <span className={styles.title}>Mon adresse</span>
          {userInfo?.address && (
            <button onClick={editAddress} className={styles.btnEdit}>
              <FaRegEdit className={styles.btnEditIcon} />
            </button>
          )}
        </div>
        <form onSubmit={userInfo?.address ? submitEditAddress : submitAddress}>
          <div className={styles.form}>
            <div className={styles.userBlock}>
              <span>Numéro de la rue</span>
              <input
                type="number"
                value={formAddress.number}
                disabled={clicked ? !userInfo?.address : !!userInfo?.address}
                name="number"
                onChange={handleChange}
              />
            </div>
            <div className={styles.userBlock}>
              <span>Nom du rue</span>
              <input
                type="text"
                value={formAddress.street}
                disabled={clicked ? !userInfo?.address : !!userInfo?.address}
                name="street"
                onChange={handleChange}
              />
            </div>
            <div className={styles.userBlock}>
              <span>Ville</span>
              <input
                type="text"
                value={formAddress.city}
                disabled={clicked ? !userInfo?.address : !!userInfo?.address}
                name="city"
                onChange={handleChange}
              />
            </div>
            <div className={styles.userBlock}>
              <span>Code postale</span>
              <input
                type="text"
                value={formAddress.postalCode}
                disabled={clicked ? !userInfo?.address : !!userInfo?.address}
                name="postalCode"
                onChange={handleChange}
              />
            </div>
          </div>
          {clicked && (
            <div className={styles.saveButtons}>
              <button type="submit">Save</button>
              <button onClick={() => setClicked(false)}>Annuler</button>
            </div>
          )}
          {!userInfo?.address && (
            <button type="submit">Ajouter l'adresse</button>
          )}
        </form>
      </section>
      <section>
        <span className={styles.title}>Mes commandes</span>
        <div>
          {commands.map((command) => {
            return (
              <Commands
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
