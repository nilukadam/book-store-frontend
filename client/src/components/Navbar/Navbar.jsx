import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();

  const cartCount = cartItems.length;

  const [openProfile, setOpenProfile] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const profileRef = useRef(null);
  const adminRef = useRef(null);

  /* ---------- CLOSE DROPDOWNS ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setOpenAdmin(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- HANDLERS ---------- */
  const handleLogout = () => {
    logout();
    setOpenProfile(false);
    navigate("/auth");
  };

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  /* ---------- UI ---------- */
  return (
    <header className="header">

      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo">
          BookNest
        </Link>
      </div>

      {/* CENTER */}
      <nav className="center-nav">

        <Link to="/" className={isActive("/")}>
          Home
        </Link>

        <Link to="/cart" className={isActive("/cart")}>
          Cart
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>

        <Link to="/orders" className={isActive("/orders")}>
          Orders
        </Link>

        {/* ADMIN DROPDOWN */}
        {isAuthenticated && user?.role === "admin" && (
          <div className="admin-menu" ref={adminRef}>
            <button
              className="admin-btn"
              onClick={() => setOpenAdmin((prev) => !prev)}
            >
              Admin ▾
            </button>

            {openAdmin && (
              <div className="admin-dropdown">

                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpenAdmin(false)}
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin/products"
                  onClick={() => setOpenAdmin(false)}
                >
                  Products
                </Link>

                <Link
                  to="/admin/orders"
                  onClick={() => setOpenAdmin(false)}
                >
                  Orders
                </Link>

              </div>
            )}
          </div>
        )}
      </nav>

      {/* RIGHT */}
      <div className="nav-right" ref={profileRef}>
        <button
          className="profile-btn"
          onClick={() => setOpenProfile((prev) => !prev)}
        >
          👤
        </button>

        {openProfile && (
          <div className="profile-dropdown">
            {isAuthenticated ? (
              <>
                <div className="profile-info">
                  <strong>{user?.name}</strong>
                  <div className="email">{user?.email}</div>
                </div>

                <div className="divider" />

                <Link
                  to="/orders"
                  onClick={() => setOpenProfile(false)}
                >
                  My Orders
                </Link>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="profile-info muted">
                  Please login to continue
                </div>

                <button
                  className="login-link"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </button>
              </>
            )}
          </div>
        )}
      </div>

    </header>
  );
};

export default Navbar;