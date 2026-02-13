// OrderContext.jsx
// Handles order history using frontend-only localStorage logic
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Initialize orders from localStorage
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

    useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);


  const [orders, setOrders] = useState(() => {
    if (!user?.email) return [];
  
    const storedOrders = localStorage.getItem(`orders_${user.email}`);
    return storedOrders ? JSON.parse(storedOrders) : [];
  });


  // Sync orders to localStorage whenever orders change
  useEffect(() => {
      if (user?.email) {
        localStorage.setItem(
        `orders_${user.email}`,
        JSON.stringify(orders)
      );
    }

  }, [orders]);

  // Add new order
  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook
export const useOrders = () => useContext(OrderContext);
