import { useState } from "react";
import styles from "./FormTopOffer.module.css";
import { useCartDispatch } from "../../store/hooks";
import { addTopOffer } from "../../features/topProductSlice";

export type FormData = {
  title: string;
  description: string;
  img: string;
  newPrice: number;
  oldPrice: number;
  stock: number;
};

const FormTopOffer = () => {
  const dispatch = useCartDispatch();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    img: "",
    newPrice: 0,
    oldPrice: 0,
    stock: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTopOffer(formData));
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
      <label>Nouveau Prix</label>
      <input
        type="number"
        name="newPrice"
        value={formData.newPrice}
        onChange={handleChange}
        placeholder="Nouveau Prix"
      />
      <label>Ancien Prix</label>
      <input
        type="number"
        name="oldPrice"
        value={formData.oldPrice}
        onChange={handleChange}
        placeholder="Ancien Prix"
      />
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

export default FormTopOffer;
