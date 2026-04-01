import React, { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import api from "../../api/api";

import "../../style/Admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get("/products"),
          api.get("/orders"),
        ]);

        setStats({
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          users: 0,
        });

      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading dashboard...</p>;
  }

  return (
    <div className="container mt-4">

      <PageHeader
        title="Admin Dashboard"
        subtitle="Overview of your bookstore"
      />

      <div className="row g-4 mt-4">

        {/* PRODUCTS */}
        <div className="col-md-4">
          <Card className="p-4 dashboard-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">Total Products</h6>
                <h2 className="fw-bold">{stats.products}</h2>
              </div>
              <div className="dashboard-icon bg-primary">📚</div>
            </div>
          </Card>
        </div>

        {/* ORDERS */}
        <div className="col-md-4">
          <Card className="p-4 dashboard-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">Total Orders</h6>
                <h2 className="fw-bold">{stats.orders}</h2>
              </div>
              <div className="dashboard-icon bg-success">🛒</div>
            </div>
          </Card>
        </div>

        {/* USERS */}
        <div className="col-md-4">
          <Card className="p-4 dashboard-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">Total Users</h6>
                <h2 className="fw-bold">{stats.users}</h2>
              </div>
              <div className="dashboard-icon bg-dark">👤</div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;