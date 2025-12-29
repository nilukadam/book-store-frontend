import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  // get orders list from context
  const { orders } = useOrders();
  const navigate = useNavigate();

  // show this when there are no orders
  if (orders.length === 0) {
    return (
      <div className="container text-center empty-cart">
        <h4>No orders yet</h4>
        <p className="text-muted">
          You haven’t placed any orders yet.
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Start Shopping
        </button> 
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Orders</h2>

      {orders.map((order, index) => (
        <div
          key={order.id}
          className={`card mb-3 ${index === 0 ? "latest-order" : ""}`}
        >
          <div className="card-body">
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
            <h5 className="mt-5">Total: ₹{order.totalAmount}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
