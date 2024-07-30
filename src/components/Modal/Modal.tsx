import styles from "./Modal.module.css";

type Props = {
  message: string;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAdmin: (id: string) => Promise<void>;
  id: string;
};

const Modal = ({ message, setClicked, setAdmin, id }: Props) => {
  console.log(id);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <button onClick={() => setAdmin(id)}>Oui</button>
        <button onClick={() => setClicked(false)}>Non</button>
      </div>
    </div>
  );
};

export default Modal;
