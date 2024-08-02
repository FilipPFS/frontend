import { useEffect, useState } from "react";
import ProductList from "../../components/Prdoucts/ProductList";
import { Product } from "../../products";
import { buttons } from "./buttons";
import styles from "./Products.module.css";
import { useCartSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

const Products = () => {
  const products = useCartSelector(
    (state: RootState) => state.products.products
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selected, setSelected] = useState("");

  const filterCategory = (category: string) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
    setSelected(category);
  };

  return (
    <main>
      <div className={styles.categories}>
        <h1>Selectionner une catégorie</h1>
        <ul className={styles.buttonList}>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={
                selected === button.categorie ? styles.selectedBtn : ""
              }
              onClick={() => filterCategory(button.categorie)}
            >
              {button.jsx}
            </button>
          ))}
        </ul>
      </div>
      <ProductList products={filteredProducts} />
    </main>
  );
};

export default Products;
