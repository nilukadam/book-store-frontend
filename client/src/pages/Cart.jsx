import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import { useCartSummary } from "../hooks/useCartSummary";
import { useOrders } from "../context/OrderContext";

import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";

import "../style/Cart.css";

const Cart = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();
  const { addOrder } = useOrders();

  const { totalAmount } = useCartSummary(cartItems);

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

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="Your cart is empty"
          message="Looks like you haven’t added any books yet."
          action={<Button onClick={() => navigate("/")}>Browse Books</Button>}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4 cart-page">
        <h2 className="cart-page-title fw-semibold">
          Your Cart ({cartItems.length})
        </h2>

        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-block">

                <div className="row align-items-center">
                  
                  <div className="col-4 col-md-3">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="img-fluid cart-item-image"
                    />
                  </div>

                  <div className="col-8 col-md-6">
                    <h5 className="cart-item-title">{item.name}</h5>
                    <p className="text-muted small mb-1">
                      by {item.author}
                    </p>

                    <p className="cart-item-price mb-1">
                      ₹{item.price}
                    </p>

                    <div className="quantity-wrapper">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>

                      <span className="quantity-value">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-link"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="col-md-3 text-md-end mt-3 mt-md-0">
                    <div className="line-total">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="col-lg-4">
            <div className="cart-summary sticky-top">
              <h5 className="summary-title">
                Order Summary
              </h5>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="summary-row text-muted small">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                className="btn btn-primary w-100 checkout-btn"
                disabled={isPlacingOrder}
                onClick={handlePlaceOrder}
              >
                {isPlacingOrder ? "Placing Order..." : "Proceed to Checkout"}
              </button>

              <p className="checkout-microcopy text-center mt-2">
                Secure checkout · Easy returns · Fast delivery
              </p>
            </div>
          </div>
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
