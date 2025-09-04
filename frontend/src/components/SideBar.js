// Sidebar.js
import React from "react";

function Sidebar() {
  return (
    <div style={{
      width: "250px",
      height: "100vh",
      background: "#1f2937",
      color: "white",
      padding: "20px"
    }}>
      <h2>Society App</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>🏠 Home</li>
        <li>👥 Residents</li>
        <li>📊 Reports</li>
        <li>⚙ Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
