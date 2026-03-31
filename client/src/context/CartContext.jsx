import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [cartItems, setCartItems] = useState(() => {
    if (!user?.email) return [];

    const storedCart = localStorage.getItem(`cart_${user.email}`);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, user]);

  /* ---------- ADD TO CART ---------- */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item._id === product._id);

      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /* ---------- INCREASE QTY ---------- */
  const increaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /* ---------- DECREASE QTY ---------- */
  const decreaseQty = (id) => {
    setCartItems(items =>
      items
        .map(item =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  /* ---------- REMOVE ITEM ---------- */
  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);