import { Routes, Route, useLocation} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header/Header';

function App() {
  const location = useLocation();

  const hideHeader = 
    location.pathname === '/login' ||
    location.pathname === '/signup';
  return (
    <>
      
      {!hideHeader && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
