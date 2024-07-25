import ProductList from "../../components/Prdoucts/ProductList";
import Slider from "../../components/Slider/Slider";
import Engagements from "../../components/Engagements/Engagements";
import { useCartSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

const Home = () => {
  const products = useCartSelector(
    (state: RootState) => state.products.products
  );

  return (
    <main>
      <Slider />
      <ProductList products={products} />
      <Engagements />
    </main>
  );
};

export default Home;
