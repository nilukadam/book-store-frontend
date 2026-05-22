import React, { useState } from "react";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { useCart } from "../context/CartContext";

import { useCartSummary } from "../hooks/useCartSummary";

import api from "../api/api";

import EmptyState from "../components/ui/EmptyState";

import Button from "../components/ui/Button";

import "../style/Cart.css";

const Cart = () => {

  /* =====================================================
     STATE
  ===================================================== */

  const [showAuthPopup, setShowAuthPopup] =
    useState(false);

  const [isPlacingOrder, setIsPlacingOrder] =
    useState(false);

  /* =====================================================
     HOOKS
  ===================================================== */

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useCart();

  const { totalAmount } =
    useCartSummary(cartItems);

  /* =====================================================
     PLACE ORDER
  ===================================================== */

  const handlePlaceOrder = async () => {

    if (!isAuthenticated) {
      setShowAuthPopup(true);
      return;
    }

    if (cartItems.length === 0) return;

    setIsPlacingOrder(true);

    const orderToast =
      toast.loading("Placing your order...");

    try {

      const formattedProducts = cartItems.map(
        (item) => ({
          product: item._id,
          title: item.title,
          priceAtPurchase: item.price,
          quantity: item.quantity,
        })
      );

      await api.post("/orders", {
        products: formattedProducts,
        totalAmount,
      });

      cartItems.forEach((item) =>
        removeFromCart(item._id)
      );

      toast.success(
        "Order placed successfully",
        {
          id: orderToast,
        }
      );

      navigate("/orders");

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to place order",
        {
          id: orderToast,
        }
      );

    } finally {

      setIsPlacingOrder(false);

    }

  };

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (cartItems.length === 0) {

    return (
      <div className="container">

        <EmptyState
          title="Your cart is empty"
          message="
            Looks like you haven’t added
            any books yet.
          "
          action={
            <Button onClick={() => navigate("/")}>
              Browse Books
            </Button>
          }
        />

      </div>
    );

  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <>

      <div className="container mt-4 cart-page">

        <h2 className="cart-page-title">
          Your Cart ({cartItems.length})
        </h2>

        <div className="row">

          {/* =====================================================
              CART ITEMS
          ===================================================== */}

          <div className="col-lg-8">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="cart-item-block"
              >

                <div className="row align-items-center">

                  {/* IMAGE */}

                  <div className="col-4 col-md-3">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        img-fluid
                        cart-item-image
                      "
                    />

                  </div>

                  {/* INFO */}

                  <div className="col-8 col-md-6">

                    <h5 className="cart-item-title">
                      {item.title}
                    </h5>

                    <p className="text-muted mb-1">
                      by {item.author}
                    </p>

                    <p className="cart-item-price mb-1">
                      ₹{item.price}
                    </p>

                    {/* QUANTITY */}

                    <div className="quantity-wrapper">

                      <button
                        className="
                          btn
                          btn-outline-secondary
                          bn-btn
                        "
                        onClick={() =>
                          decreaseQty(item._id)
                        }
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>

                      <span className="quantity-value">
                        {item.quantity}
                      </span>

                      <button
                        className="
                          btn
                          btn-outline-secondary
                          bn-btn
                        "
                        onClick={() =>
                          increaseQty(item._id)
                        }
                      >
                        +
                      </button>

                    </div>

                    {/* REMOVE */}

                    <button
                      className="remove-link"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                  {/* TOTAL */}

                  <div
                    className="
                      col-md-3
                      text-md-end
                      mt-3
                      mt-md-0
                    "
                  >

                    <div className="line-total">
                      ₹
                      {item.price * item.quantity}
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* =====================================================
              SUMMARY
          ===================================================== */}

          <div className="col-lg-4">

            <div className="cart-summary sticky-top">

              <h5 className="summary-title">
                Order Summary
              </h5>

              <div className="summary-row">

                <span>Subtotal</span>

                <span>₹{totalAmount}</span>

              </div>

              <div
                className="
                  summary-row
                  text-muted
                "
              >

                <span>Shipping</span>

                <span>Free</span>

              </div>

              <hr />

              <div className="summary-total">

                <span>Total</span>

                <span>₹{totalAmount}</span>

              </div>

              <Button
                className="
                  w-100
                  checkout-btn
                "
                disabled={isPlacingOrder}
                onClick={handlePlaceOrder}
              >
                {isPlacingOrder
                  ? "Placing Order..."
                  : "Proceed to Checkout"}
              </Button>

              <p
                className="
                  checkout-microcopy
                  text-center
                "
              >
                Secure checkout ·
                Easy returns ·
                Fast delivery
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          AUTH MODAL
      ===================================================== */}

      {showAuthPopup && (

        <div className="modal-overlay">

          <div
            className="
              modal-box
              text-center
            "
          >

            <h5 className="mb-3">
              Login required
            </h5>

            <p className="text-muted">
              Please login to place
              your order.
            </p>

            <div
              className="
                d-flex
                justify-content-center
                gap-2
                mt-4
              "
            >

              <Button
                onClick={() =>
                  navigate("/auth")
                }
              >
                Go to Login
              </Button>

              <Button
                variant="outline-secondary"
                onClick={() =>
                  setShowAuthPopup(false)
                }
              >
                Cancel
              </Button>

            </div>

          </div>

        </div>

      )} 

    </>
  );

};

export default Cart;