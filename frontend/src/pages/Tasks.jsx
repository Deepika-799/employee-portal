import { useState } from "react";

export default function Tasks() {

  // ================= SAMPLE TASK DATA =================
  const [tasks, setTasks] = useState([
    {
      id: "T101",
      title: "Design Login Page",
      status: "Pending",
      priority: "High",
      due: "20 Feb 2024",
      submitted: false,
    },
    {
      id: "T102",
      title: "Fix Dashboard Bugs",
      status: "In Progress",
      priority: "Medium",
      due: "22 Feb 2024",
      submitted: false,
    },
    {
      id: "T103",
      title: "API Integration",
      status: "Completed",
      priority: "High",
      due: "25 Feb 2024",
      submitted: false,
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [description, setDescription] = useState("");

  // ================= FILTER LOGIC =================
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  // ================= UPDATE STATUS =================
  const updateStatus = (id, newStatus) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
  };

  // ================= SUBMIT WORK =================
  const handleSubmit = () => {
    const updated = tasks.map((task) =>
      task.id === selectedTask.id
        ? { ...task, submitted: true, status: "Submitted" }
        : task
    );

    setTasks(updated);
    setSelectedTask(null);
    setDescription("");
  };

  // ================= SUMMARY COUNTS =================
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <h2 className="text-2xl font-bold mt-2">{total}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {completed}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600 mt-2">
            {pending}
          </h2>
        </div>
      </div>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="mb-6 space-x-3">
        {["All", "Pending", "In Progress", "Completed", "Submitted"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ================= TASK TABLE ================= */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Task ID</th>
              <th className="text-left">Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-t text-center">
                <td className="py-3 text-left">{task.id}</td>
                <td className="text-left">{task.title}</td>

                {/* STATUS BADGE */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "Submitted"
                        ? "bg-purple-100 text-purple-700"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

                {/* PRIORITY BADGE */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td>{task.due}</td>

                {/* ACTION BUTTONS */}
                <td className="space-x-2">

                  {task.status === "Pending" && (
                    <button
                      onClick={() =>
                        updateStatus(task.id, "In Progress")
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Start
                    </button>
                  )}

                  {task.status === "In Progress" && (
                    <button
                      onClick={() =>
                        updateStatus(task.id, "Completed")
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Complete
                    </button>
                  )}

                  {task.status === "Completed" && !task.submitted && (
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="bg-purple-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Submit Work
                    </button>
                  )}

                  {task.submitted && (
                    <span className="text-purple-600 text-xs font-semibold">
                      Submitted
                    </span>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= SUBMISSION MODAL ================= */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-lg font-semibold mb-4">
              Submit Work - {selectedTask.id}
            </h2>

            <textarea
              placeholder="Describe your work..."
              className="w-full border p-2 rounded mb-4"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input type="file" className="mb-4" />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
