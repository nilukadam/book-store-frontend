/*
  Utility: getCartItemCount

  Purpose:
  Calculates the total number of items in the shopping cart.

  Example:
  Input:
  [
    { qty: 2 },
    { qty: 1 },
    { qty: 3 }
  ]

  Output:
  6

  Notes:
  - Pure utility function.
  - No React dependency.
  - No side effects.
  - Does not modify the original cart array.
*/

export const getCartItemCount = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );
};