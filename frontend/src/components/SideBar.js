import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoSidebarCollapse } from "react-icons/go";
import { MdDashboardCustomize } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { BiSolidNotification } from "react-icons/bi";
import "../styles/SideBar.css";

function SideBar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <MdDashboardCustomize /> },
    { path: "/residents", label: "Residents", icon: <FaPeopleRoof /> },
    { path: "/payments", label: "Payments", icon: <MdPayments /> },
    { path: "/announcements", label: "Announcements", icon: <BiSolidNotification /> },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-collapse">
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            <GoSidebarCollapse
              className={`collapse-icon ${isCollapsed ? "rotated" : ""}`}
              size={22}
            />
          </button>
        </div>
        {!isCollapsed && <h2>My Society Manager</h2>}
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Link to={item.path}>
                <span className="icon">{item.icon}</span>
                {!isCollapsed && <span className="label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <p>© 2025 SMS v1.0</p>
        </div>
      )}
    </aside>
  );
}

export default SideBar;
