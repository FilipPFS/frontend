import { useEffect, useState } from "react";
import ProductList from "../../components/Prdoucts/ProductList";
import { Product } from "../../products";
import { buttons } from "./buttons";
import styles from "./Products.module.css";
import axios from "axios";

const Products = () => {
  const [products, setMyProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState("");

  const getProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:5000/api/product"
      );
      setMyProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
