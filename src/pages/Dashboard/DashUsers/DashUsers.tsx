import { useEffect, useState } from "react";
import styles from "./DashUsers.module.css";
import { UserType } from "../../Account/Account";
import axios from "axios";
import noavatar from "../../../images/noavatar.webp";
import { FaShieldAlt } from "react-icons/fa";

type Props = {};

const DashUsers = (props: Props) => {
  const [users, setUsers] = useState<UserType[]>([]);
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
    } catch (err) {
      console.error(err);
    }
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
                <span className={styles.adminBadge}>
                  <FaShieldAlt />
                  ADMIN
                </span>
              ) : (
                <button
                  onClick={() => setAdmin(user._id)}
                  className={styles.btnSetAdmin}
                >
                  Set Admin
                </button>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DashUsers;
