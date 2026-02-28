import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { useAuth } from "../../hooks/useAuth";

import "./Navbar.css";
 
const Navbar = () => {
  /* -------------------- ROUTER -------------------- */
  const navigate = useNavigate();
  const location = useLocation();

  /* -------------------- AUTH -------------------- */
  const { isAuthenticated, user, logout } = useAuth();

  /* -------------------- DATA -------------------- */
  const { cartItems } = useCart();
  const { orders } = useOrders();

  const cartCount = cartItems.length;
  const orderCount = orders.length;

  /* -------------------- PROFILE STATE -------------------- */
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------------------- HANDLERS -------------------- */
  const handleLogout = () => {
    logout();
    setOpenProfile(false);
    navigate("/auth");
  };

  const handleLoginRedirect = () => {
    setOpenProfile(false);
    navigate("/auth");
  };

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  /* -------------------- MAIN UI -------------------- */
  return (
    <header className="header">
      {/* LEFT: Brand */}
      <div className="nav-left">
        <Link to="/" className="logo">
          BookNest
        </Link>
      </div>

      {/* CENTER: Navigation */}
      <nav className="center-nav">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>

        <Link
          to="/cart"
          className={isActive("/cart")}
        >
          Cart
          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to="/orders"
          className={isActive("/orders")}
        >
          Orders
          {orderCount > 0 && (
            <span className="cart-badge">
              {orderCount}
            </span>
          )}
        </Link>
      </nav>

      {/* RIGHT: Profile */}
      <div className="nav-right" ref={profileRef}>
        <button
          className="profile-btn"
          onClick={() =>
            setOpenProfile((prev) => !prev)
          }
        >
          <span className="profile-icon">
            👤
          </span>
        </button>

        {openProfile && (
          <div className="profile-dropdown">
            {isAuthenticated ? (
              <>
                <div className="profile-info">
                  <strong>
                    {user?.name || "User Name"}
                  </strong>
                  <div className="email">
                    {user?.email ||
                      "user@email.com"}
                  </div>
                </div>

                <div className="divider" />

                <Link
                  to="/orders"
                  onClick={() =>
                    setOpenProfile(false)
                  }
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
                  onClick={handleLoginRedirect}
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
