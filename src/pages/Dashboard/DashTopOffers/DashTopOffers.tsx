import { useEffect, useState } from "react";
import { useCartDispatch, useCartSelector } from "../../../store/hooks";
import styles from "./DashTopOffer.module.css";
import {
  deleteTopOffer,
  updateTopOffer,
} from "../../../features/topProductSlice";
import { FormData } from "../../../components/FormTopOffer/FormTopOffer";
import { TopProduct } from "../../../topProducts";
import { toast } from "react-toastify";

type Props = {};

const DashTopOffers = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const topOffers = useCartSelector((state) => state.topProduct.topProducts);
  const dispatch = useCartDispatch();

  const [selected, setSelected] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    img: "",
    newPrice: 0,
    oldPrice: 0,
    stock: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      dispatch(updateTopOffer({ id: selected, updatedOffer: formData }));
      setSelected(null);
      toast.success("Modifié avec succès.", {
        autoClose: 1500,
      });
    }
  };

  const deleteTopProduct = (id: string) => {
    dispatch(deleteTopOffer(id));
  };

  const selectProductForEditing = (topOffer: TopProduct) => {
    setFormData({
      title: topOffer.title,
      description: topOffer.description,
      img: topOffer.img,
      newPrice: topOffer.newPrice,
      oldPrice: topOffer.oldPrice,
      stock: topOffer.stock!,
    });
    setSelected(topOffer._id);
  };

  return (
    <div className={styles.container}>
      <h2>Dash Top Offers</h2>
      <div className={styles.topOffers}>
        {topOffers.map((topOffer) => (
          <section className={styles.section} key={topOffer._id}>
            {selected === topOffer._id ? (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.imgContainer}>
                  <img src={topOffer.img} alt={topOffer.title} />
                  <input
                    type="text"
                    name="img"
                    value={formData.img}
                    className={styles.formInput}
                    placeholder="Lien de l'image"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formInfoContainer}>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Titre"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="oldPrice"
                    value={formData.oldPrice}
                    placeholder="Ancien Prix"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="newPrice"
                    value={formData.newPrice}
                    placeholder="Nouveau Prix"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    placeholder="Quantité"
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    placeholder="Description"
                    onChange={handleChange}
                    required
                  />
                  <div className={styles.btnSection}>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className={styles.validBtn}
                    >
                      Annuler
                    </button>
                    <button type="submit" className={styles.validBtn}>
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <>
                <div className={styles.imgContainer}>
                  <img src={topOffer.img} alt={topOffer.title} />
                </div>
                <div className={styles.infoContainer}>
                  <h2>Titre: {topOffer.title}</h2>
                  <p>Ancien Prix: {(topOffer.oldPrice / 100).toFixed(2)}€</p>
                  <p>Nouveau Prix: {(topOffer.newPrice / 100).toFixed(2)}€</p>
                  <p>Quantité: {topOffer.stock}</p>
                  <p>Description: {topOffer.description}</p>
                  <div className={styles.btnSection}>
                    <button
                      onClick={() => selectProductForEditing(topOffer)}
                      className={styles.validBtn}
                    >
                      Changer
                    </button>
                    <button
                      onClick={() => deleteTopProduct(topOffer._id)}
                      className={styles.validBtn}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default DashTopOffers;
