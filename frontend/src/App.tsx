import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your admin pages
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

// You can add your other imports (like HomePage, etc.) here

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        {/* Example: <Route path="/" element={<HomePage />} /> */}

        {/* Admin routes */}
        <Route path="/love-office" element={<AdminLoginPage />} />
        <Route path="/love-office/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
