import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Performance() {

  // ================= SAMPLE DATA =================
  const monthlyProductivity = [
    { week: "Week 1", tasks: 12 },
    { week: "Week 2", tasks: 15 },
    { week: "Week 3", tasks: 18 },
    { week: "Week 4", tasks: 14 },
  ];

  const attendancePercentage = 92;
  const totalTasks = 60;
  const completedTasks = 52;
  const overtimeHours = 6;

  const taskCompletionRate =
    ((completedTasks / totalTasks) * 100).toFixed(1);

  const performanceScore = (
    (attendancePercentage * 0.4) +
    (taskCompletionRate * 0.4) +
    ((100 - overtimeHours) * 0.2)
  ).toFixed(1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Performance Overview
      </h1>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Attendance</p>
          <h2 className="text-2xl font-bold text-blue-600 mt-2">
            {attendancePercentage}%
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Task Completion</p>
          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {taskCompletionRate}%
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Overtime Hours</p>
          <h2 className="text-2xl font-bold text-purple-600 mt-2">
            {overtimeHours} hrs
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Performance Score</p>
          <h2 className="text-2xl font-bold text-red-600 mt-2">
            {performanceScore}/100
          </h2>
        </div>

      </div>

      {/* ================= PRODUCTIVITY CHART ================= */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">
          Monthly Productivity
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyProductivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
