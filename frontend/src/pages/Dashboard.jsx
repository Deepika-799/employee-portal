import { useState } from "react";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {

  // ================= STATS DATA =================
  const stats = [
    {
      title: "Total Tasks",
      value: 18,
      icon: <ClipboardList size={20} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Completed",
      value: 12,
      icon: <CheckCircle size={20} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending",
      value: 6,
      icon: <Clock size={20} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total leaves",
      value: "8 Days",
      icon: <CalendarDays size={20} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Alerts",
      value: 2,
      icon: <AlertTriangle size={20} />,
      color: "bg-red-100 text-red-600",
    },
  ];

  // ================= PIE CHART DATA =================
  const taskDistribution = [
    { name: "Completed", value: 12 },
    { name: "In Progress", value: 4 },
    { name: "Pending", value: 2 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#facc15"];

  // ================= WEEKLY TASK DATA =================
  const weeklyData = [
    { day: "Mon", tasks: 3 },
    { day: "Tue", tasks: 4 },
    { day: "Wed", tasks: 2 },
    { day: "Thu", tasks: 3 },
    { day: "Fri", tasks: 4 },
    { day: "Sat", tasks: 1 },
    { day: "Sun", tasks: 1 },
  ];

  return (
    <div>
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-1">Employee Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Welcome back! Here’s your work overview.
      </p>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow border"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h2 className="text-2xl font-bold mt-2">
                  {stat.value}
                </h2>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CHARTS SECTION ================= */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* TASK DISTRIBUTION */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="font-semibold mb-4">
            Task Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskDistribution}
                dataKey="value"
                outerRadius={100}
                label
              >
                {taskDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* WEEKLY PROGRESS */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="font-semibold mb-4">
            Weekly Task Progress
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="tasks"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4 text-sm">
          <div className="p-3 bg-gray-100 rounded-lg">
            ✅ Task T103 completed
            <p className="text-gray-500 text-xs mt-1">
              2 minutes ago
            </p>
          </div>

          <div className="p-3 bg-gray-100 rounded-lg">
            📅 Leave request approved
            <p className="text-gray-500 text-xs mt-1">
              1 hour ago
            </p>
          </div>

          <div className="p-3 bg-gray-100 rounded-lg">
            🔔 New task assigned
            <p className="text-gray-500 text-xs mt-1">
              3 hours ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
