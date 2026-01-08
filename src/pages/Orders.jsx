import { useEffect, useState } from "react";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

const Orders = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
    <div className="container mt-4">
      <PageHeader
        title="Your Orders"
        subtitle="Review your past purchases"
      />

      {orders.map((order, index) => (
        <Card key={order.id} className="mb-4 p-4">
          {index === 0 && (
            <div className="alert alert-success mb-3">
              Order placed successfully
            </div>
          )}

          <div className="d-flex justify-content-between mb-2">
            <strong>Order ID</strong>
            <span className="text-muted">{order.id}</span>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <strong>Date</strong>
            <span className="text-muted">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="mb-3">
            {order.items.map(item => (
              <div
                key={item.id}
                className="d-flex align-items-center mb-3"
              >
                <img
                  src={item.cover}
                  alt={item.name}
                  className="rounded"
                  style={{
                    width: "70px",
                    height: "100px",
                    objectFit: "image"
                  }}
                />

                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1">{item.name}</h6>
                  <p className="text-muted mb-1">
                    {item.author}
                  </p>
                  <small className="text-muted">
                    ₹{item.price} × {item.qty}
                  </small>
                </div>
              </div>
            ))}
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <strong>Total Amount</strong>
            <strong>₹{order.totalAmount}</strong>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
