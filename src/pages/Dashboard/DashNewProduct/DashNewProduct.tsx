import { useEffect, useState } from "react";
import styles from "./DashNewProduct.module.css";
import FormProduct from "../../../components/FormProduct/FormProduct";
import FormTopOffer from "../../../components/FormTopOffer/FormTopOffer";

const DashNewProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selected, setSelected] = useState(true);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value === "Product");
  };

  return (
    <div className={styles.container}>
      <div className={styles.child}>
        <h2>Ajouter un produit</h2>
        <select
          onChange={handleSelectChange}
          value={selected ? "Product" : "Top Offer"}
        >
          <option value="Product">Product</option>
          <option value="Top Offer">Top Offer</option>
        </select>
      </div>
      {selected ? <FormProduct /> : <FormTopOffer />}
    </div>
  );
};

export default DashNewProduct;
