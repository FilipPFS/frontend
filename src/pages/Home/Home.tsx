import { useEffect } from "react";
import ProductList from "../../components/Prdoucts/ProductList";
import { products } from "../../products";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import { slideActions } from "../../features/sliderSlice";
import { topProducts } from "../../topProducts";
import Slider from "../../components/Slider/Slider";
import Engagements from "../../components/Engagements/Engagements";

const Home = () => {
  return (
    <main>
      <Slider />
      <ProductList products={products} />
      <Engagements />
    </main>
  );
};

export default Home;
