import React, { useEffect, useState } from "react";
import styles from "./FormAddress.module.css";
import {
  UserAddress,
  UserCommands,
  UserType,
} from "../../pages/Account/Account";
import axios, { AxiosResponse } from "axios";
import { FaRegEdit } from "react-icons/fa";

type FormProps = {
  flexDirection: "row" | "column";
};

const FormAddress = ({ flexDirection }: FormProps) => {
  const userId = localStorage.getItem("userId");
  const [clicked, setClicked] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType>();
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
      getUserInfo();
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

  return (
    <div>
      <div className={styles.blockEdit}>
        <span className={styles.title}>Mon adresse</span>
        {userInfo?.address && (
          <button onClick={editAddress} className={styles.btnEdit}>
            <FaRegEdit className={styles.btnEditIcon} />
          </button>
        )}
      </div>
      <form onSubmit={userInfo?.address ? submitEditAddress : submitAddress}>
        <div
          className={`${styles.form}`}
          style={{ display: "flex", flexDirection }}
        >
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
          <button type="submit" className={styles.addressBtn}>
            Ajouter l'adresse
          </button>
        )}
      </form>
    </div>
  );
};

export default FormAddress;
