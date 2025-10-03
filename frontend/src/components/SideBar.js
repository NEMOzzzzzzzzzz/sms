import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoSidebarCollapse } from "react-icons/go";
import { MdDashboardCustomize } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { BiSolidNotification } from "react-icons/bi";

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
    <aside
      className={`h-screen relative shadow-md transition-all duration-300 ease-in-out bg-[rgb(154,154,154)] 
        ${isCollapsed ? "w-[70px] min-w-[70px] px-2.5 py-5" : "w-[200px] min-w-[200px] p-5"}`}
    >
      {/* Header */}
      <div className="border-b-2 border-black mb-10 flex items-center justify-between">
        <button
          className="mr-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <GoSidebarCollapse
            className={`transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
            size={22}
          />
        </button>
        {!isCollapsed && <h2 className="text-lg font-bold">My Society Manager</h2>}
      </div>

      {/* Nav */}
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`my-2 mb-5 border-2 border-black rounded-lg text-left p-2.5 
                transition-colors duration-300 hover:bg-[#b9b9b9] 
                ${location.pathname === item.path ? "bg-gray-300" : ""}`}
            >
              <Link to={item.path} className="flex items-center gap-2 text-black">
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="text-gray-900">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 w-full p-2 text-xs text-center">
          <p>© 2025 SMS v1.0</p>
        </div>
      )}
    </aside>
  );
}

export default SideBar;
