import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";

const Cart = () => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useCart();

  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const handlePlaceOrder = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      setShowAuthPopup(true);
      return;
    }

    if (cartItems.length === 0) return;

    setIsPlacingOrder(false);

    const newOrder = {
      id: `order_${Date.now()}`,
      items: cartItems,
      totalAmount,
      createdAt: new Date().toISOString()
    };

    addOrder(newOrder);

    cartItems.forEach(item => removeFromCart(item.id));

    navigate("/orders");
  };

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

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4" fw-semibold>Your Cart</h2>

        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cartItems.map(item => (
              <div key={item.id} className="card mb-3 p-4 border rounded-3" style={{backgroundColor: '#fff'}}>
                <div className="row align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src={item.cover}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: "110px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="col-6 col-md-7">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-1" style={{fontSize: "14px"}}>
                      by {item.author}
                    </p>
                    <p className="fw-bold mb-2">₹{item.price}</p>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-2" >
                    <div className="d-flex justify-content-end gap-2 mb-2">
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
            <div className="card p-4 sticky-top" style={{ top: "90px" }}>
              <h5 className=" fw-bold mb-3 text-uppercase">
                Order Summary
              </h5>

              <div className="d-flex justify-content-between mt-3 mb-4">
                <span className="fw-medium">Total Amount</span>
                <span className="fw-bold fs-5">₹{totalAmount}</span>
              </div>


              <button
                className="btn btn-primary w-100"
                disabled={cartItems.length === 0 || isPlacingOrder}
                onClick={handlePlaceOrder}
              >
                {isPlacingOrder ? "Placing Order..." : "Proceed to Order"}
              </button>
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
