import React, { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/api";

import "../../style/Admin.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-4">

      <PageHeader
        title="Admin Orders"
        subtitle="Manage customer orders"
      />

      <Card className="p-3">
        <div className="table-responsive">

          <table className="table admin-table align-middle">
            <thead>
              <tr>
                <th>Order</th>
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

                    {/* ORDER ID SHORT */}
                    <td className="order-id-short">
                      #{order._id.slice(-6)}
                    </td>

                    <td>
                      <div className="fw-semibold">
                        {order.user?.name || "Unknown"}
                      </div>
                    </td>

                    <td className="fw-semibold">
                      ₹{order.totalAmount}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`status-badge ${
                          isCompleted ? "completed" : "pending"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td>
                      <Button
                        variant="admin-action-btn"
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

        </div>
      </Card>

    </div>
  );
};

export default AdminOrders;