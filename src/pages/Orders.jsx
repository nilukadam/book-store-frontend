import { useOrders } from "../context/OrderContext";

/*
  Orders page component.
  Responsibilities:
  - Display order history
  - Handle empty state
  - Show order metadata (date, total)
  - Read-only UI (no mutations)
*/
const Orders = () => {

  // Access orders from OrderContext
  const { orders } = useOrders();

  /*
    Empty state:
    Shown when user has not placed any orders yet.
  */
  if (orders.length === 0) {
    return (
      <div>
        <h2>No orders placed yet.</h2>
        <p>Your order history will appear here after checkout.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Orders</h2>

      {orders.map(order => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "15px"
          }}
        >
          {/* Order metadata */}
          <p><strong>Order ID:</strong> {order.id}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          {/* Ordered items */}
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.name} — ₹{item.price} × {item.quantity}
              </li>
            ))}
          </ul>

          {/* Order total */}
          <h4>Total: ₹{order.totalAmount}</h4>
        </div>
      ))}
    </div>
  );
};

export default Orders;
