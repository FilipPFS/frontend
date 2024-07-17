import { useState } from "react";
import ProductList from "../../components/Prdoucts/ProductList";
import { products } from "../../products";
import { buttons } from "./buttons";
import styles from "./Products.module.css";
import { CANCELLED } from "dns";
import { log } from "console";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selected, setSelected] = useState("");

  const filterCategory = (category: string) => {
    setFilteredProducts(products);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.cateogory === category)
      );
    }
    setSelected(category);
  };

  return (
    <main>
      <div className={styles.categories}>
        <h1>Selectionner une catégorie</h1>
        <ul className={styles.buttonList}>
          {buttons.map((button, index) => {
            return (
              <button
                key={index}
                className={
                  selected === button.categorie ? styles.selectedBtn : ""
                }
                onClick={() => filterCategory(button.categorie)}
              >
                {button.jsx}
              </button>
            );
          })}
        </ul>
      </div>
      <ProductList products={filteredProducts} />
    </main>
  );
};

export default Products;
