import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

function Home() {
  const [stats, setStats] = useState({
    totalResidents: 0,
    totalPayments: 0,
    totalAnnouncements: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch residents count
      const residentsRes = await axios.get("http://localhost:5000/api/residents");
      const totalResidents = residentsRes.data.length;

      // Mock data for other stats (until APIs are ready)
      setStats({
        totalResidents,
        totalPayments: 0,
        totalAnnouncements: 0,
        recentActivity: [
          { type: "resident", message: "New resident added", time: "2 hours ago" },
          { type: "payment", message: "Payment received from A-101", time: "1 day ago" },
          { type: "announcement", message: "New announcement posted", time: "2 days ago" }
        ]
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setStats({
        totalResidents: 0,
        totalPayments: 0,
        totalAnnouncements: 0,
        recentActivity: []
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { 
      title: "Add Resident", 
      description: "Register a new society resident",
      link: "/residents"
    },
    { 
      title: "Add Payment", 
      description: "Record a payment from a resident",
      link: "/payments"
    },
    { 
      title: "Post Announcement", 
      description: "Share updates with all residents",
      link: "/announcements"
    }
  ];

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="home-container">
      <h1>Welcome to Society Management System</h1>
      <p>Manage residents, payments, and announcements all in one place 🚀</p>

      <div className="stats">
        <p>Total Residents: {stats.totalResidents}</p>
        <p>Total Payments: {stats.totalPayments}</p>
        <p>Total Announcements: {stats.totalAnnouncements}</p>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        {quickActions.map((action, index) => (
          <div key={index} className="action-card">
            <h3>{action.title}</h3>
            <p>{action.description}</p>
            <Link to={action.link}>Go</Link>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        {stats.recentActivity.length > 0 ? (
          <ul>
            {stats.recentActivity.map((activity, index) => (
              <li key={index}>
                [{activity.type}] {activity.message} - {activity.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activity</p>
        )}
      </div>
    </div>
  );
}

export default Home;


