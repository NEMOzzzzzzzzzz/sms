import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Home from "./pages/Home";
import Residents from "./components/Residents";
import Payments from "./components/Payments";
import Announcements from "./components/Announcements";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div
        className="app-container"
        style={{ display: "flex", height: "100vh" }}
      >
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/announcements" element={<Announcements />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
