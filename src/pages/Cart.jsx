import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import { useCartSummary } from "../hooks/useCartSummary";
import { useOrders } from "../context/OrderContext";

import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";

const Cart = () => {
  /* -------------------- STATE -------------------- */
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  /* -------------------- HOOKS -------------------- */
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();
  const { addOrder } = useOrders();

  /* -------------------- DERIVED DATA -------------------- */
  const { totalAmount } = useCartSummary(cartItems);

  /* -------------------- HANDLERS -------------------- */
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      setShowAuthPopup(true);
      return;
    }

    if (cartItems.length === 0) return;

    setIsPlacingOrder(true);

    const newOrder = {
      id: `order_${Date.now()}`,
      items: cartItems,
      totalAmount,
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);
    cartItems.forEach((item) => removeFromCart(item.id));

    navigate("/orders", { state: { fromOrder: true } });
  };

  /* -------------------- EMPTY STATE -------------------- */
  if (cartItems.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="Your cart is empty"
          message="Looks like you haven’t added any books yet."
          action={
            <Button onClick={() => navigate("/")}>
              Browse Books
            </Button>
          }
        />
      </div>
    );
  }

  /* -------------------- MAIN UI -------------------- */
  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4 fw-semibold">Your Cart</h2>

        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div key={item.id} className="card mb-3 p-4 border rounded-3">
                <div className="row align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src={item.cover}
                      alt={item.name}
                      className="img-fluid rounded cart-item-image"
                    />
                  </div>

                  <div className="col-6 col-md-7">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-1 small">
                      by {item.author}
                    </p>
                    <p className="fw-bold mb-2">₹{item.price}</p>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div className="d-flex justify-content-end gap-2 mb-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={item.quantity === 1}
                        onClick={() => decreaseQty(item.id)}
                      >
                        −
                      </button>
                    </div>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4">
            <div className="card p-4 sticky-top cart-summary">
              <h5 className="fw-bold mb-3 text-uppercase">
                Order Summary
              </h5>

              <div className="d-flex justify-content-between mt-3 mb-4">
                <span className="fw-medium">Total Amount</span>
                <span className="fw-bold fs-5">₹{totalAmount}</span>
              </div>

              <button
                className="btn btn-primary w-100"
                disabled={isPlacingOrder}
                onClick={handlePlaceOrder}
              >
                {isPlacingOrder ? "Placing Order..." : "Proceed to Order"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Popup */}
      {showAuthPopup && (
        <div className="modal-overlay">
          <div className="modal-box text-center">
            <h5>Login required</h5>
            <p>Please login to place your order.</p>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/auth")}
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
