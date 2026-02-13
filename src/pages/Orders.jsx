import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useOrders } from "../context/OrderContext";
import { formatCurrency, formatDate } from "../utils/formatters";

import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

const Orders = () => {
  /* -------------------- STATE -------------------- */
  const [loading, setLoading] = useState(true);

  /* -------------------- HOOKS -------------------- */
  const { orders } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(loadingTimer);
  }, []);

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" />
        <p className="mt-2 text-muted">Loading your orders...</p>
      </div>
    );
  }

  /* -------------------- EMPTY STATE -------------------- */
  if (orders.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="No orders yet"
          message="You haven’t placed any orders yet."
          action={
            <Button onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          }
        />
      </div>
    );
  }

  /* -------------------- MAIN UI -------------------- */
  return (
    <div className="container mt-4">
      <PageHeader
        title="Your Orders"
        subtitle="Review your past purchases"
      />

      {orders.map((order, index) => (
        <Card key={order.id} className="mb-4 p-4">
          {location.state?.fromOrder && index === 0 && (
            <div className="alert alert-success mb-3">
              Order placed successfully
            </div>
          )}

          {/* Order Meta */}
          <div className="d-flex justify-content-between mb-2">
            <strong>Order ID</strong>
            <span className="text-muted">{order.id}</span>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <strong>Date</strong>
            <span className="text-muted">
              {formatDate(order.createdAt)}
            </span>
          </div>

          {/* Order Items */}
          <div className="mb-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center mb-3"
              >
                <img
                  src={item.cover}
                  alt={item.name}
                  className="rounded"
                  style={{ width:"70px", height:"100px", objectFit: "cover"}}
                />

                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1">{item.name}</h6>
                  <p className="text-muted mb-1">
                    {item.author}
                  </p>
                  <small className="text-muted">
                    {formatCurrency(item.price)} × {item.quantity}
                  </small>
                </div>
              </div>
            ))}
          </div>

          <hr />

          {/* Order Total */}
          <div className="d-flex justify-content-between">
            <strong>Total Amount</strong>
            <strong>{formatCurrency(order.totalAmount)}</strong>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
