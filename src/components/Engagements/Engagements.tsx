import { values } from "./values";
import styles from "./Engagements.module.css";

const Engagements = () => {
  return (
    <div className={styles.parentContainer}>
      <h1>Nos Engagements</h1>
      <div className={styles.container}>
        {values.map((value, index) => {
          return (
            <section key={index} className={styles.section}>
              <img src={value.img} className={styles.img} />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Engagements;
