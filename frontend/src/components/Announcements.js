import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    priority: "normal",
    category: "general",
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
      // Mock demo data
      setAnnouncements([
        {
          _id: "1",
          title: "Society Meeting",
          content:
            "Monthly society meeting scheduled for next Sunday at 10 AM in the community hall.",
          priority: "high",
          category: "events",
          createdAt: new Date().toISOString(),
          author: "Admin",
        },
        {
          _id: "2",
          title: "Maintenance Work",
          content:
            "Elevator maintenance will be conducted on Saturday. Please use stairs.",
          priority: "normal",
          category: "maintenance",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          author: "Admin",
        },
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
        await axios.put(
          `http://localhost:5000/api/announcements/${editingId}`,
          form
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/announcements", form);
      }
      setForm({
        title: "",
        content: "",
        priority: "normal",
        category: "general",
      });
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
      category: announcement.category,
    });
    setEditingId(announcement._id);
  };

  const handleCancel = () => {
    setForm({
      title: "",
      content: "",
      priority: "normal",
      category: "general",
    });
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
      case "urgent":
        return "bg-red-600 text-white";
      case "high":
        return "bg-yellow-400 text-black";
      case "normal":
        return "bg-green-500 text-white";
      case "low":
        return "bg-gray-400 text-white";
      default:
        return "bg-green-600 text-white";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "general":
        return "📋";
      case "maintenance":
        return "🔧";
      case "events":
        return "🎉";
      case "rules":
        return "📜";
      case "emergency":
        return "🚨";
      default:
        return "📋";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">📢 Announcements</h1>
        <p className="text-gray-600">
          Keep residents informed with important updates
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Form */}
      <div className="mb-8 bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Announcement" : "Create New Announcement"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              name="title"
              placeholder="Announcement Title"
              value={form.title}
              onChange={handleChange}
              required
              disabled={loading}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="content"
            placeholder="Announcement content..."
            value={form.content}
            onChange={handleChange}
            rows="4"
            required
            disabled={loading}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Announcement"
                : "Create Announcement"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          All Announcements ({announcements.length})
        </h3>
        {loading ? (
          <div className="text-gray-500">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <div className="text-gray-600">
            No announcements yet. Create your first announcement above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((announcement) => (
              <div
                key={announcement._id}
                className="border border-gray-300 rounded-lg p-4 bg-yellow-50 shadow-sm"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span>{getCategoryIcon(announcement.category)}</span>
                    <span className="capitalize text-sm text-gray-600">
                      {announcement.category}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded ${getPriorityColor(
                        announcement.priority
                      )}`}
                    >
                      {announcement.priority}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(announcement)}
                      className="px-2 py-1 rounded bg-yellow-200 hover:bg-yellow-300"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(announcement._id)}
                      className="px-2 py-1 rounded bg-red-200 hover:bg-red-300"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-2">
                  <h4 className="font-semibold text-lg text-orange-600">
                    {announcement.title}
                  </h4>
                  <p className="text-gray-700">{announcement.content}</p>
                </div>

                {/* Footer */}
                <div className="text-sm text-gray-500">
                  By {announcement.author || "Admin"} •{" "}
                  {formatDate(announcement.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
