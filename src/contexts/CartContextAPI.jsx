import { useReducer, createContext, useContext } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

const INITIAL_STATE = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const itemInCart = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItems = [...state.items];
      if (itemInCart > -1) {
        const exitingItem = state.items[itemInCart];
        const updatedItem = {
          ...exitingItem,
          quantity: exitingItem.quantity + 1,
        };
        updatedItems[itemInCart] = updatedItem;
      } else {
        updatedItems.push({ ...action.payload, quantity: 1 });
      }
      return { ...state, items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const itemInCart = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const exitingItem = state.items[itemInCart];
      const updatedItems = [...state.items];
      if (exitingItem.quantity === 1) {
        updatedItems.splice(itemInCart, 1);
      } else {
        const updateItem = {
          ...exitingItem,
          quantity: exitingItem.quantity - 1,
        };
        updatedItems[itemInCart] = updateItem;
      }
      return { ...state, items: updatedItems };
    }

    case "CLEAR_CART": {
      return { ...state, items: [] };
    }

    default: {
      return state;
    }
  }
}

function CartContextProvider({ children }) {
  const [{ items }, dispatch] = useReducer(reducer, INITIAL_STATE);

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", payload: item });
  }
  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }
  function clearItems() {
    dispatch({ type: "CLEAR_CART" });
  }

  const cartValue = { items, addItem, removeItem, clearItems };

  return <CartContext value={cartValue}>{children}</CartContext>;
}

function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("You should use context outside the context provider!");
  }
  return context;
}

export { CartContextProvider, useCart };
