import { useCart } from "../contexts/CartContextAPI";
import { useUserProgressCheckout } from "../contexts/UserProgressContext";
import Button from "../UI/Button";
import Logo from "./../assets/logo.jpg";

export default function Header() {
  const { items } = useCart();
  const { showCart } = useUserProgressCheckout();
  const totalCart = items.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  function handelShowCart() {
    showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="react food order app logo" />
        <h1>React Food App</h1>
      </div>
      <nav>
        <Button textOnly onClick={handelShowCart}>
          Cart ({totalCart})
        </Button>
      </nav>
    </header>
  );
}
