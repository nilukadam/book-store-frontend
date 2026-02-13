import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import BookDetails from './pages/BookDetails';
import Auth from './pages/Auth';

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
      <main  style={{ padding: '20px' }}>
        <Routes>
          {/* Public Routes (accessible without login) */}
          <Route path="/" element={<Home />}/>
          <Route path="/book/:id" element={< BookDetails />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/auth' element={<Auth />}/>
          

          {/* Protected Routes (require authentication) */}
         
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </>
  );
}

export default App;
