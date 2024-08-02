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
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataProduct>({
    title: singleProduct ? singleProduct.title : "",
    description: singleProduct ? singleProduct.description : "",
    image: singleProduct ? null : null, // Initial value as null
    price: singleProduct ? singleProduct.price : 0,
    category: singleProduct ? singleProduct.category : "",
    stock: singleProduct ? singleProduct.stock ?? 0 : 0,
    inStock: singleProduct ? singleProduct.inStock : false,
  });

  useEffect(() => {
    if (singleProduct) {
      setFormData({
        title: singleProduct.title,
        description: singleProduct.description,
        image: null,
        price: singleProduct.price,
        category: singleProduct.category,
        stock: singleProduct.stock ?? 0,
        inStock: singleProduct.inStock,
      });
    }
  }, [singleProduct]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Append image file
    }
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock", formData.stock.toString());
    formDataToSend.append("inStock", formData.inStock.toString());

    try {
      dispatch(
        updateProduct({
          id: singleProduct!._id,
          updatedProduct: formDataToSend,
        })
      );
      toast.success("Modifié avec succès.", {
        autoClose: 1500,
      });
      setSelected(false);
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

  const handleSelected = () => {
    setSelected((prevSelected) => !prevSelected);
  };

  if (!singleProduct) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.container}>
      {selected ? (
        <form className={styles.childContainer} onSubmit={handleSubmit}>
          <div className={styles.imgContainer}>
            {preview ? (
              <img src={preview} alt="Preview" />
            ) : (
              <img src={singleProduct?.img} alt="product" />
            )}
            <input type="file" name="image" onChange={handleImageChange} />
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
              <button type="button" onClick={() => setSelected(false)}>
                Annuler
              </button>
              <button type="submit">Sauvegarder</button>
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.childContainer}>
          <div className={styles.imgContainer}>
            <img src={singleProduct?.img} alt="product" />
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
