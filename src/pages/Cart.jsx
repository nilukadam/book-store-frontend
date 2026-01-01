// Cart page
// Shows cart items, quantity controls, and total price
import { useState } from "react";
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

 const [showAuthPopup, setShowAuthPopup] = useState(false);

  // orders history context
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  // calculate total amount dynamically
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Handle place order(frontend-only)
  const handlePlaceOrder = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return
    }

    if (cartItems/length === 0) return;
    setIsPlacingOrder(false);
    navigate("/orders")


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
      <div className="container text-center empty-cart">
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
  <>
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      <div className="mb-3">
        {cartItems.map(item => (
          <div
            key={item.id}
            className="card mb-3 p-3 d-flex justify-content-between align-items-center flex-row"
          >
            <div>
              <strong>{item.name}</strong>
              <div className="text-muted">
                ₹{item.price} × {item.qty}
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => increaseQty(item.id)}
              >
                +
              </button>

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={item.qty === 1}
                onClick={() => decreaseQty(item.id)}
              >
                −
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4 className="mb-0">Total: ₹{totalAmount}</h4>

        <button
          className="btn btn-primary px-4"
          disabled={cartItems.length === 0 || isPlacingOrder}
          onClick={handlePlaceOrder}
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>

    {showAuthPopup && (
      <div className="modal-overlay">
        <div className="modal-box text-center">
          <h5>Login required</h5>
          <p>Please login to place your order.</p>

          <div className="d-flex justify-content-center gap-2 mt-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowAuthPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);

};

export default Cart;
