import { useState } from "react";
import { useCartDispatch } from "../../store/hooks";
import styles from "./FormProduct.module.css";
import { addProduct } from "../../features/productSlice";
import { toast } from "react-toastify";

export type FormDataProduct = {
  title: string;
  description: string;
  image: File | null;
  price: number;
  category: string;
  stock: number;
  inStock: boolean;
};

const FormProduct = () => {
  const dispatch = useCartDispatch();
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataProduct>({
    title: "",
    description: "",
    image: null,
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
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock", formData.stock.toString());
    formDataToSend.append("inStock", formData.inStock.toString());

    dispatch(addProduct(formDataToSend));
    toast.success("Ajouté avec succès.", {
      autoClose: 1500,
    });
  };

  console.log("Form Data", formData);

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
