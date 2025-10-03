import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdPayments } from "react-icons/md";

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

  const paymentTypes = ["maintenance", "electricity", "water", "parking", "other"];
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
      setError("Failed to fetch payments. Feature not yet implemented in backend.");
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
      await axios.put(`http://localhost:5000/api/payments/${id}`, { status: newStatus });
      fetchPayments();
    } catch (err) {
      setError("Failed to update payment status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "overdue":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const totalCollected = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "pending" || p.status === "overdue").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="flex p-5">
      {/* Wrapper 1 */}
      <div className="p-5 min-w-[636px] bg-white shadow rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <MdPayments /> Payments Management
          </h1>
          <p className="text-gray-600">Track and manage society payments</p>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center justify-between bg-green-100 border border-green-400 rounded-lg p-4">
            <h3 className="font-semibold">Total Collected:</h3>
            <h3 className="text-lg">₹{totalCollected.toLocaleString()}</h3>
          </div>
          <div className="flex items-center justify-between bg-yellow-100 border border-yellow-400 rounded-lg p-4">
            <h3 className="font-semibold">Total Pending:</h3>
            <h3 className="text-lg">₹{totalPending.toLocaleString()}</h3>
          </div>
          <div className="flex items-center justify-between bg-gray-100 border border-gray-400 rounded-lg p-4">
            <h3 className="font-semibold">Total Payments:</h3>
            <h3 className="text-lg">{payments.length}</h3>
          </div>
        </div>

        {/* Add Payment Form */}
        <div className="bg-gray-50 border p-5 rounded-lg">
          <h3 className="text-center text-lg font-semibold mb-4">Add New Payment Record</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1 */}
            <div className="flex gap-3">
              <select name="residentId" value={form.residentId} onChange={handleChange} required className="flex-1 border p-2 rounded">
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
                className="flex-1 border p-2 rounded"
              />

              <select name="type" value={form.type} onChange={handleChange} required className="flex-1 border p-2 rounded">
                {paymentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 2 */}
            <div className="flex gap-3">
              <select name="month" value={form.month} onChange={handleChange} required className="flex-1 border p-2 rounded">
                <option value="">Select Month</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December",
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
                className="w-24 border p-2 rounded"
              />

              <select name="status" value={form.status} onChange={handleChange} className="flex-1 border p-2 rounded">
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {loading ? "Adding..." : "Add Payment Record"}
            </button>
          </form>
        </div>
      </div>

      {/* Wrapper 2: Payments List */}
      <div className="p-5 min-w-[636px] bg-white shadow rounded-lg ml-5">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Payment Records</h3>
          {loading ? (
            <div className="text-gray-600">Loading payments...</div>
          ) : payments.length === 0 ? (
            <div className="text-gray-500">No payment records found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-black w-full">
                <thead>
                  <tr>
                    {["Resident", "Flat", "Amount", "Type", "Period", "Status", "Actions"].map((h) => (
                      <th key={h} className="border-b border-black px-3 py-2 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-100">
                      <td className="px-3 py-2">{payment.residentName || "N/A"}</td>
                      <td className="px-3 py-2">{payment.flat || "N/A"}</td>
                      <td className="px-3 py-2">₹{payment.amount.toLocaleString()}</td>
                      <td className="px-3 py-2">{payment.type}</td>
                      <td className="px-3 py-2">{payment.month} {payment.year}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-1 rounded text-sm ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        {payment.status === "pending" && (
                          <button
                            onClick={() => handleStatusUpdate(payment._id, "paid")}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          >
                            ✅
                          </button>
                        )}
                        {payment.status === "paid" && (
                          <button
                            onClick={() => handleStatusUpdate(payment._id, "pending")}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
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
