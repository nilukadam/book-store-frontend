import React, { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import api from "../../api/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  /* ---------- FETCH DATA ---------- */
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
          users: 0, // optional (skip if no API)
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

      <div className="row g-4">

        {/* Products */}
        <div className="col-md-4">
          <Card className="p-4 text-center">
            <h6 className="text-muted">Total Products</h6>
            <h2 className="fw-bold">{stats.products}</h2>
          </Card>
        </div>

        {/* Orders */}
        <div className="col-md-4">
          <Card className="p-4 text-center">
            <h6 className="text-muted">Total Orders</h6>
            <h2 className="fw-bold">{stats.orders}</h2>
          </Card>
        </div>

        {/* Users */}
        <div className="col-md-4">
          <Card className="p-4 text-center">
            <h6 className="text-muted">Total Users</h6>
            <h2 className="fw-bold">{stats.users}</h2>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;