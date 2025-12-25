import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

/*
  Header component.
  Responsibilities:
  - Display application branding (logo)
  - Provide primary navigation links
  - Handle user logout
  - Remain visible only on authenticated pages
*/
const Header = () => {
  const navigate = useNavigate();

  /*
    Handles user logout.
    - Clears authentication flag from localStorage
    - Redirects user to login page
  */
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <header className="header">
      {/* Application Logo / Brand */}
      <h2 className="logo">BookStore</h2>

      {/* Search input (UI only for now, logic added later if required) */}
      <input
        type="text"
        placeholder="Search books..."
        className="search"
        disabled
      />

      {/* Navigation links */}
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>

        {/* Logout button */}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
