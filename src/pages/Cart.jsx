// Cart page
// Shows cart items, quantity controls, and total price

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // get cart items and cart actions from context
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useCart();

  // orders history context
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  // calculate total amount dynamically
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Handle place order(frontend-only)
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

  // Create a new order Object
    const newOrder = {
      id: `order_${Date.now()}`, // simple unique id
      items: cartItems,          // cart snapshot
      totalAmount,
      createdAt: new Date().toISOString()
    };

    // Save order in order History
    addOrder(newOrder);

    // Clear cart using existing logic.
    cartItems.forEach(item => removeFromCart(item.id));

    // Redirect user to Orders Page
    navigate("/orders");
  };

  //  CART EMPTY STATE ( clear message to user)
  if (cartItems.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h4>Your cart is empty</h4>
        <p className="text-muted">
          Looks like you haven’t added any books yet.
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Browse Books
        </button>
      </div>
    );
  }

  //  NORMAL CART VIEW
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      <ul className="list-group mb-3">
        {cartItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{item.name}</strong>
              <div className="text-muted">
                ₹{item.price} × {item.qty}
              </div>
            </div>

            <div className="d-flex gap-2">
              {/* qty increase */}
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => increaseQty(item.id)}
              >
                +
              </button>

              {/* qty decrease */}
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => decreaseQty(item.id)}
              >
                −
              </button>

              {/* remove item  from cart*/}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Show total amount */}
      <h4 className="mb-3">Total: ₹{totalAmount}</h4>

      {/* primary action */}
      <button
        className="btn btn-primary w-100"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default Cart;
