import { useEffect, useState } from "react";
import ProductList from "../../components/Prdoucts/ProductList";
import { Product } from "../../products";
import Slider from "../../components/Slider/Slider";
import Engagements from "../../components/Engagements/Engagements";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import { fetchProducts } from "../../features/productSlice";
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
