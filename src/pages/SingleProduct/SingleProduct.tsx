import { products } from "../../products";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();

  const singleProduct = products.find((product) => product.id === id);

  if (singleProduct) {
    return (
      <main>
        <div>
          <img src={singleProduct.img} />
        </div>
        <div>
          <p>{singleProduct.inStock ? "En stock" : "En rupture de stock"}</p>
          <h1>{singleProduct.title}</h1>
          <p>{(singleProduct.price / 100).toFixed(2)}€</p>
          <p>{singleProduct.description}</p>
        </div>
      </main>
    );
  } else {
    return <h1>No data</h1>;
  }
};

export default SingleProduct;
