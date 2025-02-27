import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./contexts/CartContextAPI.jsx";
import { UserProgressCheckoutProvider } from "./contexts/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressCheckoutProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressCheckoutProvider>
  );
}

export default App;
