import React, { useEffect, useState } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";

import api from "../api/api";
import { formatCurrency, formatDate } from "../utils/formatters";

import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import "../style/Orders.css";

const fallbackImg = "https://dummyimage.com/80x100/cccccc/000000&text=Book";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/user");
        setOrders(res.data || []);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" />
        <p className="mt-2 text-muted">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

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

  return (
    <div className="container mt-4 orders-page">
      <PageHeader
        title="Your Orders"
        subtitle="Review your past purchases"
      />

      {orders.map((order, index) => {
        const status = order?.orderStatus || "pending";

        return (
          <Card key={order._id} className="order-card mb-4">

            {/* Success Message */}
            {location.state?.fromOrder && index === 0 && (
              <div className="order-success">
                ✔ Order placed successfully
              </div>
            )}

            {/* HEADER */}
            <div className="order-header">
              <div>
                <div className="order-id">
                  Order #{order._id}
                </div>
                <div className="order-date">
                  Placed on {order?.createdAt ? formatDate(order.createdAt) : "-"}
                </div>
              </div>

              <div className={`order-status ${status}`}>
                {status}
              </div>
            </div>

            <hr />

            {/* ITEMS */}
            <div className="order-items">
              {(order.products || []).map((item, i) => (
                <div key={i} className="order-item">

                  {/* ✅ IMAGE */}
                <img
                     src={item?.image || fallbackImg}
                     alt="book"
                     className="order-item-img"
                    />

                  {/* INFO */}
                  <div className="order-item-info">
                    <h6>{item?.title || "Untitled Product"}</h6>

                    <div className="order-item-price">
                      {formatCurrency(item?.priceAtPurchase || 0)} × {item?.quantity || 0}
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="order-item-total">
                    {formatCurrency(
                      (item?.priceAtPurchase || 0) * (item?.quantity || 0)
                    )}
                  </div>

                </div>
              ))}
            </div>

            <hr />

            {/* SUMMARY */}
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(order?.totalAmount || 0)}</span>
              </div>

              <div className="summary-row text-muted small">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>{formatCurrency(order?.totalAmount || 0)}</span>
              </div>
            </div>

          </Card>
        );
      })}
    </div>
  );
};

export default Orders;