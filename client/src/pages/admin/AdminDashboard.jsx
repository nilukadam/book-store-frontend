import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import api from "../../api/api";

import "../../style/Admin.css";

const AdminDashboard = () => {

  /* =====================================================
     STATE
  ===================================================== */

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  /* =====================================================
     FETCH STATS
  ===================================================== */

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const [productsRes, ordersRes] =
          await Promise.all([
            api.get("/products"),
            api.get("/orders"),
          ]);

        setStats({
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          users: 0,
        });

      } catch (error) {

        if (import.meta.env.DEV){

          console.error("Dashboard error:", error );

        }

         toast.error("Failed to load dashboard data.");

      } finally {

        setLoading(false);

      }

    };

    fetchStats();

  }, []);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (
      <p className="text-center mt-5">
        Loading dashboard...
      </p>
    );

  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="container mt-4 admin-dashboard-page">

      <PageHeader
        title="Admin Dashboard"
        subtitle="
          Overview of your bookstore
        "
      />

      {/* =====================================================
          STATS GRID
      ===================================================== */}

      <div className="row g-4 mt-2">

        {/* PRODUCTS */}

        <div className="col-12 col-md-6 col-xl-4">

          <Card className="dashboard-card">

            <div className="dashboard-card-content">

              <div className="dashboard-metric">

                <p className="dashboard-label">
                  Total Products
                </p>

                <h2 className="dashboard-value">
                  {stats.products}
                </h2>

              </div>

              <div
                className="
                  dashboard-icon
                  products-icon
                "
              >
                📚
              </div>

            </div>

          </Card>

        </div>

        {/* ORDERS */}

        <div className="col-12 col-md-6 col-xl-4">

          <Card className="dashboard-card">

            <div className="dashboard-card-content">

              <div className="dashboard-metric">

                <p className="dashboard-label">
                  Total Orders
                </p>

                <h2 className="dashboard-value">
                  {stats.orders}
                </h2>

              </div>

              <div
                className="
                  dashboard-icon
                  orders-icon
                "
              >
                🛒
              </div>

            </div>

          </Card>

        </div>

        {/* USERS */}

        <div className="col-12 col-md-6 col-xl-4">

          <Card className="dashboard-card">

            <div className="dashboard-card-content">

              <div className="dashboard-metric">

                <p className="dashboard-label">
                  Total Users
                </p>

                <h2 className="dashboard-value">
                  {stats.users}
                </h2>

              </div>

              <div
                className="
                  dashboard-icon
                  users-icon
                "
              >
                👤
              </div>

            </div>

          </Card>

        </div>

      </div>

    </div>
  );

};

export default AdminDashboard;