// OrderContext.jsx
// Handles order history using frontend-only localStorage logic

import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Initialize orders from localStorage
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  // Sync orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
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
