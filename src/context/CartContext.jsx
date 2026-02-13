import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

/*
  CartContext is used to share cart-related data and actions
  across the application (Home, Cart, Header, etc.)
*/
const CartContext = createContext(null);

/*
  CartProvider wraps the app and holds the centralized cart state.
  Any component inside this provider can access cart data.
*/
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
  }, [cartItems]);

  /*
    Add a book to the cart.
    - If the book already exists, increase its quantity.
    - Otherwise, add the book with quantity = 1.
  */
  const addToCart = (book) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === book.id);

      if (existing) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...book, quantity: 1 }];
    });
  };

  /*
    Increase quantity of a specific cart item.
  */
  const increaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /*
    Decrease quantity of a cart item.
    If quantity becomes 0, the item is removed from the cart.
  */
  const decreaseQty = (id) => {
    setCartItems(items =>
      items
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  /*
    Completely remove an item from the cart.
  */
  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  /*
    Provide cart state and actions to all child components.
  */
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

/*
  Custom hook for easy access to cart context.
  This avoids importing useContext and CartContext everywhere.
*/
export const useCart = () => useContext(CartContext);
