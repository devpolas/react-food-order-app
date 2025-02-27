import { createContext, useContext, useState } from "react";

const UserProgressCheckout = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCartCheckout: () => {},
  hideCartCheckout: () => {},
});

function UserProgressCheckoutProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }
  function showCartCheckout() {
    setUserProgress("checkout");
  }

  function hideCartCheckout() {
    setUserProgress("");
  }
  const userProgressValue = {
    progress: userProgress,
    showCart,
    hideCart,
    showCartCheckout,
    hideCartCheckout,
  };
  return (
    <UserProgressCheckout value={userProgressValue}>
      {children}
    </UserProgressCheckout>
  );
}

function useUserProgressCheckout() {
  const context = useContext(UserProgressCheckout);

  if (context === undefined) {
    throw new Error(
      "You Should use UserProgressCheckout context outside the context"
    );
  }

  return context;
}

export { UserProgressCheckoutProvider, useUserProgressCheckout };
