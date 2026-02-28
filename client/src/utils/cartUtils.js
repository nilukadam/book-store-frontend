export const getCartItemCount = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.qty,
      0
    );
  };
  