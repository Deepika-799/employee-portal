import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";

export default function Timesheet() {

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [tasks, setTasks] = useState([
    { task: "", hours: "", description: "" }
  ]);
  const [submittedData, setSubmittedData] = useState(null);

  // ================= LOAD DATA FOR SELECTED DATE =================
  useEffect(() => {
    const saved = localStorage.getItem(`timesheet-${selectedDate}`);

    if (saved) {
      setSubmittedData(JSON.parse(saved));
      setTasks(JSON.parse(saved).tasks);
    } else {
      setSubmittedData(null);
      setTasks([{ task: "", hours: "", description: "" }]);
    }
  }, [selectedDate]);

  // ================= ADD TASK =================
  const addRow = () => {
    setTasks([...tasks, { task: "", hours: "", description: "" }]);
  };

  // ================= HANDLE INPUT =================
  const handleChange = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };

  // ================= TOTAL HOURS =================
  const totalHours = tasks.reduce(
    (sum, task) => sum + Number(task.hours || 0),
    0
  );

  // ================= SUBMIT =================
  const handleSubmit = () => {

    const data = {
      date: selectedDate,
      tasks,
      total: totalHours
    };

    localStorage.setItem(`timesheet-${selectedDate}`, JSON.stringify(data));
    setSubmittedData(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Daily Worksheet
      </h1>

      {/* DATE SELECTOR */}
      <div className="bg-white p-4 rounded-xl shadow border mb-6 flex items-center gap-4">
        <label className="font-medium">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* ================= ENTRY FORM ================= */}
      {!submittedData && (
        <div className="bg-white p-6 rounded-xl shadow border mb-6">

          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">
              Work Entries for {selectedDate}
            </h2>

            <button
              onClick={addRow}
              className="flex items-center gap-2 text-blue-600 text-sm"
            >
              <PlusCircle size={16} />
              Add Task
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left py-2">Task</th>
                <th>Hours</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} className="border-t text-center">
                  <td className="py-2 text-left">
                    <input
                      type="text"
                      className="border p-1 rounded w-full"
                      placeholder="Task name"
                      value={task.task}
                      onChange={(e) =>
                        handleChange(index, "task", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      className="border p-1 rounded w-20"
                      placeholder="Hours"
                      value={task.hours}
                      onChange={(e) =>
                        handleChange(index, "hours", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      className="border p-1 rounded w-full"
                      placeholder="Description"
                      value={task.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right font-semibold mt-4">
            Total: {totalHours} hrs
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Submit Work
            </button>
          </div>
        </div>
      )}

      {/* ================= SUBMITTED DATA DISPLAY ================= */}
      {submittedData && (
        <div className="bg-green-50 p-6 rounded-xl shadow border border-green-300">
          <h2 className="font-semibold mb-4 text-green-700">
            ✅ Submitted Work for {submittedData.date}
          </h2>

          <table className="w-full text-sm mb-3">
            <thead className="text-gray-600">
              <tr>
                <th className="text-left">Task</th>
                <th>Hours</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {submittedData.tasks.map((task, index) => (
                <tr key={index} className="border-t text-center">
                  <td className="text-left py-2">{task.task}</td>
                  <td>{task.hours}</td>
                  <td>{task.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right font-bold">
            Total Hours: {submittedData.total} hrs
          </div>
        </div>
      )}
    </div>
  );
}
