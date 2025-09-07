import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/SideBar.css";

function SideBar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "🏠" },
    { path: "/residents", label: "Residents", icon: "👥" },
    { path: "/payments", label: "Payments", icon: "💰" },
    { path: "/announcements", label: "Announcements", icon: "📢" }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🏢 SMS</h2>
        <p>Society Management</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
              <Link to={item.path}>
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <p>© 2025 SMS v1.0</p>
      </div>
    </aside>
  );
}

export default SideBar;
