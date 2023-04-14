import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // check and get the selected item
  const existingCartItems = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemsToRemove) => {
  // check and get the selected item
  const existingCartItems = cartItems.find(
    (cartItem) => cartItem.id === cartItemsToRemove.id
  );

  if (existingCartItems.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemsToRemove.id);
  }

  if (existingCartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemsToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearCartItem = (cartItems, productToDelete) => {
  // non matched id will be returned to the new array, (Everting Except the selected item )
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

// create context
// context do the same job as state and can be accessed using useState
export const CartContext = createContext({
  isCartOpen: false,
  isCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  setTotalCount: () => {},

  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
