import React from "react";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const AdminOrders = () => {
  /* -------- MOCK ORDERS -------- */
  const orders = [
    {
      id: "ORD_101",
      user: "Nilesh Kadam",
      total: 899,
      status: "Placed",
    },
    {
      id: "ORD_102",
      user: "Rahul Sharma",
      total: 499,
      status: "Shipped",
    },
    {
      id: "ORD_103",
      user: "Anjali Verma",
      total: 1299,
      status: "Delivered",
    },
  ];

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
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user}</td>
                <td>₹{order.total}</td>
                <td>{order.status}</td>

                <td>
                  <Button variant="outline">
                    Update Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

    </div>
  );
};

export default AdminOrders;