import React, { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------- FETCH ORDERS ---------- */
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data || []);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ---------- UPDATE STATUS ---------- */
  const updateStatus = async (id) => {
    try {
      await api.put(`/orders/${id}`, {
        orderStatus: "completed",
      });
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  /* ---------- UI STATES ---------- */
  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-danger mt-5">
        {error}
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-center mt-5">
        No orders available
      </p>
    );
  }

  /* ---------- MAIN UI ---------- */
  return (
    <div className="container mt-4">

      <PageHeader
        title="Admin Orders"
        subtitle="Manage customer orders"
      />

      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const isCompleted = order.orderStatus === "completed";

              return (
                <tr key={order._id}>
                  <td>{order._id}</td>

                  <td>
                    {order.user?.name || "Unknown"}
                  </td>

                  <td>₹{order.totalAmount}</td>

                  <td>
                    <span
                      className={`badge ${
                        isCompleted
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>
                    <Button
                      variant="outline"
                      disabled={isCompleted}
                      onClick={() => updateStatus(order._id)}
                    >
                      {isCompleted
                        ? "Completed"
                        : "Mark Completed"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

    </div>
  );
};

export default AdminOrders;