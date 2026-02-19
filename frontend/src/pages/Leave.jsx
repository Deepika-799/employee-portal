import { useState } from "react";
import { CalendarDays } from "lucide-react";

export default function Leave() {
  const [form, setForm] = useState({
    type: "Casual Leave",
    from: "",
    to: "",
    reason: "",
  });

  const leaveBalance = {
    casual: 5,
    sick: 3,
    earned: 8,
  };

  const history = [
    {
      type: "Casual Leave",
      from: "10 Jan 2024",
      to: "12 Jan 2024",
      status: "Approved",
    },
    {
      type: "Sick Leave",
      from: "05 Dec 2023",
      to: "06 Dec 2023",
      status: "Rejected",
    },
    {
      type: "Earned Leave",
      from: "15 Nov 2023",
      to: "18 Nov 2023",
      status: "Pending",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Leave request submitted!");
  };

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">Leave Management</h1>
      <p className="text-gray-500 mb-6">
        Apply for leave and track your leave history.
      </p>

      {/* ================= LEAVE BALANCE ================= */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Casual Leave</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {leaveBalance.casual} Days
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Sick Leave</p>
          <h2 className="text-2xl font-bold text-green-600">
            {leaveBalance.sick} Days
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Earned Leave</p>
          <h2 className="text-2xl font-bold text-purple-600">
            {leaveBalance.earned} Days
          </h2>
        </div>
      </div>

      {/* ================= APPLY LEAVE FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow border mb-6">
        <div className="flex items-center gap-3 mb-4">
          <CalendarDays size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold">Apply Leave</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600">
              Leave Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
            >
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Earned Leave</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">
              From Date
            </label>
            <input
              type="date"
              name="from"
              value={form.from}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              To Date
            </label>
            <input
              type="date"
              name="to"
              value={form.to}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-600">
              Reason
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Enter reason for leave"
              className="mt-1 w-full border rounded-lg p-2"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {/* ================= LEAVE HISTORY ================= */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-4">
          Leave History
        </h2>

        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Type</th>
              <th className="text-left">From</th>
              <th className="text-left">To</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">{item.type}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
