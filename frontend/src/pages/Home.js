import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [stats, setStats] = useState({
    totalResidents: 0,
    totalPayments: 0,
    totalAnnouncements: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const residentsRes = await axios.get("http://localhost:5000/api/residents");
      const totalResidents = residentsRes.data.length;

      setStats({
        totalResidents,
        totalPayments: 0,
        totalAnnouncements: 0,
        recentActivity: [
          { type: "resident", message: "New resident added", time: "2 hours ago" },
          { type: "payment", message: "Payment received from A-101", time: "1 day ago" },
          { type: "announcement", message: "New announcement posted", time: "2 days ago" },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setStats({
        totalResidents: 0,
        totalPayments: 0,
        totalAnnouncements: 0,
        recentActivity: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { title: "Add Resident", description: "Register a new society resident", link: "/residents" },
    { title: "Add Payment", description: "Record a payment from a resident", link: "/payments" },
    { title: "Post Announcement", description: "Share updates with all residents", link: "/announcements" },
  ];

  if (loading) {
    return <div className="p-6 text-gray-700">Loading dashboard...</div>;
  }

  return (
    <div className="flex-1 p-6 text-black">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-2">Welcome to Society Management System</h1>
      <p className="text-gray-700 mb-6">
        Manage residents, payments, and announcements all in one place
      </p>

      {/* Stats */}
      <div className="flex justify-around my-6 bg-gray-100 p-4 rounded-lg shadow">
        <p>Total Residents: {stats.totalResidents}</p>
        <p>Total Payments: {stats.totalPayments}</p>
        <p>Total Announcements: {stats.totalAnnouncements}</p>
      </div>

      {/* Quick Actions */}
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        {quickActions.map((action, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 my-3 bg-white hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{action.title}</h3>
            <p className="text-gray-600">{action.description}</p>
            <Link
              to={action.link}
              className="inline-block mt-2 text-blue-600 font-semibold hover:underline"
            >
              Go
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {stats.recentActivity.length > 0 ? (
          <ul className="list-none p-0">
            {stats.recentActivity.map((activity, index) => (
              <li
                key={index}
                className="my-2 p-2 bg-gray-200 rounded-md"
              >
                [{activity.type}] {activity.message} - {activity.time}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recent activity</p>
        )}
      </div>
    </div>
  );
}

export default Home;
