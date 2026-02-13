/*
  Pure formatting utilities.
  No React.
  No side effects.
  Only value transformation.
*/

/**
 * Format currency with ₹ symbol.
 * Keeps behavior identical to current implementation.
 */
export const formatCurrency = (amount) => {
  return `₹${amount}`;
};

/**
 * Format ISO date string to readable local string.
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};
