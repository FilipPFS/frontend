import { useState } from "react";
import { useCartDispatch } from "../../store/hooks";
import styles from "./FormProduct.module.css";
import { addProduct } from "../../features/productSlice";

type FormData = {
  title: string;
  description: string;
  img: string;
  price: number;
  category: string;
  stock: number;
  inStock: boolean;
};

const FormProduct = () => {
  const dispatch = useCartDispatch();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    img: "",
    price: 0,
    category: "",
    stock: 0,
    inStock: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (name === "stock") {
      newValue = parseInt(value, 10) || 0;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
      inStock: name === "stock" ? (newValue as number) > 0 : prevData.inStock,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProduct(formData));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Titre</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Titre"
      />
      <label>Description</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <label>Image Lien</label>
      <input
        type="text"
        name="img"
        value={formData.img}
        onChange={handleChange}
        placeholder="Image Lien"
      />
      <label>Prix</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Prix"
      />
      <label htmlFor="options">Choose an option:</label>
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
      <label>Quantité</label>
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Quantité"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default FormProduct;
