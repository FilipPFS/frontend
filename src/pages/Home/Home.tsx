import { useEffect, useState } from "react";
import ProductList from "../../components/Prdoucts/ProductList";
import { Product } from "../../products";
import Slider from "../../components/Slider/Slider";
import Engagements from "../../components/Engagements/Engagements";
import axios from "axios";

const Home = () => {
  const [myProducts, setmyProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:5000/api/product"
      );
      setmyProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main>
      <Slider />
      <ProductList products={myProducts} />
      <Engagements />
    </main>
  );
};

export default Home;
