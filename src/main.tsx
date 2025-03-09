import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import "./assets/vendor/css/core.css";
import "./assets/vendor/css/theme-default.css";
import "./assets/css/demo.css";
import "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "./assets/vendor/css/pages/page-auth.css";
import "./assets/vendor/js/helpers.js";
import "./assets/js/config.js";
import "./assets/vendor/libs/jquery/jquery.js";
import "./assets/vendor/libs/popper/popper.js";
import "./assets/vendor/js/bootstrap.js";
import "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "./assets/vendor/js/menu.js";
import "./assets/js/main.js";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";
import ProtectedRoute from "./context/ProtectedRoute.js";
// import "https://buttons.github.io/buttons.js";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);