import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Residents() {
  const [residents, setResidents] = useState([]);
  const [form, setForm] = useState({ name: "", flat: "", contact: "" });

  // Fetch all residents
  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    const res = await axios.get("http://localhost:5000/api/residents");
    setResidents(res.data);
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add resident
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/residents", form);
    setForm({ name: "", flat: "", contact: "" });
    fetchResidents();
  };

  // Delete resident
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/residents/${id}`);
    fetchResidents();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Residents</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="flat"
          placeholder="Flat No"
          value={form.flat}
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Resident</button>
      </form>

      <ul>
        {residents.map((r) => (
          <li key={r._id}>
            {r.name} - {r.flat} - {r.contact}
            <button onClick={() => handleDelete(r._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
