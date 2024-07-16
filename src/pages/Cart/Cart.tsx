import cartSlice, { CartProduct } from "../../features/cartSlice";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import styles from "./Cart.module.css";

const Cart = () => {
  const cartItems = useCartSelector((state) => state.cart.items);

  const dispatch = useCartDispatch();

  const handleAddToCart = (item: CartProduct) => {
    dispatch(cartSlice.actions.addToCart(item));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(cartSlice.actions.removeFromCart(id));
  };

  const total = cartItems.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
  const formattedTotalPrice = (total / 100).toFixed(2);

  return (
    <main className={styles.container}>
      <div className={styles.cartProducts}>
        <h1>Your cart</h1>
        {cartItems.map((item) => {
          return (
            <article className={styles.product}>
              <div className={styles.imgContainer}>
                <img src={item.img} alt={item.title} />
              </div>
              <div className={styles.infoContainer}>
                <div>
                  <h1>{item.title}</h1>
                  <p>{(item.price / 100).toFixed(2)}€</p>
                </div>
                <div className={styles.adjustQuantity}>
                  <span onClick={() => handleAddToCart(item)}>+</span>
                  <span>{item.quantity}</span>
                  <span onClick={() => handleRemoveFromCart(item.id)}>-</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.billContainer}>
        <div className={styles.cartBill}>
          <h1>Total: {formattedTotalPrice}€</h1>
          <button>Passer la commande</button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
