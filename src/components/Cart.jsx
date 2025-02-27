import Button from "../UI/Button.jsx";
import { useUserProgressCheckout } from "../contexts/UserProgressContext.jsx";
import Model from "./../UI/Model.jsx";
import { useCart } from "./../contexts/CartContextAPI.jsx";
import { formateCurrency } from "./../utils/formatting.js";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const { items, addItem, removeItem } = useCart();
  const { progress, hideCart, showCartCheckout } = useUserProgressCheckout();
  const totalPrice = items.reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);

  function handleHideCart() {
    hideCart();
  }
  function handelShowCheckout() {
    showCartCheckout();
  }
  return (
    <Model
      classes="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleHideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{formateCurrency.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handelShowCheckout}>Checkout</Button>
        )}
      </p>
    </Model>
  );
}
