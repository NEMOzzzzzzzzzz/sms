import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function Residents() {
  const [residents, setResidents] = useState([]);
  const [form, setForm] = useState({ name: "", flat: "", contact: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/residents/${editingId}`,
          form
        );
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

  const handleEdit = (resident) => {
    setForm({
      name: resident.name,
      flat: resident.flat,
      contact: resident.contact,
    });
    setEditingId(resident._id);
  };

  const handleCancel = () => {
    setForm({ name: "", flat: "", contact: "" });
    setEditingId(null);
  };

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

  const filteredResidents = residents.filter(
    (resident) =>
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.contact.includes(searchTerm)
  );

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-2">Resident Management</h1>
        <p className="text-gray-600">Manage society residents and their information</p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded border-l-4 border-red-500 mb-5">
          {error}
        </div>
      )}

      <div className="flex gap-5 items-start md:flex-row flex-col">
        {/* Form */}
        <div className="flex-1 min-w-[350px] bg-white/70 p-5 border border-gray-600 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Resident" : "Add New Resident"}
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-11/12 p-2.5 text-xl font-semibold bg-gray-300 text-gray-800 rounded-md
                         border-l-2 border-b-2 border-gray-500 outline-none mb-2
                         focus:border-gray-300 focus:bg-gray-400 hover:bg-gray-400
                         placeholder:text-gray-700 placeholder:text-sm"
            />
            <input
              name="flat"
              placeholder="Flat No (e.g., A-101)"
              value={form.flat}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-11/12 p-2.5 text-xl font-semibold bg-gray-300 text-gray-800 rounded-md
                         border-l-2 border-b-2 border-gray-500 outline-none mb-2
                         focus:border-gray-300 focus:bg-gray-400 hover:bg-gray-400
                         placeholder:text-gray-700 placeholder:text-sm"
            />
            <input
              name="contact"
              placeholder="Contact Number"
              value={form.contact}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-11/12 p-2.5 text-xl font-semibold bg-gray-300 text-gray-800 rounded-md
                         border-l-2 border-b-2 border-gray-500 outline-none mb-2
                         focus:border-gray-300 focus:bg-gray-400 hover:bg-gray-400
                         placeholder:text-gray-700 placeholder:text-sm"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 text-sm text-gray-800 bg-gray-300 border-2 border-gray-500 rounded-md
                           hover:bg-gray-200 active:translate-y-[1px] transition"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Resident"
                  : "Add Resident"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-3 text-sm text-gray-800 bg-gray-100 border-2 border-gray-400 rounded-md
                             hover:bg-gray-200 active:translate-y-[1px] transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Residents List */}
        <div className="flex-1 min-w-[400px] bg-white/90 p-4 border border-gray-600 rounded-lg">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Search by name, flat, or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-11/12 px-5 py-3 text-sm text-gray-800 bg-gray-300 border-l-2 border-b-2 border-gray-500 rounded-md
                         hover:bg-gray-400 focus:bg-gray-400 outline-none placeholder:text-gray-700"
            />
          </div>

          <h3 className="text-lg font-semibold">
            All Residents ({filteredResidents.length})
          </h3>

          {loading ? (
            <div className="text-center p-5 text-gray-600">Loading residents...</div>
          ) : filteredResidents.length === 0 ? (
            <div className="text-center p-5 text-gray-600">
              {searchTerm
                ? "No residents found matching your search."
                : "No residents added yet. Add your first resident above!"}
            </div>
          ) : (
            <div className="grid gap-4 mt-4">
              {filteredResidents.map((resident) => (
                <div
                  key={resident._id}
                  className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <h4 className="text-gray-800 font-semibold mb-1">
                      {resident.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Flat:</strong> {resident.flat}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Contact:</strong> {resident.contact}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(resident)}
                      className="p-1.5 rounded hover:bg-blue-100"
                      title="Edit Resident"
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(resident._id)}
                      className="p-1.5 rounded hover:bg-red-100"
                      title="Delete Resident"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
