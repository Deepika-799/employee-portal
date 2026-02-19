import { Mail, CheckCircle, Clock } from "lucide-react";

export default function TeamMembers() {

  const teamMembers = [
    {
      id: 1,
      name: "Rahul Kumar",
      role: "Frontend Developer",
      email: "rahul@company.com",
      status: "Active",
      completedTasks: 18,
      recentActivity: "Completed Task T103",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Backend Developer",
      email: "priya@company.com",
      status: "Active",
      completedTasks: 15,
      recentActivity: "Started Task T107",
    },
    {
      id: 3,
      name: "Arjun Patel",
      role: "QA Engineer",
      email: "arjun@company.com",
      status: "On Leave",
      completedTasks: 12,
      recentActivity: "Reported Bug in Dashboard",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Team Members
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white p-6 rounded-xl shadow border"
          >

            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">
                {member.name.charAt(0)}
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  {member.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {member.role}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-sm mb-3 text-gray-600">
              <Mail size={16} />
              {member.email}
            </div>

            {/* Status */}
            <div className="mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  member.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {member.status}
              </span>
            </div>

            {/* Completed Tasks */}
            <div className="flex items-center gap-2 text-sm mb-2">
              <CheckCircle size={16} className="text-green-600" />
              Completed Tasks: {member.completedTasks}
            </div>

            {/* Recent Activity */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock size={16} className="text-blue-600" />
              {member.recentActivity}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
