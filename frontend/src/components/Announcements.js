import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Announcements.css";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    priority: "normal",
    category: "general"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const priorities = ["low", "normal", "high", "urgent"];
  const categories = ["general", "maintenance", "events", "rules", "emergency"];

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/announcements");
      setAnnouncements(res.data || []);
    } catch (err) {
      setError("Announcements feature not yet implemented in backend");
      // Mock data for demonstration
      setAnnouncements([
        {
          _id: "1",
          title: "Society Meeting",
          content: "Monthly society meeting scheduled for next Sunday at 10 AM in the community hall.",
          priority: "high",
          category: "events",
          createdAt: new Date().toISOString(),
          author: "Admin"
        },
        {
          _id: "2",
          title: "Maintenance Work",
          content: "Elevator maintenance will be conducted on Saturday. Please use stairs.",
          priority: "normal",
          category: "maintenance",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          author: "Admin"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`http://localhost:5000/api/announcements/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/announcements", form);
      }
      setForm({ title: "", content: "", priority: "normal", category: "general" });
      fetchAnnouncements();
    } catch (err) {
      setError("Announcements feature not yet implemented in backend");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    setForm({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      category: announcement.category
    });
    setEditingId(announcement._id);
  };

  const handleCancel = () => {
    setForm({ title: "", content: "", priority: "normal", category: "general" });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await axios.delete(`http://localhost:5000/api/announcements/${id}`);
        fetchAnnouncements();
      } catch (err) {
        setError("Failed to delete announcement");
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent": return "#F44336";
      case "high": return "#FF9800";
      case "normal": return "#4CAF50";
      case "low": return "#9E9E9E";
      default: return "#4CAF50";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "general": return "📋";
      case "maintenance": return "🔧";
      case "events": return "🎉";
      case "rules": return "📜";
      case "emergency": return "🚨";
      default: return "📋";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="announcements-container">
      <div className="header">
        <h1>📢 Announcements</h1>
        <p>Keep residents informed with important updates</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Add/Edit Announcement Form */}
      <div className="form-section">
        <h3>{editingId ? "Edit Announcement" : "Create New Announcement"}</h3>
        <form onSubmit={handleSubmit} className="announcement-form">
          <div className="form-row">
            <input
              name="title"
              placeholder="Announcement Title"
              value={form.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <textarea
              name="content"
              placeholder="Announcement content..."
              value={form.content}
              onChange={handleChange}
              rows="4"
              required
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : editingId ? "Update Announcement" : "Create Announcement"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Announcements List */}
      <div className="announcements-list">
        <h3>All Announcements ({announcements.length})</h3>
        {loading ? (
          <div className="loading">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <div className="no-data">No announcements yet. Create your first announcement above!</div>
        ) : (
          <div className="announcements-grid">
            {announcements.map(announcement => (
              <div key={announcement._id} className="announcement-card">
                <div className="announcement-header">
                  <div className="announcement-meta">
                    <span className="category-icon">{getCategoryIcon(announcement.category)}</span>
                    <span className="category">{announcement.category}</span>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                    >
                      {announcement.priority}
                    </span>
                  </div>
                  <div className="announcement-actions">
                    <button
                      onClick={() => handleEdit(announcement)}
                      className="btn-edit"
                      title="Edit Announcement"
                    >
                     ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(announcement._id)}
                      className="btn-delete"
                      title="Delete Announcement"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="announcement-content">
                  <h4>{announcement.title}</h4>
                  <p>{announcement.content}</p>
                </div>

                <div className="announcement-footer">
                  <small>
                    By {announcement.author || "Admin"} • {formatDate(announcement.createdAt)}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}