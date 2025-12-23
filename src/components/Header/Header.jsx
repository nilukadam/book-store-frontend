import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>BookStore</h2>

      <input
        type="text"
        placeholder="Search books..."
        style={styles.search}
        disabled
      />

      <nav style={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd'
  },
  logo: {
    marginRight: 'auto'
  },
  search: {
    padding: '6px'
  },
  nav: {
    display: 'flex',
    gap: '10px'
  }
};

export default Header;
