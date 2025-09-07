// src/pages/Home.jsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Residents from "C:\\Projects\\sms\\frontend\\src\\components\\Residents.js";
import "../styles/Home.css"

function Home() {
  return (
    <div className="home-page">
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
