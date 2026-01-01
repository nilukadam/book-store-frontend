import { useEffect, useState } from "react";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button"; 
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";


const Orders = () => {
  // get orders list from context
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

  return () => clearTimeout(timer);
}, []);


  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border "/>
        <p className="mt-2 text-muted">Loading your orders...</p>
      </div>
    )
  }
  // show this when there are no orders
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
        <Card
        key={order.id}
        className={index === 0 && (
          <div className=" alert alert-success mb-3">
            Order placed Successfully..!!
          </div>
        )}
      >
        {/* order info */}
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
      
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      
        {/* ordered items */}
        <ul className="list-group list-group-flush mb-3">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="list-group-item"
            >
              {item.name} — ₹{item.price} × {item.qty}
            </li>
          ))}
        </ul>
      
        {/* order total */}
        <h5 className="mt-5">
          Total: ₹{order.totalAmount}
        </h5>
      </Card>
      
      ))}
    </div>
  );
};

export default Orders;
