import { useEffect } from "react";
import ProductList from "../../components/Prdoucts/ProductList";
import { products } from "../../products";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import { slideActions } from "../../features/sliderSlice";
import { topProducts } from "../../topProducts";
import Slider from "../../components/Slider/Slider";

const Home = () => {
  const index = useCartSelector((state) => state.slider.currentIndex);
  const dispatch = useCartDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index < topProducts.length - 1) {
        dispatch(slideActions.increment());
      } else {
        dispatch(slideActions.setIndex(0));
      }
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, index]);

  console.log(index);

  return (
    <main>
      <Slider product={topProducts[index]} />
      <ProductList products={products} />
    </main>
  );
};

export default Home;
