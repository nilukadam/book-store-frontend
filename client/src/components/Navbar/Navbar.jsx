import React, {
  useState,
  useRef,
  useEffect
} from "react";

import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import { useCart } from "../../context/CartContext";

import { useAuth } from "../../hooks/useAuth";

import "./Navbar.css";

const Navbar = () => {

  /* =====================================================
     ROUTER
  ===================================================== */

  const navigate = useNavigate();

  const location = useLocation();

  /* =====================================================
     CONTEXT
  ===================================================== */

  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();

  const { cartItems } = useCart();

  /* =====================================================
     STATE
  ===================================================== */

  const [openProfile, setOpenProfile] =
    useState(false);

  const [openAdmin, setOpenAdmin] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  /* =====================================================
     REFS
  ===================================================== */

  const profileRef = useRef(null);

  const adminRef = useRef(null);

  /* =====================================================
     DERIVED VALUES
  ===================================================== */

  const cartCount = cartItems.length;

  /* =====================================================
     EFFECTS
  ===================================================== */

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setOpenProfile(false);
      }

      if (
        adminRef.current &&
        !adminRef.current.contains(e.target)
      ) {
        setOpenAdmin(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  /* =====================================================
     HELPERS
  ===================================================== */

  const isActive = (path) =>
    location.pathname === path
      ? "active"
      : "";

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  /* =====================================================
     HANDLERS
  ===================================================== */

  const handleLogout = () => {

    logout();

    setOpenProfile(false);

    navigate("/auth");

  };

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <header className="header">

      {/* =====================================================
          LEFT
      ===================================================== */}

      <div className="nav-left">

        <Link
          to="/"
          className="logo"
          onClick={closeMobileMenu}
        >
          BookNest
        </Link>

        {/* MOBILE MENU BUTTON */}

        <button
          className="hamburger"
          onClick={() =>
            setMenuOpen((prev) => !prev)
          }
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

      </div>

      {/* =====================================================
          CENTER NAV
      ===================================================== */}

      <nav
        className={`
          center-nav
          ${menuOpen ? "active" : ""}
        `}
      >

        <Link
          to="/"
          className={isActive("/")}
          onClick={closeMobileMenu}
        >
          Home
        </Link>

        <Link
          to="/cart"
          className={isActive("/cart")}
          onClick={closeMobileMenu}
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
          onClick={closeMobileMenu}
        >
          Orders
        </Link>

        {/* =====================================================
            ADMIN MENU
        ===================================================== */}

        {isAuthenticated &&
          user?.role === "admin" && (

          <div
            className="admin-menu"
            ref={adminRef}
          >

            <button
              className="admin-btn"
              onClick={() =>
                setOpenAdmin((prev) => !prev)
              }
            >
              Admin ▾
            </button>

            {openAdmin && (

              <div className="admin-dropdown">

                <Link
                  to="/admin/dashboard"
                  onClick={() => {
                    setOpenAdmin(false);
                    closeMobileMenu();
                  }}
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin/products"
                  onClick={() => {
                    setOpenAdmin(false);
                    closeMobileMenu();
                  }}
                >
                  Products
                </Link>

                <Link
                  to="/admin/orders"
                  onClick={() => {
                    setOpenAdmin(false);
                    closeMobileMenu();
                  }}
                >
                  Orders
                </Link>

              </div>

            )}

          </div>

        )}

      </nav>

      {/* =====================================================
          PROFILE
      ===================================================== */}

      <div
        className="nav-right"
        ref={profileRef}
      >

        <button
          className="profile-btn"
          onClick={() =>
            setOpenProfile((prev) => !prev)
          }
        >
          <span className="profile-avatar">

            {isAuthenticated && user?.name
              ? user.name.charAt(0).toUpperCase()
              : "?"}

          </span>
          
        </button>

        {openProfile && (

          <div className="profile-dropdown">

            {isAuthenticated ? (

              <>

                <div className="profile-info">

                  <strong>
                    {user?.name}
                  </strong>

                  <div className="email">
                    {user?.email}
                  </div>

                </div>

                <div className="divider" />

                <Link
                  to="/orders"
                  onClick={() => {
                    setOpenProfile(false);
                    closeMobileMenu();
                  }}
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
                  onClick={() => {
                    setOpenProfile(false);
                    navigate("/auth");
                  }}
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