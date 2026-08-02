import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

/* -------------------- APP ENTRY -------------------- */

ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>

    {/* Global Application Providers */}

    <AuthProvider>

      <CartProvider>

          <App />

      </CartProvider>

    </AuthProvider>

  </BrowserRouter>

);