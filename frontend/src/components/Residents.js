import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Residents.css";

export default function Residents() {
  const [residents, setResidents] = useState([]);
  const [form, setForm] = useState({ name: "", flat: "", contact: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all residents
  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/residents");
      setResidents(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch residents. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update resident
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`http://localhost:5000/api/residents/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/residents", form);
      }
      setForm({ name: "", flat: "", contact: "" });
      fetchResidents();
      setError("");
    } catch (err) {
      setError("Failed to save resident");
    } finally {
      setLoading(false);
    }
  };

  // Edit resident
  const handleEdit = (resident) => {
    setForm({ name: resident.name, flat: resident.flat, contact: resident.contact });
    setEditingId(resident._id);
  };

  // Cancel edit
  const handleCancel = () => {
    setForm({ name: "", flat: "", contact: "" });
    setEditingId(null);
  };

  // Delete resident
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resident?")) {
      try {
        await axios.delete(`http://localhost:5000/api/residents/${id}`);
        fetchResidents();
        setError("");
      } catch (err) {
        setError("Failed to delete resident");
      }
    }
  };

  // Filter residents based on search term
  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.contact.includes(searchTerm)
  );

  return (
    <div className="residents-container">
      <div className="header">
        <h1>Resident Management</h1>
        <p>Manage society residents and their information</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Add/Edit Form */}
      <div className="form-section">
        <h3>{editingId ? "Edit Resident" : "Add New Resident"}</h3>
        <form onSubmit={handleSubmit} className="resident-form">
          <div className="form-group">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-input-1"
            />
            <input
              name="flat"
              placeholder="Flat No (e.g., A-101)"
              value={form.flat}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-input-1"
            />
            <input
              name="contact"
              placeholder="Contact Number"
              value={form.contact}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-input-1"
            />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : editingId ? "Update Resident" : "Add Resident"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search */}
      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search by name, flat, or contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Residents List */}
      <div className="residents-list">
        <h3>All Residents ({filteredResidents.length})</h3>
        {loading ? (
          <div className="loading">Loading residents...</div>
        ) : filteredResidents.length === 0 ? (
          <div className="no-data">
            {searchTerm ? "No residents found matching your search." : "No residents added yet. Add your first resident above!"}
          </div>
        ) : (
          <div className="residents-grid">
            {filteredResidents.map((resident) => (
              <div key={resident._id} className="resident-card">
                <div className="resident-info">
                  <h4>{resident.name}</h4>
                  <p><strong>Flat:</strong> {resident.flat}</p>
                  <p><strong>Contact:</strong> {resident.contact}</p>
                </div>
                <div className="resident-actions">
                  <button 
                    onClick={() => handleEdit(resident)}
                    className="btn-edit"
                    title="Edit Resident"
                  >
                   ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(resident._id)}
                    className="btn-delete"
                    title="Delete Resident"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}