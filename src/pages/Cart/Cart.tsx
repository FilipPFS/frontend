import { useEffect, useState } from "react";
import cartSlice, {
  CartProduct,
  deleteCartItems,
  fetchCartItems,
} from "../../features/cartSlice";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import styles from "./Cart.module.css";
import axios, { AxiosResponse } from "axios";
import { loadStripe } from "@stripe/stripe-js";
import FormAddress from "../../components/FormAddress/FormAddress";
import { UserType } from "../Account/Account";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useCartDispatch();
  const cartItems = useCartSelector((state: RootState) => state.cart.items);
  const [userInfo, setUserInfo] = useState<UserType>();

  const getUserInfo = async () => {
    try {
      const response: AxiosResponse<UserType> = await axios.get(
        `http://localhost:5000/api/user/${userId}`
      );
      setUserInfo(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log("Cart", cartItems);

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleAddToCart = (item: CartProduct) => {
    dispatch(cartSlice.actions.addToCart(item));
  };

  const handleAddToUserCart = async (id: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/cart/${userId}/${id}`
      );
      const newQuantity = response.data.product.quantity;
      dispatch(
        cartSlice.actions.updateProductQuantity({
          productId: id,
          quantity: newQuantity,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    if (!userId) {
      dispatch(cartSlice.actions.removeFromCart(productId));
    } else {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/cart/remove-item/${userId}/${productId}`
        );

        const updatedItems = response.data.items;

        dispatch(cartSlice.actions.setItems(updatedItems));
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
      }
    }
  };

  const total = cartItems.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
  const formattedTotalPrice = (total / 100).toFixed(2);

  const updatedCartItems = cartItems.map((item) => ({
    ...item,
    totalPrice: item.price * item.quantity,
  }));

  const makePayment = async () => {
    console.log("makePayment function called");
    const stripe = await loadStripe(
      "pk_test_51PiiELRv47bx0DCZur5yn2ItBmbIwz2TfXMkTjGgFN7mScwDKM1uvNLgnwA5osnrPbnNtQ2w0ixeoKbUyMhFytlQ00qTYK92qW" ||
        ""
    );
    const body = {
      products: cartItems,
      userId: userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/create-checkout-session",
        body
      );
      console.log("Response from create-checkout-session:", response);
      const session = response.data;

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.log(result.error.message);
      } else {
        console.log("Redirecting to Stripe checkout...");
      }
    } catch (err) {
      console.log("Error during payment process:", err);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.cartProducts}>
        <h1>Votre panier</h1>
        {cartItems.length === 0 && (
          <p>Vous n'avez pas d'article dans le panier.</p>
        )}
        {updatedCartItems.map((item) => {
          return (
            <article key={item.productId} className={styles.product}>
              <div className={styles.imgContainer}>
                <img src={item.img} alt={item.title} />
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.titleBlock}>
                  <h3>{item.title}</h3>
                </div>
                <div className={styles.adjustQuantity}>
                  <span
                    onClick={
                      !userId
                        ? () => handleAddToCart(item)
                        : () => handleAddToUserCart(item.productId)
                    }
                  >
                    +
                  </span>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <span onClick={() => handleRemoveFromCart(item.productId)}>
                    -
                  </span>
                </div>
                <div className={styles.priceBlock}>
                  <p>{(item.totalPrice / 100).toFixed(2)}€</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.billContainer}>
        <div className={styles.cartBill}>
          <h2>Recapitulatif</h2>
          <FormAddress flexDirection="column" />
          <div className={styles.total}>
            <h4>Total: {formattedTotalPrice}€</h4>
            <button
              disabled={!total || !userInfo?.address}
              onClick={makePayment}
              className={styles.billBtn}
            >
              Passer la commande
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
