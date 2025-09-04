// src/pages/Home.jsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Residents from "C:/Projects/sms/frontend/components/Residents.js";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
        <h1>Welcome to Society Management System</h1>
        <p>Manage residents, payments, and reports all in one place 🚀</p>
        <nav>
            <Link to="/residents">Residents</Link>
        </nav>
        <Routes>
            <Route path="/residents" element={<Residents />} />
        </Routes>
    </div>
  );
}

export default Home;
