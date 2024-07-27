import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { FaShieldAlt } from "react-icons/fa";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  isAdmin: boolean;
  cart: [];
};

const Account = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserType>();

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

  useEffect(() => {
    getUserInfo();
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

  return (
    <main>
      {userInfo?.isAdmin && (
        <div>
          <span>
            <FaShieldAlt></FaShieldAlt>
            ADMIN
          </span>
          <Link to={"/dashboard"}>Go to Admin Dashboard</Link>
        </div>
      )}
      <h1>{userInfo?.firstName}</h1>
      <button onClick={signOut}>Deconnexion</button>
    </main>
  );
};

export default Account;
