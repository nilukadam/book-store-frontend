
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

/*
  Application entry point.
  Responsibilities:
  - Mount the React app to the DOM
  - Wrap the app with routing support
  - Provide global state providers
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  /*
    BrowserRouter enables client-side routing.
    Required for React Router to work across the application.
  */
  <BrowserRouter>
    {/*
      CartProvider wraps the entire app to provide
      centralized cart state access across all pages.
    */}
    <CartProvider >
      <OrderProvider >
        <App/>
      </OrderProvider>
    </CartProvider>

  </BrowserRouter>
);
