import React, { useEffect, useState } from "react";
import styles from "./DashCommands.module.css";
import { UserCommands } from "../../Account/Account";
import axios, { AxiosResponse } from "axios";
import Commands from "../../../components/Commands/Commands";

type Props = {};

const DashCommands = (props: Props) => {
  const [commands, setCommands] = useState<UserCommands[]>([]);

  const getUserCommands = async () => {
    try {
      const response: AxiosResponse<UserCommands[]> = await axios.get(
        `http://localhost:5000/api/commands/`
      );
      setCommands(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserCommands();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Les commandes</h2>
      <div>
        {commands.map((command) => {
          return (
            <Commands
              key={command._id}
              _id={command._id}
              userId={command.userId}
              email={command.email}
              products={command.products}
              amount={command.amount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashCommands;
