import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../../context/CartContext';
import { getCartItemCount } from '../../utils/cartUtils';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* -------------------- CART & ORDERS DATA -------------------- */
  const { cartItems} = useCart();
  const cartCount = cartItems.length;

  const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
  const orderCount = storedOrders.length;


  /* -------------------- AUTH DATA (LOCAL STORAGE) -------------------- */
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user'));

  /* -------------------- PROFILE DROPDOWN -------------------- */
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* -------------------- LOGOUT -------------------- */
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setOpenProfile(false);
    navigate('/auth');
  };

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
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>

        <Link
          to="/cart"
          className={location.pathname === '/cart' ? 'active' : ''}
        >
          Cart
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>

        <Link
          to="/orders"
          className={location.pathname === '/orders' ? 'active' : ''}
        >
          Orders
          {orderCount > 0 && (
            <span className="cart-badge">{orderCount}</span>
          )}
        </Link>
      </nav>

      {/* RIGHT: Profile */}
      <div className="nav-right" ref={profileRef}>
        <button
          className="profile-btn"
          onClick={() => setOpenProfile((prev) => !prev)}
        >
          <span className="profile-icon">👤</span>
        </button>

        {openProfile && (
          <div className="profile-dropdown">
            {isLoggedIn ? (
              <>
                <div className="profile-info">
                  <strong>{user?.name || 'User Name'}</strong>
                  <div className="email">
                    {user?.email || 'user@email.com'}
                  </div>
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
                  onClick={() => {
                    setOpenProfile(false);
                    navigate('/auth');
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

export default Header;
