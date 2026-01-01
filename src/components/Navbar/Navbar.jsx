import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useCart} from '../../context/CartContext'
import { getCartItemCount } from '../../utils/cartUtils';

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

  const { cartItems} = useCart()

  const cartCount = getCartItemCount(cartItems)

  return (
    <header className="header d-flex align-items-center justify-content-between px-4">
      {/* Application Logo / Brand */}
      <h2 className="logo mb-0">BookStore</h2>

      {/* Search input (UI only for now, logic added later if required) */}
      <div className='flex-grow-1 mx-4'>
       <input
         type="text"
         placeholder="Search books..."
         className="search w-100"
         disabled
       />
      </div>

      {/* Navigation links */}
      <nav className="nav">
        <Link to="/">Home</Link>
       <Link 
       to="cart"
       className='position-relative navbar-icon'
       aria-label='Cart'>
        <span>🛒</span>
        { cartCount > 0 && (
          <span  className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {cartCount}
          </span>
        )}
       </Link>
        <Link to="/orders">Orders</Link>
        
        {/* Logout button */}
        <button className='btn btn-outline-secondary btn-sm'
        onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
