import ProductList from "../../components/Prdoucts/ProductList";
import { products } from "../../products";

const Home = () => {
  return (
    <main>
      <ProductList products={products} />
    </main>
  );
};

export default Home;
