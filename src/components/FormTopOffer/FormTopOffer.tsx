import { useState } from "react";
import styles from "./FormTopOffer.module.css";
import { useCartDispatch } from "../../store/hooks";
import { addTopOffer } from "../../features/topProductSlice";
import { toast } from "react-toastify";

export type FormDataTopOffer = {
  title: string;
  description: string;
  image: File | null;
  newPrice: number;
  oldPrice: number;
  stock: number;
};

const FormTopOffer = () => {
  const dispatch = useCartDispatch();
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataTopOffer>({
    title: "",
    description: "",
    image: null,
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
      formDataToSend.append("image", formData.image);
    }
    formDataToSend.append("newPrice", formData.newPrice.toString());
    formDataToSend.append("oldPrice", formData.oldPrice.toString());
    formDataToSend.append("stock", formData.stock.toString());

    dispatch(addTopOffer(formDataToSend));

    toast.success("Ajouté avec succès.", {
      autoClose: 1500,
    });
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
      <label>Image</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
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
