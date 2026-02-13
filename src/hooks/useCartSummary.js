
export const useCartSummary = (cartItems) => {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { totalAmount };
};
