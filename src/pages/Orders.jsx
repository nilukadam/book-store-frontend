import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useOrders } from "../context/OrderContext";
import { formatCurrency, formatDate } from "../utils/formatters";

import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import "../style/Orders.css";

const Orders = () => {
  const [loading, setLoading] = useState(true);

  const { orders } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" />
        <p className="mt-2 text-muted">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="No orders yet"
          message="You haven’t placed any orders yet."
          action={<Button onClick={() => navigate("/")}>Start Shopping</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container mt-4 orders-page">
      <PageHeader
        title="Your Orders"
        subtitle="Review your past purchases"
      />

      {orders.map((order, index) => {
        const status = "Placed";
        const shipping = 0;

        return (
          <Card key={order.id} className="order-card mb-4">

            {location.state?.fromOrder && index === 0 && (
              <div className="order-success">
                ✔ Order placed successfully
              </div>
            )}

            {/* Order Header */}
            <div className="order-header">
              <div>
                <div className="order-id">
                  Order #{order.id}
                </div>
                <div className="order-date">
                  Placed on {formatDate(order.createdAt)}
                </div>
              </div>

              <div className={`order-status ${status.toLowerCase()}`}>
                {status}
              </div>
            </div>

            <hr />

            {/* Items */}
            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img
                    src={item.cover}
                    alt={item.name}
                    className="order-item-image"
                  />

                  <div className="order-item-info">
                    <h6>{item.name}</h6>
                    <p className="text-muted small mb-1">
                      {item.author}
                    </p>

                    <div className="order-item-price">
                      {formatCurrency(item.price)} × {item.quantity}
                    </div>
                  </div>

                  <div className="order-item-total">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <hr />

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>

              <div className="summary-row text-muted small">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>{formatCurrency(order.totalAmount + shipping)}</span>
              </div>
            </div>

          </Card>
        );
      })}
    </div>
  );
};

export default Orders;
