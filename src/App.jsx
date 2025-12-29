import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import BookDetails from './pages/BookDetails';

/*
  Root application component.
  Responsibilities:
  - Define application routes
  - Control layout structure
  - Handle conditional rendering of Navbar
*/
function App() {
  /*
    useLocation provides access to the current URL path.
    Used here to conditionally hide the Navbar on auth pages.
  */
  const location = useLocation();

  /*
    Navbar should not be visible on Login and Signup pages.
    This improves focus and UX during authentication.
  */
  const hideHeader =
    location.pathname === '/login' ||
    location.pathname === '/signup';

  return (
    <>
      {/* Render Navbar only on authenticated pages */}
      {!hideHeader && <Navbar />}

      {/* Main content wrapper for all routed pages */}
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* Public Routes (accessible without login) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (require authentication) */}
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
          <Route
            path="/BookDetails"
            element={
              <ProtectedRoute>
                <BookDetails/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
