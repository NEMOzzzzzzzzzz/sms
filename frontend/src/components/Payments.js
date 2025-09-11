import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Payments.css";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [residents, setResidents] = useState([]);
  const [form, setForm] = useState({
    residentId: "",
    amount: "",
    type: "maintenance",
    month: "",
    year: new Date().getFullYear(),
    status: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const paymentTypes = [
    "maintenance",
    "electricity",
    "water",
    "parking",
    "other",
  ];
  const paymentStatuses = ["pending", "paid", "overdue"];

  useEffect(() => {
    fetchPayments();
    fetchResidents();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/payments");
      setPayments(res.data || []);
    } catch (err) {
      setError(
        "Failed to fetch payments. Feature not yet implemented in backend."
      );
      // Mock data for now
      setPayments([
        {
          _id: "1",
          residentName: "John Doe",
          flat: "A-101",
          amount: 5000,
          type: "maintenance",
          month: "January",
          year: 2025,
          status: "paid",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          residentName: "Jane Doe",
          flat: "A-102",
          amount: 5000,
          type: "maintenance",
          month: "January",
          year: 2025,
          status: "paid",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "1",
          residentName: "Varun",
          flat: "A-101",
          amount: 5000,
          type: "maintenance",
          month: "Jan",
          year: 2025,
          status: "paid",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchResidents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/residents");
      setResidents(res.data);
    } catch (err) {
      console.error("Failed to fetch residents");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // This will need backend implementation
      await axios.post("http://localhost:5000/api/payments", form);
      setForm({
        residentId: "",
        amount: "",
        type: "maintenance",
        month: "",
        year: new Date().getFullYear(),
        status: "pending",
      });
      fetchPayments();
    } catch (err) {
      setError("Payment feature not yet implemented in backend");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/payments/${id}`, {
        status: newStatus,
      });
      fetchPayments();
    } catch (err) {
      setError("Failed to update payment status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "#4CAF50";
      case "pending":
        return "#FF9800";
      case "overdue":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const totalCollected = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="payments-container">
      <div className="wrapper">
        <div className="header">
          <h1>💰 Payments Management</h1>
          <p>Track and manage society payments</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card collected">
            <h3>Total Collected: </h3>{" "}
            <h3>₹{totalCollected.toLocaleString()}</h3>
          </div>
          <div className="stat-card pending">
            <h3>Total Pending: </h3> <h3>₹{totalPending.toLocaleString()}</h3>
          </div>
          <div className="stat-card total">
            <h3>Total Payments: </h3> <h3>{payments.length}</h3>
          </div>
        </div>

        {/* Add Payment Form */}
        <div className="form-section">
          <h3>Add New Payment Record</h3>
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-row">
              <select
                name="residentId"
                value={form.residentId}
                onChange={handleChange}
                required
              >
                <option value="">Select Resident</option>
                {residents.map((resident) => (
                  <option key={resident._id} value={resident._id}>
                    {resident.name} - {resident.flat}
                  </option>
                ))}
              </select>

              <input
                name="amount"
                type="number"
                placeholder="Amount (₹)"
                value={form.amount}
                onChange={handleChange}
                required
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                {paymentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <select
                name="month"
                value={form.month}
                onChange={handleChange}
                required
              >
                <option value="">Select Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                min="2020"
                max="2030"
                required
              />

              <select name="status" value={form.status} onChange={handleChange}>
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Adding..." : "Add Payment Record"}
            </button>
          </form>
        </div>
      </div>
      <div className="wrapper">
        {/* Payments List */}
        <div className="payments-list">
          <h3>Payment Records</h3>
          {loading ? (
            <div className="loading">Loading payments...</div>
          ) : payments.length === 0 ? (
            <div className="no-data">No payment records found.</div>
          ) : (
            <div className="table-container">
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>Resident</th>
                    <th>Flat</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Period</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id}>
                      <td>{payment.residentName || "N/A"}</td>
                      <td>{payment.flat || "N/A"}</td>
                      <td>₹{payment.amount.toLocaleString()}</td>
                      <td className="type">{payment.type}</td>
                      <td>
                        {payment.month} {payment.year}
                      </td>
                      <td>
                        <span
                          className="status-badge"
                          style={{
                            backgroundColor: getStatusColor(payment.status),
                          }}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="actions">
                        {payment.status === "pending" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(payment._id, "paid")
                            }
                            className="btn-success"
                            title="Mark as Paid"
                          >
                            ✅
                          </button>
                        )}
                        {payment.status === "paid" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(payment._id, "pending")
                            }
                            className="btn-warning"
                            title="Mark as Pending"
                          >
                            ⏳
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
