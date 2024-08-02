import { useNavigate, useParams } from "react-router-dom";
import { useCartDispatch, useCartSelector } from "../../../store/hooks";
import styles from "./DashSingleProduct.module.css";
import { useEffect, useState } from "react";
import { FormDataProduct } from "../../../components/FormProduct/FormProduct";
import { deleteProduct, updateProduct } from "../../../features/productSlice";
import { toast } from "react-toastify";

type Props = {};

const DashSingleProduct = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const products = useCartSelector((state) => state.products.products);
  const dispatch = useCartDispatch();
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const singleProduct = products.find((product) => product._id === id);

  const handleSelected = () => {
    setSelected((prevSelected) => !prevSelected);
  };

  const [formData, setFormData] = useState<FormDataProduct>({
    title: singleProduct ? singleProduct.title : "",
    description: singleProduct ? singleProduct.description : "",
    img: singleProduct ? singleProduct.img : "",
    price: singleProduct ? singleProduct.price : 0,
    category: singleProduct ? singleProduct.category : "",
    stock: singleProduct ? singleProduct.stock ?? 0 : 0,
    inStock: singleProduct ? singleProduct.inStock : false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(
        updateProduct({ id: singleProduct!._id, updatedProduct: formData })
      );
      toast.success("Modifié avec succès.", {
        autoClose: 1500,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const productDelete = (id: string) => {
    dispatch(deleteProduct(id));
    navigate("/dashboard/products");
    toast.success("Supprimé avec succès.", {
      autoClose: 1500,
    });
  };

  if (!singleProduct) {
    return <div>Loading...</div>;
  }
  return (
    <section className={styles.container}>
      {selected ? (
        <form className={styles.childContainer} onSubmit={handleSubmit}>
          <div className={styles.imgContainer}>
            <img src={singleProduct?.img} />
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formInfo}>
            <input
              type="text"
              placeholder="Titre"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <textarea
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Prix"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Quantité"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
            <select
              id="options"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Choisir une catégorie
              </option>
              <option value="clothes">Vêtements</option>
              <option value="sport">Sport</option>
              <option value="technology">Technologie</option>
              <option value="gym">Gym</option>
              <option value="notebooks">Cahiers</option>
              <option value="cars">Voitures</option>
            </select>
            <div className={styles.btnBlock}>
              <button onClick={() => setSelected(false)}>Annuler</button>
              <button type="submit">Sauvegarder</button>
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.childContainer}>
          <div className={styles.imgContainer}>
            <img src={singleProduct?.img} />
          </div>
          <div className={styles.infoContainer}>
            <h3>Titre: {singleProduct?.title}</h3>
            <p>Description: {singleProduct?.description}</p>
            <p>Prix: {(singleProduct!.price / 100).toFixed(2)}€</p>
            <p>Quantité: {singleProduct?.stock}</p>
            <p>Catégorie: {singleProduct?.category}</p>
            <div className={styles.btnBlock}>
              <button onClick={handleSelected}>Changer</button>
              <button onClick={() => productDelete(singleProduct._id)}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DashSingleProduct;
