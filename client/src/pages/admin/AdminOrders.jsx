import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import api from "../../api/api";

import "../../style/Admin.css";

const AdminOrders = () => {

  /* =====================================================
     STATE
  ===================================================== */

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =====================================================
     FETCH ORDERS
  ===================================================== */

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

  /* =====================================================
     UPDATE STATUS
  ===================================================== */
   const updateStatus = async (id) => {
     try {
       await api.put(`/orders/${id}`, {
         orderStatus: "completed",
       });
  
       toast.success("Order status updated successfully.");

       fetchOrders();
 
     } catch (err) {
       toast.error("Failed to update status.");
     }
   };

  /* =====================================================
     LOADING / ERROR
  ===================================================== */

  if (loading) {
    return (
      <p className="text-center mt-5">
        Loading orders...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-danger mt-5">
        {error}
      </p>
    );
  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (

    <div className="container mt-4 admin-orders-page">

      <PageHeader
        title="Admin Orders"
        subtitle="Manage customer orders"
      />

      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <Card className="admin-table-card mt-4">

        <div className="table-responsive">

          <table
            className="
              table
              admin-table
              align-middle
            "
          >

            <thead>

              <tr>

                <th>Order</th>

                <th>User</th>

                <th>Total</th>

                <th>Status</th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => {

                const isCompleted =
                  order.orderStatus === "completed";

                return (

                  <tr key={order._id}>

                    {/* ORDER ID */}

                    <td>

                      <div className="order-id-short">
                        #{order._id.slice(-6)}
                      </div>

                    </td>

                    {/* USER */}

                    <td>

                      <div className="admin-order-user">
                        {order.user?.name || "Unknown"}
                      </div>

                    </td>

                    {/* TOTAL */}

                    <td>

                      <div className="admin-order-total">
                        ₹{order.totalAmount}
                      </div>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`
                          admin-status-badge
                          ${
                            isCompleted
                              ? "completed"
                              : "pending"
                          }
                        `}
                      >

                        {isCompleted
                          ? "Completed"
                          : "Pending"}

                      </span>

                    </td>

                    {/* ACTION */}

                    <td>

                      <div className="admin-action-group">

                        <Button
                          variant="admin-action-btn"
                          disabled={isCompleted}
                          onClick={() =>
                            updateStatus(order._id)
                          }
                        >

                          {isCompleted
                            ? "Completed"
                            : "Mark Completed"}

                        </Button>

                      </div>

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