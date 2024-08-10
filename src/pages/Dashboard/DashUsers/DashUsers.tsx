import { useEffect, useState } from "react";
import styles from "./DashUsers.module.css";
import { UserType } from "../../Account/Account";
import axios from "axios";
import noavatar from "../../../images/noavatar.webp";
import { FaShieldAlt } from "react-icons/fa";
import Modal from "../../../components/Modal/Modal";

type Props = {};

const DashUsers = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [users, setUsers] = useState<UserType[]>([]);
  const [clickedUserId, setClickedUserId] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const setAdmin = async (id: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/set-admin/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.users);
      setClickedUserId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleButtonClick = (userId: string) => {
    setClickedUserId((prevClickedUserId) =>
      prevClickedUserId === userId ? null : userId
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h2>All Users</h2>
      <section className={styles.allUsers}>
        {users.map((user) => {
          return (
            <div className={styles.userBlock} key={user._id}>
              <img src={noavatar} alt="no avatar" className={styles.userImg} />
              <h4>
                {user.firstName} {user.lastName}
              </h4>
              {user.isAdmin ? (
                <>
                  <span className={styles.adminBadge}>
                    <FaShieldAlt />
                    ADMIN
                  </span>
                  <span className={styles.adminIcon}>
                    <FaShieldAlt />
                  </span>
                </>
              ) : (
                <button
                  onClick={() => handleButtonClick(user._id)}
                  className={styles.btnSetAdmin}
                >
                  Set Admin
                </button>
              )}
              {clickedUserId === user._id && (
                <Modal
                  message="Êtes-vous sûr de vouloir ajouter cet utilisateur en tant qu'administrateur ?"
                  setClicked={() => setClickedUserId(null)}
                  setAdmin={setAdmin}
                  id={user._id}
                />
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DashUsers;
