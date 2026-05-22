import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import BookDetails from "./pages/BookDetails";
import Auth from "./pages/Auth";

import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  // Hide navbar only on auth page
  const hideHeader = location.pathname === "/auth";

  return (
    <>
      <ScrollToTop />

      {!hideHeader && <Navbar />}

      <Toaster
         position="top-right"
         toastOptions={{
           duration: 3000,
           success: {
              style: {
                border: "1px solid #22c55e",
              },
            },
            error: {
              style: {
                border: "1px solid #ef4444",
              },
            },
          }}
       />

      <main className="app-main">
        <Routes>

          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />

          {/* ---------- USER ROUTES ---------- */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* ---------- ADMIN ROUTES ---------- */}
          
          {/* Dashboard (default admin landing) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </>
  );
}

export default App;